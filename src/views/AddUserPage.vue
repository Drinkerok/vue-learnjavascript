<template>
  <div>
    <user-form
      :user="user"
      submit-text="Добавить"
      @userChanged="addUserToDB"
    ></user-form>
  </div>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import loader from "@/utils/backend.js";
import { API } from "@/utils/constants.js";

export default {
  name: "AddUser",
  components: {
    "user-form": UserForm
  },
  data: function() {
    return {
      user: {}
    };
  },
  methods: {
    addUserToDB: function(data) {
      data.id = (Date.now() + Math.random()).toString();

      loader(API.users, {
        data,
        method: "POST"
      }).then(() => (this.user = {}));
    }
  }
};
</script>
