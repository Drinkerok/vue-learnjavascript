<template>
  <p v-if="!haveUsers">Loading...</p>
  <UserTable v-else :users="users" @userDeleted="deleteUserFromDB" />
</template>

<script>
// import UserTable from "@/components/UserTable.vue";
import loader from "@/utils/backend.js";
import { API } from "@/utils/constants.js";

export default {
  name: "IndexPage",
  components: {
    UserTable: () => import("@/components/UserTable.vue")
  },
  data: () => ({
    users: []
  }),
  computed: {
    haveUsers() {
      return this.users.length !== 0;
    }
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    loadUsers() {
      loader(API.users)
        .then(data => {
          this.users = data;
        })
        .catch(err => alert(err.message));
    },
    deleteUserFromDB(id) {
      loader(`${API.users}/${id}`, {
        method: "DELETE"
      })
        .then(this.removeUserById(id))
        .catch(err => alert(err.message));
    },
    removeUserById: function(id) {
      this.users = this.users.filter(user => user.id !== id);
    }
  }
};
</script>
