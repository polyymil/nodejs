<template>
  <div class="auth-wrapper">
    <div class="auth-container">
      <div class="auth-decoration">
        <div class="flower-decoration">🌸</div>
        <div class="flower-decoration">🌺</div>
        <div class="flower-decoration">🌷</div>
        <div class="flower-decoration">🌹</div>
        <div class="flower-decoration">💐</div>
      </div>
      
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-icon">
            <span v-if="isLogin">🔐</span>
            <span v-else>📝</span>
          </div>
          <h2>{{ isLogin ? 'Добро пожаловать!' : 'Создать аккаунт' }}</h2>
          <p v-if="isLogin" class="auth-subtitle">Войдите в свой аккаунт</p>
          <p v-else class="auth-subtitle">Зарегистрируйтесь и откройте мир цветов</p>
        </div>
        
        <div class="auth-tabs">
          <button 
            :class="['tab-btn', { active: isLogin }]" 
            @click="switchToLogin"
          >
            <span>🔑</span> Вход
          </button>
          <button 
            :class="['tab-btn', { active: !isLogin }]" 
            @click="switchToRegister"
          >
            <span>✍️</span> Регистрация
          </button>
        </div>
        
        <form @submit.prevent="submitForm" class="auth-form">
          <div class="form-group">
            <label>
              <span class="label-icon">👤</span>
              Имя пользователя
            </label>
            <input 
              v-model="form.username" 
              type="text" 
              required
              placeholder="Введите имя пользователя"
              class="auth-input"
            >
          </div>
          
          <div class="form-group" v-if="!isLogin">
            <label>
              <span class="label-icon">📧</span>
              Email
            </label>
            <input 
              v-model="form.email" 
              type="email" 
              required
              placeholder="example@mail.com"
              class="auth-input"
            >
          </div>
          
          <div class="form-group">
            <label>
              <span class="label-icon">🔒</span>
              Пароль
            </label>
            <div class="password-wrapper">
              <input 
                v-model="form.password" 
                :type="showPassword ? 'text' : 'password'" 
                required
                placeholder="Введите пароль"
                class="auth-input"
              >
              <button 
                type="button" 
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>
          
          <div class="form-group" v-if="!isLogin">
            <label>
              <span class="label-icon">✅</span>
              Подтверждение пароля
            </label>
            <div class="password-wrapper">
              <input 
                v-model="form.confirmPassword" 
                :type="showConfirmPassword ? 'text' : 'password'" 
                required
                placeholder="Повторите пароль"
                class="auth-input"
              >
              <button 
                type="button" 
                class="toggle-password"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>
          
          <div v-if="isLogin" class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe">
              <span>Запомнить меня</span>
            </label>
            <a href="#" class="forgot-password">Забыли пароль?</a>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="loading">
            <span v-if="loading" class="loading-spinner"></span>
            <span v-else>{{ isLogin ? 'Войти' : 'Зарегистрироваться' }}</span>
          </button>
          
          <div v-if="error" class="error-message">
            <span class="error-icon">⚠️</span>
            {{ error }}
          </div>
        </form>
        
        <div class="auth-footer">
          <p v-if="isLogin">
            Нет аккаунта? 
            <button @click="switchToRegister" class="link-btn">Зарегистрируйтесь</button>
          </p>
          <p v-else>
            Уже есть аккаунт? 
            <button @click="switchToLogin" class="link-btn">Войдите</button>
          </p>
        </div>
      </div>
      
      <div class="auth-info">
        <div class="info-card">
          <h3>✨ Тестовые данные</h3>
          <div class="test-credentials">
            <div class="cred-item">
              <span class="cred-label">Администратор:</span>
              <span class="cred-value">admin / admin123</span>
            </div>
            <div class="cred-item">
              <span class="cred-label">Пользователь:</span>
              <span class="cred-value">user / user123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      isLogin: true,
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      rememberMe: false,
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      error: ''
    }
  },
  methods: {
    switchToLogin() {
      this.isLogin = true
      this.error = ''
      this.form.password = ''
      this.form.confirmPassword = ''
    },
    switchToRegister() {
      this.isLogin = false
      this.error = ''
      this.form.password = ''
      this.form.confirmPassword = ''
    },
    async submitForm() {
      this.error = ''
      
      if (!this.isLogin && this.form.password !== this.form.confirmPassword) {
        this.error = 'Пароли не совпадают'
        return
      }
      
      if (!this.isLogin && this.form.password.length < 6) {
        this.error = 'Пароль должен содержать минимум 6 символов'
        return
      }
      
      this.loading = true
      
      try {
        const endpoint = this.isLogin ? '/api/login' : '/api/register'
        const payload = this.isLogin 
          ? { username: this.form.username, password: this.form.password }
          : { username: this.form.username, email: this.form.email, password: this.form.password }
        
        const response = await axios.post(`http://localhost:3000${endpoint}`, payload)
        
        if (this.rememberMe && this.isLogin) {
          localStorage.setItem('rememberedUser', this.form.username)
        } else if (!this.rememberMe) {
          localStorage.removeItem('rememberedUser')
        }
        
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        this.$emit('auth-success', response.data.user)
        this.$router.push('/')
      } catch (error) {
        this.error = error.response?.data?.error || 'Произошла ошибка. Попробуйте позже.'
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    const rememberedUser = localStorage.getItem('rememberedUser')
    if (rememberedUser) {
      this.form.username = rememberedUser
      this.rememberMe = true
    }
  }
}
</script>

<style scoped>
.auth-wrapper {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
}

.auth-container {
  max-width: 500px;
  width: 100%;
  position: relative;
}

.auth-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.flower-decoration {
  position: absolute;
  font-size: 2rem;
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

.flower-decoration:nth-child(1) {
  top: -20px;
  left: -30px;
  animation-delay: 0s;
}

.flower-decoration:nth-child(2) {
  top: 20%;
  right: -40px;
  animation-delay: 1s;
}

.flower-decoration:nth-child(3) {
  bottom: -20px;
  left: 20%;
  animation-delay: 2s;
}

.flower-decoration:nth-child(4) {
  top: 60%;
  left: -30px;
  animation-delay: 1.5s;
}

.flower-decoration:nth-child(5) {
  bottom: 30%;
  right: -20px;
  animation-delay: 0.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
}

.auth-card {
  background: rgba(255, 248, 250, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(232, 99, 107, 0.2);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.auth-card:hover {
  transform: translateY(-5px);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-icon {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
  animation: bounce 1s ease infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.auth-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #e8636b;
  margin: 0.5rem 0;
}

.auth-subtitle {
  color: #c97b84;
  font-size: 0.9rem;
}

.auth-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  background: rgba(232, 99, 107, 0.1);
  border-radius: 50px;
  padding: 0.3rem;
}

.tab-btn {
  flex: 1;
  padding: 0.8rem;
  background: transparent;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #c97b84;
}

.tab-btn.active {
  background: linear-gradient(135deg, #e8636b 0%, #d64b54 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(232, 99, 107, 0.3);
}

.tab-btn.active span {
  filter: brightness(1);
}

.auth-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #e8636b;
  font-size: 0.9rem;
}

.label-icon {
  font-size: 1rem;
}

.auth-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #ffe0e5;
  border-radius: 15px;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  transition: all 0.3s ease;
  background: white;
}

.auth-input:focus {
  outline: none;
  border-color: #f0a1b1;
  box-shadow: 0 0 0 3px rgba(240, 161, 177, 0.2);
}

.password-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #c97b84;
  font-size: 0.9rem;
}

.remember-me input {
  cursor: pointer;
}

.forgot-password {
  color: #e8636b;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #d64b54;
}

.submit-btn {
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #e8636b 0%, #d64b54 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(232, 99, 107, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  margin-top: 1rem;
  padding: 0.8rem;
  background: #ffebee;
  color: #c62828;
  border-radius: 15px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.error-icon {
  font-size: 1.1rem;
}

.auth-footer {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #ffe0e5;
}

.auth-footer p {
  color: #c97b84;
  font-size: 0.9rem;
}

.link-btn {
  background: none;
  border: none;
  color: #e8636b;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.link-btn:hover {
  color: #d64b54;
}

.auth-info {
  margin-top: 1.5rem;
}

.info-card {
  background: rgba(255, 248, 250, 0.95);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 1rem;
  text-align: center;
}

.info-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  color: #e8636b;
  margin-bottom: 0.8rem;
}

.test-credentials {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.cred-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.cred-label {
  font-size: 0.75rem;
  color: #c97b84;
}

.cred-value {
  font-size: 0.85rem;
  color: #e8636b;
  font-weight: 600;
  background: rgba(232, 99, 107, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .auth-wrapper {
    padding: 1rem;
  }
  
  .auth-card {
    padding: 1.5rem;
  }
  
  .auth-header h2 {
    font-size: 1.5rem;
  }
  
  .auth-icon {
    font-size: 2.5rem;
  }
  
  .test-credentials {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .flower-decoration {
    font-size: 1rem;
  }
}
</style>
