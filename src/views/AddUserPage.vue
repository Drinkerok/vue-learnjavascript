<template>
  <div>
    <user-form
      :user="Object.assign({}, user)"
      :submitText="'Добавить'"
      @userChanged="addUserToDB"
    ></user-form>
  </div>
</template>

<script>
import UserForm from "@/components/UserForm";
import loader from "@/utils/backend";

export default {
  name: "addUser",
  components: {
    "user-form": UserForm
  },
  data: function() {
    return {
      user: {}
    };
  },
  methods: {
    addUserToDB: function(userData) {
      userData.id = (Date.now() + Math.random()).toString();

      const requestSettings = {
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": `application/json`
        },
        method: `POST`
      };

      loader(`http://localhost:3000/users`, requestSettings).then(
        () => (this.user = {})
      );
    }
  }
};
</script>
