<template>
  <div>
    <Banners />
    <div class="w-full bg-home pl-20">
      <div class="bg-white border rounded-xs shadow-card-dashboard p-4">
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
        <div class="flex gap-4">
          <div>
            <div>Coordinates</div>
            <div
              class="flex flex-row justify-between h-10 px-4 py-2 rounded-lg"
              style="width: 340px; background: #f7fafc"
            >
              <div>{{ marker1 }},{{ marker2 }}</div>
            </div>
            <!-- <div class="py-6">
            <button
              class="bg-black hover:text-primary-blue px-4 py-2 text-white rounded-lg h-10"
              @click="radius()"
            >
              Add
            </button>
          </div> -->
            <div>
              <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2">Distance</div>
                <div><span v-text="r"></span>Km.</div>
              </div>
              <div
                class="flex flex-row justify-between h-10 px-4 py-2 rounded-lg"
                style="width: 240px; background: #f7fafc"
              >
                <p>5</p>
                <input
                  v-model="r"
                  type="range"
                  min="5"
                  max="10"
                  style="width: 200px; outline: none; background: none"
                />
                <p>10</p>
                <div>
                  <button
                    v-for="(group, index) in groupMark"
                    :key="index"
                    :lat-lng="[group.lat, group.lng]"
                    @click="removeMarker(index)"
                    class="px-3 py-2 bg-blue-500"
                  >
                    Point {{ index + 1 }} {{ group.lat + ', ' + group.lng }}
                  </button>
                </div>
              </div>
              <!-- <div
                class="flex flex-row justify-between h-10 px-4 py-2 rounded-lg"
                style="width: 400px; background: #f7fafc"
              >
                <button
                  v-for="(group, index) in groupMark"
                  :key="index"
                  :lat-lng="[group.lat, group.lng]"
                  @click="removeMarker(index)"
                  class="px-3 py-2 bg-blue-500"
                >
                  Point {{ index + 1 }} {{ group.lat + ', ' + group.lng }}
                </button>
              </div> -->
            </div>
          </div>
          <!-- <div class="flex gap-4">
          <div>
            Distance
            <div
              class="flex flex-row justify-between h-10 px-4 py-2 rounded-lg"
              style="width: 240px; background: #f7fafc"
            >
              <input
                v-model="r"
                type="range"
                min="5"
                max="10"
                style="width: 200px; outline: none; background: none"
              />
              <p>Km</p>
            </div>
            <span v-text="r"></span>
          </div>
        </div> -->
        </div>
      </div>
      <div class="bg-white border rounded-xs shadow-card-dashboard p-4">
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
      for (let index = 0; index < this.groupMark.length; index++) {
        this.groupMark[index].circle = this.circle
      }
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
          }
        }
      }
    },
  },
}
</script>
