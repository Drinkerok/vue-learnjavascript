<template>
  <input v-model="search" type="text" />
</template>

<script>
export default {
  name: "SearchInput",
  model: {
    prop: "val"
  },
  props: {
    val: {
      type: String,
      required: true
    }
  },
  data: () => ({
    search: ""
  }),
  watch: {
    search: {
      handler() {
        this.$emit("input", this.search);
      }
    }
  },
  created() {
    this.search = this.val;
  }
};
</script>
