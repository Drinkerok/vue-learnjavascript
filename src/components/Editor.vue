<template>
  <vue-editor v-model="val"></vue-editor>
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
      default: ""
    }
  },
  data: () => ({
    val: ""
  }),
  watch: {
    val: {
      handler() {
        this.$emit("input", this.val);
      }
    }
  },
  created() {
    this.val = this.about;
  }
};
</script>
