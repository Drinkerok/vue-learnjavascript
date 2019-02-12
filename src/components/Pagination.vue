<template>
  <div class="pagination">
    <button
      type="button"
      :disabled="disabledPrev"
      @click="changePage(page - 1)"
    >
      &lt;
    </button>
    <ul class="pagination__list">
      <li v-for="i in pages" :key="`page_${i}`" class="pagination__item">
        <button
          class="pagination__button"
          type="button"
          :class="{
            'pagination__button--active': i === page
          }"
          @click="changePage(i)"
        >
          {{ i }}
        </button>
      </li>
    </ul>
    <button
      type="button"
      :disabled="disabledNext"
      @click="changePage(page + 1)"
    >
      &gt;
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  model: {
    prop: "page"
  },
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
  computed: {
    disabledPrev() {
      return this.page <= 1;
    },
    disabledNext() {
      return this.page >= this.pages;
    }
  },
  watch: {
    pages() {
      this.changePage(1);
    }
  },
  methods: {
    changePage(id) {
      if (this.page === id) {
        return;
      }
      this.$emit("input", id);
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
