<template>
  <div class="row mt-5 justify-content-center">
    <div class="col-12">
      <div class=" m-auto header-div w-fit">
        <h1>{{ blog.title }}</h1>
        <div class="bb"></div>
      </div>
    </div>
    <div class="col-8 mt-5">
      <p class="bg-white blog-body p-4">
        {{ blog.body }}
      </p>
    </div>
  </div>
  <div class="row">
    <div class="col offset-3 author-div">
      Written by {{ name }}
    </div>
  </div>
  <div class="row mt-5 justify-content-center">
    <div class="col-12">
      <div class=" offset-2 header-div w-fit">
        <h5>Add a comment</h5>
        <div class="bb"></div>
      </div>
    </div>

    <div class="col-6 mt-4">
      <form action="">
        <textarea placeholder="comment . . ." maxlength="50" class="bg-white w-100  p-4 "></textarea>
      </form>
    </div>

    <div class="col-8 mt-5">
      <div class="col-12">
        <div class=" offset-2 header-div w-fit">
          <h3>Comments</h3>
          <div class="bb"></div>
        </div>
      </div>
      <Comment v-for="c in comments" :key="c.id" :c="c" />
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import blogService from '../services/BlogService'
import logger from '../utils/Logger'
import Comment from '../components/Comment'
export default {
  name: 'BlogPage',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await blogService.get(route.params.id, 'blogPage')
        await blogService.get(route.params.id + '/comments', 'comments')
      } catch (e) {
        logger.error(e)
      }
    })
    return { blog: computed(() => AppState.blogPage), comments: computed(() => AppState.comments), name: computed(() => AppState.blogPage.creator ? AppState.blogPage.creator.name : '') }
  },
  components: { Comment }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
.w-fit {
  width: fit-content !important;
}
.bb{
  height: 5px;
  background-color: $primary;
  transform: translateX(80px);
  border-radius:4%;
}

.blog-body {
  background-color: $white !important;
  border-left: 5px solid $primary;
  border-radius: 0% 5% 5% 0%;
  @extend .light-shadow;
}
  .light-shadow {
    box-shadow: 1px 1px 4px $dark-transparent, 1px -1px 4px $dark-transparent, 1px -1px 4px $dark-transparent, -1px 1px 4px $dark-transparent;
  }
textarea {
  background-color: $white !important;

@extend .light-shadow;
}

</style>
