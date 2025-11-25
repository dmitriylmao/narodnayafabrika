import styles from './page.module.css';

const CONTACT_INFO = {
    phone: '+7 (950) 865-55-19',
    email: 'narodnayafabrika@mail.ru',
    address: 'г. Донецк, ул. Заводская, 1',
    whatsappUrl: 'https://wa.me/79508655519',
    telegramUrl: 'https://t.me/yourtelegramid',
};

const YMAP_IFRAME_SRC = "https://yandex.ru/map-widget/v1/?um=constructor%3A8d637ab63e2eaa72e5cbf3c0e631849b26dcbcdc3753bde8d05d5299f30454b5&source=constructor";


export default function ContactPage() {
  return (
    <div className={styles.wrapper}>
            <div className={styles.contentContainer}>
                <h1 className={styles.pageTitle}>Контакты</h1>
                <div className={styles.mainGrid}>
                    
                    <div className={styles.contactInfoColumn}>
                        <h2 className={styles.companyTitle}>
                            ООО «Народная фабрика»
                        </h2>

                        <div className={styles.contactGroup}>
                            <h3 className={styles.contactLabel}>Телефон:</h3>
                            <a href={`tel:${CONTACT_INFO.phone.replace(/[\s()-]/g, '')}`} className={styles.contactValueLink}>
                                {CONTACT_INFO.phone}
                            </a>
                        </div>
                        
                        <div className={styles.contactGroup}>
                            <h3 className={styles.contactLabel}>Email:</h3>
                            <a href={`mailto:${CONTACT_INFO.email}`} className={styles.contactValueLink}>
                                {CONTACT_INFO.email}
                            </a>
                        </div>
                        
                        <div className={styles.contactGroup}>
                            <h3 className={styles.contactLabel}>Адрес:</h3>
                            <p className={styles.contactValue}>
                                {CONTACT_INFO.address}
                            </p>
                        </div>

                        <div className={styles.socialIcons}>
                            <a href={`mailto:${CONTACT_INFO.email}`} className={styles.iconLink} title="Написать на почту">
                                <span className={`${styles.icon} ${styles.iconEmail}`}></span>
                            </a>
                            <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink} title="WhatsApp">
                                <span className={`${styles.icon} ${styles.iconWhatsapp}`}></span>
                            </a>
                            <a href={CONTACT_INFO.telegramUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink} title="Telegram">
                                <span className={`${styles.icon} ${styles.iconTelegram}`}></span>
                            </a>
                        </div>
                    </div>

                    <div className={styles.mapColumn}>
                        <iframe
                            src={YMAP_IFRAME_SRC}
                            className={styles.mapIframe}
                            loading="lazy"
                            allowFullScreen
                            title="Карта расположения"
                        ></iframe>
                    </div>
                </div>
            </div>
    </div>
  );
}