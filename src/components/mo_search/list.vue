<template>
  <div class="searchList">
    <ul v-if="pCollection != undefined && pCollection.length > 0">
      <li v-for="item in pCollection" :key="item.id">
          <x-card
            :pId="item.Id"
            :pTitle="item.Title"
            :pImageSrc="item.ImgSrc"
            :pCategory="item.Category">

            <template v-slot:LabelTitle>
              <slot name="CardLaLabelTitle" />
            </template>

            <template v-slot:LabelCategory>
              <slot name="CardLabelCategory" />
            </template>

          </x-card>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'x-list',
    props: {
      pCollection: {
        type: [Array, Object],
        required: false
      }
    }
  }
</script>
