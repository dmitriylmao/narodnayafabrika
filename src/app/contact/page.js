import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <div className={styles.pageWrapper}>
      <h1>Свяжитесь с нами</h1>
      <p>
        Тел: +7 (800) 555-35-35
      </p>
      <p>
        Адрес: г. Аэрозольск, ул. Заводская, 1
      </p>
    </div>
  );
}