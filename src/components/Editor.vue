<template>
  <vue-editor v-model="val" />
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
  data: () => ({
    val: ""
  }),
  watch: {
    about() {
      if (this.about !== this.val) this.createLoacalValue();
    },
    val() {
      this.$emit("input", this.val);
    }
  },
  created() {
    this.createLoacalValue();
  },
  methods: {
    createLoacalValue() {
      this.val = this.about;
    }
  }
};
</script>
