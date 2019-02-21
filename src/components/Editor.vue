<template>
  <vue-editor :value="about" @input="valueChanged" />
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "Editor",
  components: {
    VueEditor
  },
  model: {
    prop: "about"
  },
  props: {
    about: {
      type: String,
      required: true
    }
  },
  methods: {
    valueChanged(value) {
      this.$emit("input", value);
    }
  }
};
</script>
