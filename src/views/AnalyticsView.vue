<script setup>
import { Line, Bar, Doughnut } from 'vue-chartjs'
import { ref, computed, onMounted, watch } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend
)

const API_URL = 'http://localhost:8000/api/v1'

const summary = ref({ total_sales: 0, total_products: 0, low_stock_count: 0 })
const salesByMonth = ref([])
const stockByCategory = ref([])

const selectedMonth = ref('all')

const fetchAnalytics = async () => {
  try {
    const monthParam = selectedMonth.value === 'all' ? '' : `?month=${selectedMonth.value}`;
    
    const resSummary = await fetch(`${API_URL}/analytics/summary${monthParam}`)
    summary.value = await resSummary.json()

    const resSales = await fetch(`${API_URL}/analytics/sales_by_month${monthParam}`)
    salesByMonth.value = await resSales.json()

        const resStock = await fetch(`${API_URL}/analytics/stock_by_category${monthParam}`)
    stockByCategory.value = await resStock.json()
  } catch (error) {
    console.error('Ошибка при загрузке аналитики:', error)
    alert('Не удалось загрузить данные аналитики')
  }
}

// Функция скачивания Excel
const downloadExcel = () => {
  window.location.href = 'http://localhost:8000/api/v1/documents/stock_excel';
}

// Функция скачивания PDF
const downloadPdf = () => {
  window.location.href = 'http://localhost:8000/api/v1/documents/invoice/1';
}
onMounted(() => {
  fetchAnalytics()
})

// Следим за изменением фильтра и перезагружаем данные
watch(selectedMonth, () => {
  fetchAnalytics();
})
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' }
  }
}

// ИСПОЛЬЗУЕМ COMPUTED ДЛЯ ГРАФИКОВ!
const lineChartData = computed(() => ({
  labels: salesByMonth.value.map(item => item.month),
  datasets: [
    {
      label: 'Оборот (руб.)',
      backgroundColor: '#3b82f6',
      borderColor: '#2563eb',
      data: salesByMonth.value.map(item => item.total),
      tension: 0.3
    }
  ]
}))

const barChartData = computed(() => ({
  labels: stockByCategory.value.map(item => item.category),
  datasets: [
    {
      label: 'Кол-во на складе',
      backgroundColor: '#f59e0b',
      data: stockByCategory.value.map(item => item.total_stock)
    }
  ]
}))

const pieChartData = computed(() => ({
  labels: stockByCategory.value.map(item => item.category),
  datasets: [
    {
      backgroundColor: ['#ef4444', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'],
      data: stockByCategory.value.map(item => item.total_stock)
    }
  ]
}))
</script>

<template>
  <div class="analytics-page">
    <div class="header-section">
      <h2>Сводная аналитика</h2>
      
      <div class="header-controls">
        <!-- Фильтры -->
        <div class="filters">
          <select v-model="selectedMonth" class="filter-select">
            <option value="all">Все месяцы</option>
            <option v-for="item in salesByMonth" :key="item.month" :value="item.month">
              {{ item.month }}
            </option>
          </select>
        </div>

        <!-- Кнопки скачивания -->
        <div class="download-buttons">
          <button @click="downloadExcel" class="btn-download excel">Скачать Excel</button>
          <button @click="downloadPdf" class="btn-download pdf">Скачать PDF</button>
        </div>
      </div>
    </div>

    <!-- Карточки с цифрами -->
    <div class="summary-cards">
      <div class="card blue">
        <h3>Общая выручка</h3>
        <p>{{ summary.total_sales }} ₽</p>
      </div>
      <div class="card green">
        <h3>Всего товаров</h3>
        <p>{{ summary.total_products }} шт.</p>
      </div>
      <div class="card red">
        <h3>Товаров ниже нормы</h3>
        <p>{{ summary.low_stock_count }} шт.</p>
      </div>
    </div>

    <!-- Графики -->
    <div class="charts-grid">
      <div class="chart-container">
        <h4>Оборот по месяцам (Линейный)</h4>
        <div class="chart-wrapper">
          <Line :data="lineChartData" :options="chartOptions" />
        </div>
      </div>

      <div class="chart-container">
        <h4>Остатки по категориям (Столбчатый)</h4>
        <div class="chart-wrapper">
          <Bar :data="barChartData" :options="chartOptions" />
        </div>
      </div>

      <div class="chart-container">
        <h4>Структура остатков (Кольцевой)</h4>
        <div class="chart-wrapper">
          <Doughnut :data="pieChartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.analytics-page {
  max-width: 1200px;
  margin: 0 auto;
}
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.filter-select {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
}
.summary-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}
.card {
  padding: 20px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.card h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  opacity: 0.9;
}
.card p {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
}
.blue { background-color: #3b82f6; }
.green { background-color: #10b981; }
.red { background-color: #ef4444; }

.charts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
.chart-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border: 1px solid #eee;
}
.chart-container h4 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}
.chart-wrapper {
  height: 300px;
  position: relative;
}

@media (max-width: 768px) {
  .summary-cards {
    grid-template-columns: 1fr;
  }
}
.btn-download {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: white;
}
.btn-download.excel { background-color: #10b981; }
.btn-download.pdf { background-color: #ef4444; }
</style>