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
import loader from "@/utils/backend.js";
import { API } from "@/utils/constants.js";

export default {
  name: "Phonebook",
  components: {
    UserTable: () => import("@/components/UserTable.vue")
  },
  data: () => ({
    users: []
  }),
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
    }
  }
};
</script>
