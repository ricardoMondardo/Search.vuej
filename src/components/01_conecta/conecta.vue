<template>
  <div class="c-conecta">

    <div class="c-conecta__top-container">
      <div class="c-conecta__img-banner">
        <slot name="imgBanner" />
      </div>

      <div class="c-conecta__title">
        <slot name="title" />
      </div>

      <div class="c-conecta__subtitle">
        <slot name="subTitle" />
      </div>

      <div class="c-conecta__input-container">
        <input v-model="searchTerm"
              placeholder="Ex. Lorem"
              @keyup.enter="search">
        <button v-on:click="search">Search</button>
      </div>

      <div class="c-conecta__message">
        <span v-if="message.length > 0">
          {{ message }}
        </span>
      </div>
    </div>

    <div class="c-conecta__botton-container">
      <div v-if="loading" class="c-conecta__spiner">
        <x-spiner />
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
                     :pTotalPages="totalPages"
                     :pPageOf="PageOf" />
    </div>

  </div>
</template>

<script>

  var util = require('../99_util/Util');

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
            pagesFastAccess: [],
            totalItems: -1,
            totalPages: 0,
            totalItemsPage: 3,
            page: 0,
            loading: false,
            searchTerm: "",
            message: ""
          }
      },
    computed: {
      PageOf: function() {
        return this.page + ' of ' + this.totalPages;
      }
    },
    mounted() {

        this.page = util.getPageFromState()
        this.searchTerm = util.getQueryFromState();
        this.pagesFastAccess = util.getFastButtonsFromState();

        this.getdata(this.buildUrl());
    },
    methods: {
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

        return this.goToPage(nextPage);
      },
      previous: function() {
        var previous = this.page - 1;
        if (previous < 1) return false

        return this.goToPage(previous);
      },
      updateFastPagging: function() {

        const isPageInFast = (this.page >= this.pagesFastAccess[0] && this.page <= this.pagesFastAccess[2]);
        if (isPageInFast) return

        this.pagesFastAccess = [];
        this.pagesFastAccess.push(this.page);

        if (this.page + 1 <= this.totalPages) {
          this.pagesFastAccess.push(this.page + 1)
        }
        if (this.page + 2 <= this.totalPages) {
          this.pagesFastAccess.push(this.page + 2)
        }
      },
      tryGetFromLocal: function() {
        var arrAlreadyFetched = this.dataPages.find(obj => obj.Page == this.page);

        if (arrAlreadyFetched != undefined)
        {
          this.drugs = arrAlreadyFetched.arr;
          this.buildUrl();
          this.updateFastPagging();
          return true;
        }

        return false
      },
      search: function() {
          this.page = 1;
          var url = this.buildUrl()

          this.dataPages = [];

          this.getdata(url)
      },
      buildUrl: function() {
          var url = this.pUrl

          if(this.page <= 0) this.page = 1;

          url = this.searchTerm == "" ? `${url}?page=${this.page}&count=${this.totalItemsPage}`
            : `${url}?q=${this.searchTerm}&page=${this.page}&count=${this.totalItemsPage}`

          util.setStateInCookies(url, this.pagesFastAccess);

          return url;
      },
      getdata: function (url) {
          const self = this

          this.loading = true;

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

                return rObj;
              });

              var arrPage = {
                Page: myJson.Page,
                arr: arrObjs
              };

              if (myJson.IsInSitecore) {
                self.drugs = [arrObjs[0]];
                self.message = "You are in Sitecore, you'll get no more than one result here."
              } else {
                self.drugs = arrObjs;
              }

              self.dataPages.push(arrPage);
              self.loading = false;
              self.updateFastPagging();
            })
            .catch(function(e)
            {
              self.loading = false;
              self.message = "Some thing goes wrong, sorry."
              console.log(e)
              return false
            });
      }
    }
  }
</script>
