<template>
  <v-app>
    <v-main>
        <v-container grid-list-md class="scrollable" v-if="Object.keys(this.fullObject).length > 0">
            <v-card
              class="mx-auto my-12"
              max-width="374"
              v-for="item in this.boilerplate"
              :key="item.id"
              @click="searchLocation(item)"
            >
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-img
                height="250"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              ></v-img>
              
              <v-card-title >{{item.name}}</v-card-title>

              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <v-rating
                    :value= item.rating
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>

                  <div class="grey--text ms-4">
                    {{item.rating}}
                  </div>
                </v-row>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-actions>
                <v-btn
                  color="deep-purple lighten-2"
                  text
                >
                  Reserve
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "SearchResults",
  components: {
  },
  data: () => ({
    boilerplate: {},
    newSearchLocation: {},
  }),
  props:{
    fullObject: Object,
  },
  watch: {
    fullObject:{
      deep: true,
      handler(){
        this.boilerplate = this.fullObject.results.map((item)=>{
          return{
              name: item.name,
              address: item.address,
              rating: item.rating,
              lat: item.geometry.location.lat,
              lng: item.geometry.location.lng,
          };
        })
      }
    },
    newSearchLocation: {
      deep: true,
      async handler() {
        this.$emit("input", {newSearchLocation: this.newSearchLocation});
      }
    },
  },
  methods: {
    searchLocation(item){
      //new location coordinates
      this.newSearchLocation = { lat: item.lat, lng: item.lng };
    },
  },
};
</script>

<style scoped>
  .scrollable{
    overflow-y: scroll;
    max-height: 50rem;
  }
</style>
