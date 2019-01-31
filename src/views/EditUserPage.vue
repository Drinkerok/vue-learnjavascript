<template>
  <div>
    <p v-if="!isLoaded">Loading...</p>
    <user-form
      v-else
      submit-text="Сохранить"
      :user="user"
      @userChanged="editUserToDB"
    ></user-form>
  </div>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import loader from "@/utils/backend.js";
import { API } from "@/utils/constants.js";

export default {
  name: "EditUser",
  components: {
    "user-form": UserForm
  },
  data: function() {
    return {
      user: null,
      isLoaded: false
    };
  },
  computed: {
    userId: function() {
      return this.$route.params.id;
    }
  },
  mounted: function() {
    loader(`${API.users}/${this.userId}`).then(data => {
      this.user = data;
      this.isLoaded = true;
    });
  },
  methods: {
    editUserToDB: function(data) {
      loader(`${API.users}/${this.userId}`, {
        data,
        method: "PUT"
      });
    }
  }
};
</script>
