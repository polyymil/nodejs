<template>
  <div class="container">
    <h1>🌸 Каталог цветов</h1>
    
    <!-- Кнопка добавления и статистика -->
    <div class="toolbar">
      <div class="stats-summary" v-if="stats">
        <span>📊 Всего: {{ stats.total }} цветов</span>
        <span>💰 Средняя цена: {{ Math.round(stats.avg_price) }} ₽</span>
        <span>📦 В наличии: {{ stats.total_stock }} шт.</span>
      </div>
      <button v-if="isAdmin" class="btn-add" @click="openAddModal">+ Добавить цветок</button>
    </div>
    
    <!-- Сообщение об ошибке -->
    <div v-if="error" class="error-message">
      ⚠️ {{ error }}
      <button @click="loadData" class="retry-btn">Повторить</button>
    </div>

    <!-- Индикатор загрузки -->
    <div v-if="loading" class="loading">Загрузка данных...</div>

    <!-- Таблица цветов -->
    <div v-else-if="!error" class="table-container">
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Фото</th>
              <th>Название</th>
              <th>Латинское название</th>
              <th>Цена (₽)</th>
              <th>В наличии</th>
              <th>Цвет</th>
              <th>Сезон</th>
              <th>Описание</th>
              <th>Дата создания</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="flower in flowers" :key="flower.id">
              <td>{{ flower.id }}</td>
              <td>
                <img :src="getFlowerImage(flower.id)" 
                     :alt="flower.name" 
                     class="table-image"
                     @error="handleImageError">
              </td>
              <td><strong>{{ flower.name }}</strong></td>
              <td><em>{{ flower.latin_name || '-' }}</em></td>
              <td class="price">{{ flower.price }} ₽</td>
              <td>{{ flower.stock_quantity || 0 }} шт.</td>
              <td>{{ flower.color || '-' }}</td>
              <td>{{ flower.season || '-' }}</td>
              <td class="description-cell">{{ flower.description || '-' }}</td>
              <td>{{ formatDate(flower.created_at) }}</td>
              <td class="actions-cell">
                <button class="btn-view" @click="viewFlower(flower)" title="Просмотр">👁️</button>
                <button v-if="isAdmin" class="btn-edit" @click="openEditModal(flower)" title="Редактировать">✏️</button>
                <button v-if="isAdmin" class="btn-delete" @click="deleteFlower(flower.id)" title="Удалить">🗑️</button>
              </td>
            </tr>
            <tr v-if="flowers.length === 0">
              <td colspan="11" style="text-align: center;">Нет данных о цветах</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Компонент пагинации -->
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-items="totalItems"
        :items-per-page="itemsPerPage"
        @page-changed="handlePageChange"
        @per-page-changed="handlePerPageChange"
      />
    </div>

    <!-- Модальное окно для просмотра -->
    <Modal :isOpen="viewModalOpen" title="Просмотр цветка" @close="closeViewModal" :showSave="false">
      <div v-if="selectedFlower" class="view-details">
        <div class="view-image">
          <img :src="getFlowerImage(selectedFlower.id)" :alt="selectedFlower.name" style="width: 100%; max-width: 300px; border-radius: 10px;">
        </div>
        <div class="view-info">
          <p><strong>ID:</strong> {{ selectedFlower.id }}</p>
          <p><strong>Название:</strong> {{ selectedFlower.name }}</p>
          <p><strong>Латинское название:</strong> {{ selectedFlower.latin_name || '-' }}</p>
          <p><strong>Цена:</strong> {{ selectedFlower.price }} ₽</p>
          <p><strong>В наличии:</strong> {{ selectedFlower.stock_quantity || 0 }} шт.</p>
          <p><strong>Цвет:</strong> {{ selectedFlower.color || '-' }}</p>
          <p><strong>Сезон:</strong> {{ selectedFlower.season || '-' }}</p>
          <p><strong>Описание:</strong> {{ selectedFlower.description || 'Нет описания' }}</p>
          <p><strong>Дата создания:</strong> {{ formatDate(selectedFlower.created_at) }}</p>
        </div>
      </div>
    </Modal>

    <!-- Модальное окно для добавления/редактирования -->
    <Modal :isOpen="modalOpen" :title="modalTitle" @close="closeModal" @save="saveFlower">
      <div class="form-group">
        <label>Название цветка *</label>
        <input v-model="formData.name" type="text" required>
      </div>
      <div class="form-group">
        <label>Латинское название</label>
        <input v-model="formData.latin_name" type="text">
      </div>
      <div class="form-group">
        <label>Цена *</label>
        <input v-model.number="formData.price" type="number" step="0.01" required>
      </div>
      <div class="form-group">
        <label>Количество в наличии</label>
        <input v-model.number="formData.stock_quantity" type="number">
      </div>
      <div class="form-group">
        <label>Цвет</label>
        <input v-model="formData.color" type="text" placeholder="Например: Красный, Белый, Желтый">
      </div>
      <div class="form-group">
        <label>Сезон цветения</label>
        <select v-model="formData.season">
          <option value="">Выберите сезон</option>
          <option value="Весна">Весна</option>
          <option value="Лето">Лето</option>
          <option value="Осень">Осень</option>
          <option value="Зима">Зима</option>
          <option value="Круглый год">Круглый год</option>
        </select>
      </div>
      <div class="form-group">
        <label>Описание</label>
        <textarea v-model="formData.description" rows="3" placeholder="Краткое описание цветка..."></textarea>
      </div>
      <div class="form-group">
        <label>URL фото</label>
        <input v-model="formData.image_url" type="text" placeholder="/uploads/1.jpg">
        <small>Оставьте пустым для случайного фото (1-15.jpg)</small>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import Modal from '../components/Modal.vue'
import Pagination from '../components/Pagination.vue'

export default {
  components: { Modal, Pagination },
  data() {
    return {
      flowers: [],
      stats: null,
      loading: true,
      error: null,
      modalOpen: false,
      viewModalOpen: false,
      modalTitle: '',
      isEdit: false,
      editId: null,
      selectedFlower: null,
      isAdmin: false,
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 20,
      formData: {
        name: '',
        latin_name: '',
        price: 0,
        stock_quantity: 0,
        color: '',
        season: '',
        description: '',
        image_url: ''
      }
    }
  },
  async mounted() {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      this.isAdmin = userData.role === 'admin'
    }
    await this.loadData()
    await this.loadStats()
  },
  methods: {
    getRandomImage() {
      const randomNum = Math.floor(Math.random() * 15) + 1
      return `/uploads/${randomNum}.jpg`
    },
    
    getFlowerImage(flowerId) {
      const imageNumber = ((flowerId - 1) % 15) + 1
      return `http://localhost:3000/uploads/${imageNumber}.jpg`
    },
    
    async loadData() {
      this.loading = true
      this.error = null
      
      try {
        const baseURL = 'http://localhost:3000'
        const response = await axios.get(`${baseURL}/api/flowers/table`, {
          params: {
            page: this.currentPage,
            limit: this.itemsPerPage
          }
        })
        
        this.flowers = response.data.data
        this.currentPage = response.data.currentPage
        this.totalPages = response.data.totalPages
        this.totalItems = response.data.totalItems
        console.log('Загружено цветов:', this.flowers.length)
      } catch (error) {
        console.error('Ошибка загрузки данных:', error)
        this.error = 'Не удалось загрузить данные. Проверьте подключение к серверу.'
      } finally {
        this.loading = false
      }
    },
    
    async loadStats() {
      try {
        const response = await axios.get('http://localhost:3000/api/flowers/stats')
        this.stats = response.data
      } catch (error) {
        console.error('Ошибка загрузки статистики:', error)
      }
    },
    
    handlePageChange(page) {
      this.currentPage = page
      this.loadData()
    },
    
    handlePerPageChange(perPage) {
      this.itemsPerPage = perPage
      this.currentPage = 1
      this.loadData()
    },
    
    viewFlower(flower) {
      this.selectedFlower = flower
      this.viewModalOpen = true
    },
    
    closeViewModal() {
      this.viewModalOpen = false
      this.selectedFlower = null
    },
    
    formatDate(date) {
      if (!date) return 'Нет данных'
      return new Date(date).toLocaleString('ru-RU')
    },
    
    openAddModal() {
      this.isEdit = false
      this.modalTitle = 'Добавить цветок'
      this.formData = {
        name: '',
        latin_name: '',
        price: 0,
        stock_quantity: 0,
        color: '',
        season: '',
        description: '',
        image_url: this.getRandomImage()
      }
      this.modalOpen = true
    },
    
    openEditModal(flower) {
      this.isEdit = true
      this.editId = flower.id
      this.modalTitle = 'Редактировать цветок'
      this.formData = { ...flower }
      this.modalOpen = true
    },
    
    async saveFlower() {
      if (!this.formData.name || !this.formData.price) {
        alert('Пожалуйста, заполните обязательные поля (Название и Цена)')
        return
      }
      
      if (!this.formData.image_url) {
        this.formData.image_url = this.getRandomImage()
      }
      
      const token = localStorage.getItem('token')
      
      try {
        if (this.isEdit) {
          await axios.put(`http://localhost:3000/api/flowers/${this.editId}`, this.formData, {
            headers: { Authorization: `Bearer ${token}` }
          })
          alert('Цветок успешно обновлен')
        } else {
          await axios.post('http://localhost:3000/api/flowers', this.formData, {
            headers: { Authorization: `Bearer ${token}` }
          })
          alert('Цветок успешно добавлен')
        }
        this.closeModal()
        await this.loadData()
        await this.loadStats()
      } catch (error) {
        console.error('Error saving flower:', error)
        alert('Ошибка при сохранении: ' + (error.response?.data?.error || error.message))
      }
    },
    
    async deleteFlower(id) {
      if (confirm('Вы уверены, что хотите удалить этот цветок?')) {
        const token = localStorage.getItem('token')
        try {
          await axios.delete(`http://localhost:3000/api/flowers/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          alert('Цветок успешно удален')
          await this.loadData()
          await this.loadStats()
        } catch (error) {
          console.error('Error deleting flower:', error)
          alert('Ошибка при удалении: ' + (error.response?.data?.error || error.message))
        }
      }
    },
    
    closeModal() {
      this.modalOpen = false
      this.formData = {}
    },
    
    handleImageError(e) {
      e.target.src = 'https://via.placeholder.com/50x50?text=No+Image'
    }
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.stats-summary {
  display: flex;
  gap: 1rem;
  background: rgba(255, 248, 250, 0.95);
  backdrop-filter: blur(5px);
  padding: 0.6rem 1.2rem;
  border-radius: 15px;
  color: #e8636b;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(232, 99, 107, 0.1);
}

.stats-summary span {
  font-size: 0.9rem;
}

.description-cell {
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.4;
}

.actions-cell {
  white-space: nowrap;
  min-width: 110px;
}

.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
}

.retry-btn {
  margin-left: 1rem;
  padding: 0.3rem 0.8rem;
  background: #c62828;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #b71c1c;
  transform: translateY(-2px);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #e8636b;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.6rem;
  border: 2px solid #ffe0e5;
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: 'Montserrat', sans-serif;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #f0a1b1;
  box-shadow: 0 0 0 3px rgba(240, 161, 177, 0.2);
}

.form-group small {
  display: block;
  margin-top: 0.3rem;
  color: #c97b84;
  font-size: 0.8rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #e8636b;
  font-weight: 500;
}

.view-details {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.view-image {
  flex: 1;
  min-width: 200px;
}

.view-info {
  flex: 2;
}

.view-info p {
  margin: 0.5rem 0;
  line-height: 1.5;
  color: #5a3a3a;
}

.view-info strong {
  color: #e8636b;
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .stats-summary {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .description-cell {
    max-width: 150px;
  }
}
</style>
