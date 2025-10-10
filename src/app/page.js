import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.pageWrapper}> 
      <h1>Главная страница Народной фабрики</h1>
      <p>
        Добро пожаловать на сайт завода аэрозолей!
      </p>
      
    </div>
  );
}
