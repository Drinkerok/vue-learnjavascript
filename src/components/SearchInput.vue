<template>
  <input
    :value="search"
    type="text"
    placeholder="Search by surname"
    @input="updateSearchQuery($event.target.value)"
  />
</template>

<script>
export default {
  name: "SearchInput",
  model: {
    prop: "search"
  },
  props: {
    search: {
      type: String,
      required: true
    }
  },
  methods: {
    updateSearchQuery(value) {
      this.$emit("input", value.trim());
    }
  }
};
</script>
