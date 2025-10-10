import styles from "./page.module.css";

export default function ProductsPage() {
  return (
    <div className={styles.pageWrapper}> 
      <h1>Наши аэрозоли и продукция</h1>
      <p>
        На этой странице будет представлен каталог всей нашей продукции: от бытовой химии до технических аэрозолей.
      </p>
    </div>
  );
}