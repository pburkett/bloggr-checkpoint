<template>
  <div class="comment">
    <div class="bg-white blog-body my-4 p-4">
      <div v-if="state.account.id != c.creator.id" class="bg-light author-div text-primary w-fit px-2 mr-2">
        <p class="mt-2 mb-2 px-2">
          {{ c.creator.name }}
        </p>
      </div>
      <div v-else class="bg-primary outline-dark author-div text-white w-fit px-2 mr-1">
        <p class="mt-2 mb-2 px-2">
          You
        </p>
      </div>

      <button @click="remove" v-if="state.account.id == c.creator.id" class="btn-white btn-outline-danger btn delete-div text-dark w-fit px-2 mr-1">
        Delete
      </button>
      <button v-if="state.displayEdit == false && state.account.id == c.creator.id" @click="state.displayEdit = true" class="btn-white btn-outline-warning btn delete-div text-dark w-fit px-2 mr-2">
        Edit
      </button>
      <button :class="{'mb-3': state.displayEdit}" v-else-if="state.displayEdit == true && state.account.id == c.creator.id" @click="edit" class="btn-white btn-success btn delete-div text-dark w-fit px-2 mr-4">
        Submit
      </button>
      <p v-if="state.displayEdit == false">
        {{ state.body }}
      </p>
      <textarea v-model="state.body" v-else></textarea>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import blogService from '../services/BlogService'
export default {
  name: 'Comment',
  props: {
    c: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      displayEdit: false,
      body: props.c.body
    })
    return {
      state,
      async remove() {
        try {
          await blogService.remove('comments/' + props.c.id)
          AppState.comments = AppState.comments.filter(c => c.id !== props.c.id)
        } catch (e) {
          console.error(e)
        }
      },
      async edit() {
        try {
          console.log(state.body)
          await blogService.update('comments/' + props.c.id, '', { body: state.body })
          state.displayEdit = false
        } catch (e) {
          console.error(e)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
.w-fit {
  width: fit-content !important;
}
.blog-body {
  @extend .light-shadow;
  border-radius: 15px 0 0 15px;
  border-right: 4px solid $primary;
}
.light-shadow {
    box-shadow: 1px 1px 4px $dark-transparent, 1px -1px 4px $dark-transparent, 1px -1px 4px $dark-transparent, -1px 1px 4px $dark-transparent;
  }
  .spread-shadow {
    box-shadow: 2px 2px 20px $dark-transparent, 2px -2px 20px $dark-transparent, 2px -2px 20px $dark-transparent, -2px 2px 20px $dark-transparent;
  }
  .author-div {
    border-radius: .25rem;
    float: left;
  }
  .delete-div {
    display: flex;
    float:left;
    align-self: end;
  }
  textarea {
    width: 500px;
  transition: 200ms;
  background-color: $white !important;
  border-radius: 15px 0 15px 0;
  border-left: 10px solid $primary;
  border-right: 10px solid $primary;
  height: 200px;
  outline: none;
@extend .spread-shadow
  }
</style>
