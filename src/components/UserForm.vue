<template>
  <form action="#">
    <div class="form-group">
      <label for="name">Name</label>
      <input id="name" name="name" :value="user.firstName" />
    </div>
    <div class="form-group">
      <label for="surname">Surname</label>
      <input id="surname" name="surname" :value="user.lastName" />
    </div>
  </form>
</template>

<script>
export default {
  name: "user-form",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {}
};
</script>
