<template>
  <div>
    <div class="form-group">
      <label for="firstName">Name</label>
      <input
        id="firstName"
        v-model="localUser.firstName"
        name="firstName"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <label for="lastName">Surname</label>
      <input
        id="lastName"
        v-model="localUser.lastName"
        name="lastName"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <label for="lastName">Balance</label>
      <input
        id="balance"
        v-model="localUser.balance"
        name="balance"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <label for="lastName">Phone</label>
      <input
        id="phone"
        v-model="localUser.phone"
        name="phone"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <label for="lastName">Email</label>
      <input
        id="email"
        v-model="localUser.email"
        name="email"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <label for="registered">Registered</label>
      <input v-model="localUser.registered" />
      <Datepicker
        id="registered"
        v-model="localUser.registered"
        name="registered"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <label for="about">Email</label>
      <Editor id="about" v-model="localUser.about" name="about"></Editor>
    </div>
  </div>
</template>

<script>
import Datepicker from "@/components/Datepicker.vue";
import Editor from "@/components/Editor.vue";

export default {
  name: "UserForm",
  components: {
    Datepicker,
    Editor
  },
  model: {
    prop: "user"
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    localUser: null
  }),
  watch: {
    localUser: {
      deep: true,
      handler() {
        this.$emit("input", this.localUser);
      }
    }
  },
  created() {
    this.localUser = { ...this.user };
  }
};
</script>
