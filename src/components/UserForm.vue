<template>
  <form role="form" @submit.prevent="submitHandler">
    <div class="form-group">
      <label for="firstName">Name</label>
      <input
        id="firstName"
        v-model="user.firstName"
        name="firstName"
        required
      />
    </div>
    <div class="form-group">
      <label for="lastName">Surname</label>
      <input id="lastName" v-model="user.lastName" name="lastName" required />
    </div>
    <div class="form-group">
      <button type="submit">{{ submitText }}</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "UserForm",
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
