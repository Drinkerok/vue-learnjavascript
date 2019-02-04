<template>
  <div class="container">
    <div id="app">
      <history></history>
      <nav class="navigation">
        <ul class="navigation__list">
          <li class="navigation__item">
            <router-link to="/" class="navigation__link">Home</router-link>
          </li>
          <li class="navigation__item">
            <router-link to="/add" class="navigation__link">Add</router-link>
          </li>
        </ul>
      </nav>
      <router-view />
    </div>
  </div>
</template>

<script>
import HistoryNav from "@/components/HistoryNav.vue";

export default {
  name: "App",
  components: {
    history: HistoryNav
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.navigation {
  background-color: #f2f2f2;
}

.navigation__list {
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.navigation__item {
  margin-right: 10px;
}

.navigation__link {
  display: block;
  border: 1px solid #000;
  padding: 10px;
  color: #000;
}
.navigation__link:hover,
.navigation__link:focus,
.navigation__link:active {
  text-decoration: none;
  color: #000;
}
.navigation__link--active {
  color: #fff;
  background-color: #000;
}
.navigation__link--active:hover,
.navigation__link--active:focus,
.navigation__link--active:active {
  color: #fff;
}
</style>
