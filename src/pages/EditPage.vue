<template>
  <div class="row mt-5 justify-content-center">
    <div class="col-12">
      <div class=" m-auto header-div w-fit">
        <h1>
          Edit Post
        </h1>

        <div class="bb"></div>
      </div>
    </div>
    <div class="col-8 mt-5">
      <form id="blog" @submit.prevent="edit">
        <textarea v-model="state.post.title" placeholder="blog title . . ." maxlength="50" class="bg-white w-100 blog-title p-4 mb-5"></textarea>
        <textarea v-model="state.post.body" placeholder="content . . ." maxlength="2000" class="bg-white w-100 blog-body p-4 mb-3"></textarea>
      </form>
      <div class="row mb-5 justify-content-around">
        <div class="col-3 text-center">
          <button type="submit" form="blog" class="btn btn-outline-warning btn-white text-dark">
            Submit Changes
          </button>
        </div>
        <div class="col-3 text-center">
          <button @click="remove" class="btn btn-outline-danger btn-white text-dark">
            Delete Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import blogService from '../services/BlogService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

export default {
  name: 'PostPage',
  setup() {
    const router = useRouter()
    const state = reactive({
      post: {},
      editMode: false
    })
    onMounted(() => {
      if (AppState.editBlog) {
        state.editMode = true
      } state.post = AppState.editBlog
    })
    return {
      state,
      router,
      async edit() {
        try {
          const id = await blogService.update('blogs/' + state.post.id, '', state.post)
          console.log(id)
          router.push({ name: 'Blog', params: { id } })
          state.newHouse = {}
        } catch (error) {
          logger.error(error)
        }
      },
      async remove() {
        try {
          await blogService.remove('blogs/' + state.post.id, '', '')
          router.push({ name: 'Account', params: { } })
        } catch (e) {
          logger.error(e)
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
  border-radius:15px;
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
