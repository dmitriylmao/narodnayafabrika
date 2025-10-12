import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <div className={styles.pageWrapper}>
      <h1>О заводе &quot;Народная фабрика&quot;</h1>
      <p>
        Мы — передовое производство аэрозольной продукции. 
        Более 20 лет опыта и инноваций в каждой банке! 
        Это страница &quot;О нас&quot;.
      </p>
    </div>
  );
}