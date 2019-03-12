<template>
  <div class="c-menu-nav"
        v-if="showTopMenu">
    <slot name="menu-items" />
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
