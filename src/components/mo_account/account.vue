<template>
  <div class="site-content c-account">

    <x-buttonhamburger v-on:click="openTopMenu"/>

    <x-main-nav class="c-account__main-nav">
      <template slot="menu-items">
        <slot name="menu-items" />
      </template>
    </x-main-nav>

    <x-auth-nav
      class="c-account__auth_nav"
      v-on:logout="logout"
      :pHideLogin="false"/>

    <div v-if="!isStatusLoading">

      <div
        class="c-account__tabs"
        v-if="!isModeLogged && (isModeLogin || isModeSign)">
        <button
          class="c-button--link"
          v-bind:class="[ isModeLogin ? 'c-button--link__on' : ''  ]"
          v-on:click="showLogIn">
          {{ pLogInLabel }}
        </button>

        <button
          class="c-button--link"
          v-bind:class="[ isModeSign ? 'c-button--link__on' : ''  ]"
          v-on:click="showSignUp">
          {{ pCreateAccountLabel }}
        </button>
      </div>

      <x-login-form
        v-if="isModeLogin"
        p-place-holder-email="Email *"
        p-place-holder-password="Pass *"
        p-text-button="Log in"
        v-on:login="login"
        v-on:error="setMessages" />

      <x-signin-form
        v-if="isModeSign"
        p-place-holder-email="Email *"
        p-place-holder-password="Pass *"
        p-place-holder-second-password="Type again Pass *"
        p-text-button="Sig in"
        v-on:signin="signUp"
        v-on:error="setMessages"
        :pMinLength=9
        pMessageError="Password should have at least 9 chars" />

      <x-update-password-form
        v-if="isModeUpdatePass"
        p-place-holder-password="Pass *"
        p-place-holder-second-password="Type again Pass *"
        p-text-button="Update"
        p-message-error="Password should have at least 9 chars"
        :pMinLength=9
        v-on:update="updatepass"
        v-on:error="setMessages" />


      <x-send-link-by-email-form
        v-if="isModeSendLickActive || isModeSendLickForgot"
        p-place-holder-field="Email"
        :p-text-button="textNutton"
        v-on:sendLink="sendLink"
        v-on:error="setMessages" />

      <div
        class="c-account__welcome-msg"
        v-if="isModeLogged">
        <x-user-card
          :p-name="username"
          :p-email="email"
          :p-active="active"
          v-on:active="showSendLinkActive"
          />
      </div>

    </div>
    <div
      class="c-account__spinner"
      v-else>
      <x-spinner />
    </div>

    <div class="c-account__send-link-buttons">
      <button
        class="c-button"
        v-on:click="showSendLinkActive">
        Send link active account
      </button>

      <button
        class="c-button"
        v-if="!isModeLogged"
        v-on:click="showSendLinkForgot">
        Forgot password
      </button>

      <button
        class="c-button"
        v-if="isModeLogged"
        v-on:click="showUpdatePass">
        Update password
      </button>
    </div>

    <ul
      class="c-account__forms-msg"
      v-if="messages.length > 0">
      <li
        v-for="item in messages"
        :key="item">
        {{ item }}
      </li>
    </ul>

  </div>

</template>
<script>

const fetchPost = require('../../util/fetchPost')
const fetchGet = require('../../util/fetchGet')

export default {
  name: 'x-account',
  props: {
    pWelcomeMsg: {
      type: String,
      default: ''
    },
    pCreateAccountLabel: {
      type: String,
      default: "Sign in"
    },
    pLogInLabel: {
      type: String,
      default: "Log in"
    },
    pComeFromActiveLink: {
      type: Boolean,
      default: false
    },
    pComeFromForgotLink: {
      type: Boolean,
      default: false
    },
    pUserActiveCode: {
      type: String,
      default: ""
    },
    pEmail: {
      type: String,
      default: " "
    }
  },
  mounted() {
    if(this.pComeFromActiveLink || this.pComeFromForgotLink) {
      if(this.pUserActiveCode.length > 0) {
        this.logInUserWithCode()
      }
    } else {
      if ( this.$store.state.user.logged ) {
        this.showLogged()
      } else {
        this.showLogIn()
      }
    }
  },
  data: () => {
    return {
      status: "",
      mode: '',
      email: "",
      username: "",
      active: "",
      password: "",
      messages: []
    }
  },
  computed: {
    isModeLogged: function() {
      return this.mode == this.$constants.AccountPageMode.LOGGED
    },
    isModeLogin: function() {
      return this.mode == this.$constants.AccountPageMode.LOGIN
    },
    isModeSign: function() {
      return this.mode == this.$constants.AccountPageMode.SIGNIN
    },
    isModeUpdatePass: function() {
      return this.mode == this.$constants.AccountPageMode.UPDATEPASS
    },
    isModeSendLickActive: function() {
      return this.mode == this.$constants.AccountPageMode.SENDLINKACTIVE
    },
    isModeSendLickForgot: function() {
      return this.mode == this.$constants.AccountPageMode.SENDLINKFORGOT
    },
    isStatusInitial: function() {
      return this.status == this.$constants.AccountPageStatusControl.INITIAL
    },
    isStatusLoading: function() {
      return this.status == this.$constants.AccountPageStatusControl.LOADING
    },
    isStatusError: function() {
      return this.status == this.$constants.AccountPageStatusControl.ERROR
    },
    textNutton: function() {
      return this.isModeSendLickActive ? "Send active link" : "Send forgot link"
    }
  },
  methods: {
    openTopMenu: function() {
      this.$store.commit('openTopMenu', !this.$store.state.UIControl.showTopMenu)
    },
    showLogged: function() {
      const self = this
      const inInFractal = window.location.port == "3000"
      const url = inInFractal ? `https://localhost:5001/api/user/getUserData` : `/api/user/getUserData`

      fetchGet.getData(url, this.$store.state.user.token)
        .then((res) => {
          self.username = res.name
          self.active = res.active

          self.changeMode(this.$constants.AccountPageMode.LOGGED)
        })
        .catch((error) => { self.handleErrorPost(error) })
    },
    showSignUp: function() {
      this.changeMode(this.$constants.AccountPageMode.SIGNIN)
    },
    showLogIn: function() {
      this.changeMode(this.$constants.AccountPageMode.LOGIN)
    },
    showSendLinkActive: function() {
      this.changeMode(this.$constants.AccountPageMode.SENDLINKACTIVE)
    },
    showSendLinkForgot: function() {
      this.changeMode(this.$constants.AccountPageMode.SENDLINKFORGOT)
    },
    showUpdatePass: function() {
      this.changeMode(this.$constants.AccountPageMode.UPDATEPASS)
    },
    changeMode: function(mode) {
      this.status = this.$constants.AccountPageStatusControl.INITIAL
      this.messages = []
      this.mode = mode
    },
    logout: function() {
      this.$store.commit('logOutUser')
      this.showLogIn()
    },
    login: function(email, password) {
      const self = this
      this.messages = []
      this.email = email

      this.status = this.$constants.AccountPageStatusControl.LOADING
      fetchPost.postData("api/Auth/Login", {
            email: email,
            password: password
        })
      .then((res) => {
        self.status = this.$constants.AccountPageStatusControl.INITIAL
        self.$store.commit('logInUser', {
          id: res.id,
          token: res.token,
          tokenExpirationTime: res.tokenExpirationTime
        })
        self.showLogged()
      })
      .catch((error) => {
        self.handleErrorPost(error)
      });
    },
    logInUserWithCode: function() {
      const self = this
      this.messages = []
      this.email = this.pEmail

      this.status = this.$constants.AccountPageStatusControl.LOADING
      fetchPost.postData("api/Auth/loginWithActiveCode", {
            email: this.pEmail,
            password: this.pUserActiveCode
        })
      .then((res) => {
        self.status = this.$constants.AccountPageStatusControl.INITIAL
        self.$store.commit('logInUser', {
          id: res.id,
          token: res.token,
          tokenExpirationTime: res.tokenExpirationTime
        })
        if (self.pComeFromForgotLink) {
          this.showUpdatePass()
        } else {
          this.showLogged()
        }
      })
      .catch((error) => {
        this.handleErrorPost(error)
      });
    },
    signUp: function(email, password) {
      const self = this
      this.messages = []
      this.email = email

      this.status = this.$constants.AccountPageStatusControl.LOADING
      fetchPost.postData("api/Auth/Register", {
            username: email,
            email: email,
            password: password
        })
      .then((res) => {
        self.status = this.$constants.AccountPageStatusControl.INITIAL
        self.$store.commit('logInUser', {
          id: res.id,
          token: res.token,
          tokenExpirationTime: res.tokenExpirationTime
        })
        self.showLogged()
      })
      .catch((error) => {
        self.handleErrorPost(error)
      });
    },
    sendLink: function(email) {
      const self = this
      var isForgot = this.isModeSendLickForgot ? "S" : "N"

      this.messages = []
      this.status = this.$constants.AccountPageStatusControl.LOADING
      fetchPost.postData(`api/Auth/sendlinkactive?email=${email}&forgot=${isForgot}`)
      .then((res) => {
        self.status = this.$constants.AccountPageStatusControl.INITIAL
        self.showLogIn()
        self.messages.push("Please, check your email")
      })
      .catch((error) => {
        self.handleErrorPost(error)
      });
    },
    updatepass: function(email, pass) {
      const self = this
      this.messages = []
      this.status = this.$constants.AccountPageStatusControl.INITIAL

      var token = this.$store.state.user.token
      var data = {
        pass: pass
      }

      fetchPost.postData(`api/user/updatepass`, data, token)
      .then((res) => {
        self.status = this.$constants.AccountPageStatusControl.INITIAL
      this.showLogIn()
      this.messages = ["Your password has been updated"]
      })
      .catch((error) => {
        self.handleErrorPost(error)
      });



    },
    handleErrorPost: function(error) {

      this.showLogIn()
      this.status = this.$constants.AccountPageStatusControl.ERROR
      this.messages = []

      if(error.code != undefined) {
        if(error.code == '404') {
          this.messages.push("Email not found")
        } else if(error.code == '401') {
           this.messages.push("Email or Password invalid or Invalid Active Token")
           this.messages.push("Please, try to ask for a new link")
        } else if(error.code == '400') {
          error.data.then((data) => {
            if(data.title != undefined) this.messages.push(data.title)

            if(data.errors.email != undefined
                && data.errors.email.length > 0) this.messages = this.messages.concat(data.errors.email)

            if(data.errors.email != undefined
              && data.errors.email.length > 0) this.messages = this.messages.concat(data.errors.password)
          }).catch(() => {
            this.messages.push("Please, try again later")
          })
        } else {
          this.messages.push("Please, try again later")
        }
      } else {
        this.messages.push("Sorry, something wrong happen!")
      }
    },
    setMessages: function(messages) {
      this.messages = [messages]
    }
  }
}
</script>
