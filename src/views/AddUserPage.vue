<template>
  <div>
    <UserForm v-model="user" />
    <div class="form-group">
      <button type="button" @click="addUserToDB">Добавить</button>
    </div>
  </div>
</template>

<script>
import loader from "@/utils/backend.js";
import { API } from "@/utils/constants.js";

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
    addUserToDB() {
      loader(API.users, {
        data: this.user,
        method: "POST"
      })
        .then(() => this.$router.push({ path: "/" }))
        .catch(err => alert(err.message));
    }
  }
};
</script>
