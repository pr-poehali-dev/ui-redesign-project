import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

const slides = [
  {
    id: 1,
    section: 'Введение',
    title: 'Актуальность, цель, задачи, гипотеза',
    content: {
      type: 'intro',
      items: [
        { 
          title: 'Актуальность', 
          icon: 'TrendingUp',
          text: 'Актуальность исследования обусловлена повсеместным использованием интернет-ресурсов как основного канала коммуникации образовательных учреждений. Неудобный, устаревший интерфейс приводит к негативному пользовательскому опыту, снижает доверие и затрудняет доступ к важным сведениям.'
        },
        { 
          title: 'Цель', 
          icon: 'Target',
          text: 'Разработка редизайна главной страницы официального сайта школы, направленного на значительное повышение его удобства, эстетического восприятия и соответствия современным стандартам.'
        }
      ]
    }
  },
  {
    id: 2,
    section: 'Введение',
    title: 'Задачи и гипотеза',
    content: {
      type: 'tasks',
      tasks: [
        'Изучить теоретические и практические аспекты современного веб-дизайна',
        'Провести комплексный анализ существующего сайта',
        'Спроектировать новый пользовательский интерфейс (UI)',
        'Разработать прототип обновлённой главной страницы',
        'Оценить эффективность внедрённых изменений'
      ],
      hypothesis: 'Системная модернизация веб-дизайна официального школьного сайта, основанная на принципах юзабилити, приведет к статистически значимому улучшению восприятия ресурса пользователями.'
    }
  },
  {
    id: 3,
    section: 'Теория',
    title: 'История веб-дизайна',
    content: {
      type: 'timeline',
      events: [
        { year: '1991', text: 'Первый в мире сайт (Тим Бернерс-Ли) — статичный, без интерактива' },
        { year: '1993', text: 'Графический браузер Mosaic — начало использования цвета и изображений' },
        { year: '2000-е', text: 'Появление привычной «сетки» сайта, закруглённых краёв, градиентов. Зарождение принципов современного дизайна' },
        { year: 'Сейчас', text: 'Веб-дизайн — это сочетание эстетики, функциональности и технологии с фокусом на пользовательский опыт (UX/UI) и адаптивность' }
      ],
      technologies: 'Ключевые технологии: CSS (отделение оформления от содержания) и JavaScript (динамические элементы)'
    }
  },
  {
    id: 4,
    section: 'Теория',
    title: 'Цели и принципы веб-дизайна',
    content: {
      type: 'principles',
      goals: [
        { icon: 'Sparkles', text: 'Создание привлекательного визуального образа' },
        { icon: 'Users', text: 'Улучшение пользовательского опыта (UX)' },
        { icon: 'TrendingUp', text: 'Увеличение конверсии' },
        { icon: 'Award', text: 'Укрепление бренда' }
      ],
      principles: [
        { icon: 'Minimize', text: 'Простота — ключ к успешному веб-дизайну' },
        { icon: 'Smartphone', text: 'Адаптивность — необходимость для разных устройств' },
        { icon: 'Navigation', text: 'Навигация — основа хорошего дизайна' },
        { icon: 'Palette', text: 'Цветовая палитра — играет важную роль в восприятии' },
        { icon: 'Type', text: 'Типография — шрифты должны быть читабельными' }
      ]
    }
  },
  {
    id: 5,
    section: 'Теория',
    title: 'Z-паттерн и Цветовой круг',
    content: {
      type: 'theory',
      sections: [
        {
          title: 'Z-образный паттерн (Диаграмма Гутенберга)',
          icon: 'Zap',
          text: 'Задает маршрут, по которому человеческий глаз перемещается при просмотре страницы (слева направо, сверху вниз). Ключевые элементы нужно разместить на траектории сканирования.'
        },
        {
          title: 'Цветовой круг Иттена',
          icon: 'Palette',
          text: 'Инструмент для выбора гармоничных цветовых палитр. Холодные цвета (синий, зеленый) вызывают чувство спокойствия и доверия — идеально для школы.'
        }
      ]
    }
  },
  {
    id: 6,
    section: 'Теория',
    title: 'Оформление школьного сайта и критерии оценки',
    content: {
      type: 'criteria',
      role: 'Важный инструмент общения и отражение культуры учреждения',
      requirements: [
        'Простота',
        'Сдержанная цветовая гамма (синие, белые тона)',
        'Адаптивность (особенно для смартфонов)',
        'Организация контента'
      ],
      criteria: [
        { icon: 'Layout', text: 'Юзабилити (логичная структура, интуитивная навигация)' },
        { icon: 'FileText', text: 'Контент (актуальность, соответствие интересам аудитории)' },
        { icon: 'Palette', text: 'Дизайн и визуальное оформление (первое впечатление)' },
        { icon: 'MessageCircle', text: 'Взаимодействие с пользователями (обратная связь)' },
        { icon: 'Monitor', text: 'Адаптивность и совместимость (работа на любых устройствах)' }
      ]
    }
  },
  {
    id: 7,
    section: 'Практика',
    title: 'Аудит старого сайта: Юзабилити',
    content: {
      type: 'audit',
      criterion: 'Юзабилити (удобство использования)',
      score: 4,
      problems: [
        'Сайт перегружен текстом в виде плотных абзацев без визуальной иерархии',
        'Навигационное меню содержит слишком много пунктов без чёткой структуры',
        'Визуальные ссылки расположены хаотично и разного размера',
        'Отсутствует поисковая строка'
      ]
    }
  },
  {
    id: 8,
    section: 'Практика',
    title: 'Аудит старого сайта: Контент',
    content: {
      type: 'audit',
      criterion: 'Контент',
      score: 6,
      problems: [
        'Много избыточного текста без акцентов и структурирования заголовками',
        'Отсутствуют визуальные элементы (иконки, фото)',
        'Нет новостной ленты, отчётов о мероприятиях'
      ]
    }
  },
  {
    id: 9,
    section: 'Практика',
    title: 'Аудит старого сайта: Дизайн',
    content: {
      type: 'audit',
      criterion: 'Дизайн и визуальное оформление',
      score: 3,
      problems: [
        'Дизайн устарел, напоминает шаблоны начала 2000-х',
        'Цветовая палитра (голубой фон, синий текст, серые блоки) выглядит тускло и неконтрастно',
        'Мелкий шрифт снижает читаемость'
      ]
    }
  },
  {
    id: 10,
    section: 'Практика',
    title: 'Аудит старого сайта: Адаптивность',
    content: {
      type: 'audit',
      criterion: 'Адаптивность',
      score: 2,
      problems: [
        'Сайт не адаптирован под мобильные устройства',
        'При просмотре с телефона элементы не перестраиваются, текст выходит за рамки',
        'Отсутствует мобильное меню'
      ]
    }
  },
  {
    id: 11,
    section: 'Практика',
    title: 'Аудит старого сайта: Совместимость',
    content: {
      type: 'audit',
      criterion: 'Совместимость',
      score: 5,
      problems: [
        'Возможны проблемы с корректным отображением на современных устройствах с высоким разрешением'
      ]
    }
  },
  {
    id: 12,
    section: 'Практика',
    title: 'Итоговая оценка старого сайта',
    content: {
      type: 'summary',
      scores: [
        { criterion: 'Юзабилити', score: 4 },
        { criterion: 'Контент', score: 6 },
        { criterion: 'Дизайн', score: 3 },
        { criterion: 'Адаптивность', score: 2 },
        { criterion: 'Совместимость', score: 5 }
      ],
      totalScore: '4/10'
    }
  },
  {
    id: 2,
    section: 'Дизайн',
    title: 'Анализ старого сайта: Визуальная иерархия',
    content: {
      type: 'analysis',
      data: [
        { criterion: 'Визуальная иерархия', score: 2, issue: 'Отсутствует чёткая структура, всё одинаково важно' }
      ],
      totalScore: '2/10',
      details: 'Все элементы на странице выглядят одинаково важными. Нет акцентов, нет понятной последовательности восприятия информации.'
    }
  },
  {
    id: 3,
    section: 'Дизайн',
    title: 'Анализ старого сайта: Цветовая схема',
    content: {
      type: 'analysis',
      data: [
        { criterion: 'Цветовая схема', score: 4, issue: 'Устаревшая палитра, низкий контраст' }
      ],
      totalScore: '4/10',
      details: 'Используются устаревшие цвета, которые не соответствуют современным трендам. Низкий контраст затрудняет чтение текста.'
    }
  },
  {
    id: 4,
    section: 'Дизайн',
    title: 'Анализ старого сайта: Адаптивность',
    content: {
      type: 'analysis',
      data: [
        { criterion: 'Адаптивность', score: 2, issue: 'Отсутствует мобильное меню' }
      ],
      totalScore: '2/10',
      details: 'Сайт плохо адаптирован под мобильные устройства. Отсутствует мобильное меню, элементы накладываются друг на друга.'
    }
  },
  {
    id: 5,
    section: 'Дизайн',
    title: 'Анализ старого сайта: Совместимость',
    content: {
      type: 'analysis',
      data: [
        { criterion: 'Совместимость', score: 5, issue: 'Проблемы с корректным отображением на современных устройствах с высоким разрешением' }
      ],
      totalScore: '5/10',
      details: 'Возможны проблемы с отображением на устройствах с Retina и высоким DPI. Изображения размываются, шрифты выглядят нечётко.'
    }
  },
  {
    id: 6,
    section: 'Дизайн',
    title: 'Итоговая оценка старого сайта',
    content: {
      type: 'summary',
      scores: [
        { criterion: 'Навигация', score: 3 },
        { criterion: 'Визуальная иерархия', score: 2 },
        { criterion: 'Цветовая схема', score: 4 },
        { criterion: 'Адаптивность', score: 2 },
        { criterion: 'Совместимость', score: 5 }
      ],
      totalScore: '4/10'
    }
  },
  {
    id: 13,
    section: 'Практика',
    title: 'Разработка нового макета',
    content: {
      type: 'concept',
      features: [
        { icon: 'Palette', title: 'Цветовая схема', desc: 'Чистый белый фон (читаемость, порядок) + насыщенный синий (надёжность, стабильность, интеллект)' },
        { icon: 'Layout', title: 'Блок "Быстрый доступ"', desc: 'Сетка карточек с иконками для главного: расписание, электронный дневник, учителя, документы' },
        { icon: 'Newspaper', title: 'Динамическая лента новостей', desc: 'События, достижения, объявления в удобном формате' },
        { icon: 'MessageSquare', title: 'Блок контактов', desc: 'Простая форма обратной связи и контактная информация' }
      ]
    }
  },
  {
    id: 14,
    section: 'Практика',
    title: 'Типографика и композиция',
    content: {
      type: 'text',
      text: 'Чёткая визуальная иерархия и достаточно "воздуха" для лёгкости восприятия. Используются современные шрифты с хорошей читаемостью. Все элементы структурированы логически.'
    }
  },
  {
    id: 15,
    section: 'Результаты',
    title: 'Результаты опроса: Скорость поиска',
    content: {
      type: 'survey',
      question: 'Насколько быстро вы смогли найти информацию?',
      results: [
        { label: 'Мгновенно (менее 30 сек.)', value: 85, color: 'bg-green-500' },
        { label: 'Разницы не ощутил(а)', value: 13, color: 'bg-yellow-500' },
        { label: 'Заняло больше времени', value: 2, color: 'bg-red-500' }
      ]
    }
  },
  {
    id: 16,
    section: 'Результаты',
    title: 'Результаты опроса: Быстрый доступ',
    content: {
      type: 'survey',
      question: 'Удобство блока "Быстрый доступ"?',
      results: [
        { label: 'Самое удачное нововведение', value: 91, color: 'bg-green-500' },
        { label: 'Не заметил(а) / пользуюсь меню', value: 8, color: 'bg-yellow-500' },
        { label: 'Неудобен и мешает', value: 1, color: 'bg-red-500' }
      ]
    }
  },
  {
    id: 17,
    section: 'Результаты',
    title: 'Результаты опроса: Впечатление от дизайна',
    content: {
      type: 'survey',
      question: 'Впечатление от нового дизайна?',
      results: [
        { label: 'Современно, стильно, вызывает доверие', value: 94, color: 'bg-green-500' },
        { label: 'Изменения незначительны', value: 6, color: 'bg-yellow-500' },
        { label: 'Выглядит хуже старого', value: 0, color: 'bg-red-500' }
      ]
    }
  },
  {
    id: 18,
    section: 'Результаты',
    title: 'Результаты опроса: Обратная связь',
    content: {
      type: 'survey',
      question: 'Организация обратной связи?',
      results: [
        { label: 'Теперь всё очень просто', value: 82, color: 'bg-green-500' },
        { label: 'Не пользовался(ась) функцией', value: 17, color: 'bg-yellow-500' },
        { label: 'Стало сложнее', value: 1, color: 'bg-red-500' }
      ]
    }
  },
  {
    id: 19,
    section: 'Результаты',
    title: 'Результаты опроса: Читаемость',
    content: {
      type: 'survey',
      question: 'Читаемость и лёгкость восприятия?',
      results: [
        { label: 'Информация структурирована, легко читать', value: 88, color: 'bg-green-500' },
        { label: 'Изменений не заметил(а)', value: 12, color: 'bg-yellow-500' },
        { label: 'Читать стало труднее', value: 0, color: 'bg-red-500' }
      ]
    }
  },
  {
    id: 20,
    section: 'Вывод',
    title: 'Заключение и практическая значимость',
    content: {
      type: 'conclusion',
      points: [
        { icon: 'Target', text: 'Цель достигнута. Разработанный редизайн значительно улучшает юзабилити и восприятие сайта' },
        { icon: 'CheckCircle', text: 'Гипотеза подтверждена — новый дизайн повышает удобство использования' },
        { icon: 'TrendingUp', text: '85-94% положительных оценок по всем критериям опроса' },
        { icon: 'Users', text: 'Соответствие современным стандартам и потребностям пользователей' }
      ]
    }
  }
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection('next');
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection('prev');
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];
  const progressPercent = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(155,135,245,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(217,70,239,0.15),transparent_50%)]" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 h-screen flex flex-col">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icon name="Presentation" size={24} className="text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Редизайн школьного сайта
              </h1>
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <div className="flex-1 flex items-center justify-center mb-6">
          <Card 
            key={currentSlide}
            className={`w-full max-w-5xl p-8 md:p-12 shadow-2xl backdrop-blur-sm bg-white/95 ${
              direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'
            }`}
          >
            <div className="mb-6">
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 text-primary font-semibold text-sm mb-3">
                {slide.section}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {slide.title}
              </h2>
            </div>

            {slide.content.type === 'analysis' && (
              <div className="space-y-6">
                {slide.content.data.map((item, idx) => (
                  <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground text-lg">{item.criterion}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-muted-foreground">{item.score}/10</span>
                        <div className="w-32 h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.score <= 3 ? 'bg-red-500' : item.score <= 6 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${item.score * 10}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-base text-muted-foreground pl-4 border-l-2 border-muted">{item.issue}</p>
                  </div>
                ))}
                {slide.content.details && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-base text-foreground">{slide.content.details}</p>
                  </div>
                )}
                <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-500">
                  <p className="text-xl font-bold text-foreground">Итоговая оценка: {slide.content.totalScore}</p>
                </div>
              </div>
            )}

            {slide.content.type === 'summary' && (
              <div className="space-y-6">
                {slide.content.scores.map((item, idx) => (
                  <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground text-lg">{item.criterion}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {item.score}/10
                        </span>
                        <div className="w-32 h-4 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.score <= 3 ? 'bg-red-500' : item.score <= 6 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${item.score * 10}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-8 p-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-500">
                  <p className="text-2xl font-bold text-foreground">Итоговая оценка: {slide.content.totalScore}</p>
                </div>
              </div>
            )}

            {slide.content.type === 'text' && (
              <div className="animate-fade-in">
                <p className="text-lg leading-relaxed text-foreground">{slide.content.text}</p>
              </div>
            )}

            {slide.content.type === 'intro' && (
              <div className="space-y-8">
                {slide.content.items.map((item, idx) => (
                  <Card key={idx} className="p-6 animate-scale-in bg-gradient-to-br from-white to-blue-50/30" style={{ animationDelay: `${idx * 0.2}s` }}>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-secondary flex-shrink-0">
                        <Icon name={item.icon as any} size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-3 text-foreground">{item.title}</h3>
                        <p className="text-base leading-relaxed text-muted-foreground">{item.text}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {slide.content.type === 'tasks' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-xl mb-4 text-foreground">Задачи:</h3>
                  <div className="space-y-3">
                    {slide.content.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                          {idx + 1}
                        </div>
                        <p className="text-base text-foreground pt-1">{task}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-l-4 border-accent">
                  <h3 className="font-bold text-xl mb-3 text-foreground flex items-center gap-2">
                    <Icon name="Lightbulb" size={24} className="text-accent" />
                    Гипотеза
                  </h3>
                  <p className="text-base leading-relaxed text-foreground">{slide.content.hypothesis}</p>
                </Card>
              </div>
            )}

            {slide.content.type === 'timeline' && (
              <div className="space-y-6">
                {slide.content.events.map((event, idx) => (
                  <div key={idx} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${idx * 0.15}s` }}>
                    <div className="flex-shrink-0 w-20 font-bold text-primary text-lg">{event.year}</div>
                    <div className="flex-1">
                      <p className="text-base text-foreground">{event.text}</p>
                    </div>
                  </div>
                ))}
                <Card className="mt-6 p-4 bg-blue-50 border-l-4 border-primary">
                  <p className="text-base font-semibold text-foreground">{slide.content.technologies}</p>
                </Card>
              </div>
            )}

            {slide.content.type === 'principles' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-xl mb-4 text-foreground">Цели:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {slide.content.goals.map((goal, idx) => (
                      <Card key={idx} className="p-4 animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="flex items-center gap-3">
                          <Icon name={goal.icon as any} size={20} className="text-primary" />
                          <p className="text-sm font-medium text-foreground">{goal.text}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-4 text-foreground">Основные принципы:</h3>
                  <div className="space-y-3">
                    {slide.content.principles.map((principle, idx) => (
                      <Card key={idx} className="p-4 animate-fade-in bg-gradient-to-r from-white to-purple-50/30" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="flex items-center gap-3">
                          <Icon name={principle.icon as any} size={20} className="text-secondary" />
                          <p className="text-base text-foreground">{principle.text}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {slide.content.type === 'theory' && (
              <div className="space-y-6">
                {slide.content.sections.map((section, idx) => (
                  <Card key={idx} className="p-6 animate-scale-in bg-gradient-to-br from-white to-blue-50/40" style={{ animationDelay: `${idx * 0.2}s` }}>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent flex-shrink-0">
                        <Icon name={section.icon as any} size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-3 text-foreground">{section.title}</h3>
                        <p className="text-base leading-relaxed text-muted-foreground">{section.text}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {slide.content.type === 'criteria' && (
              <div className="space-y-6">
                <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                  <p className="text-base font-semibold text-foreground">
                    <Icon name="School" size={20} className="inline mr-2 text-primary" />
                    {slide.content.role}
                  </p>
                </Card>
                <div>
                  <h3 className="font-bold text-lg mb-3 text-foreground">Требования:</h3>
                  <div className="flex flex-wrap gap-2">
                    {slide.content.requirements.map((req, idx) => (
                      <span key={idx} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4 text-foreground">Критерии оценки:</h3>
                  <div className="space-y-3">
                    {slide.content.criteria.map((criterion, idx) => (
                      <Card key={idx} className="p-4 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="flex items-start gap-3">
                          <Icon name={criterion.icon as any} size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                          <p className="text-base text-foreground">{criterion.text}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {slide.content.type === 'audit' && (
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl text-foreground">{slide.content.criterion}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        {slide.content.score}/10
                      </span>
                      <div className="w-32 h-4 bg-white rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${slide.content.score <= 3 ? 'bg-red-500' : slide.content.score <= 6 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${slide.content.score * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-base text-foreground mb-2">Проблемы:</h4>
                    {slide.content.problems.map((problem, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Icon name="AlertCircle" size={16} className="text-red-500 flex-shrink-0 mt-1" />
                        <p className="text-sm text-muted-foreground">{problem}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {slide.content.type === 'concept' && (
              <div className="grid md:grid-cols-2 gap-6">
                {slide.content.features.map((feature, idx) => (
                  <Card 
                    key={idx} 
                    className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in bg-gradient-to-br from-white to-blue-50/50"
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-secondary">
                        <Icon name={feature.icon as any} size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {slide.content.type === 'survey' && (
              <div className="space-y-6">
                <p className="text-lg font-semibold text-foreground mb-6">{slide.content.question}</p>
                {slide.content.results.map((result, idx) => (
                  <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{result.label}</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {result.value}%
                      </span>
                    </div>
                    <div className="h-8 bg-muted rounded-full overflow-hidden relative">
                      <div 
                        className={`h-full ${result.color} rounded-full transition-all duration-1000 ease-out flex items-center justify-end px-4`}
                        style={{ width: `${result.value}%` }}
                      >
                        <span className="text-xs font-bold text-white">{result.value}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {slide.content.type === 'conclusion' && (
              <div className="space-y-6">
                {slide.content.points.map((point, idx) => (
                  <Card 
                    key={idx} 
                    className="p-6 animate-scale-in bg-gradient-to-br from-green-50 to-blue-50 border-l-4 border-primary"
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-gradient-to-br from-primary to-secondary">
                        <Icon name={point.icon as any} size={20} className="text-white" />
                      </div>
                      <p className="text-base font-medium text-foreground flex-1">{point.text}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button 
            onClick={prevSlide} 
            disabled={currentSlide === 0}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <Icon name="ChevronLeft" size={20} />
            Назад
          </Button>

          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'w-8 bg-gradient-to-r from-primary to-secondary' 
                    : 'w-2 bg-muted hover:bg-muted-foreground'
                }`}
                aria-label={`Перейти к слайду ${idx + 1}`}
              />
            ))}
          </div>

          <Button 
            onClick={nextSlide} 
            disabled={currentSlide === slides.length - 1}
            size="lg"
            className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Далее
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 text-xs text-muted-foreground bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border">
        ⌨️ Используйте ← → для навигации
      </div>
    </div>
  );
}