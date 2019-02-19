<template>
  <div>
    <div>
      <button type="button" :disabled="userId === 0" @click="prevUser">
        Предыдущий пользователь
      </button>
      <button type="button" @click="nextUser">Следующий пользователь</button>
    </div>
    <p v-if="error">{{ error }}</p>
    <p v-else-if="!user">Loading...</p>
    <form v-else @submit.prevent="editUserToDB">
      <UserForm v-model="user" />
      <div class="form-group">
        <button type="submit">Сохранить</button>
        <button type="button" @click="deleteUser">Удалить</button>
      </div>
    </form>
  </div>
</template>

<script>
import loader from "@/utils/backend.js";
import { API } from "@/utils/constants.js";

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
    },
    userUrl() {
      return `${API.users}/${this.userId}`;
    }
  },
  watch: {
    $route() {
      this.changeUserHandler();
    }
  },
  mounted() {
    this.loadUser();
  },
  methods: {
    loadUser() {
      loader(this.userUrl)
        .then(data => {
          this.user = data;
        })
        .catch(this.setError);
    },
    routeToMain() {
      this.$router.push({ path: "/" });
    },
    setError(err) {
      this.error = err.message;
    },
    editUserToDB() {
      if (!this.isValidated) return;

      loader(this.userUrl, {
        data: this.user,
        method: "PUT"
      })
        .then(this.routeToMain)
        .catch(this.setError);
    },
    deleteUser() {
      loader(this.userUrl, {
        method: "DELETE"
      })
        .then(this.routeToMain)
        .catch(this.setError);
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
      loader(this.userUrl)
        .then(data => {
          this.user = data;
        })
        .catch(err => alert(err.message));
    }
  }
};
</script>
