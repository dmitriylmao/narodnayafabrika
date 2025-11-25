import styles from './WhyUs.module.css';

export default function WhyUs() {
  const reasons = [
    {
      title: "Собственный R&D",
      desc: "Лаборатория для разработки уникальных рецептур под ваши задачи."
    },

    {
      title: "Виды продукции",
      desc: "Бытовая химия, Автохимия, Краски, Дезинфекция, Косметика, Фармацевтика."
    },

    {
      title: "Контроль качества ISO 9001–2008",
      desc: "Камеры электронного зрения, Проверка горлышка, Контроль микроутечек, 100% герметичность каждого баллона"
    },

    {
      title: "Масштабируемость",
      desc: "Мощности завода позволяют выпускать миллионные партии в сжатые сроки."
    },
    {
      title: "Full-Service",
      desc: "Берем на себя всё: закупку сырья, производство, контроль, логистику."
    },
    {
      title: "Локализация",
      desc: "Производство в РФ. Независимость от импорта и курсовых колебаний."
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Почему выбирают нас</h2>
        
        <div className={styles.grid}>
          {reasons.map((item, index) => (
            <div key={index} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
              <div className={styles.cardIcon}>{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}