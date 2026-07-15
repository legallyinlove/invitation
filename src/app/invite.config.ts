export interface InviteConfig {
  assetsBase: string;
  music: string;
  icon: string;
  couple: {
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
      icon: string;
    }>;
    note: string;
  };
  dressCode: {
    title: string;
    text: string;
    colors: string[];
    paletteImages: string[];
    paletteHint: string;
    girlsTitle: string;
    girlsText: string;
    boysTitle: string;
    boysText: string;
    inspirationTitle: string;
    images: string[];
  };
  wishes: {
    title: string;
    items: string[];
    contactName: string;
    contactPhone: string;
    phoneUrl: string;
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
    note: string;
  };
}

const asset = (fileName: string) => `assets/invite/${fileName}`;
const originalSvg = (fileName: string) => asset(`original-svg/${fileName}`);

export const inviteConfig: InviteConfig = {
  assetsBase: 'assets/invite',
  music: asset('October.mp3'),
  icon: originalSvg('Gemini_Generated_Image_wu260nwu260nwu26.svg'),
  couple: {
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
    caption: '- день, коли наша любов стане родиною',
  },
  intro: {
    title: 'Дорогі гості!',
    text: [
      'Запрошуємо вас на наше весілля!',
      'Нам буде дуже приємно, якщо в цей особливий день ви зможете бути поруч',
    ],
  },
  location: {
    title: 'Локація',
    name: 'Ресторан "Рафаель"',
    address: 'вулиця Івана Гонти, 1а, Зубра, Львівська область',
    mapLabel: 'показати на карті',
    mapUrl: 'https://maps.app.goo.gl/rZ5xUzxnHExDatnL7',
    art: originalSvg('Gemini_Generated_Image_v36b0yv36b0yv36b.svg'),
  },
  timing: {
    title: 'Таймінг',
    line: originalSvg('timing-line.svg'),
    items: [
      { time: '12:00', label: 'Збір гостей', icon: originalSvg('Gemini_Generated_Image_3a5fj63a5fj63a5f.svg') },
      { time: '13:00', label: 'Церемонія', icon: originalSvg('timing-ceremony.svg') },
      { time: '15:00', label: 'Банкет', icon: originalSvg('timing-banquet.svg') },
      { time: '19:00', label: 'Торт', icon: originalSvg('timing-cake.svg') },
      { time: '21:00', label: 'Завершення', icon: originalSvg('timing-finish.svg') },
    ],
    note: '«Любов - це коли двоє дивляться не одне на одного, а в одному напрямку.»',
  },
  dressCode: {
    title: 'Дрес-код',
    text: 'Будемо дуже вдячні, якщо ви підтримаєте стиль і колір нашого весілля у своїх образах',
    colors: ['#010e30', '#566247', '#a9b298', '#d6dec5', '#24140f', '#4a2d20', '#9c8b78', '#ead8c4'],
    paletteImages: ['oct1.webp', 'oct2.webp', 'oct3.webp', 'oct4.webp', 'oct5.webp', 'oct6.webp', 'oct7.webp', 'oct8.webp'],
    paletteHint: '',
    girlsTitle: 'Для дівчат:',
    girlsText: 'Вечірні або коктейльні сукні у запропонованих відтінках. Також можна обрати елегантні корсети, спідниці чи костюми. Просимо утриматися від білого кольору та яскравих неонових відтінків.',
    boysTitle: 'Для хлопців:',
    boysText: 'Класичні костюми чорного або відтінків темного кольору. Доречними будуть смокінги, жилети, світлі сорочки або поло',
    inspirationTitle: 'Приклади для натхнення',
    images: ['ocl1.webp', 'ocl2.webp', 'ocl3.webp', 'ocl4.webp', 'ocl5.webp', 'ocl6.webp'],
  },
  wishes: {
    title: 'Побажання',
    items: [
      'Ми вирушаємо у весільну подорож одразу після святкування, тож, на жаль, квіти не зможуть поїхати з нами. Натомість будемо раді конверту і вашій щирій усмішці!',
      'Якщо у вас виникнуть будь-які запитання, побажання або пропозиції щодо нашого свята, будь ласка, звертайтеся до нашого організатора. Вона з радістю допоможе вам:',
      'Будь ласка, заповніть анкету за посиланням - це значно полегшить нам організацію і зробить свято ще затишнішим',
    ],
    contactName: 'Юлія',
    contactPhone: '+38 073 487 7835',
    phoneUrl: 'tel:+380734877835',
  },
  rsvp: {
    title: '',
    text: '',
    button: 'заповнити',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScSKDOK8QAnu30LUzz6XYBM5XhCnFBxW1f_gQorSvgC7r4cgg/viewform',
  },
  telegram: {
    text: 'Переходьте до спільного чату в Telegram — там можна ділитися враженнями, фото та відео з весілля',
    buttonUrl: 'https://t.me/foreventua',
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
    note: 'Ви особливий гість для нас! До зустрічі!',
  },
};
