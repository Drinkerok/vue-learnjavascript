<template>
  <div>
    <div>
      <button type="button" :disabled="userId === 0" @click="prevUser">
        Предыдущий пользователь
      </button>
      <button type="button" @click="nextUser">Следующий пользователь</button>
    </div>
    <p v-if="error">Ошибочка</p>
    <p v-else-if="!user">Loading...</p>
    <form v-else @submit.prevent="editUser">
      <UserForm v-model="user" />
      <div class="form-group">
        <button type="submit">Сохранить</button>
        <button type="button" @click="deleteUser">Удалить</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditUser",
  components: {
    UserForm: () => import("@/components/UserForm.vue")
  },
  data: () => ({
    user: null,
    error: null,
    isValidated: true
  }),
  computed: {
    userId() {
      return +this.$route.params.id;
    }
  },
  watch: {
    $route: "changeUserHandler"
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.user = this.$store.getters.getUserById(this.userId);
      this.error = !this.user;
    },
    editUser() {
      this.$validator.validateAll();
      if (this.errors.any()) {
        alert("Не все поля заполнены!");
        return;
      }

      this.$store
        .dispatch({
          type: "editUser",
          user: { ...this.user }
        })
        .then(() => this.$router.push({ path: "/" }));
    },
    deleteUser() {
      this.$store.dispatch({
        type: "deleteUser",
        id: this.userId
      });
    },
    changeUser(id) {
      this.$router.push({ ...this.$route, params: { id } });
    },
    prevUser() {
      this.changeUser(this.userId - 1);
    },
    nextUser() {
      this.changeUser(this.userId + 1);
    },
    changeUserHandler() {
      this.user = null;
      this.getUser();
    }
  }
};
</script>
