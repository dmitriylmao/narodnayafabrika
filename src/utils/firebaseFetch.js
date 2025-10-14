
import { db } from '@/firebase/config';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'; 

/**
 * Получает все документы из указанной коллекции, сортируя по дате создания.
 * @param {string} collectionName - Имя коллекции ('news', 'vacancies', 'products')
 * @returns {Array} Массив объектов, представляющих документы.
 */
export async function getAllDocuments(collectionName) {
    try {
        const q = query(
            collection(db, collectionName),
            orderBy('createdAt', 'desc') 
        );

        const querySnapshot = await getDocs(q);
        
        const documents = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(), 
            createdAt: doc.data().createdAt ? doc.data().createdAt.toDate().toISOString() : null
        }));

        return documents;

    } catch (error) {
        console.error(`Ошибка при получении документов из ${collectionName}:`, error);
        return [];
    }
}

/**
 * Получает ОДИН документ из коллекции по его SLUG.
 * @param {string} collectionName - Имя коллекции ('news')
 * @param {string} slug - Значение поля 'slug' для поиска.
 * @returns {Object|null} Объект документа или null, если не найден.
 */
export async function getDocumentBySlug(collectionName, slug) {
    try {
        const q = query(
            collection(db, collectionName),
            where('slug', '==', slug)
        );

        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return null;
        }

        const doc = querySnapshot.docs[0];
        
        const documentData = {
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt ? doc.data().createdAt.toDate().toISOString() : null
        };

        return documentData;

    } catch (error) {
        console.error(`Ошибка при получении документа по slug (${slug}):`, error);
        return null;
    }
}