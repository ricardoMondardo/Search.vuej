<template>
  <div class="c-auth-op">
    <button class="button"
            v-if="logged"
            v-on:click="logOut">
      Log out
    </button>
    <span v-else>
      <a class="button"
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
    logOut: function() {
      this.$store.commit('logOutUser')
      window.location.href = "/account";
    }
  }
}
</script>
