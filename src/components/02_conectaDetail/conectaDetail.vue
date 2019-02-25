<template>
  <div class="c-conectaDetail">
    <div class="c-conectaDetail__title">
        <slot name="TopText" />
    </div>

    <div class="c-conectaDetail__top-container">
      <div class="c-conectaDetail__img">
        <img :src="drug.ImageUrl" />
      </div>

      <div class="c-conectaDetail__top-fields">
        <x-field :pValue="drug.Name"
                 pTypeInfo="Item Name">
          <template v-slot:Label> <slot name="LabelTitle" /> </template>
        </x-field>

        <x-field :pValue="drug.Category"
                 pTypeInfo="Item Category">
          <template v-slot:Label> <slot name="LabelCategory" /> </template>
        </x-field>
      </div>
    </div>

    <div class="c-conectaDetail__botton-container">
      <x-field :pValue="drug.Organism"
               pTypeInfo="Item Organism">
        <template v-slot:Label> <slot name="LabelOrganism" /> </template>
      </x-field>

      <x-field :pValue="drug.Accession"
              pTypeInfo="Item Accession">
        <template v-slot:Label> <slot name="LabelAccession" /> </template>
      </x-field>

      <x-field :pValue="drug.Gene"
              pTypeInfo="Item Gene">
        <template v-slot:Label> <slot name="LabelGene" /> </template>
      </x-field>
    </div>

    <div class="c-conectaDetail__botton">
      <slot name="conectaDetailBotton" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-conectadetail',
    props: {
      pUrl: {
        type: String,
        default: "/api/drugsApi/drugs"
      },
      pHost: {
        type: String,
        default: "/conecta"
      }
    },
    data: () => {
        return {
          drug: {},
          loading: true,
          message: "",
          host: ''
        }
    },
    created() {
      this.getData()
    },
    methods: {
      getData: function() {
        const self = this
        var url = self.pUrl
        var obj = {}

        fetch(url)
          .then(function(response) {
            return response.json();
          })
          .then(function(myJson) {

            var obj = {
              Id: myJson.Data.ID,
              Name: myJson.Data.DRUG_NAME,
              Category: myJson.Data.TARGET_CLASS,
              Organism: myJson.Data.ORGANISM,
              Accession: myJson.Data.ACCESSION,
              Gene: myJson.Data.GENE,
              ImageUrl: myJson.Data.IMAGE_URL,
              IsExperience: myJson.Data.IS_EXPERIENCE
            };

            self.drug = obj;
            console.log(aaa);
          })
          .catch(function(e)
          {
            return console.log(e)
          });

        return
      }
    }
  }
</script>
