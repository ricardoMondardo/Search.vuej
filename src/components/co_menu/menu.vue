<template>
  <div class="menu-container"
        v-if="showTopMenu">
      <div class="menu-container-pages">
        <slot name="menu-items" />
      </div>

      <div class="menu-container-auth">
        <ul>
          <li>
            <button v-if="logged"
                    v-on:click="logOut"
                    >
              Log out
            </button>
            <span v-else>
              Welcome Guest!
            </span>
          </li>
        </ul>
      </div>

  </div>
</template>

<script>
export default {
  name: "x-menu",
  computed: {
    logged: function() {
      return this.$store.state.user.logged
    },
    showTopMenu: function() {
      return this.$store.state.UIControl.showTopMenu
    }
  },
  methods: {
    logOut: function() {
      this.$store.commit('logOutUser')
    }
  }
}
</script>
