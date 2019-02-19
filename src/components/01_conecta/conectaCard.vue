<template>
  <div class="c-conecta__card">
    <img  v-bind:src="pImageSrc" class="c-conecta__img-card" />
    <div class="c-conecta__img-card-fields">
      <div class="c-conecta__img-card-field">
        <span class="c-conecta__img-card-field-label"> Title: </span>
        <a v-bind:href="'ConectaDetail/id=' + pId" class="c-conecta__list-link">{{ pTitle }}</a>
      </div>
      <div class="c-conecta__img-card-field">
        <span class="c-conecta__img-card-field-label"> Category: </span>
        <a> Lorem isopum </a>
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
