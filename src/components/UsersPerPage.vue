<template>
  <select :value="count" @input="changeOption($event.target.value)">
    <option v-for="val in countOptions" :key="val" :value="val">
      {{ val }}
    </option>
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
    },
    countOptions: {
      type: Array,
      default: () => DEFAULT_COUNTS
    }
  },
  methods: {
    changeOption(value) {
      this.$emit("input", +value);
    }
  }
};
</script>
