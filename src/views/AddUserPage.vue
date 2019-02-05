<template>
  <div>
    <UserForm v-model="user"></UserForm>
    <div class="form-group">
      <button type="submit" @click="addUserToDB">Добавить</button>
    </div>
  </div>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import loader from "@/utils/backend.js";
import { API } from "@/utils/constants.js";

const DEFAULT_USER = {
  id: null,
  avatar: "",
  firstName: "",
  lastName: "",
  balance: "$0",
  phone: "",
  email: ""
};

export default {
  name: "AddUser",
  components: {
    UserForm
  },
  data: () => ({
    user: { ...DEFAULT_USER }
  }),
  methods: {
    addUserToDB() {
      loader(API.users, {
        data: this.user,
        method: "POST"
      }).then(() => this.$router.push({ path: "/" }));
    }
  }
};
</script>
