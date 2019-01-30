<template>
  <div>
    <user-form :user="user"></user-form>
  </div>
</template>

<script>
import UserForm from "@/components/UserForm";

export default {
  name: "editUser",
  components: {
    "user-form": UserForm
  },
  data: function() {
    return {
      user: {}
    };
  }
};
</script>
