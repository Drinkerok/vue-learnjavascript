<template>
  <div>
    <p v-if="!isLoaded">Loading...</p>
    <user-table v-else :users="users"></user-table>
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
  }
};
</script>
