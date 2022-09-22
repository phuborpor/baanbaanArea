import Vue from 'vue'
import L from 'leaflet'
import { LMap, LTileLayer, LGeoJson, LMarker, LPolygon, LControlZoom ,LTooltip,LIcon } from 'vue2-leaflet'
import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster'
// import Vue2LeafletHeatmap from 'vue2-leaflet-heatmap'
// import Vue2LeafletHeatmap from 'vue2-leaflet-heatmap'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

/* eslint-disable */
// npm install --save git+ssh://git@github.com:jurb/vue2-leaflet-heatmap.git
// npm install --save vue2-leaflet-heatmap
Vue.component('L', L)
Vue.component('v-map', LMap)
Vue.component('v-tile-layer', LTileLayer)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('v-geo-json', LGeoJson)
Vue.component('l-marker', LMarker)
Vue.component('l-polygon', LPolygon)
Vue.component('l-control-zoom', LControlZoom)
Vue.component('l-tooltip', LTooltip)
Vue.component('l-icon', LIcon)
Vue.component('v-marker-cluster', Vue2LeafletMarkercluster)
// Vue.component('Vue2LeafletHeatmap', Vue2LeafletHeatmap)

