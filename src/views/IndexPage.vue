<template>
  <div>
    <p v-if="!isLoaded">Loading...</p>
    <user-table
      v-else
      :users="users"
      @userDeleted="deleteUserFromDB"
    ></user-table>
  </div>
</template>

<script>
import UserTable from "@/components/UserTable.vue";
import loader from "@/utils/backend.js";
import { API } from "@/utils/constants.js";

export default {
  name: "IndexPage",
  components: {
    "user-table": UserTable
  },
  data: function() {
    return {
      users: [],
      isLoaded: false
    };
  },
  mounted: function() {
    loader(API.users).then(data => {
      this.users = data;
      this.isLoaded = true;
    });
  },
  methods: {
    deleteUserFromDB: function(id) {
      loader(`${API.users}/${id}`, {
        method: "DELETE"
      }).then(this.removeUserById(id));
    },
    removeUserById: function(id) {
      this.users = this.users.filter(user => user.id !== id);
    }
  }
};
</script>
