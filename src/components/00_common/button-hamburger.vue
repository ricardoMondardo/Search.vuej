<template>
  <button style="border: none; background: none;"
          v-on:click="$emit('action')">
    <div class="c-button-hamburger"
          v-on:click="click" >
      <div class="c-button-hamburger__bar1"></div>
      <div class="c-button-hamburger__bar2"></div>
      <div class="c-button-hamburger__bar3"></div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'x-buttonhamburger',
  methods: {
    click: function(e) {

      const parent = e.target.children.length > 0 ? e.target : e.target.parentElement

      if (parent != undefined && parent.children.length > 0) {
        parent.children[0].classList.toggle('c-button-hamburger__bar1--on')
        parent.children[1].classList.toggle('c-button-hamburger__bar2--on')
        parent.children[2].classList.toggle('c-button-hamburger__bar3--on')
      }

      this.$store.commit('toogleTopMenu')

    }
  }
}
</script>
