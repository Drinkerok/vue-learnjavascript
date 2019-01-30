<template>
  <div>
    <p v-if="!isLoaded">Loading...</p>
    <user-form v-else :user="user"></user-form>
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
  }
};
</script>
