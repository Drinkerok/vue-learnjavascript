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
export default {
  name: "Phonebook",
  components: {
    UserTable: () => import("@/components/UserTable.vue")
  },
  computed: {
    users() {
      return this.$store.state.users;
    }
  },
  mounted() {
    this.$store.dispatch("loadUsers");
  }
};
</script>
