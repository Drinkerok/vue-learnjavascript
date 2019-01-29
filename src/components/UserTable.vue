<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>ID</th>
        <th>Avatar</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Balance</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Edit</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user of users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>
          <img
            :src="getUserAvatar(user.picture)"
            alt=""
            width="30"
            height="30"
          />
        </td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.balance }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ user.email }}</td>
        <td>
          <router-link :to="getUserEditLink(user.id)">...</router-link>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="5">Всего пользователей: {{ usersLength }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
const DEFAULT_AVATAR =
  "http://www.forum.vwclub.ua/images/avatars/no_avatar1.gif";

export default {
  name: "UserTable",
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  methods: {
    getUserAvatar: function(img) {
      return img || DEFAULT_AVATAR;
    },
    getUserEditLink: function(id) {
      return `/edit/${id}`;
    }
  },
  computed: {
    usersLength: function() {
      return this.users.length;
    }
  }
};
</script>
