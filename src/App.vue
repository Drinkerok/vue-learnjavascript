<template>
  <div class="container">
    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/add">Add</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script></script>

<style>
@import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
</style>
