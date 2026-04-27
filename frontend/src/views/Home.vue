<template>
  <div class="container">
    <div class="hero-section">
      <h1 class="main-title">🌸 Добро пожаловать в "Цветочный рай"</h1>
      <p class="subtitle">Магазин, где цветы говорят громче слов</p>
    </div>

    <!-- Описание магазина -->
    <div class="description-section">
      <div class="description-card">
        <p class="description-text">
          "Цветочный рай" - это не просто магазин цветов, это место, где оживают мечты и рождаются эмоции. 
          С 2010 года мы дарим радость и красоту нашим клиентам, создавая неповторимые букеты из свежайших 
          цветов со всего мира. Каждый наш букет - это маленькое произведение искусства, созданное с любовью 
          и вниманием к каждой детали.
        </p>
        <p class="description-text">
          Мы верим, что цветы способны передать любые чувства: от нежной благодарности до страстной любви. 
          Наши флористы - настоящие волшебники, которые помогут вам выбрать идеальный букет для любого повода: 
          будь то романтическое свидание, день рождения, юбилей или просто желание порадовать близкого человека.
        </p>
      </div>
    </div>

    <!-- 3 главных фото -->
    <div class="gallery-section">
      <h2 class="section-title">Наши лучшие букеты</h2>
      <div class="image-gallery">
        <div class="gallery-item">
          <img :src="getImageUrl(2)" alt="Роскошный букет роз" class="gallery-image">
          <div class="gallery-caption">
            <h3>Классическая элегантность</h3>
            <p>Букет из 101 красной розы</p>
          </div>
        </div>
        <div class="gallery-item">
          <img :src="getImageUrl(6)" alt="Весенняя композиция" class="gallery-image">
          <div class="gallery-caption">
            <h3>Весеннее настроение</h3>
            <p>Нежные пионы и тюльпаны</p>
          </div>
        </div>
        <div class="gallery-item">
          <img :src="getImageUrl(5)" alt="Экзотический букет" class="gallery-image">
          <div class="gallery-caption">
            <h3>Экзотическая роскошь</h3>
            <p>Орхидеи и экзотические цветы</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Преимущества магазина -->
    <div class="advantages-section">
      <h2 class="section-title">Почему выбирают нас?</h2>
      <div class="advantages-grid">
        <div class="advantage-card">
          <div class="advantage-icon">🚚</div>
          <h3>Бесплатная доставка</h3>
          <p>Доставляем заказы от 3000 ₽ бесплатно по всему городу в течение 2 часов</p>
        </div>
        
        <div class="advantage-card">
          <div class="advantage-icon">🌿</div>
          <h3>Только свежие цветы</h3>
          <p>Цветы поступают напрямую из лучших теплиц Голландии, Эквадора и России</p>
        </div>
        
        <div class="advantage-card">
          <div class="advantage-icon">🎨</div>
          <h3>Индивидуальный дизайн</h3>
          <p>Создаем уникальные букеты по вашим пожеланиям и фотографиям</p>
        </div>
        
        <div class="advantage-card">
          <div class="advantage-icon">💝</div>
          <h3>Открытки и подарки</h3>
          <p>Бесплатная открытка с вашими пожеланиями и шоколад в подарок</p>
        </div>
        
        <div class="advantage-card">
          <div class="advantage-icon">⭐</div>
          <h3>100% гарантия качества</h3>
          <p>Если цветы завянут через 3 дня - вернем деньги или заменим букет</p>
        </div>
        
        <div class="advantage-card">
          <div class="advantage-icon">📞</div>
          <h3>Поддержка 24/7</h3>
          <p>Наши операторы готовы ответить на любые вопросы в любое время суток</p>
        </div>
      </div>
    </div>

    <!-- Призыв к действию -->
    <div class="cta-section">
      <div class="cta-card">
        <h2>Готовы порадовать близких?</h2>
        <p>Выберите букет в нашем каталоге и оформите заказ прямо сейчас!</p>
        <div class="cta-buttons">
          <router-link to="/flowers" class="cta-button primary">🌸 Смотреть каталог</router-link>
          <router-link to="/contacts" class="cta-button secondary">📞 Связаться с нами</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      flowers: []
    }
  },
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

.hero-section {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, rgba(255, 248, 250, 0.95), rgba(255, 228, 232, 0.95));
  border-radius: 30px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 25px rgba(232, 99, 107, 0.15);
}

.main-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  color: #d64b54;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
}

.subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  color: #c97b84;
  font-weight: 300;
}

.description-section {
  margin-bottom: 3rem;
}

.description-card {
  background: rgba(255, 248, 250, 0.95);
  backdrop-filter: blur(5px);
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(232, 99, 107, 0.1);
}

.description-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #5a3a3a;
  margin-bottom: 1.2rem;
  text-align: justify;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #d64b54;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.section-title:after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #f8b4c2 0%, #f0a1b1 100%);
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

.gallery-section {
  margin-bottom: 3rem;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.gallery-item {
  background: rgba(255, 248, 250, 0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(232, 99, 107, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.gallery-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(232, 99, 107, 0.25);
}

.gallery-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.gallery-caption {
  padding: 1.2rem;
  text-align: center;
}

.gallery-caption h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #e8636b;
  margin-bottom: 0.5rem;
}

.gallery-caption p {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: #c97b84;
}

.advantages-section {
  margin-bottom: 3rem;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.advantage-card {
  background: rgba(255, 248, 250, 0.95);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(232, 99, 107, 0.1);
}

.advantage-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(232, 99, 107, 0.2);
}

.advantage-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.advantage-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #e8636b;
  margin-bottom: 0.8rem;
}

.advantage-card p {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #5a3a3a;
  line-height: 1.5;
}

.cta-section {
  margin-bottom: 2rem;
}

.cta-card {
  background: linear-gradient(135deg, #f8b4c2 0%, #f0a1b1 100%);
  border-radius: 30px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(232, 99, 107, 0.3);
}

.cta-card h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: white;
  margin-bottom: 1rem;
}

.cta-card p {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 1.8rem;
  border-radius: 40px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-button.primary {
  background: white;
  color: #e8636b;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.6rem;
  }
  
  .description-text {
    font-size: 0.95rem;
  }
  
  .advantages-grid {
    grid-template-columns: 1fr;
  }
  
  .gallery-image {
    height: 220px;
  }
  
  .cta-card h2 {
    font-size: 1.5rem;
  }
  
  .cta-card p {
    font-size: 1rem;
  }
  
  .cta-button {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.5rem;
  }
  
  .gallery-caption h3 {
    font-size: 1.1rem;
  }
  
  .advantage-card h3 {
    font-size: 1.1rem;
  }
}
</style>
