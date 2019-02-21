<template>
  <div class="user">
    <p class="user__text">Вас зовут:</p>
    <input
      type="text"
      class="user__input"
      :value="userName"
      @input="userName = $event.target.value"
    />
  </div>
</template>

<script>
export default {
  name: "User",
  computed: {
    userName: {
      get() {
        return this.$store.state.userName;
      },
      set(name) {
        this.$store.commit({
          type: "changeName",
          name
        });
      }
    }
  }
};
</script>

<style>
.user {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.user__text {
  margin: 0 10px 0 0;
}
</style>
