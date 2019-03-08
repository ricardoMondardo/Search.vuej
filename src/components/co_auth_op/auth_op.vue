<template>
  <div class="c-auth-op">
    <button v-if="logged"
            v-on:click="logOut">
      Log out
    </button>
    <span v-else>
      Welcome Guest!
    </span>
  </div>
</template>

<script>
export default {
  name: "x-auth-op",
  computed: {
    logged: function() {
      return this.$store.state.user.logged
    }
  },
  methods: {
    logOut: function() {
      this.$store.commit('logOutUser')
    }
  }
}
</script>
