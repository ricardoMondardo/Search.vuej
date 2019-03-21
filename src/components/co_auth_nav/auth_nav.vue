<template>
  <div class="c-auth-op">
    <button class="c-button"
            v-if="logged"
            v-on:click="logOut($event)">
      Log out
    </button>
    <span v-else>
      <a class="c-button"
        v-if="pHideLogin"
        href="/account">
        Log in
      </a>
    </span>
  </div>
</template>

<script>
export default {
  name: "x-auth-nav",
  props: {
    pHideLogin: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    logged: function() {
      return this.$store.state.user.logged
    }
  },
  methods: {
    logOut: function(e) {

      e.preventDefault()

      this.$store.commit('logOutUser')

      this.$emit('logout')
    }
  }
}
</script>
