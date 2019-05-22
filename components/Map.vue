<template>
    <div class="map-container">
        <div class="container is-fluid">
            <div class="title-head has-text-centered">
                <h2 class="title is-1 has-text-black">{{title}}</h2>
                <p class="subtitle has-text-black">{{subtitle}}</p>
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
                                    <em>{{marker.tag}}</em><br/>
                                    <strong style="font-size:14px">{{marker.title}}</strong><br/>
                                    {{marker.promoter}}
                                    <p>
                                        {{marker.intro}}<br />
                                        <strong>{{formatDate(marker.date)}}</strong><br/>
                                        <a :href="marker.link">{{t("read-more")}}</a>
                                    </p>
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
import moment from 'moment-with-locales-es6'

export default {
    props: ['actions', 'title', 'subtitle'],
    mounted(){
        console.log("map", this.actions)
        this.markers =  this.actions.filter(a => {
                return a.fields.localisationGeo
            }).map(a => {
                return {
                    id: a.sys.id,
                    title: a.fields.name,
                    tag: a.fields.tag,
                    intro: a.fields.introductionText,
                    promoter: a.fields.promoter,
                    date: a.fields.start || '',
                    link: `https://www.citizensforclimate.be/${this.$route.params.locale}/action/${a.fields.slug}?returnTo=#map`,
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
            url:'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9ubmllZGViIiwiYSI6ImNqdm5peWF4azE5N2Y0NHBpNTlpazlnZHcifQ.1PLGiM8IHFrSw0u5Qt4eLw',
            attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            markers: []

        }
    },
    methods:{
        t(key) {
            return translate(this.$route.params.locale, key);
        },
        formatDate(date) {
            if(date){
                let momentDate = moment(date)
                momentDate.locale(this.$route.params.locale)
                let format = "DD/MM/YYYY"
                if(momentDate.hour() > 0){
                    format += " - HH:mm"
                }
                return momentDate.format(format)
            }
            else{
                return ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.map-container{
    .map{
        height: 500px;
    }
}

</style>
