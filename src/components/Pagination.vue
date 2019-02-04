<template>
  <div class="pagination">
    <ul class="pagination__list">
      <li v-for="i in pages" :key="`page_${i}`" class="pagination__item">
        <button
          class="pagination__button"
          type="button"
          :class="{
            'pagination__button--active': i == page
          }"
          @click="changePage(i)"
        >
          {{ i }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pages: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    }
  },
  methods: {
    changePage(id) {
      this.$emit("changePage", id);
    }
  }
};
</script>

<style>
.pagination__list {
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
}

.pagination__item {
  margin-right: 5px;
}

.pagination__button {
  padding: 5px 10px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  cursor: pointer;
}
.pagination__button--active {
  background-color: #000;
  color: #fff;
  cursor: default;
}
</style>
