<template>
  <div class="field">
    <span class="field__label"> <slot name="Label" /> </span>
    {{ pValue }}
  </div>
</template>


<script>
export default {
  name: 'x-field',
  props: {
    pValue: {
      type: String
    }
  }
}
</script>

