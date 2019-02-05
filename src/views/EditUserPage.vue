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
      <UserForm v-model="user"></UserForm>
      <div class="form-group">
        <button type="submit">Сохранить</button>
        <button type="button" @click="deleteUser">Удалить</button>
      </div>
    </form>
  </div>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import loader from "@/utils/backend.js";
import { API } from "@/utils/constants.js";

export default {
  name: "EditUser",
  components: {
    UserForm
  },
  data: () => ({
    user: null
  }),
  computed: {
    userId() {
      return this.$route.params.id;
    },
    userUrl() {
      return `${API.users}/${this.userId}`;
    }
  },
  mounted() {
    loader(this.userUrl).then(data => {
      this.user = data;
    });
  },
  methods: {
    editUserToDB() {
      loader(this.userUrl, {
        data: this.user,
        method: "PUT"
      }).then(() => this.$router.push({ path: "/" }));
    },
    deleteUser() {
      loader(this.userUrl, {
        method: "DELETE"
      }).then(() => this.$router.push({ path: "/" }));
    },
    prevUser() {
      this.$router.push({ ...this.$route, params: { id: +this.userId - 1 } });
    },
    nextUser() {
      this.$router.push({ ...this.$route, params: { id: +this.userId + 1 } });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.user = null;
    next();
    loader(this.userUrl).then(data => {
      this.user = data;
    });
  }
};
</script>
