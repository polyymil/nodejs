// Определяем базовый URL API в зависимости от окружения
const isProduction = import.meta.env.PROD

// Для production используем ваш домен на Beget
// Для разработки используем localhost
export const API_URL = isProduction 
  ? 'https://ваш-домен.ru:3000/api'  // Замените на ваш реальный домен
  : 'http://localhost:3000/api'

// Базовый URL для изображений
export const IMAGES_URL = isProduction
  ? 'https://ваш-домен.ru:3000/uploads'
  : 'http://localhost:3000/uploads'

// Экспортируем оба варианта
export default {
  API_URL,
  IMAGES_URL
}
