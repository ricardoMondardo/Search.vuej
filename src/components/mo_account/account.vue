<template>
  <div class="site-content c-account">

    <x-buttonhamburger />

    <x-main-nav>
      <template slot="menu-items">
        <slot name="menu-items" />
      </template>
    </x-main-nav>

    <x-auth-nav :pHideLogin="false"/>

    <h1> Account </h1>
    <div v-if="message.length > 0">
      {{ message }}
    </div>

    <x-login v-if="!logged && status!='LOAGING'"
             v-on:login="login" />
    <div class="c-account__welcome-msg"
         v-else>
      Welcome!
    </div>

    <div class="c-account__spinner">
      <x-spiner v-if="status=='LOAGING'"/>
    </div>

  </div>
</template>

<script>
export default {
  name: 'x-account',
  computed: {
    logged: function() {
      return this.$store.state.user.logged;
    }
  },
  data: () => {
    return {
      status: "OPENED",
      message: " "
    }
  },
  methods: {
    login: function(email, password) {
      const self = this

      if (email.length <= 0) {
        this.message = "Name cannot be empty"
        return false
      }

      if (password.length <= 0) {
        this.message = "Password cannot be empty"
        return false
      }

      const fetchPost = require('../../util/fetchPost')

      this.status = "LOAGING"
      fetchPost.postData("api/Auth/Login", {
            email: email,
            password: password
        })
      .then((res) => {
        this.status = "LOGGED"
        self.message = ""
        self.$store.commit('logInUser', {
          id: res.id,
          token: res.token,
          tokenExpirationTime: res.tokenExpirationTime
        })
      })
      .catch((error) => {
        if (error.message == "401") {
          self.message = "Email or password incorect"
        } else {
          self.message = "Sorry, something goes wrong, try again later"
        }
      });

    }
  }
}
</script>
