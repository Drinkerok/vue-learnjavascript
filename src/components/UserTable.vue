<template>
  <div>
    <select v-model="count" name="usersPerPage">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
    </select>
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
    <div class="pagination">
      <ul class="pagination__list">
        <li v-for="i in pages" :key="`page_${i}`" class="pagination__item">
          <button
            class="pagination__button"
            :class="{
              'pagination__button--active': i == page
            }"
            @click="changePage(i)"
          >
            {{ i }}
          </button>
        </li>
      </ul>
    </div>
  </div>
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
  data: () => ({
    localUsers: [],
    count: 10
  }),
  computed: {
    usersLength: function() {
      return this.users.length;
    },
    page: function() {
      return this.$route.query.page || 1;
    },
    filteredUsers: function() {
      return this.users.filter(
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
    }
  }
};
</script>

<style>
.pagination__list {
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
}

.pagination__item {
  margin-right: 5px;
}

.pagination__button {
  padding: 5px 10px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  cursor: pointer;
}
.pagination__button--active {
  background-color: #000;
  color: #fff;
  cursor: default;
}
</style>
