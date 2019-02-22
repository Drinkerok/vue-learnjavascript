<template>
  <div>
    <p><img :src="picture" alt="" /></p>
    <div>
      <input v-model="picture" type="text" readonly />
      <p>Изменить картинку</p>
      <p></p>
      <div ref="dropzoneEl" class="dropzone"></div>
    </div>
  </div>
</template>

<script>
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

export default {
  name: "Dropzone",
  model: {
    prop: "picture"
  },
  props: {
    picture: {
      type: String,
      required: true
    }
  },
  data: () => ({
    dropzone: null
  }),
  mounted() {
    this.initDropzone();
  },
  beforeDestroy() {
    this.dropzone.destroy();
  },
  methods: {
    initDropzone() {
      this.dropzone = new Dropzone(this.$refs.dropzoneEl, {
        url: "https://api.imgur.com/3/image",
        paramName: "image",
        acceptedFiles: "image/*",
        method: "post",
        headers: {
          "Cache-Control": null,
          "X-Requested-With": null,
          Authorization: "Client-ID 7977bd0c84b4d67"
        },
        createImageThumbnails: false,
        previewTemplate: "<div style='display:none'></div>",
        success: (file, response) => {
          this.changeAvatar(response.data.link);
        },
        error: err => {
          console.log(err);
        }
      });
    },
    changeAvatar(src) {
      this.$emit("input", src);
    }
  }
};
</script>

<style>
.dropzone {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border: 1px dashed #ccc;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
