<template>
  <div>
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
    userId: function() {
      return this.$route.params.id;
    },
    backendUrl: function() {
      return `${API.users}/${this.userId}`;
    }
  },
  mounted: function() {
    loader(this.backendUrl).then(data => {
      this.user = data;
    });
  },
  methods: {
    editUserToDB: function() {
      loader(this.backendUrl, {
        data: this.user,
        method: "PUT"
      }).then(() => this.$router.push({ path: "/" }));
    }
  }
};
</script>
