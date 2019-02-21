<template>
  <div class="checkbox">
    <label class="checkbox__label">
      <input
        :value="value"
        v-bind="$attrs"
        type="checkbox"
        class="checkbox__input"
        @input="changeHandler($event.target.checked)"
      />
      <span class="checkbox__text">{{ text }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    changeHandler(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style>
.checkbox {
  padding: 10px 0;
}
.checkbox__input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}

.checkbox__text {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  display: block;
}

.checkbox__text:before {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: 1px solid #000;
}

.checkbox__text:after {
  content: none;
  display: block;
  position: absolute;
  top: calc(50% - 5px);
  left: 3px;
  width: 15px;
  height: 7px;
  border: 2px solid #000;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
}

.checkbox__input:checked ~ .checkbox__text:after {
  content: "";
}
</style>
