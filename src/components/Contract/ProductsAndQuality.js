import styles from './ProductsAndQuality.module.css';

// ... (Блок productCategories остается без изменений) ...
const productCategories = [
    { name: 'Бытовая химия', icon: '🧼' },
    { name: 'Автохимия', icon: '🚗' },
    { name: 'Краски', icon: '🎨' },
    { name: 'Дезинфекция', icon: '🛡️' },
    { name: 'Косметика', icon: '💄' },
    { name: 'Фармацевтика', icon: '💊' }
];

// Новая структура для шагов контроля качества
const qualityChecks = [
    { 
        title: 'Камеры электронного зрения', 
        description: 'Проверка качества печати и формирования горлышка.',
        icon: '👁️'
    },
    { 
        title: 'Контроль микроутечек', 
        description: 'Гарантия 100% герметичности каждого баллона.',
        icon: '🔬'
    },
    { 
        title: 'Автоматическая выбраковка', 
        description: 'Отбраковка дефектных образцов без участия оператора.',
        icon: '⚙️'
    }
];


const ProductsAndQuality = () => {
    return (
        <section className={styles.container}>
            
            {/* Блок 1: Виды продукции (Оставляем как в предыдущей хорошей версии) */}
            <div className={styles.productBlock}>
                <h2 className={styles.heading}>Продукция, которую мы производим</h2>
                <p className={styles.subHeading}>Контрактное производство аэрозолей для ключевых отраслей рынка.</p>
                
                <div className={styles.categoriesGrid}>
                    {productCategories.map((item, index) => (
                        <div key={index} className={styles.categoryCard}>
                            <div className={styles.icon}>{item.icon}</div>
                            <h3 className={styles.categoryTitle}>{item.name}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- НОВЫЙ БЛОК КОНТРОЛЯ КАЧЕСТВА --- */}
            <div className={styles.qualityBlock}>
                <h2 className={styles.heading}>Безупречный контроль и стандарты</h2>
                
                <div className={styles.qualityContentGrid}>
                    
                    {/* КАРТОЧКА 1: АКЦЕНТ ISO */}
                    <div className={styles.isoCard}>
                        <div className={styles.isoContent}>
                            <p className={styles.isoText}>
                                Наша система управления соответствует международным требованиям
                            </p>
                            <div className={styles.isoStandardBox}>
                                ISO 9001–2008
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 2: ОСНОВНОЙ КОНТРОЛЬ (Визуальный) */}
                    {qualityChecks.map((check, index) => (
                        <div key={index} className={styles.checkCard}>
                            <div className={styles.checkIcon}>{check.icon}</div>
                            <h3 className={styles.checkTitle}>{check.title}</h3>
                            <p className={styles.checkDescription}>{check.description}</p>
                        </div>
                    ))}
                    
                </div>
            </div>
            
        </section>
    );
};

export default ProductsAndQuality;