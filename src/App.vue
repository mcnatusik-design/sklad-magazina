<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="app-container">
    <AppHeader />
    
    <main class="main-content">
      <router-view></router-view>
    </main>

    <AppFooter />
  </div>
</template>

<style>
/* Сброс отступов и базовые настройки */
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f9fafb;
}
/* Прижимаем подвал к низу */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1; /* Занимает всё свободное место */
  padding: 20px;
}
</style>