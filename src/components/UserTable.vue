<template>
  <div>
    <usersPerPage v-model="count"></usersPerPage>
    <input v-model="search" type="text" />
    <p v-if="filteredUsers.length === 0">Нет пользователей</p>
    <table v-else class="table table-hover">
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
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user of filteredUsers" :key="user.id">
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
          <td>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteUser(user.id)"
            >
              X
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="9">Всего пользователей: {{ usersLength }}</td>
        </tr>
      </tfoot>
    </table>
    <pagination
      :pages="pages"
      :page="+page"
      @changePage="changePage"
    ></pagination>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import UsersPerPage from "@/components/UsersPerPage.vue";

const DEFAULT_AVATAR =
  "http://www.forum.vwclub.ua/images/avatars/no_avatar1.gif";

export default {
  name: "UserTable",
  components: {
    pagination: Pagination,
    usersPerPage: UsersPerPage
  },
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    count: 10,
    search: ""
  }),
  computed: {
    usersLength: function() {
      return this.users.length;
    },
    page: function() {
      return this.$route.query.page || 1;
    },
    filteredUsers: function() {
      return this.users
        .filter(user => this.filterByLastName(user))
        .filter(
          (user, i) =>
            i >= this.count * (this.page - 1) && i < this.count * this.page
        );
    },
    pages: function() {
      return Math.ceil(this.users.length / this.count);
    }
  },
  methods: {
    getUserAvatar: function(img) {
      return img || DEFAULT_AVATAR;
    },
    getUserEditLink: function(id) {
      return `/edit/${id}`;
    },
    deleteUser: function(id) {
      this.$emit("userDeleted", id);
    },
    changePage: function(pageNumber) {
      this.$router.push({ ...this.$route, query: { page: pageNumber } });
    },
    changeCount(number) {
      this.count = number;
    },
    filterByLastName(user) {
      return (
        user.lastName.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
      );
    }
  }
};
</script>
