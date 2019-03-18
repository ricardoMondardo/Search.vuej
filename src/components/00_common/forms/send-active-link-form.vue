<template>
  <div class="c-login-form">
    <x-input-email pPlaceHolder="Email"
                  v-model="email"  />

    <button  class="button button--large button--color"
             v-on:click="sendActiveLink" >
      Send link
    </button>
  </div>
</template>


<script>
export default {
  name: 'x-send-active-link-form',
  props: {
    pPlaceHolder: {
      type: String,
      default: "Type something"
    }
  },
  data: () => {
    return {
      email: ""
    }
  },
  methods: {
    sendActiveLink: function() {

      if (this.email.length <= 0) {
        this.$emit('setMessages', ["Email cannot be null"])
        return false
      }

      this.$emit('sendActiveLink', this.email)
    }
  }
}
</script>

