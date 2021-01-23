<template>
  <div class="row mt-5 justify-content-center">
    <div class="col-12">
      <div class=" m-auto header-div w-fit">
        <h1>
          What's up?
        </h1>
        <div class="bb"></div>
      </div>
    </div>
    <div class="col-8 mt-5">
      <form @submit.prevent="create">
        <textarea v-model="state.post.title" placeholder="blog title . . ." maxlength="50" class="bg-white w-100 blog-title p-4 mb-5"></textarea>
        <textarea v-model="state.post.body" placeholder="content . . ." maxlength="2000" class="bg-white w-100 blog-body p-4 mb-3"></textarea>
        <div class="row mb-5">
          <div class="col offset-9">
            <button class=" btn btn-primary">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import blogService from '../services/BlogService'
import { logger } from '../utils/Logger'

export default {
  name: 'PostPage',
  setup() {
    const router = useRouter()
    const state = reactive({
      post: {}
    })
    return {
      state,
      async create() {
        try {
          const id = await blogService.post('blogs', '', state.post)
          router.push({ name: 'Blog', params: { id } })
          state.newHouse = {}
          // change route in javascript using router.push()
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/scss/_variables';
.w-fit {
  width: fit-content !important;
}
.bb{
  height: 5px;
  background-color: $primary;
  transform: translateX(33%);
  border-radius: 100px;
}
  .light-shadow {
    box-shadow: 1px 1px 4px $dark-transparent, 1px -1px 4px $dark-transparent, 1px -1px 4px $dark-transparent, -1px 1px 4px $dark-transparent;
  }
  .blog-body {
font-size: 1.2rem ;
  height: 500px;

}
.blog-title {

  font-size: 2rem;
}
textarea {
  background-color: $white !important;
  border-left: 5px solid $secondary;
  border-top: 5px solid $secondary;
@extend .light-shadow;
}
</style>
