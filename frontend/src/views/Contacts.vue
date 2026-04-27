<template>
  <div class="container">
    <h1>📞 Контакты</h1>
    
    <!-- Контактная информация -->
    <div class="contact-section">
      <div class="contact-card">
        <h2>🏢 Наши контакты</h2>
        <div class="contact-grid">
          <div class="contact-item">
            <div class="contact-icon">📍</div>
            <div class="contact-details">
              <h3>Адрес</h3>
              <p>г. Москва, ул. Цветочная, д. 15</p>
              <p>м. Цветной бульвар (5 минут пешком)</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-icon">📞</div>
            <div class="contact-details">
              <h3>Телефон</h3>
              <p>+7 (495) 123-45-67</p>
              <p>+7 (800) 555-35-35 (бесплатно)</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-icon">✉️</div>
            <div class="contact-details">
              <h3>Email</h3>
              <p>info@flowerparadise.ru</p>
              <p>orders@flowerparadise.ru</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-icon">🕐</div>
            <div class="contact-details">
              <h3>Режим работы</h3>
              <p>Пн-Пт: 9:00 - 21:00</p>
              <p>Сб-Вс: 10:00 - 19:00</p>
              <p>Без перерыва и выходных</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-icon">💬</div>
            <div class="contact-details">
              <h3>Мессенджеры</h3>
              <p>WhatsApp: +7 (495) 123-45-67</p>
              <p>Telegram: @flower_paradise</p>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-icon">🌐</div>
            <div class="contact-details">
              <h3>Социальные сети</h3>
              <p>Instagram: @flower_paradise</p>
              <p>VK: vk.com/flower_paradise</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Отзывы клиентов -->
    <div class="reviews-section">
      <h2>💬 Отзывы наших клиентов</h2>
      <p class="reviews-subtitle">Более 5000 благодарных отзывов о нашей работе</p>
      
      <div class="reviews-grid">
        <!-- Отзыв 1 - 111.jpg -->
        <div class="review-card">
          <div class="review-header">
            <div class="review-photo">
              <img :src="getImageUrl(111)" alt="Анна Смирнова">
            </div>
            <div class="reviewer-info">
              <h3>Анна Смирнова</h3>
              <div class="rating">★★★★★</div>
            </div>
          </div>
          <div class="review-content">
            <p>"Заказывала букет для мамы на юбилей. Цветы были свежайшие, очень красиво упакованы. Доставили точно в срок, курьер вежливый. Мама была в восторге! Обязательно буду заказывать еще!"</p>
            <span class="review-date">15 марта 2024</span>
          </div>
        </div>

        <!-- Отзыв 2 - 222.jpg -->
        <div class="review-card">
          <div class="review-header">
            <div class="review-photo">
              <img :src="getImageUrl(222)" alt="Дмитрий Волков">
            </div>
            <div class="reviewer-info">
              <h3>Дмитрий Волков</h3>
              <div class="rating">★★★★★</div>
            </div>
          </div>
          <div class="review-content">
            <p>"Отличный магазин! Заказывал розы для девушки на 8 марта. Букет получился шикарный, цветы простояли почти 2 недели. Спасибо флористам за красоту!"</p>
            <span class="review-date">10 марта 2024</span>
          </div>
        </div>

        <!-- Отзыв 3 - 333.jpg -->
        <div class="review-card">
          <div class="review-header">
            <div class="review-photo">
              <img :src="getImageUrl(333)" alt="Елена Морозова">
            </div>
            <div class="reviewer-info">
              <h3>Елена Морозова</h3>
              <div class="rating">★★★★★</div>
            </div>
          </div>
          <div class="review-content">
            <p>"Очень довольна сервисом! Заказывала букет для подруги в роддом. Флорист учла все пожелания, получилось очень нежно и красиво. Спасибо за оперативность!"</p>
            <span class="review-date">5 февраля 2024</span>
          </div>
        </div>

        <!-- Отзыв 4 - 444.jpg -->
        <div class="review-card">
          <div class="review-header">
            <div class="review-photo">
              <img :src="getImageUrl(444)" alt="Михаил Соколов">
            </div>
            <div class="reviewer-info">
              <h3>Михаил Соколов</h3>
              <div class="rating">★★★★★</div>
            </div>
          </div>
          <div class="review-content">
            <p>"Первый раз заказывал цветы через интернет, переживал. Но всё прошло отлично! Букет привезли вовремя, цветы свежие, даже лучше, чем на фото. Рекомендую!"</p>
            <span class="review-date">20 января 2024</span>
          </div>
        </div>

        <!-- Отзыв 5 - 666.jpg -->
        <div class="review-card">
          <div class="review-header">
            <div class="review-photo">
              <img :src="getImageUrl(666)" alt="Татьяна Кузнецова">
            </div>
            <div class="reviewer-info">
              <h3>Татьяна Кузнецова</h3>
              <div class="rating">★★★★★</div>
            </div>
          </div>
          <div class="review-content">
            <p>"Заказывала оформление зала для корпоратива. Всё сделали быстро и очень красиво! Гости были в восторге от цветочных композиций. Спасибо команде профессионалов!"</p>
            <span class="review-date">25 декабря 2023</span>
          </div>
        </div>

        <!-- Отзыв 6 - 777.jpg -->
        <div class="review-card">
          <div class="review-header">
            <div class="review-photo">
              <img :src="getImageUrl(777)" alt="Алексей Федоров">
            </div>
            <div class="reviewer-info">
              <h3>Алексей Федоров</h3>
              <div class="rating">★★★★★</div>
            </div>
          </div>
          <div class="review-content">
            <p>"Лучший цветочный магазин в городе! Заказываю здесь уже 3 года, всегда отличное качество. Особенно нравится, что можно заказать срочную доставку. Спасибо!"</p>
            <span class="review-date">10 декабря 2023</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Карта -->
    <div class="map-section">
      <h2>🗺️ Как нас найти</h2>
      <div class="map-card">
        <div class="map-placeholder">
          <div class="map-icon">📍</div>
          <h3>г. Москва, ул. Цветочная, д. 15</h3>
          <p>м. Цветной бульвар, выход к Цветному бульвару</p>
          <p>🚗 Есть бесплатная парковка для клиентов</p>
          <p>🚌 Остановка "Цветочная улица" - 2 минуты пешком</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contacts',
  methods: {
    getImageUrl(imageNumber) {
      return `http://localhost:3000/uploads/${imageNumber}.jpg`
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #d64b54;
  text-align: center;
  margin-bottom: 2rem;
}

h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #d64b54;
  text-align: center;
  margin-bottom: 1.5rem;
  position: relative;
}

h2:after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #f8b4c2 0%, #f0a1b1 100%);
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

/* Контактная информация */
.contact-section {
  margin-bottom: 3rem;
}

.contact-card {
  background: rgba(255, 248, 250, 0.95);
  backdrop-filter: blur(5px);
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(232, 99, 107, 0.1);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateX(5px);
}

.contact-icon {
  font-size: 2rem;
  min-width: 50px;
}

.contact-details h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  color: #e8636b;
  margin-bottom: 0.5rem;
}

.contact-details p {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #5a3a3a;
  margin: 0.2rem 0;
}

/* Отзывы */
.reviews-section {
  margin-bottom: 3rem;
}

.reviews-subtitle {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  color: #c97b84;
  margin-bottom: 2rem;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.review-card {
  background: rgba(255, 248, 250, 0.95);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(232, 99, 107, 0.1);
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(232, 99, 107, 0.2);
}

.review-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.review-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #f8b4c2;
}

.review-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reviewer-info h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  color: #e8636b;
  margin-bottom: 0.2rem;
}

.rating {
  color: #ffc107;
  font-size: 1rem;
}

.review-content p {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #5a3a3a;
  line-height: 1.5;
  margin-bottom: 0.8rem;
  font-style: italic;
}

.review-date {
  font-size: 0.8rem;
  color: #c97b84;
}

/* Карта */
.map-section {
  margin-bottom: 2rem;
}

.map-card {
  background: rgba(255, 248, 250, 0.95);
  backdrop-filter: blur(5px);
  border-radius: 25px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(232, 99, 107, 0.1);
}

.map-placeholder {
  background: linear-gradient(135deg, #fff5f7 0%, #ffeef1 100%);
  border-radius: 20px;
  padding: 2rem;
}

.map-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.map-placeholder h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #e8636b;
  margin-bottom: 0.5rem;
}

.map-placeholder p {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #5a3a3a;
  margin: 0.3rem 0;
}

/* Адаптивность */
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.6rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .reviews-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-item {
    padding: 0.8rem;
  }
  
  .contact-icon {
    font-size: 1.5rem;
  }
  
  .contact-details h3 {
    font-size: 1rem;
  }
  
  .contact-details p {
    font-size: 0.85rem;
  }
  
  .review-photo {
    width: 50px;
    height: 50px;
  }
  
  .reviewer-info h3 {
    font-size: 1rem;
  }
  
  .review-content p {
    font-size: 0.85rem;
  }
  
  .map-placeholder h3 {
    font-size: 1.1rem;
  }
  
  .map-placeholder p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .reviews-grid {
    grid-template-columns: 1fr;
  }
}
</style>
