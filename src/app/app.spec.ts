import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the configured invitation structure', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('.envelope-copy p span').length).toBe(2);
    expect(compiled.querySelector('.seal img')?.getAttribute('src')).toContain('OctoB.webp');
    expect(compiled.querySelectorAll('.palette img').length).toBe(8);
    expect(compiled.querySelectorAll('.dress-grid img').length).toBe(6);
  });
});
