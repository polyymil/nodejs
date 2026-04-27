<template>
  <div class="container">
    <h1>📦 Управление заказами</h1>
    
    <!-- Кнопка добавления и статистика -->
    <div class="toolbar">
      <div class="stats-summary" v-if="stats">
        <span>📊 Всего заказов: {{ stats.total_orders }}</span>
        <span>💰 Общая выручка: {{ Math.round(stats.total_revenue) }} ₽</span>
        <span>📈 Средний чек: {{ Math.round(stats.avg_order_value) }} ₽</span>
      </div>
      <button v-if="isAdmin" class="btn-add" @click="openAddModal">+ Добавить заказ</button>
    </div>
    
    <!-- Сообщение об ошибке -->
    <div v-if="error" class="error-message">
      ⚠️ {{ error }}
      <button @click="loadData" class="retry-btn">Повторить</button>
    </div>

    <!-- Индикатор загрузки -->
    <div v-if="loading" class="loading">Загрузка данных...</div>

    <!-- Таблица заказов -->
    <div v-else-if="!error" class="table-container">
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Фото</th>
              <th>Клиент</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>Цветок</th>
              <th>Кол-во</th>
              <th>Сумма</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>
                <img :src="getOrderImage(order.id)" 
                     :alt="'Заказ ' + order.id" 
                     class="table-image"
                     @error="handleImageError">
              </td>
              <td><strong>{{ order.customer_name }}</strong></td>
              <td>{{ order.customer_email }}</td>
              <td>{{ order.customer_phone }}</td>
              <td>{{ order.flower_name || 'ID: ' + order.flower_id }}</td>
              <td>{{ order.quantity }} шт.</td>
              <td class="price">{{ order.total_price }} ₽</td>
              <td>
                <span :class="getStatusClass(order.order_status)" class="status-badge">
                  {{ getStatusText(order.order_status) }}
                </span>
              </td>
              <td class="actions-cell">
                <button class="btn-view" @click="viewOrder(order)" title="Просмотр">👁️</button>
                <button v-if="isAdmin" class="btn-edit" @click="openEditModal(order)" title="Редактировать">✏️</button>
                <button v-if="isAdmin" class="btn-delete" @click="deleteOrder(order.id)" title="Удалить">🗑️</button>
              </td>
            </tr>
            <tr v-if="orders.length === 0">
              <td colspan="10" style="text-align: center;">Нет данных о заказах</td>
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
    <Modal :isOpen="viewModalOpen" title="Просмотр заказа" @close="closeViewModal" :showSave="false">
      <div v-if="selectedOrder" class="view-details">
        <div class="view-image">
          <img :src="getOrderImage(selectedOrder.id)" :alt="'Заказ ' + selectedOrder.id" style="width: 100%; max-width: 300px; border-radius: 10px;">
        </div>
        <div class="view-info">
          <p><strong>ID заказа:</strong> {{ selectedOrder.id }}</p>
          <p><strong>Клиент:</strong> {{ selectedOrder.customer_name }}</p>
          <p><strong>Email:</strong> {{ selectedOrder.customer_email }}</p>
          <p><strong>Телефон:</strong> {{ selectedOrder.customer_phone }}</p>
          <p><strong>Цветок:</strong> {{ selectedOrder.flower_name || 'ID: ' + selectedOrder.flower_id }}</p>
          <p><strong>Количество:</strong> {{ selectedOrder.quantity }} шт.</p>
          <p><strong>Общая сумма:</strong> {{ selectedOrder.total_price }} ₽</p>
          <p><strong>Адрес доставки:</strong> {{ selectedOrder.delivery_address }}</p>
          <p><strong>Статус:</strong> {{ getStatusText(selectedOrder.order_status) }}</p>
          <p><strong>Дата заказа:</strong> {{ formatDate(selectedOrder.order_date) }}</p>
        </div>
      </div>
    </Modal>

    <!-- Модальное окно для добавления/редактирования -->
    <Modal :isOpen="modalOpen" :title="modalTitle" @close="closeModal" @save="saveOrder">
      <div class="form-group">
        <label>Имя клиента *</label>
        <input v-model="formData.customer_name" type="text" required>
      </div>
      <div class="form-group">
        <label>Email *</label>
        <input v-model="formData.customer_email" type="email" required>
      </div>
      <div class="form-group">
        <label>Телефон *</label>
        <input v-model="formData.customer_phone" type="text" required>
      </div>
      <div class="form-group">
        <label>Цветок</label>
        <select v-model="formData.flower_id">
          <option :value="null">Выберите цветок</option>
          <option v-for="flower in allFlowers" :key="flower.id" :value="flower.id">
            {{ flower.name }} - {{ flower.price }} ₽
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Количество *</label>
        <input v-model.number="formData.quantity" type="number" min="1" required>
      </div>
      <div class="form-group">
        <label>Общая сумма *</label>
        <input v-model.number="formData.total_price" type="number" step="0.01" required>
      </div>
      <div class="form-group">
        <label>Адрес доставки *</label>
        <textarea v-model="formData.delivery_address" rows="2" required></textarea>
      </div>
      <div class="form-group">
        <label>Статус заказа</label>
        <select v-model="formData.order_status">
          <option value="pending">⏳ В обработке</option>
          <option value="processing">🔄 Готовится</option>
          <option value="delivered">✅ Доставлен</option>
          <option value="cancelled">❌ Отменен</option>
        </select>
      </div>
      <div class="form-group">
        <label>URL фото</label>
        <input v-model="formData.image_url" type="text" placeholder="/uploads/1.jpg">
        <small>Оставьте пустым для случайного фото</small>
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
      orders: [],
      allFlowers: [],
      stats: null,
      loading: true,
      error: null,
      modalOpen: false,
      viewModalOpen: false,
      modalTitle: '',
      isEdit: false,
      editId: null,
      selectedOrder: null,
      isAdmin: false,
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 20,
      formData: {
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        flower_id: null,
        quantity: 1,
        total_price: 0,
        delivery_address: '',
        order_status: 'pending',
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
    await this.loadFlowers()
    await this.loadStats()
  },
  methods: {
    getRandomImage() {
      const randomNum = Math.floor(Math.random() * 15) + 1
      return `/uploads/${randomNum}.jpg`
    },
    
    getOrderImage(orderId) {
      const imageNumber = ((orderId - 1) % 15) + 1
      return `http://localhost:3000/uploads/${imageNumber}.jpg`
    },
    
    async loadData() {
      this.loading = true
      this.error = null
      
      try {
        const baseURL = 'http://localhost:3000'
        const response = await axios.get(`${baseURL}/api/orders/table`, {
          params: {
            page: this.currentPage,
            limit: this.itemsPerPage
          }
        })
        
        this.orders = response.data.data
        this.currentPage = response.data.currentPage
        this.totalPages = response.data.totalPages
        this.totalItems = response.data.totalItems
        console.log('Загружено заказов:', this.orders.length)
      } catch (error) {
        console.error('Ошибка загрузки заказов:', error)
        this.error = 'Не удалось загрузить данные. Проверьте подключение к серверу.'
      } finally {
        this.loading = false
      }
    },
    
    async loadStats() {
      try {
        const response = await axios.get('http://localhost:3000/api/orders/stats')
        this.stats = response.data
      } catch (error) {
        console.error('Ошибка загрузки статистики:', error)
      }
    },
    
    async loadFlowers() {
      try {
        const response = await axios.get('http://localhost:3000/api/flowers/all')
        this.allFlowers = response.data || []
      } catch (error) {
        console.error('Error fetching flowers:', error)
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
    
    viewOrder(order) {
      this.selectedOrder = order
      this.viewModalOpen = true
    },
    
    closeViewModal() {
      this.viewModalOpen = false
      this.selectedOrder = null
    },
    
    formatDate(date) {
      if (!date) return 'Нет данных'
      return new Date(date).toLocaleString('ru-RU')
    },
    
    openAddModal() {
      this.isEdit = false
      this.modalTitle = 'Добавить заказ'
      this.formData = {
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        flower_id: null,
        quantity: 1,
        total_price: 0,
        delivery_address: '',
        order_status: 'pending',
        image_url: this.getRandomImage()
      }
      this.modalOpen = true
    },
    
    openEditModal(order) {
      this.isEdit = true
      this.editId = order.id
      this.modalTitle = 'Редактировать заказ'
      this.formData = { ...order }
      this.modalOpen = true
    },
    
    async saveOrder() {
      if (!this.formData.customer_name || !this.formData.customer_email || !this.formData.delivery_address) {
        alert('Пожалуйста, заполните обязательные поля')
        return
      }
      
      if (!this.formData.image_url) {
        this.formData.image_url = this.getRandomImage()
      }
      
      const token = localStorage.getItem('token')
      
      try {
        if (this.isEdit) {
          await axios.put(`http://localhost:3000/api/orders/${this.editId}`, this.formData, {
            headers: { Authorization: `Bearer ${token}` }
          })
          alert('Заказ успешно обновлен')
        } else {
          await axios.post('http://localhost:3000/api/orders', this.formData, {
            headers: { Authorization: `Bearer ${token}` }
          })
          alert('Заказ успешно добавлен')
        }
        this.closeModal()
        await this.loadData()
        await this.loadStats()
      } catch (error) {
        console.error('Error saving order:', error)
        alert('Ошибка при сохранении: ' + (error.response?.data?.error || error.message))
      }
    },
    
    async deleteOrder(id) {
      if (confirm('Вы уверены, что хотите удалить этот заказ?')) {
        const token = localStorage.getItem('token')
        try {
          await axios.delete(`http://localhost:3000/api/orders/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          alert('Заказ успешно удален')
          await this.loadData()
          await this.loadStats()
        } catch (error) {
          console.error('Error deleting order:', error)
          alert('Ошибка при удалении: ' + (error.response?.data?.error || error.message))
        }
      }
    },
    
    getStatusText(status) {
      const statuses = {
        'pending': '⏳ В обработке',
        'processing': '🔄 Готовится',
        'delivered': '✅ Доставлен',
        'cancelled': '❌ Отменен'
      }
      return statuses[status] || status
    },
    
    getStatusClass(status) {
      return {
        'pending': 'status-pending',
        'processing': 'status-processing',
        'delivered': 'status-delivered',
        'cancelled': 'status-cancelled'
      }[status]
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

.actions-cell {
  white-space: nowrap;
  min-width: 110px;
}

.status-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
}

.status-pending { 
  background: #fff3e0;
  color: #ff9800;
  font-weight: bold;
}

.status-processing { 
  background: #e3f2fd;
  color: #2196f3;
  font-weight: bold;
}

.status-delivered { 
  background: #e8f5e9;
  color: #4caf50;
  font-weight: bold;
}

.status-cancelled { 
  background: #ffebee;
  color: #f44336;
  font-weight: bold;
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
  
  .status-badge {
    padding: 0.2rem 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
