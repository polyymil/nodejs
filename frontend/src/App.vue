<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <h1 class="logo">🌺 Цветочный рай</h1>
        <ul class="nav-menu">
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/about">О нас</router-link></li>
          <li><router-link to="/contacts">Контакты</router-link></li>
          <li v-if="isAuthenticated"><router-link to="/flowers">🌸 Цветы</router-link></li>
          <li v-if="isAuthenticated"><router-link to="/orders">📦 Заказы</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/login">🔑 Вход</router-link></li>
          <li v-if="isAuthenticated">
            <button class="logout-btn" @click="logout">🚪 Выход</button>
          </li>
        </ul>
        <div v-if="isAuthenticated" class="user-info">
          👤 {{ currentUser?.username }} ({{ currentUser?.role === 'admin' ? 'Админ' : 'Пользователь' }})
        </div>
      </div>
    </nav>
    <main class="main-content">
      <router-view @auth-success="handleAuthSuccess" />
    </main>
    <footer class="footer">
      <p>&copy; 2024 Цветочный магазин "Цветочный рай". Все права защищены.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: false,
      currentUser: null
    }
  },
  mounted() {
    this.checkAuth()
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      
      if (token && user) {
        this.isAuthenticated = true
        this.currentUser = JSON.parse(user)
      }
    },
    handleAuthSuccess(user) {
      this.isAuthenticated = true
      this.currentUser = user
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.isAuthenticated = false
      this.currentUser = null
      this.$router.push('/')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', 'Arial', sans-serif;
  background: linear-gradient(135deg, #ffe4e8 0%, #ffd1dc 50%, #ffb6c1 100%);
  min-height: 100vh;
  color: #4a2c2c;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background: rgba(255, 248, 250, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(255, 107, 107, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 2px solid rgba(255, 107, 107, 0.2);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo {
  font-family: 'Playfair Display', serif;
  color: #e8636b;
  font-size: 1.8rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: center;
}

.nav-menu a {
  text-decoration: none;
  color: #c97b84;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 1rem;
}

.nav-menu a:hover {
  color: #e8636b;
  background: rgba(232, 99, 107, 0.1);
  transform: translateY(-2px);
}

.nav-menu .router-link-active {
  color: #e8636b;
  background: rgba(232, 99, 107, 0.15);
  border-radius: 25px;
}

.user-info {
  background: rgba(232, 99, 107, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #e8636b;
}

.logout-btn {
  background: none;
  border: none;
  color: #c97b84;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.logout-btn:hover {
  background: rgba(232, 99, 107, 0.1);
  color: #e8636b;
}

.main-content {
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

.footer {
  background: linear-gradient(135deg, #f8b4c2 0%, #f0a1b1 100%);
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: 2rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  box-shadow: 0 -4px 20px rgba(232, 99, 107, 0.1);
}

.container {
  max-width: 100%;
  padding: 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #d64b54;
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
}

h2 {
  color: #d64b54;
  margin: 2rem 0 1rem 0;
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 500;
}

/* Стили для таблиц */
.table-container {
  background: rgba(255, 248, 250, 0.95);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 1rem;
  overflow-x: auto;
  box-shadow: 0 8px 20px rgba(232, 99, 107, 0.1);
  width: 100%;
}

.table-wrapper {
  overflow-x: auto;
  max-width: 100%;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
}

.data-table th {
  background: linear-gradient(135deg, #f8b4c2 0%, #f0a1b1 100%);
  color: white;
  padding: 14px 12px;
  text-align: left;
  font-weight: 600;
  position: sticky;
  top: 0;
  white-space: nowrap;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-table td {
  padding: 12px;
  border-bottom: 1px solid #ffe0e5;
  vertical-align: top;
  color: #5a3a3a;
}

.data-table tr:hover {
  background: rgba(248, 180, 194, 0.1);
}

.table-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.table-image:hover {
  transform: scale(1.1);
}

.price {
  color: #e8636b;
  font-weight: bold;
  white-space: nowrap;
  font-size: 1rem;
}

/* Стили для кнопок */
.btn-add, .btn-view, .btn-edit, .btn-delete {
  transition: all 0.3s ease;
  font-family: 'Montserrat', sans-serif;
}

.btn-add {
  background: linear-gradient(135deg, #e8636b 0%, #d64b54 100%);
  box-shadow: 0 4px 15px rgba(232, 99, 107, 0.3);
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(232, 99, 107, 0.4);
}

.btn-view {
  background: #c9a0dc;
  color: white;
  box-shadow: 0 2px 8px rgba(201, 160, 220, 0.3);
}

.btn-view:hover {
  background: #b88dcc;
  transform: translateY(-2px);
}

.btn-edit {
  background: #f0a1b1;
  color: white;
  box-shadow: 0 2px 8px rgba(240, 161, 177, 0.3);
}

.btn-edit:hover {
  background: #e88f9f;
  transform: translateY(-2px);
}

.btn-delete {
  background: #ff8f8f;
  color: white;
  box-shadow: 0 2px 8px rgba(255, 143, 143, 0.3);
}

.btn-delete:hover {
  background: #ff7575;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
  
  .nav-container {
    flex-direction: column;
    text-align: center;
  }
  
  .nav-menu {
    justify-content: center;
    gap: 1rem;
  }
  
  .data-table {
    font-size: 12px;
  }
  
  .data-table th,
  .data-table td {
    padding: 8px;
  }
  
  .table-image {
    width: 40px;
    height: 40px;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  h2 {
    font-size: 1.4rem;
  }
  
  .logo {
    font-size: 1.4rem;
  }
}
</style>
