<template>
  <div>
    <button type="button" @click="historyMove(-1)">Назад</button>
    <button type="button" @click="historyMove(1)">Вперед</button>
  </div>
</template>

<script>
export default {
  name: "HistoryNav",
  methods: {
    historyMove(step) {
      this.$router.go(step);
    }
  }
};
</script>
