<template>
    <div class="map-container">
        <div class="container is-fluid">
            <div class="title-head has-text-centered">
                <h2 class="title is-1 has-text-black">Geolocal'actions</h2>
                <p class="subtitle has-text-black">sous-titre de ouf</p>
            </div>
            <div class="map">
                <no-ssr>
                    <l-map :zoom="zoom" :center="center">
                        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                        <l-marker 
                            v-for="marker in markers"
                            :key="marker.id"  
                            :lat-lng.sync="marker.position">
                                <l-popup>
                                    <strong>{{marker.title}}</strong><br/>
                                    {{marker.promoter}}
                                    <p>
                                        {{marker.intro}}<br />
                                        {{marker.date}}
                                        <a :href="marker.link">{{t("read-more")}}</a>
                                    </p>
                                    {{marker.category}}
                                </l-popup>
                            </l-marker>
                    </l-map>
                    <!-- <div  v-for="marker in markers"
                            :key="marker.id" >
                        {{marker.title}}
                    </div> -->
                </no-ssr>
            </div>
        </div>
    </div>
</template>

<script>
import translate from "~/plugins/translations"
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
                    category: a.fields.categories[0].fields.picto.fields.title,
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
    },
    methods:{
        t(key) {
            return translate(this.$route.params.locale, key);
        }
    }
}
</script>

<style lang="scss" scoped>
.map-container{
    .map{
        height: 350px;
    }
}

</style>
