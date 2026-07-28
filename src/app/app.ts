import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { inviteConfig } from './invite.config';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('audioRef') private audioRef?: ElementRef<HTMLAudioElement>;
  @ViewChild('introVideoRef') private introVideoRef?: ElementRef<HTMLVideoElement>;

  protected readonly invite = inviteConfig;
  protected readonly weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'];
  protected opened = false;
  protected introVideoPreparing = false;
  protected introVideoVisible = false;
  protected introVideoNeedsPlay = false;
  protected isMuted = false;
  protected fontsReady = false;
  protected visibleElements = new Set<string>();
  protected countdown = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  };

  private observer?: IntersectionObserver;
  private timerId?: number;
  private introVideoTimerId?: number;
  private introVideoCompleted = false;
  private introVideoDelayCompleted = false;
  private introVideoReady = false;

  constructor() {
    this.updateCountdown();
    this.setScrollLock(true);
  }

  ngAfterViewInit(): void {
    this.setScrollLock(!this.opened);
    this.prepareCriticalFonts();
    this.createRevealObserver();
    this.timerId = window.setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    this.setScrollLock(false);
    this.observer?.disconnect();
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
    if (this.introVideoTimerId) {
      window.clearTimeout(this.introVideoTimerId);
    }
    this.introVideoRef?.nativeElement.pause();
  }

  protected openInvite(): void {
    if (this.opened) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    this.opened = true;
    this.introVideoCompleted = false;
    this.introVideoDelayCompleted = false;
    this.introVideoPreparing = true;
    this.setScrollLock(true);
    this.primeIntroVideo();

    this.introVideoTimerId = window.setTimeout(() => {
      this.introVideoDelayCompleted = true;
      this.introVideoTimerId = undefined;
      this.tryShowIntroVideo();
    }, 2000);
  }

  protected finishIntroVideo(): void {
    if (!this.opened || this.introVideoCompleted) {
      return;
    }

    this.introVideoCompleted = true;
    this.introVideoPreparing = false;
    this.introVideoVisible = false;
    this.introVideoNeedsPlay = false;

    if (this.introVideoTimerId) {
      window.clearTimeout(this.introVideoTimerId);
      this.introVideoTimerId = undefined;
    }

    this.introVideoRef?.nativeElement.pause();
    this.setScrollLock(false);
    this.startMusic();
  }

  protected playIntroVideoManually(): void {
    const video = this.introVideoRef?.nativeElement;
    if (!video) {
      this.finishIntroVideo();
      return;
    }

    this.introVideoNeedsPlay = false;
    video.muted = false;
    video.play().catch(() => {
      this.introVideoNeedsPlay = true;
    });
  }

  protected handleIntroVideoError(): void {
    if (this.opened) {
      this.finishIntroVideo();
    }
  }

  protected handleIntroVideoCanPlay(): void {
    this.introVideoReady = true;
    this.tryShowIntroVideo();
  }

  protected toggleMusic(): void {
    const audio = this.audioRef?.nativeElement;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      audio.play().then(() => {
        this.isMuted = false;
      }).catch(() => {
        this.isMuted = true;
      });
      return;
    }

    audio.pause();
    this.isMuted = true;
  }

  protected asset(fileName: string): string {
    return `${this.invite.assetsBase}/${fileName}`;
  }

  protected isVisible(id: string): boolean {
    return this.visibleElements.has(id);
  }

  private primeIntroVideo(): void {
    const video = this.introVideoRef?.nativeElement;
    if (!video) {
      return;
    }

    video.currentTime = 0;
    this.introVideoReady = video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
    video.muted = false;
    video.play().then(() => {
      if (!this.introVideoVisible) {
        video.pause();
        video.currentTime = 0;
      }
    }).catch(() => {
      // The visible playback attempt provides a manual fallback if autoplay is blocked.
    });
  }

  private tryShowIntroVideo(): void {
    if (
      this.introVideoCompleted
      || this.introVideoVisible
      || !this.introVideoDelayCompleted
      || !this.introVideoReady
    ) {
      return;
    }

    const video = this.introVideoRef?.nativeElement;
    if (!video) {
      this.finishIntroVideo();
      return;
    }

    this.introVideoPreparing = false;
    this.introVideoVisible = true;
    video.currentTime = 0;
    video.muted = false;
    video.play().catch(() => {
      this.introVideoNeedsPlay = true;
    });
  }

  private startMusic(): void {
    const audio = this.audioRef?.nativeElement;
    if (!audio) {
      return;
    }

    audio.volume = 0.55;
    audio.play().then(() => {
      this.isMuted = false;
    }).catch(() => {
      this.isMuted = true;
    });
  }

  private createRevealObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = (entry.target as HTMLElement).dataset['reveal'];
          if (id) {
            this.visibleElements.add(id);
          }
        }
      });
    }, {
      threshold: 0.22,
      rootMargin: '0px 0px -8% 0px',
    });

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
      this.observer?.observe(element);
    });
  }

  private updateCountdown(): void {
    const target = new Date(this.invite.date.iso).getTime();
    const diff = Math.max(target - Date.now(), 0);
    const day = 24 * 60 * 60 * 1000;
    const hour = 60 * 60 * 1000;
    const minute = 60 * 1000;

    const days = Math.floor(diff / day);
    const hours = Math.floor((diff % day) / hour);
    const minutes = Math.floor((diff % hour) / minute);
    const seconds = Math.floor((diff % minute) / 1000);

    this.countdown = {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  }

  private setScrollLock(locked: boolean): void {
    document.documentElement.classList.toggle('invite-locked', locked);
  }

  private prepareCriticalFonts(): void {
    if (!('fonts' in document)) {
      this.fontsReady = true;
      return;
    }

    Promise.all([
      document.fonts.load('500 25px "Cormorant Infant Local"', 'Ви запрошені'),
      document.fonts.load('500 50px "Snell Roundhand"', 'Валентина та Назар'),
      document.fonts.load('500 18px "Cormorant Garamond Local"', 'Цей день особливий'),
    ]).finally(() => {
      this.fontsReady = true;
    });
  }
}
