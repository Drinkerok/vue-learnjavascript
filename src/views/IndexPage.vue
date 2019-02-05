<template>
  <div>
    <p v-if="!isLoaded">Loading...</p>
    <UserTable
      v-else
      :users="users"
      @userDeleted="deleteUserFromDB"
    ></UserTable>
  </div>
</template>

<script>
import UserTable from "@/components/UserTable.vue";
import loader from "@/utils/backend.js";
import { API } from "@/utils/constants.js";

export default {
  name: "IndexPage",
  components: {
    UserTable
  },
  data: () => ({
    users: [],
    isLoaded: false
  }),
  mounted() {
    loader(API.users).then(data => {
      this.users = data;
      this.isLoaded = true;
    });
  },
  methods: {
    deleteUserFromDB(id) {
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
