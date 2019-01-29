<template>
  <div>
    <p v-if="!isLoaded">Loading...</p>
    <form v-else action="#">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          name="name"
          :value="user.firstName"
          @input="inputHandler($event)"
        />
      </div>
      <div class="form-group">
        <label for="surname">Surname</label>
        <input
          id="surname"
          name="surname"
          :value="user.lastName"
          @input="inputHandler($event)"
        />
      </div>
    </form>
  </div>
</template>

<script>
import loader from "@/utils/backend";

export default {
  name: "editUser",
  mounted: function() {
    loader(`http://localhost:3000/users/${this.$route.params.id}`).then(
      data => {
        this.user = data;
        this.isLoaded = true;
      }
    );
  },
  data: function() {
    return {
      user: {},
      isLoaded: false
    };
  }
};
</script>
