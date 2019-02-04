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
      <user-form v-model="user"></user-form>
      <div class="form-group">
        <button type="submit">Сохранить</button>
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
    "user-form": UserForm
  },
  data: function() {
    return {
      user: null
    };
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
    backendUrl() {
      return `${API.users}/${this.userId}`;
    }
  },
  mounted() {
    loader(this.backendUrl).then(data => {
      this.user = data;
    });
  },
  methods: {
    editUserToDB() {
      loader(this.backendUrl, {
        data: this.user,
        method: "PUT"
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
    loader(this.backendUrl).then(data => {
      this.user = data;
    });
  }
};
</script>
