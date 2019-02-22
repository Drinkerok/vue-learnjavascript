<template>
  <div>
    <div class="form-group">
      <Dropzone v-model="localUser.picture" />
    </div>
    <div class="form-group">
      <Checkbox v-model="localUser.isActive" text="Active" name="active" />
    </div>
    <div class="form-group">
      <label for="firstName">Name</label>
      <input
        id="firstName"
        v-model="localUser.firstName"
        v-validate="'required|min:5'"
        name="firstName"
        class="form-control"
      />
      <span>{{ errors.first("firstName") }}</span>
    </div>
    <div class="form-group">
      <label for="lastName">Surname</label>
      <input
        id="lastName"
        v-model="localUser.lastName"
        v-validate="'required|min:2'"
        name="lastName"
        class="form-control"
        required
      />
      <span>{{ errors.first("lastName") }}</span>
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
        v-validate="'required|email'"
        name="email"
        class="form-control"
      />
      <span>{{ errors.first("email") }}</span>
    </div>
    <div class="form-group">
      <label for="registered">Registered</label>
      <Datepicker
        id="registered"
        v-model="localUser.registered"
        name="registered"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <label for="about">About</label>
      <Editor id="about" v-model="localUser.about" name="about"></Editor>
    </div>
  </div>
</template>

<script>
import deepEqual from "deep-equal";

export default {
  name: "UserForm",
  inject: ["$validator"],
  components: {
    Datepicker: () => import("@/components/Datepicker.vue"),
    Editor: () => import("@/components/Editor.vue"),
    Checkbox: () => import("@/components/Checkbox.vue"),
    Dropzone: () => import("@/components/Dropzone.vue")
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
    user: {
      handler() {
        if (!deepEqual(this.user, this.localUser)) {
          this.createLocalUser();
        }
      },
      immediate: true
    },
    localUser: {
      deep: true,
      handler() {
        this.$emit("input", { ...this.localUser });
      }
    }
  },
  methods: {
    createLocalUser() {
      this.localUser = { ...this.user };
    }
  }
};
</script>
