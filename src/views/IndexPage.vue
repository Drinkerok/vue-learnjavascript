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
import loader from "@/utils/backend";
import UserTable from "@/components/UserTable";

export default {
  name: "IndexPage",
  components: {
    "user-table": UserTable
  },
  mounted: function() {
    loader(`http://localhost:3000/users`).then(data => {
      this.users = data;
      this.isLoaded = true;
    });
  },
  data: function() {
    return {
      users: [],
      isLoaded: false
    };
  },
  methods: {
    deleteUserFromDB: function(id) {
      const requestSettings = {
        headers: {
          "Content-Type": `application/json`
        },
        method: `DELETE`
      };

      loader(`http://localhost:3000/users/${id}`, requestSettings).then(
        () => (this.users = this.users.filter(user => user.id !== id))
      );
    }
  }
};
</script>
