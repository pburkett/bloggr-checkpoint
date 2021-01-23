<template>
  <div class="comment">
    <div class="bg-white blog-body my-4 p-4">
      <div class="bg-light author-div text-primary w-fit px-2 mr-4">
        <p>
          {{ c.creator.name }}
        </p>
      </div>
      <p>
        {{ c.body }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    c: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return { }
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
  border-radius: 5% 0% 0% 5%;
  border-right: 4px solid $primary;
}
.light-shadow {
    box-shadow: 1px 1px 4px $dark-transparent, 1px -1px 4px $dark-transparent, 1px -1px 4px $dark-transparent, -1px 1px 4px $dark-transparent;
  }
  .author-div {
    border-radius: 8%;
    float: left;

  }
</style>
