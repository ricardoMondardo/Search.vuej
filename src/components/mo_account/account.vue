<template>
  <div class="site-content c-account">

    <x-buttonhamburger />

    <x-main-nav class="c-account__main-nav">
      <template slot="menu-items">
        <slot name="menu-items" />
      </template>
    </x-main-nav>

    <x-auth-nav class="c-account__auth_nav"
                :pHideLogin="false"/>

    <div class="c-account__tabs"
        v-if="!isLogged">
      <button class="button--link"
              v-bind:class="[ isLogInAct ? 'button--link__on' : ''  ]"
              v-on:click="showLogIn">
        {{ pLogInLabel }}
      </button>

      <button class="button--link"
              v-bind:class="[ isSignUpAct ? 'button--link__on' : ''  ]"
              v-on:click="showSignUp">
        {{ pCreateAccountLabel }}
      </button>
    </div>

    <x-login :welcomeMsg="pWelcomemsg"
             v-if="!isLogged && !isLoading && isLogInAct"
             v-on:login="login" />

    <x-signup :welcomeMsg="pWelcomemsg"
             v-if="!isLogged && !isLoading && isSignUpAct"
             v-on:signUp="signUp" />

    <div class="c-account__welcome-msg"
         v-if="isLogged && !isLoading">
      Welcome!
    </div>

    <div class="c-account__forms-msg"
          v-if="message.length > 0">
      {{ message }}
    </div>

    <div class="c-account__spinner">
      <x-spiner v-if="isLoading" />
    </div>
  </div>
</template>

<script>

const fetchPost = require('../../util/fetchPost')

export default {
  name: 'x-account',
  props: {
    pWelcomemsg: {
      type: String,
      default: ''
    },
    pCreateAccountLabel: {
      type: String,
      default: "Sig in"
    },
    pLogInLabel: {
      type: String,
      default: "Log in"
    }
  },
  computed: {
    isLogged: function() {
      return this.$store.state.user.logged;
    },
    isLoading: function() {
      return this.status == this.$constants.LOADING
    },
    isError: function() {
      return this.status == this.$constants.ERROR
    }
  },
  data: () => {
    return {
      status: "LOGIN",
      isLogInAct: true,
      isSignUpAct: false,
      message: " "
    }
  },
  methods: {
    showSignUp: function() {
      this.isLogInAct = false
      this.isSignUpAct = true
    },
    showLogIn: function() {
      this.isLogInAct = true
      this.isSignUpAct = false
    },
    signUp: function(email, password, repassword) {
      const self = this

      if (email.length <= 0) {
        this.message = "Email cannot be empty"
        return false
      }

      if (password.length <= 0) {
        this.message = "Password cannot be empty"
        return false
      }

      if (repassword != password) {
        this.message = "Repeat Password incorrect"
        return false
      }

      this.status = this.$constants.LOADING
      fetchPost.postData("api/Auth/Register", {
            username: email,
            email: email,
            password: password
        })
      .then((res) => {
        this.status = this.$constants.LOGGED
        self.message = ""
        self.$store.commit('logInUser', {
          id: res.id,
          token: res.token,
          tokenExpirationTime: res.tokenExpirationTime
        })
      })
      .catch((error) => {
        this.status = this.$constants.ERROR
        if (error.message == "400") {
          self.message = "Email or password incorect"
        } else {
          self.message = "Sorry, something goes wrong, try again later"
        }
      });


    },
    login: function(email, password) {
      const self = this

      if (email.length <= 0) {
        this.message = "Email cannot be empty"
        return false
      }

      if (password.length <= 0) {
        this.message = "Password cannot be empty"
        return false
      }

      this.status = this.$constants.LOADING
      fetchPost.postData("api/Auth/Login", {
            email: email,
            password: password
        })
      .then((res) => {
        this.status = this.$constants.LOGGED
        self.message = ""
        self.$store.commit('logInUser', {
          id: res.id,
          token: res.token,
          tokenExpirationTime: res.tokenExpirationTime
        })
      })
      .catch((error) => {
        this.status = this.$constants.ERROR
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
