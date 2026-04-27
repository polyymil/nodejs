<template>
  <div class="pagination-container">
    <div class="pagination-info">
      Показано {{ startItem }} - {{ endItem }} из {{ totalItems }} записей
    </div>
    <div class="pagination-controls">
      <button 
        @click="changePage(1)" 
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        ⏮️ Первая
      </button>
      <button 
        @click="changePage(currentPage - 1)" 
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        ◀ Предыдущая
      </button>
      
      <div class="page-numbers">
        <button
          v-for="page in displayedPages"
          :key="page"
          @click="changePage(page)"
          :class="['page-number', { active: page === currentPage }]"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        @click="changePage(currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        Следующая ▶
      </button>
      <button 
        @click="changePage(totalPages)" 
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        Последняя ⏭️
      </button>
    </div>
    <div class="pagination-per-page">
      <label>Показывать на странице:</label>
      <select :value="itemsPerPage" @change="changeItemsPerPage">
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    startItem() {
      return (this.currentPage - 1) * this.itemsPerPage + 1
    },
    endItem() {
      const end = this.currentPage * this.itemsPerPage
      return end > this.totalItems ? this.totalItems : end
    },
    displayedPages() {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2))
      let end = Math.min(this.totalPages, start + maxVisible - 1)
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.$emit('page-changed', page)
      }
    },
    changeItemsPerPage(event) {
      const newValue = parseInt(event.target.value)
      this.$emit('per-page-changed', newValue)
    }
  }
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(255, 248, 250, 0.95);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(232, 99, 107, 0.1);
}

.pagination-info {
  color: #c97b84;
  font-size: 0.9rem;
  font-weight: 500;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pagination-btn {
  padding: 0.4rem 0.8rem;
  background: white;
  border: 2px solid #ffe0e5;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: #e8636b;
  font-weight: 500;
}

.pagination-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #e8636b 0%, #d64b54 100%);
  color: white;
  border-color: #e8636b;
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.3rem;
}

.page-number {
  padding: 0.4rem 0.8rem;
  background: white;
  border: 2px solid #ffe0e5;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 2rem;
  text-align: center;
  color: #e8636b;
  font-weight: 500;
}

.page-number:hover {
  background: #f8b4c2;
  color: white;
  border-color: #f8b4c2;
  transform: translateY(-2px);
}

.page-number.active {
  background: linear-gradient(135deg, #e8636b 0%, #d64b54 100%);
  color: white;
  border-color: #e8636b;
}

.pagination-per-page {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-per-page label {
  color: #c97b84;
  font-size: 0.9rem;
  font-weight: 500;
}

.pagination-per-page select {
  padding: 0.3rem 0.6rem;
  border: 2px solid #ffe0e5;
  border-radius: 25px;
  cursor: pointer;
  background: white;
  color: #e8636b;
  font-weight: 500;
  transition: all 0.3s ease;
}

.pagination-per-page select:hover {
  border-color: #e8636b;
}

@media (max-width: 768px) {
  .pagination-container {
    flex-direction: column;
    align-items: center;
  }
  
  .pagination-controls {
    justify-content: center;
  }
}
</style>
