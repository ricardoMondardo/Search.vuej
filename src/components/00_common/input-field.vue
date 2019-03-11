<template>
  <input class="input"
        :placeholder="pPlaceHolder"
        :pValue="pValue"
        v-on:keyup.enter="$emit('enter')">
</template>

<script>
export default {
  name: 'x-input',
  props: {
    pPlaceHolder: {
      type: String,
      default: 'Type some text'
    },
    pValue: {
      type: String,
      default: ''
    }
  }
}
</script>

