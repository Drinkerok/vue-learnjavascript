<template>
  <input ref="datepicker" :value="value" />
</template>

<script>
import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "Datepicker",
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data: () => ({
    fp: null
  }),
  watch: {
    value() {
      this.updateCalendar();
    }
  },
  mounted() {
    this.initCalendar();
  },
  beforeDestroy() {
    this.fp.destroy();
  },
  methods: {
    initCalendar() {
      this.fp = flatpickr(this.$refs.datepicker, {
        locale: Russian,
        dateFormat: "d.m.Y",
        onChange: (selectedDates, dateStr) => {
          this.$emit("input", dateStr);
        }
      });
    },
    updateCalendar() {
      this.fp.setDate(this.value);
    }
  }
};
</script>
