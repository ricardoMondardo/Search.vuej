<template>
  <div class="menu-container"
        v-if="showTopMenu">
      <div class="menu-container-pages">
        <slot name="menu-items" />
      </div>
  </div>
</template>

<script>
export default {
  name: "x-main-nav",
  mounted() {
    this.$store.commit('openTopMenu', false)
  },
  computed: {
    showTopMenu: function() {
      return this.$store.state.UIControl.showTopMenu
    }
  }
}
</script>
