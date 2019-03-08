<template>
  <div class="site-content c-search">

    <x-buttonhamburger />

    <x-main-nav>
      <template slot="menu-items">
        <slot name="menu-items" />
      </template>
    </x-main-nav>

     <x-auth-op />

    <div class="c-search__top-container">
      <div class="c-search__img-banner">
        <img :src="pImgbanner" />
      </div>

      <div class="c-search__title">
        {{ pTitle }}
      </div>

      <div class="c-search__subtitle">
        {{ pSubtitle }}
      </div>

      <div class="c-search__input-container">
        <input v-model="searchTerm"
              placeholder="Ex. Lorem"
              @keyup.enter="search">
        <button v-on:click="search">Search</button>
      </div>

      <div class="c-search__message">
        <span v-if="message.length > 0">
          {{ message }}
        </span>
      </div>
    </div>

    <div class="c-search__pagination">
      <x-paggination v-on:next="next"
                     v-on:previous="previous"
                     v-on:goToPage="goToPage"
                     :pPagesFastAccess="pagesFastAccess"
                     :pPage="page"
                     :pTotalPages="totalPages"
                     :pPageOf="PageOf" />
    </div>

    <div class="c-search__botton-container">
      <div v-if="loading" class="c-search__spiner">
        <x-spiner />
      </div>
      <div v-else>
        <x-list :pCollection="drugs">
          <template v-slot:CardLaLabelTitle>
            {{ pCardlabeltitle }}
          </template>
          <template v-slot:CardLabelCategory>
            {{ pCardlabelcategory }}
          </template>
        </x-list>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'x-search',
    props: {
      pUrl: {
        type: String,
        default: ""
      },
      pTitle: {
        type: String,
        default: ""
      },
      pSubtitle: {
        type: String,
        default: "Defaut value"
      },
      pImgbanner: {
        type: String,
        default: ""
      },
      pImgbannermd: {
        type: String,
        default: ""
      },
      pCardlabeltitle: {
        type: String,
        default: ""
      },
      pCardlabelcategory: {
        type: String,
        default: ""
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
            page: -1,
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
    // mounted() {
    //
    // },
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

          url = this.searchTerm == "" ? `${url}?PageNumber=${this.page}&PageSize=${this.totalItemsPage}`
            : `${url}?q=${this.searchTerm}&PageNumber=${this.page}&PageSize=${this.totalItemsPage}`

          return url;
      },
      getdata: function (url) {
          const self = this

          this.loading = true;
          this.message = "";

          const fetchGet = require('../../util/fetchGet')

          fetchGet.getData(url, this.$store.state.user.token)
            .then((res) => {

              self.totalItems = res.paging.totalItems;
              self.totalPages = res.paging.totalPages;
              self.page = res.paging.pageNumber;

              var arrObjs = res.items.map(obj => {
                var rObj = { }

                rObj["Id"] = obj.id
                rObj["Title"] = obj.description
                rObj["ImgSrc"] = "https://localhost:5001/img/img-place-holder.jpg"

                return rObj;
              });

              var arrPage = {
                Page: self.page,
                arr: arrObjs
              };

              self.drugs = arrObjs;
              self.dataPages.push(arrPage);
              self.loading = false;
              self.updateFastPagging();
            })
            .catch(function(error)
            {
              self.loading = false;

              if (error.message == "401") {
                self.message = "401 - UnAuthorized."
                self.drugs = []
                self.dataPages = []
                this.$store.commit('logOutUser')
              } else {
                self.message = "Some thing goes wrong, sorry."
                console.log(e)
              }

              return false
            });
      }
    }
  }
</script>
