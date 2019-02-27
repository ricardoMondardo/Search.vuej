<template>

  <div class="conectaCard">
    <div class="conectaCard__img">
      <a href="#">
        <img  :src="pImageSrc"
              width="100px"
              height="100px"/>
      </a>
    </div>
    <div class="conectaCard__field-container">
      <x-field :pValue="pTitle"
              pTypeInfo="Item Title">
        <template v-slot:Label> <slot name="LabelTitle" /> </template>
      </x-field>

      <x-field :pValue="pCategory"
              pTypeInfo="Item Category">
        <template v-slot:Label> <slot name="LabelCategory" /> </template>
      </x-field>
    </div>

    <div class="conectaCard__lock">
      <x-lock :pLock="false"/>
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
      pCategory: {
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
