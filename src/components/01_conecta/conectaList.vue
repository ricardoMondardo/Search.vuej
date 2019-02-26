<template>
  <div class="conectaList">
    <ul v-if="pCollection.length > 0">
      <li v-for="item in pCollection">
          <x-conectaCard
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

          </x-conectaCard>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'x-conectaList',
    props: {
      pCollection: {
        type: [Array, Object],
        required: true
      }
    }
  }
</script>
