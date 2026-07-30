export interface InviteConfig {
  assetsBase: string;
  music: string;
  introVideo: string;
  icon: string;
  couple: {
    image?: string;
    groom: string;
    bride: string;
    ampersand: string;
  };
  hero: {
    eyebrow: string;
    script: string;
    button: string;
    intro: string;
    cardIntro: string;
  };
  date: {
    day: string;
    month: string;
    year: string;
    iso: string;
    monthTitle: string;
    calendarDays: string[];
    selectedDay: string;
    caption: string;
  };
  intro: {
    title: string;
    text: string[];
  };
  location: {
    title: string;
    name: string;
    address: string;
    mapLabel: string;
    mapUrl: string;
    art: string;
  };
  timing: {
    title: string;
    line: string;
    items: Array<{
      time: string;
      label: string;
      description?: string;
      icon: string;
    }>;
    note: string;
  };
  dressCode: {
    title: string;
    text: string;
    paletteImages: Array<{
      src: string;
      label: string;
      note?: string;
    }>;
  };
  wishes: {
    title: string;
    items: Array<{
      text: string;
      details?: {
        text: string;
        phone: string;
        phoneUrl: string;
      };
    }>;
  };
  rsvp: {
    title: string;
    text: string;
    button: string;
    formUrl: string;
  };
  telegram: {
    text: string;
    buttonUrl: string;
  };
  countdown: {
    title: string;
    labels: {
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
  };
  end: {
    image: string;
    firstLine: string;
    secondLine: string;
    noteFirstLine: string;
    noteSecondLine: string;
  };
}

const asset = (fileName: string) => `assets/invite/${fileName}`;
const originalSvg = (fileName: string) => asset(`original-svg/${fileName}`);

export const inviteConfig: InviteConfig = {
  assetsBase: 'assets/invite',
  music: asset('Музика_для_сайту.mp3'),
  introVideo: asset('Weeding_Video.mov'),
  icon: originalSvg('Gemini_Generated_Image_wu260nwu260nwu26.svg'),
  couple: {
    image: originalSvg('legally-in-love.jpg'),
    groom: 'Назар',
    bride: 'Валентина',
    ampersand: '&',
  },
  hero: {
    eyebrow: 'Ви запрошені',
    script: 'на весілля',
    button: 'Відкрий',
    intro: 'Цей день особливий для нас, і ми хочемо розділити його з тими, хто справді близький серцю',
    cardIntro: 'Ми раді поділитися чудовою новиною — ми одружуємося!',
  },
  date: {
    day: '12',
    month: '09',
    year: '26',
    iso: '2026-09-12T12:00:00+03:00',
    monthTitle: 'Вересень, 2026',
    calendarDays: ['7', '8', '9', '10', '11', '12', '13'],
    selectedDay: '12',
    caption: '- день, коли набере чинності наш Закон любові',
  },
  intro: {
    title: 'Дорогі гості!',
    text: [
      'Запрошуємо Вас на наше весілля!',
      'Нам буде дуже приємно, якщо в цей особливий день Ви зможете бути поруч',
    ],
  },
  location: {
    title: 'Локація',
    name: 'Ресторан «Рафаель»',
    address: 'Львівська область, с. Зубра, вул. І Гонти, 1А',
    mapLabel: 'показати на карті',
    mapUrl: 'https://www.google.com.ua/maps/place/%D0%A0%D0%B0%D1%84%D0%B0%D0%B5%D0%BB%D1%8C/@49.7659173,24.0569968,16z/data=!4m9!3m8!1s0x473ae8f105e700ef:0x81fde5d1d2e87b00!5m2!4m1!1i2!8m2!3d49.7663842!4d24.0580033!16s%2Fg%2F1vq9l1f6?entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D',
    art: originalSvg('Gemini_Generated_Image_v36b0yv36b0yv36b.svg'),
  },
  timing: {
    title: 'Таймінг',
    line: originalSvg('timing-line.svg'),
    items: [
      {
        time: '12:00',
        label: 'Вінчання',
        description: 'Церква Архистратига Михаїла\n(м. Львів, вул. Винниченка, 22)',
        icon: originalSvg('Gemini_Generated_Image_3a5fj63a5fj63a5f.svg'),
      },
      { time: '14:00', label: 'Церемонія', icon: originalSvg('timing-ceremony.svg') },
      { time: '15:30', label: 'Банкет', icon: originalSvg('timing-banquet.svg') },
      { time: '21:00', label: 'Торт', icon: originalSvg('timing-cake.svg') },
      {
        time: '23:00',
        label: 'Завершення',
        description: 'Офіційно - 23:00, неофіційно – до останнього гостя',
        icon: originalSvg('timing-finish.svg'),
      },
    ],
    note: '«Любов – це коли де-факто Вас двоє, а де-юре – Ви одне ціле.»',
  },
  dressCode: {
    title: 'Дрескод',
    text: 'Кожен гість у своєму образі має право використати наступні кольори:',
    paletteImages: [
      { src: originalSvg('dress-1.png'), label: 'Темно-синій' },
      { src: originalSvg('dress-2.png'), label: 'Голубий' },
      { src: originalSvg('dress-3.png'), label: 'Тауп', note: 'бежевий' },
      { src: originalSvg('dress-4.png'), label: 'Шампань' },
      { src: originalSvg('dress-5.png'), label: 'Мокко' },
    ],
  },
  wishes: {
    title: 'Декілька важливих правил',
    items: [
      {
        text: 'На відміну від наших почуттів, квіти зів’януть вже за тиждень. Натомість пляшка хорошого алкоголю простоїть роками і  одного вечора підігріє наші почуття, а можливо – і Ваші також. Зробіть так, щоб у нашій молодій сім’ї приставка «міні» в слові «міні-бар» була лише формальністю.',
      },
      {
        text: 'Правила створені для того, щоб їх порушувати, тим більше, коли на святі стільки юристів. 23:00 – це не межа Ваших можливостей.',
        details: {
          text: 'P.S. Для комфортного провдовження свята рекомендуємо заздалегідь забронювати номер в готелі:',
          phone: '+38 (067) 672 55 42',
          phoneUrl: 'tel:+380676725542',
        },
      },
      {
        text: 'Будь ласка, заповніть анкету за посиланням - це значно полегшить нам організацію і зробить свято ще затишнішим.',
      },
    ],
  },
  rsvp: {
    title: '',
    text: '',
    button: 'Заповнити',
    formUrl: 'https://forms.gle/uJwziwwvxJEevgQP9',
  },
  telegram: {
    text: 'Переходьте до спільного чату в Telegram – там буде багато цікавого до, під час та після весілля!',
    buttonUrl: 'https://t.me/+FpYfZ_haLpsyYzRi',
  },
  countdown: {
    title: 'Ми скажемо "так" через...',
    labels: {
      days: 'днів',
      hours: 'годин',
      minutes: 'хвилин',
      seconds: 'секунд',
    },
  },
  end: {
    image: asset('letter.png'),
    firstLine: 'З любов’ю,',
    secondLine: 'Валентина та Назар',
    noteFirstLine: 'Ви особливий гість для нас!',
    noteSecondLine: 'До зустрічі!',
  },
};
