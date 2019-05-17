<template>
    <div class="container is-fluid">
        <div class="map">
            <no-ssr>
                <l-map :zoom="zoom" :center="center">
                    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                    <l-marker 
                        v-for="marker in markers"
                        :key="marker.id"  
                        :lat-lng.sync="marker.position">
                            <l-popup>
                                <strong>{{marker.title}}</strong>
                                <p>
                                    {{marker.intro}}<br />
                                    <b>{{marker.promoter}}</b><br />
                                    {{marker.date}}
                                    <a :href="marker.link">>Lire la suite</a>
                                </p>
                            </l-popup>
                        </l-marker>
                </l-map>
            </no-ssr>
        </div>
    </div>
</template>

<script>

export default {
    props: ['actions'],
    mounted(){
        this.markers =  this.actions.filter(a => {
                return a.fields.localisationGeo
            }).map(a => {
                return {
                    id: a.sys.id,
                    title: a.fields.name,
                    intro: a.fields.introductionText,
                    promoter: a.fields.promoter,
                    date: a.fields.startDate || '-',
                    link: `https://www.citizensforclimate.be/${this.$route.params.locale}/action/${a.fields.slug}`,
                    position: {
                        lat: a.fields.localisationGeo.lat,
                        lng: a.fields.localisationGeo.lon
                    }
                } 
            })
    },
    data() {
        return {
            zoom:8,
            center: this.$L.latLng(50.49, 4.46),
            url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            markers: []
        }
  }
}
</script>

<style lang="scss" scoped>
.map{
    height: 350px;
}
</style>
