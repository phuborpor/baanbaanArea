<template>
  <div>
    <Banners />
    <div class="w-full bg-home pl-20">
      <div class="pt-20">
        <p class="font-sans text-2xl font-semibold text-black">
          Area analysis for business unit sale
        </p>
        <p class="font-sans text-base font-normal text-gray">
          Specify your location on the map
        </p>
      </div>
      <div class="flex flex-1 w-20">
        <div class="flex-1 bg-white rounded-xs shadow-card-dashboard pt-8">
          <div style="height: 593px; width: 948px">
            <client-only>
              <l-map
                :zoom="zoom"
                :center="center"
                :options="mapOptions"
                style="height: 80%; border-radius: 8px"
                @update:center="centerUpdate"
                @update:zoom="zoomUpdate"
                @click="addMarker"
              >
                <l-tile-layer :url="url" :attribution="attribution" />
                <l-marker
                  v-for="(group, index) in groupMark"
                  :key="index"
                  :lat-lng="[group.lat, group.lng]"
                ></l-marker>
                <l-circle
                  v-for="(group, index) in groupMark"
                  :key="index"
                  :lat-lng="[group.lat, group.lng]"
                  :radius="group.circle"
                  :color="'#000'"
                />
                <v-marker-cluster>
                  <l-marker
                    v-for="project in projectList"
                    :key="project.id"
                    :lat-lng="[project.lat, project.lon]"
                    ><l-tooltip
                      :options="{ permanent: true, interactive: false }"
                    >
                      <div>
                        {{ project.titleNameTH }}
                      </div>
                    </l-tooltip>
                    <l-icon
                      v-if="project.category === 'โรงพยาบาล'"
                      :icon-anchor="dynamicAnchor"
                      icon-url="https://cdn-icons-png.flaticon.com/512/2189/2189181.png"
                    />
                    <!-- <l-icon
                v-else-if="project.category === 'คลินิก'"
                :icon-anchor="dynamicAnchor"
                icon-url="https://cdn-icons-png.flaticon.com/512/2189/2189181.png"
              />
              <l-icon
                v-else-if="project.category === 'ร้านขายยา'"
                :icon-anchor="dynamicAnchor"
                icon-url="https://cdn-icons-png.flaticon.com/512/2189/2189181.png"
              />
              <l-icon v-else :icon="icon" /> -->
                  </l-marker>
                </v-marker-cluster>
              </l-map>
            </client-only>
          </div>
        </div>
        <div class="flex gap-4 pt-12 pl-12">
          <div>
            <div>
              <p class="font-sans text-sm font-semibold text-black">
                Coordinates
              </p>
            </div>
            <div class="flex flex-row pt-4 pb-6">
              <div>
                <input
                  v-model="coor"
                  type="text"
                  class="flex flex-row justify-between h-10 px-4 rounded-lg text-disabled"
                  style="width: 230px; background: #f7fafc"
                  placeholder="Pin Point"
                  disabled
                />
              </div>
              <div class="pl-6">
                <button
                  class="bg-black text-white font-sans text-sm font-semibold rounded-lg h-10"
                  style="width: 83px"
                  @click="addInfo"
                >
                  <!-- <IconsAdd /> -->
                  <div class="">Add</div>
                </button>
              </div>
            </div>
            <div class="pb-6">
              <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2">
                  <p class="font-sans text-sm font-semibold text-black">
                    Distance
                  </p>
                </div>
                <div>
                  <span
                    v-text="r"
                    class="font-sans text-base font-normal text-black flex justify-end"
                  ></span>
                </div>
                <div
                  class="flex flex-row justify-between h-10 px-4 p-2"
                  style="width: 300px"
                >
                  <p class="font-sans text-base font-normal text-black">5</p>
                  <input
                    v-model="r"
                    type="range"
                    min="5"
                    max="10"
                    style="width: 100%; outline: none; background: none"
                  />
                  <p class="font-sans text-base font-normal text-black">10</p>
                </div>
              </div>
            </div>
            <div>
              <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2">
                  <p class="font-sans text-sm font-semibold text-black">
                    Marker
                  </p>
                </div>
              </div>
              <div class="pt-4">
                <div class="bg-white rounded-lg shadow-md">
                  <div class="w-full h-13">
                    <div class="grid justify-items-center py-4">
                      <IconsPin />
                      <div v-if="addInfo">
                        <div>
                          {{ this.makerInfo }}
                          <button
                            v-for="(group, index) in groupMark"
                            :key="index"
                            :lat-lng="[group.lat, group.lng]"
                            @click="removeMarker(index)"
                            class="bg-black text-white flex flex-row justify-between h-10 px-4 py-2 rounded-lg"
                            style="width: 240px; background: #f7fafc"
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <button
                v-for="(group, index) in groupMark"
                :key="index"
                :lat-lng="[group.lat, group.lng]"
                @click="removeMarker(index)"
                class="flex flex-row justify-between h-10 px-4 py-2 rounded-lg"
                style="width: 240px; background: #f7fafc"
              >
                Point {{ index + 1 }} {{ group.lat + ', ' + group.lng }}
              </button> -->
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xs shadow-card-dashboard p-4">
        <div style="height: 500px; width: 500px">
          <PolarAreaChart :summaryList="sumList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { latLng } from 'leaflet'
// import { LMap, LTileLayer, LMarker, LTooltip, LIcon } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import PolarAreaChart from '~/components/PolarAreaChart.vue'
import Banners from '~/components/banner/Banners.vue'
// import IconsAdd from '~/components/icons/IconsAdd.vue'
import IconsPin from '~/components/icons/IconsPin.vue'

let Vue2Leaflet = {}
if (process.client) {
  // eslint-disable-next-line no-unused-vars
  Vue2Leaflet = require('vue2-leaflet')
}

const controller = new AbortController()
const { signal } = controller
export default {
  components: {
    // LMap,
    // LTileLayer,
    // LMarker,
    // // RadarChart,
    // LTooltip,
    // LIcon,
    'l-map': Vue2Leaflet.LMap,
    'l-tile-layer': Vue2Leaflet.LTileLayer,
    'l-marker': Vue2Leaflet.LMarker,
    'v-marker-cluster': Vue2Leaflet.Vue2LeafletMarkercluster,
    PolarAreaChart,
    Banners,
    // IconsAdd,
    IconsPin,
  },

  data() {
    return {
      zoom: 10,
      center: [14.974721843419632, 102.09811703986877],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      // withPopup: latLng(14.4198122, 99.0579173),
      currentZoom: 10,
      currentCenter: [14.974721843419632, 102.09811703986877],
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
      map: null,
      projectList: [],
      marker1: '',
      marker2: '',
      circle: 0,
      groupMark: [],
      r: 5,
      sumList: [],
      lat: '',
      lng: '',
      coor: '',
      makerInfo: '',
    }
  },
  async fetch() {
    const response = await this.$http.$get(
      `http://49.0.84.39:8000/apis/v1/places/points?lat=${this.marker1}&lon=${this.marker2}&radius=${this.r}`,
      {
        signal,
      }
    )
    this.projectList = response.value.points
    this.sumList = response.value.summary
    this.projectList = Array.from(
      new Set(this.projectList.map((a) => a.Id))
    ).map((id) => {
      return this.projectList.find((a) => a.Id === id)
    })
  },
  watch: {
    radius() {
      this.circle = 1000 * this.r
      console.log('circle', this.circle)
    },
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    centerUpdate(center) {
      this.currentCenter = center
    },

    addMarker(e) {
      if (this.groupMark.length < 3) {
        this.groupMark.push({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          circle: this.circle,
        })
        this.marker1 = e.latlng.lat
        this.marker2 = e.latlng.lng
        console.log(this.marker1, this.marker2)
      } else {
        alert('Marker limit is 3')
      }
      // this.$fetch()
      this.coor = this.marker1.toFixed(7) + ', ' + this.marker2.toFixed(7)
      console.log(this.coor)
    },
    addInfo() {
      this.makerInfo = this.coor
      this.$fetch()
    },
    removeMarker(i) {
      for (let index = 0; index < this.groupMark.length; index++) {
        if (index === i) {
          this.groupMark.splice(i, 1)
          if (this.groupMark.length === 0) {
            this.marker1 = ''
            this.marker2 = ''
            this.groupMark = []
            this.sumList = []
            this.projectList = []
            this.makerInfo = ''
            this.coor = ''
          }
        }
      }
    },
  },
}
</script>

<!-- <style lang="postcss" scoped>
input[type='range'] {
  outline: 0;
  border: 0;
  border-radius: 500px;
  width: 400px;
  max-width: 100%;
  margin: 24px 0 16px;
  transition: box-shadow 0.2s ease-in-out;
}
</style> -->
