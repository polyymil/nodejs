<template>
  <div class="container">
    <h1>🌸 О нашем магазине</h1>
    
    <!-- История магазина -->
    <div class="history-section">
      <div class="history-card">
        <h2>📖 Наша история</h2>
        <div class="history-content">
          <div class="history-text">
            <p>Цветочный магазин <strong>"Цветочный рай"</strong> открыл свои двери в 2010 году. Наша история началась с маленькой уютной лавки, где мы с любовью составляли первые букеты для наших дорогих клиентов.</p>
            <p>За 14 лет работы мы выросли в один из крупнейших цветочных бутиков города, но сохранили душевность и индивидуальный подход к каждому клиенту. Сегодня "Цветочный рай" - это:</p>
            <ul class="history-list">
              <li>✨ Более 50,000 счастливых клиентов</li>
              <li>✨ Сотрудничество с лучшими теплицами Голландии, Эквадора и России</li>
              <li>✨ Собственная служба доставки с курьерами-флористами</li>
              <li>✨ Тысячи восторженных отзывов и благодарностей</li>
            </ul>
            <p>Мы гордимся тем, что наши букеты украшают самые важные события в жизни наших клиентов: свадьбы, дни рождения, юбилеи и просто романтические свидания.</p>
            <p class="quote">"Цветы - это язык, понятный без слов. Мы помогаем вам говорить на этом языке красиво и искренне."</p>
          </div>
          <div class="history-image">
            <img :src="getImageUrl(555)" alt="Наш магазин" class="shop-image">
            <div class="image-caption">Наш цветочный бутик в центре города</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Наша команда -->
    <div class="team-section">
      <h2>👩‍🌾 Наша команда профессионалов</h2>
      <p class="team-subtitle">Каждый наш сотрудник - это художник, создающий красоту</p>
      
      <div class="team-grid">
        <!-- Сотрудник 1 - 11.jpg -->
        <div class="team-card">
          <div class="team-photo">
            <img :src="getImageUrl(11)" alt="Анна Иванова">
          </div>
          <div class="team-info">
            <h3>Анна Иванова</h3>
            <p class="position">Главный флорист-дизайнер</p>
            <p class="experience">⭐ Опыт: 8 лет</p>
            <p class="bio">Создает уникальные букеты с 2015 года. Победитель конкурса "Лучший флорист 2022"</p>
          </div>
        </div>

        <!-- Сотрудник 2 - 22.jpg -->
        <div class="team-card">
          <div class="team-photo">
            <img :src="getImageUrl(22)" alt="Мария Петрова">
          </div>
          <div class="team-info">
            <h3>Мария Петрова</h3>
            <p class="position">Старший флорист</p>
            <p class="experience">⭐ Опыт: 10 лет</p>
            <p class="bio">Эксперт по свадебной флористике. Оформила более 500 свадеб</p>
          </div>
        </div>

        <!-- Сотрудник 3 - 33.jpg -->
        <div class="team-card">
          <div class="team-photo">
            <img :src="getImageUrl(33)" alt="Елена Сидорова">
          </div>
          <div class="team-info">
            <h3>Елена Сидорова</h3>
            <p class="position">Флорист-декоратор</p>
            <p class="experience">⭐ Опыт: 6 лет</p>
            <p class="bio">Специализируется на корпоративных заказах и оформлении мероприятий</p>
          </div>
        </div>

        <!-- Сотрудник 4 - 44.jpeg -->
        <div class="team-card">
          <div class="team-photo">
            <img :src="getImageUrl(44)" alt="Ольга Козлова">
          </div>
          <div class="team-info">
            <h3>Ольга Козлова</h3>
            <p class="position">Флорист-ботаник</p>
            <p class="experience">⭐ Опыт: 7 лет</p>
            <p class="bio">Знает всё о растениях. Помогает выбрать цветы, которые будут радовать долго</p>
          </div>
        </div>

        <!-- Сотрудник 5 - 55.jpeg -->
        <div class="team-card">
          <div class="team-photo">
            <img :src="getImageUrl(55)" alt="Татьяна Морозова">
          </div>
          <div class="team-info">
            <h3>Татьяна Морозова</h3>
            <p class="position">Директор и основатель</p>
            <p class="experience">⭐ Опыт: 14 лет</p>
            <p class="bio">Основала магазин в 2010 году. Главный флорист и вдохновитель команды</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Наши достижения -->
    <div class="achievements-section">
      <h2>🏆 Наши достижения</h2>
      <div class="achievements-grid">
        <div class="achievement-card">
          <div class="achievement-number">14+</div>
          <div class="achievement-text">лет на рынке</div>
        </div>
        <div class="achievement-card">
          <div class="achievement-number">50k+</div>
          <div class="achievement-text">счастливых клиентов</div>
        </div>
        <div class="achievement-card">
          <div class="achievement-number">100%</div>
          <div class="achievement-text">свежих цветов</div>
        </div>
        <div class="achievement-card">
          <div class="achievement-number">2ч</div>
          <div class="achievement-text">среднее время доставки</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  methods: {
    getImageUrl(imageNumber) {
      // Для 44 и 55 используем расширение .jpeg, для остальных .jpg
      if (imageNumber === 44 || imageNumber === 55) {
        return `http://localhost:3000/uploads/${imageNumber}.jpeg`
      }
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

/* История магазина */
.history-section {
  margin-bottom: 3rem;
}

.history-card {
  background: rgba(255, 248, 250, 0.95);
  backdrop-filter: blur(5px);
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(232, 99, 107, 0.1);
}

.history-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.history-text {
  font-family: 'Montserrat', sans-serif;
  color: #5a3a3a;
  line-height: 1.7;
}

.history-text p {
  margin-bottom: 1rem;
  font-size: 1.05rem;
}

.history-list {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.history-list li {
  margin: 0.5rem 0;
  color: #5a3a3a;
}

.quote {
  font-style: italic;
  font-size: 1.1rem;
  color: #e8636b;
  text-align: center;
  padding: 1rem;
  background: rgba(232, 99, 107, 0.05);
  border-radius: 15px;
  margin-top: 1rem;
}

.history-image {
  text-align: center;
}

.shop-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.shop-image:hover {
  transform: scale(1.02);
}

.image-caption {
  margin-top: 0.8rem;
  font-size: 0.9rem;
  color: #c97b84;
  font-style: italic;
}

/* Команда */
.team-section {
  margin-bottom: 3rem;
}

.team-subtitle {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  color: #c97b84;
  margin-bottom: 2rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.team-card {
  background: rgba(255, 248, 250, 0.95);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(232, 99, 107, 0.1);
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(232, 99, 107, 0.2);
}

.team-photo {
  width: 100%;
  height: 280px;
  overflow: hidden;
}

.team-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.team-card:hover .team-photo img {
  transform: scale(1.05);
}

.team-info {
  padding: 1.2rem;
}

.team-info h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #e8636b;
  margin-bottom: 0.3rem;
}

.position {
  font-weight: 600;
  color: #d64b54;
  margin-bottom: 0.3rem;
}

.experience {
  color: #f0a1b1;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.bio {
  color: #5a3a3a;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Достижения */
.achievements-section {
  margin-bottom: 2rem;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.achievement-card {
  background: linear-gradient(135deg, #fff5f7 0%, #ffeef1 100%);
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 15px rgba(232, 99, 107, 0.1);
}

.achievement-card:hover {
  transform: translateY(-5px);
}

.achievement-number {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #e8636b;
  margin-bottom: 0.5rem;
}

.achievement-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #5a3a3a;
}

/* Адаптивность */
@media (max-width: 968px) {
  .history-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .history-image {
    order: -1;
  }
  
  .shop-image {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.6rem;
  }
  
  .history-text p {
    font-size: 0.95rem;
  }
  
  .history-list li {
    font-size: 0.9rem;
  }
  
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .team-photo {
    height: 250px;
  }
  
  .achievements-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .achievement-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .achievements-grid {
    grid-template-columns: 1fr;
  }
  
  .quote {
    font-size: 0.95rem;
  }
}
</style>
