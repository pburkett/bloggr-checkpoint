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

    <div class="col-6 mt-4 mb-4">
      <form action="">
        <div class="row">
          <textarea v-model="state.commenting" placeholder="comment . . ." maxlength="300" class="bg-white w-100 comment-input p-4 "></textarea>
          <transition name="fade">
            <button v-show="state.commenting != ''" class="comment-btn btn-outline-primary btn-light btn offset-8">
              Submit
            </button>
          </transition>
        </div>
      </form>
    </div>

    <div v-if="comments.length > 0" class="col-8 mt-5">
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
import { onMounted, computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import blogService from '../services/BlogService'
import logger from '../utils/Logger'
import Comment from '../components/Comment'
export default {
  name: 'BlogPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      commenting: ''
    })
    onMounted(async() => {
      try {
        await blogService.get(route.params.id, 'blogPage')
        await blogService.get(route.params.id + '/comments', 'comments')
      } catch (e) {
        logger.error(e)
      }
    })
    return {
      blog: computed(() => AppState.blogPage),
      comments: computed(() => AppState.comments),
      name: computed(() => AppState.blogPage.creator ? AppState.blogPage.creator.name : ''),
      state
    }
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
  transform: translateX(20%);
  border-radius:5px;
}

.blog-body {
  background-color: $white !important;
  border-left: 5px solid $primary;
  border-radius: 0 15px 15px 0;
  @extend .light-shadow;
}
  .light-shadow {
    box-shadow: 1px 1px 4px $dark-transparent, 1px -1px 4px $dark-transparent, 1px -1px 4px $dark-transparent, -1px 1px 4px $dark-transparent;
  }
  .spread-shadow {
    box-shadow: 2px 2px 20px $dark-transparent, 2px -2px 20px $dark-transparent, 2px -2px 20px $dark-transparent, -2px 2px 20px $dark-transparent;
  }
textarea {
  transition: 200ms;
  background-color: $white !important;
  border-radius: 15px 0 15px 0;
  border-left: 5px solid $primary;
  border-right: 5px solid $primary;
  height: 80px;
@extend .light-shadow;
}
.comment-input:focus {
    border-left: 10px solid $primary;
  border-right: 10px solid $primary;
  transition: 300ms ease;
  height: 200px;
  transform: scale(1.1);
  outline: none;
  @extend .spread-shadow
}
.comment-btn {
  height: 40px;
  margin-top: 40px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 300ms ease;
  transform: translateX(0px);
  height: 40px;
  margin-top: 40px;
}

.fade-enter-from,
.fade-leave-to {
  height: 40px;
  opacity: 0;
  transform: translateX(-100px);
  transform: translateY(-100px);
  margin-top: 0px;
}

</style>
