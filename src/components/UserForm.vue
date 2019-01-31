<template>
  <form role="form" @submit.prevent="submitHandler">
    <div class="form-group">
      <label for="firstName">Name</label>
      <input
        id="firstName"
        name="firstName"
        v-model="user.firstName"
        required
      />
    </div>
    <div class="form-group">
      <label for="lastName">Surname</label>
      <input id="lastName" name="lastName" v-model="user.lastName" required />
    </div>
    <div class="form-group">
      <button type="submit">{{ submitText }}</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "user-form",
  props: {
    user: {
      type: Object,
      required: true
    },
    submitText: {
      type: String,
      default: "Отправить"
    }
  },
  methods: {
    submitHandler: function() {
      this.$emit("userChanged", this.user);
    }
  }
};
</script>
