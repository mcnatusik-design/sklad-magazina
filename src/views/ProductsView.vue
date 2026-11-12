<script setup>
import { ref, computed, onMounted } from 'vue'
import { getProducts } from '../api/products.js' // Импортируем функцию с сервера

const searchQuery = ref('')
const products = ref([]) // Теперь товары хранятся в ref

// Функция загрузки данных с сервера
const fetchProducts = async () => {
  try {
    products.value = await getProducts()
  } catch (error) {
    console.error(error)
    alert('Не удалось загрузить товары с сервера')
  }
}

// Вызываем загрузку при старте страницы
onMounted(() => {
  fetchProducts()
})

const filteredProducts = computed(() => {
  return products.value.filter(product => 
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <div class="products-page">
    <h2>Список товаров</h2>

    <div class="toolbar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Поиск по названию..." 
        class="search-input"
      >
      <button class="btn-add" @click="$router.push('/product/1')">+ Добавить товар</button>
    </div>

    <!-- Таблица товаров -->
    <div class="table-wrapper">
      <table class="products-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>ID Категории</th>
            <th>Цена (руб.)</th>
            <th>Остаток</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.category_id }}</td>
            <td>{{ product.price }}</td>
            <td :class="{ 'low-stock': product.current_stock <= product.min_stock }">
              {{ product.current_stock }}
            </td>
            <td>
              <button class="btn-edit">Ред.</button>
            </td>
          </tr>
          <tr v-if="filteredProducts.length === 0">
            <td colspan="5" style="text-align: center;">Товары не найдены или загружаются...</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<style scoped>
.products-page {
  max-width: 1000px;
  margin: 0 auto;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.search-input {
  padding: 8px 12px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn-add {
  background-color: #fbcfe8;
  border: 1px solid #000;
  padding: 8px 16px;
  cursor: pointer;
}
.table-wrapper {
  overflow-x: auto;
}
.products-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  min-width: 600px;
}
.products-table th, .products-table td {
  border: 1px solid #000;
  padding: 10px;
  text-align: left;
  white-space: nowrap;
}
.products-table th {
  background-color: #fef3c7;
}
.low-stock {
  color: red;
  font-weight: bold;
}
.btn-edit {
  cursor: pointer;
}
</style>