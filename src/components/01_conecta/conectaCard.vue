<template>

  <div class="conectaCard">
    <div class="conectaCard__img">
      <a v-bind:href="'ConectaDetail/id=' + pId">
        <img  v-bind:src="pImageSrc" width="100px" height="100px"/>
      </a>
    </div>
    <div class="conectaCard__field-container">
      <div class="conectaCard__field">
        <span class="conectaCard__field-label"> <slot name="LabelTitle" /> </span>
        {{ pTitle }}
      </div>
      <div class="conectaCard__field">
        <span class="conectaCard__field-label"> <slot name="LabelCategory" /> </span>
        Lorem isopum iso
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'x-conectaCard',
    props: {
      pId: {
        type: String,
        default: ""
      },
      pTitle: {
        type: String,
        default: ""
      },
      pImageSrc: {
        type: String,
        default: ""
      }
    }
  }
</script>
