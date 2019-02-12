<template>
  <div>
    <UsersPerPage v-model.number="count" />
    <SearchInput v-model="search" />
    <p v-if="!haveUsers">Нет пользователей</p>
    <table v-else class="table table-hover">
      <thead>
        <slot name="thead">
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Balance</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Registered</th>
            <th>Delete</th>
          </tr>
        </slot>
      </thead>
      <tbody>
        <tr v-for="user of filteredUsers" :key="user.id">
          <slot name="trow" :user="user">
            <td>
              <router-link :to="getUserEditLink(user.id)">
                {{ user.id }}
              </router-link>
            </td>
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
            <td>{{ user.registered }}</td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteUser(user.id)"
              >
                X
              </button>
            </td>
          </slot>
        </tr>
      </tbody>
    </table>
    <p>Всего пользователей: {{ usersLength }}</p>
    <Pagination v-model="page" :pages="pages" />
  </div>
</template>

<script>
const DEFAULT_AVATAR =
  "http://www.forum.vwclub.ua/images/avatars/no_avatar1.gif";

export default {
  name: "UserTable",
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
    UsersPerPage: () => import("@/components/UsersPerPage.vue"),
    SearchInput: () => import("@/components/SearchInput.vue")
  },
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    count: 10,
    search: "",
    page: 1
  }),
  computed: {
    usersLength() {
      return this.users.length;
    },
    filteredUsers() {
      return this.users
        .filter(user => this.filterByLastName(user))
        .filter(this.isUserInRange);
    },
    haveUsers() {
      return this.filteredUsers.length !== 0;
    },
    pages: function() {
      const arr = this.search ? this.filteredUsers : this.users;
      return Math.max(Math.ceil(arr.length / this.count), 1);
    }
  },
  watch: {
    page() {
      this.$router.push({ ...this.$route, query: { page: this.page } });
    },
    $route(to) {
      const nextPage = +to.query.page;
      if (this.page !== nextPage) this.page = nextPage;
    }
  },
  created() {
    this.setPage();
  },
  methods: {
    setPage() {
      this.page = +this.$route.query.page || 1;
    },
    isUserInRange(user, i) {
      return i >= this.count * (this.page - 1) && i < this.count * this.page;
    },
    getUserAvatar(img) {
      return img || DEFAULT_AVATAR;
    },
    getUserEditLink(id) {
      return `/edit/${id}`;
    },
    deleteUser(id) {
      this.$emit("userDeleted", id);
    },
    filterByLastName(user) {
      return (
        user.lastName.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
      );
    }
  }
};
</script>
