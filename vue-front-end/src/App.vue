<template>
  <v-app class="main">
    <v-main>
      <v-container  grid-list-md>
        <v-layout wrap>
          <v-flex md12>
            <v-card outlined>
              <v-list-item v-if="!leafletValues.position">
                <v-list-item-avatar size="60">
                  <v-icon dark
                    large
                    class="
                      primary white--text`
                    "
                  >mdi-map-marker</v-icon
                  >
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="title"
                    @click="searchLocation">No Location selected</v-list-item-title>
                  <v-text-field
                    label="Search: Food or Events"
                    placeholder="Ex: Basketball or Pasta"
                    outlined
                    v-model= "searchEvents"
                  ></v-text-field>
                  <v-text-field
                    label="Search: Location"
                    placeholder="Ex: Irvine or Korea"
                    outlined
                    v-model= "searchLocations"
                  ></v-text-field>
                  <v-btn depressed @click="searchButton">
                    Search
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-else>
                <v-list-item-avatar size="60">
                  <v-icon
                    large
                    class="
                      success white--text
                    "
                  >mdi-map-marker-check</v-icon
                  >
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="title text-wrap">{{
                    leafletValues.address
                  }}</v-list-item-title>
                  <v-list-item-subtitle>
                    Latitude: {{ leafletValues.position.lat }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Longitude: {{ leafletValues.position.lng }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn color="error" @click="reset">Reset</v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-card>
          </v-flex>
            <SearchResults v-model="newSearch" :fullObject="fullObject"  />
          <v-flex xs12 md8>
            <v-sheet>
              <div style="width:100%;height: 500px">
                <GeolocationSelector v-model="leafletValues" :fullObject="fullObject" :newSearch="newSearch" :key="key" />
              </div>
            </v-sheet>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GeolocationSelector from "./components/GeolocationSelectorMap";
import SearchResults from "./components/SearchResults";

import axios from 'axios'

export default {
  name: "App",
  components: {
    GeolocationSelector,
    SearchResults
  },
  data: () => ({
    dialog: false,
    leafletValues: {},
    newSearch: {},
    key: 1,
    fullObject: {},
    searchEvents: "",
    searchLocations: "",
  }),
  methods: {
    reset() {
      this.key += 1;
      this.leafletValues = {};
      this.newSearch = {};
      this.fullObject = {}
    },
    searchLocation(){
      const customSearch = (this.searchEvents + "+" + this.searchLocations)
        axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=' +
         customSearch +
         '&radius=10000&'+
        '&key=AIzaSyB6mR006aP-QxUxyF8YHa71-9xc42p_FYI')
        .then(res=>{
          if(res){
            this.fullObject = res.data
            return(res.data)
          }
        }).catch(err=>{
          console.log(err)
        })
    },
    searchButton(){
     this.searchLocation()
    },
  },
  watch: {
    newSearch:{
      deep: true,
      handler(){
        this.searchEvents = this.newSearch.newSearchLocation
        // console.log(this.searchEvents)
      }
    },
  },
};
</script>
