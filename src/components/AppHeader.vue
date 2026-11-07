<template>
  <header class="header">
    <div class="logo">Магазин "У дома"</div>
    <nav class="nav">
      <router-link to="/products">Товары</router-link>
      <router-link to="/supplies">Поставки</router-link>
      <router-link to="/analytics">Аналитика</router-link>
      <router-link to="/" class="logout">Выход</router-link>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e0e7ff;
  padding: 15px 30px;
  border-bottom: 1px solid #000;
}
.logo {
  font-weight: bold;
  font-size: 18px;
}
.nav {
  display: flex;
  gap: 20px;
}
.nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}
.nav a:hover {
  color: #000;
  text-decoration: underline;
}
.logout {
  margin-left: 20px;
}
@media (max-width: 600px) {
  .header {
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
  .nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
}

</style>