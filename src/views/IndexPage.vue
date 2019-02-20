<template>
  <p v-if="!haveUsers">Loading...</p>
  <UserTable v-else :users="users" @userDeleted="deleteUser" />
</template>

<script>
export default {
  name: "IndexPage",
  components: {
    UserTable: () => import("@/components/UserTable.vue")
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    haveUsers() {
      return this.users.length !== 0;
    }
  },
  mounted() {
    this.$store.dispatch("loadUsers");
  },
  methods: {
    deleteUser(id) {
      this.$store.dispatch({
        type: "deleteUser",
        id
      });
    }
  }
};
</script>
