<template>
  <div class="blog col-3 mx-3 my-3 box-shadow">
    <router-link :to="{ name: link, params: {id: b.id} }">
      <div :v-if="link == 'Edit'" @click="assignEditContent()">
        <div class="img-row row">
        </div>
        <div class="row header-row justify-content-center">
          <div class="col-8 blog-header text-light">
            <h5>{{ b.title }}</h5>
          </div>
        </div>
      </div>
    </router-link>
    <div class="row">
      <div class="col">
        <p class="text-secondary">
          Written by: {{ b.creator.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
export default {
  name: 'Blog',
  props: {
    b: {
      type: Object,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return {
      assignEditContent() {
        AppState.editBlog = props.b
        console.log(AppState.editBlog)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import 'bootstrap';
@import '../assets/scss/_variables.scss';

.w-fit {
  width: fit-content !important;
}
.blog-header {
  height: 80px;
  background-color: $primary;
  border-radius: 3%;
  transform: translateY(-60px);
}
.header-row {
  height: 40px;
}
.box-shadow {
  box-shadow: 2px 2px 9px $dark-transparent, 2px -2px 9px $dark-transparent, 2px -2px 9px $dark-transparent, -2px 2px 9px $dark-transparent;
}
.img-row {
  z-index: 2;
  height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('../assets/img/genericimg.jpg')
}
</style>
