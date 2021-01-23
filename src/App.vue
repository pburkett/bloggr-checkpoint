<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view v-slot="{Component}">
      <transition name="route" mode="out-in">
        <div class="container-fluid">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
@import 'bootstrap';

</style>
