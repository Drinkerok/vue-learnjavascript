<template>
  <div>
    <p v-if="users.length === 0">Loading...</p>
    <UserTable v-else :users="users">
      <template #thead>
        <tr>
          <th>ID</th>
          <th>Surname</th>
          <th>Phone</th>
        </tr>
      </template>

      <template #trow="{user}">
        <td>{{ user.id }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.phone }}</td>
      </template>
    </UserTable>
  </div>
</template>

<script>
import UserTable from "@/components/UserTable.vue";
import loader from "@/utils/backend.js";
import { API } from "@/utils/constants.js";

export default {
  name: "Phonebook",
  components: {
    UserTable
  },
  data: () => ({
    users: []
  }),
  mounted() {
    loader(API.users).then(data => {
      this.users = data;
    });
  }
};
</script>
