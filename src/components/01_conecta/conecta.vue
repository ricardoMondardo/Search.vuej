<template>
  <div class="c-conecta">

    <div class="c-conecta__top-container">
      <div class="c-conecta__img-banner">
        <slot name="imgBanner" />
      </div>

      <div class="c-conecta__title">
        <div class="slot-wrapper">
          <slot name="conectaTop" />
        </div>
      </div>

      <div class="c-conecta__subtitle">
        <slot name="subTitle" />
      </div>

      <div class="c-conecta__input-container">
        <input v-model="message"
              placeholder="Ex. Lorem"
              @keyup.enter="search">
        <button v-on:click="search">Search</button>
      </div>
    </div>

    <div v-if="!errorReq">
      {{ errorMsg }}
    </div>

    <div class="c-conecta__botton-container">
      <div v-if="loading">
        Loading...
      </div>
      <div v-else>
        <x-conectaList :pCollection="drugs">
          <template v-slot:CardLaLabelTitle>
              <slot name="cardLabelTitle" />
          </template>
          <template v-slot:CardLabelCategory>
            <slot name="cardLabelCategory" />
          </template>
        </x-conectaList>
      </div>
    </div>

    <div class="c-conecta__pagination">
      <x-paggination v-on:next="next"
                     v-on:previous="previous"
                     v-on:goToPage="goToPage"
                     :pPagesFastAccess="pagesFastAccess"
                     :pPage="page"
                     :pTotalPages="totalPages" />
    </div>

  </div>
</template>

<script>
  export default {
    name: 'x-conecta',
    props: {
      pUrl: {
        type: String,
        default: "/api/drugsApi/drugs"
      }
    },
    data: () => {
          return {
            drugs: [],
            dataPages: [],
            pagesFastAccess: [1,2,3],
            totalItems: -1,
            totalPages: 0,
            totalItemsPage: 3,
            page: 0,
            loading: false,
            errorReq: false,
            errorMsg: "",
            message: ""
          }
      },
    // computed: {
    //   shouldDisable: function() {
    //     return page == pagesFastAccess[0] || pagesFastAccess[0] == null;
    //   }
    // },
    // mounted() {
    //     console.log(this.$el.getElementsByClassName("slot-wrapper")[0].innerHTML);
    // },
    methods: {
      test: function() {
        console.log('test')
      },
      goToPage: function(page) {
        if (page > this.totalPages || page < 0) return false

        this.page = page;

        if (!this.tryGetFromLocal()) {
          this.getdata(this.buildUrl())
        };

        return false;
      },
      next: function() {
        var nextPage = this.page + 1;
        if (nextPage > this.totalPages) return false

        this.page = nextPage;
        this.updateFastPagging();

        if (!this.tryGetFromLocal()) {
          this.getdata(this.buildUrl())
        };

        return false;
      },
      previous: function() {
        var previous = this.page - 1;
        if (previous < 1) return false

        this.page = previous;
        this.updateFastPagging();

        if (!this.tryGetFromLocal()) {
          this.getdata(this.buildUrl())
        };

        return false;
      },
      updateFastPagging: function() {

        if (this.page > this.pagesFastAccess[2] || this.page < this.pagesFastAccess[0])
        {
          var count = 0;
          this.pagesFastAccess = [];

          for (var i = this.page; i <= this.totalPages; i++ ) {

            if (count > 3) return;

            this.pagesFastAccess.push(this.page + count);
            count++
          }

        }

      },
      tryGetFromLocal: function() {
        var arrAlreadyFetched = this.dataPages.find(obj => obj.Page == this.page);

        if (arrAlreadyFetched != undefined)
        {
          this.drugs = arrAlreadyFetched.arr;
          return true;
        }

        return false
      },
      search: function() {
          this.page = 1
          var url = this.buildUrl()

          this.dataPages = [];

          this.getdata(url)
      },
      buildUrl: function() {
          var url = this.pUrl

          url = this.message == "" ? `${url}?page=${this.page}&count=${this.totalItemsPage}`
            : `${url}?q=${this.message}&page=${this.page}&count=${this.totalItemsPage}`

          return url;
      },
      getdata: function (url) {
          const self = this

          this.loading = true;
          this.ErrorReq = false;
          this.ErrorMsg = "";

          fetch(url)
            .then(function(response) {
              return response.json();
            })
            .then(function(myJson) {

              self.totalItems = myJson.TotalItems;
              self.totalPages = myJson.TotalPages;
              self.page = myJson.Page;

              var arrObjs = myJson.Data.map(obj => {
                var rObj = { }

                rObj["Id"] = obj.ID
                rObj["Title"] = obj.DRUG_NAME
                rObj["Category"] = obj.TARGET_CLASS
                rObj["Image"] = obj.IMAGE_URL
                rObj["IsExperience"] = obj.IS_EXPERIENCE

                return rObj;
              });

              var arrPage = {
                Page: myJson.Page,
                arr: arrObjs
              };

              self.dataPages.push(arrPage);
              self.drugs = arrObjs;
              self.loading = false;
            })
            .catch(function(e)
            {
              self.loading = false;
              self.ErrorMsg = "Some thing goes wrong, sorry."
              self.ErrorReq = true;
              return false
            });
      }
    }
  }
</script>
