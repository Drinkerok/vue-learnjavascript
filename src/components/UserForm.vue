<template>
  <div>
    <div class="form-group">
      <label for="firstName">Name</label>
      <input
        id="firstName"
        v-model="localUser.firstName"
        name="firstName"
        required
      />
    </div>
    <div class="form-group">
      <label for="lastName">Surname</label>
      <input
        id="lastName"
        v-model="localUser.lastName"
        name="lastName"
        required
      />
    </div>
    <div class="form-group">
      <label for="lastName">Balance</label>
      <input id="balance" v-model="localUser.balance" name="balance" />
    </div>
    <div class="form-group">
      <label for="lastName">Phone</label>
      <input id="phone" v-model="localUser.phone" name="phone" />
    </div>
    <div class="form-group">
      <label for="lastName">Email</label>
      <input id="email" v-model="localUser.email" name="email" />
    </div>
  </div>
</template>

<script>
export default {
  name: "UserForm",
  model: {
    prop: "user"
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    localUser: null
  }),
  watch: {
    localUser: {
      deep: true,
      handler() {
        this.$emit("input", this.localUser);
      }
    }
  },
  created() {
    this.localUser = Object.assign({}, this.user);
  }
};
</script>
