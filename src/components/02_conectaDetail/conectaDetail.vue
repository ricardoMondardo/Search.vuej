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

        <div>
          <span style="font-weight: bolder; padding: 1.5px 0px;"> <slot name="LabelMoaLink" /> </span>
          <a :href="drug.LinkMoa"
              target="_blank"> {{ this.createLink(drug.LinkMoa) }}
          </a>
        </div>

        <div>
          <span style="font-weight: bolder; padding: 1.5px 0px;"> <slot name="LabelActLink" /> </span>
          <a :href="drug.LinkAct"
              target="_blank"> {{ this.createLink(drug.LinkAct) }}
          </a>
        </div>

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
      createLink: function(obj) {
          if (obj != undefined && obj != null)
          {
            return obj.length <= 0 ? "No data has found" : ( obj.length <= 45 ? obj : obj.substr(0,45) + "...");
          } else {
            return "No data has found"
          }
      },
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
              LinkMoa: myJson.Data.MOA_SOURCE_URL,
              LinkAct: myJson.Data.ACT_SOURCE_URL,
              IsExperience: myJson.Data.IS_EXPERIENCE
            };

            self.drug = obj;
            console.log('aaa');
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
