<template>
    <div style="height: 100vh">
        <no-ssr>
            <l-map :zoom="zoom" :center="center">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker visible="true" :key="marker.tooltip" v-for="marker in markers" :lat-lng.sync="marker.position"></l-marker>
            </l-map>
        </no-ssr>
    </div>
</template>

<script>

export default {
    props: ['actions'],
    computed: {
        actionMarkers() {
            let items =  this.actions.filter(a => {
                return a.fields.localisationGeo
            }).map(a => {
                return {
                    tooltip: a.fields.name,
                    position: {
                        lat: a.fields.localisationGeo.lat,
                        lng: a.fields.localisationGeo.lon
                    }
                } 
            })
            console.log(items)
            return items
        }
    },
    mounted(){
        console.log(this.actions)
        console.log(this.actionMarkers)
    },
    data() {
        return {
            zoom:14,
            center: this.$L.latLng(50.8513331, 4.3475985),
            url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            //marker: this.$L.latLng(47.413220, -1.219482)
            markers: this.actionMarkers
        }
  }
}
</script>

<style>

</style>
