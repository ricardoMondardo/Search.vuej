<template>

  <div class="searchCard">
    <div class="searchCard__img">
      <a href="#">
        <img  :src="pImageSrc"
              width="100px"
              height="100px"/>
      </a>
    </div>
    <div class="searchCard__field-container">
      <x-field :pValue="pTitle"
              pTypeInfo="Item Title">
        <template v-slot:Label> <slot name="LabelTitle" /> </template>
      </x-field>

      <x-field :pValue="pCategory"
              pTypeInfo="Item Category">
        <template v-slot:Label> <slot name="LabelCategory" /> </template>
      </x-field>
    </div>

    <div class="searchCard__lock">
      <x-lock p-unlock/>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'x-card',
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
