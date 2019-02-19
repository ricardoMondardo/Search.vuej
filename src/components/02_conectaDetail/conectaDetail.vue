<template>
  <div class="c-conectaDetail">

    <div class="c-conectaDetail__top-container">
      <div class="c-conectaDetail__img-banner">
        <slot name="imgBannerDetail" />
      </div>

      <div class="c-conectaDetail__title">
        <slot name="LabelTitle" />
      </div>
    </div>

    <div class="c-conectaDetail__item">
      <div class="c-conectaDetail__item-name">
        <span class="c-conectaDetail__item-title">
          {{ drug.Title || "Information from API"}}
        </span>
      </div>

      <div class="c-conectaDetail__top clearfix">
        <div class="c-conectaDetail__top-left">
          <div class="c-conectaDetail__item-img">
            <slot name="ImageMedicin" />
          </div>
        </div>

        <div v-if="drug.TargetName || drug.IsExperience == undefined" class="c-conectaDetail__top-right">
          <div class="c-conectaDetail__container-item">
            <span class="c-conectaDetail__item-label">
              <slot name="LabelTargetName" />
            </span>
            <span class="c-conectaDetail__item-value">
              {{ drug.TargetName || "Information from API"}}
            </span>
          </div>

          <div v-if="drug.TargetClass || drug.IsExperience == undefined" class="c-conectaDetail__container-item">
            <span class="c-conectaDetail__item-label">
              <slot name="LabelTargetClass" />
            </span>
            <span class="c-conectaDetail__item-value">
              {{ drug.TargetClass || "Information from API"}}
            </span>
          </div>
        </div>
      </div>

      <hr>

      <div v-if="drug.Accession || drug.IsExperience == undefined" class="c-conectaDetail__container-item">
        <span class="c-conectaDetail__item-label">
          <slot name="LabelAccession" />
        </span>
        <span class="c-conectaDetail__item-value">
          {{ drug.Accession || "Information from API"}}
        </span>
      </div>

      <div v-if="drug.Gene || drug.IsExperience == undefined" class="c-conectaDetail__container-item">
        <span class="c-conectaDetail__item-label">
          <slot name="LabelGene" />
        </span>
        <span class="c-conectaDetail__item-value">
          {{ drug.Gene || "Information from API"}}
        </span>
      </div>

      <div v-if="drug.ActValue || drug.IsExperience == undefined" class="c-conectaDetail__container-item">
        <span class="c-conectaDetail__item-label">
          <slot name="LabelActValue" />
        </span>
        <span class="c-conectaDetail__item-value">
          {{ drug.ActValue || "Information from API"}}
        </span>
      </div>

      <div v-if="drug.ActType || drug.IsExperience == undefined" class="c-conectaDetail__container-item">
        <span class="c-conectaDetail__item-label">
          <slot name="LabelActType" />
        </span>
        <span class="c-conectaDetail__item-value">
          {{ drug.ActType || "Information from API"}}
        </span>
      </div>

      <div v-if="drug.ActSourceUrl || drug.IsExperience == undefined" class="c-conectaDetail__container-item">
        <span class="c-conectaDetail__item-label">
          <slot name="LabelActSourceUrl" />
        </span>
        <span class="c-conectaDetail__item-value">
          {{ drug.ActSourceUrl || "Information from API"}}
        </span>
      </div>

      <div v-if="drug.MoaSource || drug.IsExperience == undefined" class="c-conectaDetail__container-item">
        <span class="c-conectaDetail__item-label">
          <slot name="LabelMoaSource" />
        </span>
        <span class="c-conectaDetail__item-value">
          {{ drug.MoaSource || "Information from API"}}
        </span>
      </div>

      <div v-if="drug.Organism || drug.IsExperience == undefined" class="c-conectaDetail__container-item">
        <span class="c-conectaDetail__item-label">
          <slot name="LabelOrganism" />
        </span>
        <span class="c-conectaDetail__item-value">
          {{ drug.Organism || "Information from API"}}
        </span>
      </div>

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
      }
    },
    data: () => {
        return {
          drug: {},
          loading: true,
          message: ""
        }
    },
    created() {
      this.drug = this.getData()
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
              Title: myJson.Data.DRUG_NAME,
              Organism: myJson.Data.ORGANISM,
              TargetName: myJson.Data.TARGET_NAME,
              TargetClass: myJson.Data.TARGET_CLASS,
              Accession: myJson.Data.ACCESSION,
              Gene: myJson.Data.GENE,
              ActValue: myJson.Data.ACT_VALUE,
              ActType: myJson.Data.ACT_TYPE,
              ActSourceUrl: myJson.Data.ACT_SOURCE_URL,
              MoaSource: myJson.Data.MOA_SOURCE,
              IsExperience: myJson.Data.IS_EXPERIENCE
            };

            self.drug = obj;
            console.log(self.drug);
          })
          .catch(function(e)
          {
            return console.log(e)
          });

        return obj;
      }
    }
  }
</script>
