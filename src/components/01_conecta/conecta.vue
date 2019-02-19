<template>
  <div class="c-conecta">

    <div class="c-conecta__top-container">
      <div class="c-conecta__img-banner">
        <slot name="imgBanner" />
      </div>

      <div class="c-conecta__title">
        <slot name="conectaTop" />
      </div>

      <div class="c-conecta__subtitle">
        <slot name="subTitle" />
      </div>

      <div class="c-conecta__input-container">
        <input v-model="message"
              placeholder="Ex. Lorem">
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
        <x-conectaList  v-bind:pCollection="drugs"/>
      </div>
    </div>

    <div class="c-conecta__pagination">
      <button v-on:click="previous"
              v-bind:disabled="(page - 1) <= 0">
              Previous Page
      </button>

      <span v-if="page > 0">
        <button v-on:click="goToPage(pagesFastAccess[0])"
                v-bind:disabled="page == pagesFastAccess[0]"
                class="c-conecta__fast-button-page">
          {{ pagesFastAccess[0] || "..." }}
        </button>

        <button v-on:click="goToPage(pagesFastAccess[1])"
                v-bind:disabled="page == pagesFastAccess[1]"
                class="c-conecta__fast-button-page">
          {{ pagesFastAccess[1] || "..." }}
        </button>

        <button v-on:click="goToPage(pagesFastAccess[2])"
                v-bind:disabled="page == pagesFastAccess[2]"
                class="c-conecta__fast-button-page">
          {{ pagesFastAccess[2] || "..." }}
        </button>
      </span>
      <span v-else>
        <button> ... </button>
      </span>

      <button v-on:click="next"
              v-bind:disabled="(page + 1) > totalPages">
        Next Page
      </button>

      <!-- <div v-if="page > 0"> Page: {{ page }} </div>
      <div v-if="page > 0"> Total Page: {{ totalPages }} </div> -->
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
            totalItems: 0,
            totalPages: 0,
            totalItemsPage: 3,
            page: 0,
            loading: false,
            errorReq: false,
            errorMsg: "",
            message: ""
          }
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
