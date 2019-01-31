<template>
  <div>
    <p v-if="!isLoaded">Loading...</p>
    <user-form
      v-else
      :user="Object.assign({}, user)"
      :submitText="'Сохранить'"
      @userChanged="editUserToDB"
    ></user-form>
  </div>
</template>

<script>
import UserForm from "@/components/UserForm";
import loader from "@/utils/backend";

export default {
  name: "editUser",
  components: {
    "user-form": UserForm
  },
  mounted: function() {
    loader(`http://localhost:3000/users/${this.$route.params.id}`).then(
      data => {
        this.user = data;
        this.isLoaded = true;
      }
    );
  },
  data: function() {
    return {
      user: {},
      isLoaded: false
    };
  },
  methods: {
    editUserToDB: function(userData) {
      const requestSettings = {
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": `application/json`
        },
        method: `PUT`
      };

      loader(`http://localhost:3000/users/${userData.id}`, requestSettings);
    }
  }
};
</script>
