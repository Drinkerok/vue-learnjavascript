<template>
  <div>
    <UserForm v-model="user" />
    <div class="form-group">
      <button type="button" @click="addUser">Добавить</button>
    </div>
  </div>
</template>

<script>
const DEFAULT_USER = {
  id: null,
  avatar: "",
  firstName: "",
  lastName: "",
  balance: "$0",
  phone: "",
  email: "",
  about: "",
  registered: new Date().toLocaleDateString("ru"),
  picture: "",
  isActive: false
};

export default {
  name: "AddUser",
  components: {
    UserForm: () => import("@/components/UserForm.vue")
  },
  data: () => ({
    user: { ...DEFAULT_USER }
  }),
  methods: {
    addUser() {
      this.$store
        .dispatch({
          type: "addUser",
          user: { ...this.user }
        })
        .then(() => this.$router.push({ path: "/" }));
    }
  }
};
</script>
