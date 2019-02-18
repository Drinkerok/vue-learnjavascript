<template>
  <div>
    <div>
      <button type="button" :disabled="userId === 0" @click="prevUser">
        Предыдущий пользователь
      </button>
      <button type="button" @click="nextUser">Следующий пользователь</button>
    </div>
    <p v-if="!user">Loading...</p>
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
      this.user = null;
      loader(this.userUrl)
        .then(data => {
          this.user = data;
        })
        .catch(err => alert(err.message));
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
        .catch(this.networkError);
    },
    routeToMain() {
      this.$router.push({ path: "/" });
    },
    networkError(err) {
      alert(err.message);
    },
    editUserToDB() {
      if (!this.isValidated) return;

      loader(this.userUrl, {
        data: this.user,
        method: "PUT"
      })
        .then(this.routeToMain)
        .catch(this.networkError);
    },
    deleteUser() {
      loader(this.userUrl, {
        method: "DELETE"
      })
        .then(this.routeToMain)
        .catch(this.networkError);
    },
    changeUser(id) {
      this.$router.push({ ...this.$route, params: { id } });
    },
    prevUser() {
      this.changeUser(this.userId - 1);
    },
    nextUser() {
      this.changeUser(this.userId + 1);
    }
  }
};
</script>
