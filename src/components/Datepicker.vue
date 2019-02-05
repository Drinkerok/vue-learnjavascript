<template>
  <input ref="datepicker" v-model="date" />
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
    date: null,
    fp: null
  }),
  watch: {
    value: {
      handler() {
        this.updateCalendar();
      }
    }
  },
  mounted() {
    this.initCalendar();
  },
  created() {
    this.date = this.value;
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
