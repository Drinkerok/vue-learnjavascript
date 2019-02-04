<template>
  <select v-model="localCount">
    <option v-for="count in counts" :key="count" :value="count">{{
      count
    }}</option>
  </select>
</template>

<script>
const DEFAULT_COUNTS = [5, 10, 15];

export default {
  name: "UsersPerPage",
  model: {
    prop: "count"
  },
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    localCount: null,
    counts: DEFAULT_COUNTS
  }),
  watch: {
    localCount: {
      handler() {
        this.$emit("input", this.localCount);
      }
    }
  },
  created() {
    this.localCount = this.count;
  }
};
</script>
