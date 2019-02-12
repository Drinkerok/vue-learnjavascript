<template>
  <div>
    <div class="form-group checkbox">
      <input
        id="active"
        v-model="localUser.isActive"
        name="active"
        class="checkbox__input"
        type="checkbox"
      />
      <label for="active" class="checkbox__label">Active</label>
    </div>
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
  components: {
    Datepicker: () => import("@/components/Datepicker.vue"),
    Editor: () => import("@/components/Editor.vue")
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
    user() {
      if (!deepEqual(this.user, this.localUser)) this.createLocalUser();
    },
    localUser: {
      deep: true,
      handler() {
        this.$emit("input", this.localUser);
      }
    }
  },
  created() {
    this.createLocalUser();
  },
  methods: {
    createLocalUser() {
      this.localUser = { ...this.user };
    }
  }
};
</script>

<style>
.checkbox {
  padding: 10px 0 0;
}
.checkbox__input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}

.checkbox__label {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
}

.checkbox__label:before {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: 1px solid #000;
}

.checkbox__label:after {
  content: none;
  display: block;
  position: absolute;
  top: calc(50% - 5px);
  left: 3px;
  width: 15px;
  height: 7px;
  border: 2px solid #000;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
}

.checkbox__input:checked ~ .checkbox__label:after {
  content: "";
}
</style>
