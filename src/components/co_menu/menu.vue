<template>
  <div class="menu-container">
      <div class="menu-container-pages">
        <slot name="menu-items" />
      </div>

      <div class="menu-container-auth">
        <ul>
          <li>
            <button v-if="this.$store.state.user.logged"
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
  methods: {
    logOut: function() {
      this.$store.commit('logOutUser')
    }
  }
}
</script>
