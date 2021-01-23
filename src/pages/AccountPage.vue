<template>
  <div class="about text-center">
    <h1>Your Profile</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="row m-3 justify-content-around">
    <Blog :link="'Edit'" v-for="b in blogs" :key="b.id" :b="b" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import accountService from '../services/AccountService'
import logger from '../utils/Logger'
// import blogService from '../services/BlogService'
export default {
  name: 'Account',
  setup() {
    onMounted(async() => {
      try {
        await accountService.getAccount('blogs', 'accountBlogs')
        // await blogService.get(AppState.account)
      } catch (e) {
        logger.error(e)
      }
    })
    return {
      account: computed(() => AppState.account),
      blogs: computed(() => AppState.accountBlogs)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
