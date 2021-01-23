<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row m-3 justify-content-around">
      <Blog :link="'Blog'" v-for="b in blogs" :key="b.id" :b="b" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import blogService from '../services/BlogService'
import logger from '../utils/Logger'
import Blog from '../components/Blog'

export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      if (AppState.blogs.length <= 1) {
        try {
          await blogService.get('', 'blogs')
        } catch (e) {
          logger.error(e)
        }
      }
    })
    return { blogs: computed(() => AppState.blogs) }
  },
  components: {
    Blog
  }
}

</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
