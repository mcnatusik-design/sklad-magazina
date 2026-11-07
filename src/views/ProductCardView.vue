<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  category: '',
  price: '',
  stock: ''
})

const errors = ref({
  name: '',
  price: '',
  stock: ''
})

const validateForm = () => {
  let isValid = true
  
  // Сброс ошибок
  errors.value = { name: '', price: '', stock: '' }

  // Проверка названия (минимум 3 символа)
  if (form.value.name.length < 3) {
    errors.value.name = 'Название должно быть не менее 3 символов'
    isValid = false
  }

  // Проверка цены (не может быть отрицательной или пустой)
  if (!form.value.price || form.value.price < 0) {
    errors.value.price = 'Цена должна быть положительным числом'
    isValid = false
  }

  // Проверка остатка (не может быть отрицательным)
  if (form.value.stock < 0) {
    errors.value.stock = 'Остаток не может быть отрицательным'
    isValid = false
  }

  if (isValid) {
    alert('Товар успешно сохранен! (Это тестовая форма)')
  }
}
</script>

<template>
  <div class="card-page">
    <h2>Карточка товара (Создание)</h2>

    <div class="form-container">
      <!-- Название -->
      <div class="form-group">
        <label>Название товара</label>
        <input v-model="form.name" type="text" placeholder="Введите название">
        <span class="error-text" v-if="errors.name">{{ errors.name }}</span>
      </div>

      <!-- Категория -->
      <div class="form-group">
        <label>Категория</label>
        <select v-model="form.category">
          <option value="" disabled>Выберите из списка</option>
          <option value="Молочные продукты">Молочные продукты</option>
          <option value="Хлебобулочные">Хлебобулочные</option>
          <option value="Бакалея">Бакалея</option>
          <option value="Фрукты">Фрукты</option>
        </select>
      </div>

      <!-- Цена -->
      <div class="form-group">
        <label>Цена (руб.)</label>
        <input v-model="form.price" type="number" placeholder="0">
        <span class="error-text" v-if="errors.price">{{ errors.price }}</span>
      </div>

      <!-- Остаток -->
      <div class="form-group">
        <label>Начальный остаток</label>
        <input v-model="form.stock" type="number" placeholder="0">
        <span class="error-text" v-if="errors.stock">{{ errors.stock }}</span>
      </div>

      <!-- Кнопки -->
      <div class="form-actions">
        <button class="btn-save" @click="validateForm">Сохранить</button>
        <button class="btn-cancel" @click="$router.push('/products')">Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-page {
  max-width: 600px;
  margin: 0 auto;
}
.form-container {
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.form-group label {
  width: 150px;
  font-weight: bold;
}
.form-group input, .form-group select {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.error-text {
  color: red;
  font-size: 12px;
  position: absolute;
  margin-top: 35px;
  margin-left: 160px;
}
.form-actions {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  padding-left: 150px;
}
.btn-save {
  background-color: #e9d5ff; /* Фиолетовый, как на макете */
  border: 1px solid #000;
  padding: 10px 20px;
  cursor: pointer;
}
.btn-cancel {
  background-color: #fef08a; /* Желтый, как на макете */
  border: 1px solid #000;
  padding: 10px 20px;
  cursor: pointer;
}
</style>