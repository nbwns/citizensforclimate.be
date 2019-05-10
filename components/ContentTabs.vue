<template>
    <div>
        <div>
            <nuxt-link to="#">Actions</nuxt-link>
            <nuxt-link to="#timeline">Timeline</nuxt-link>
            <nuxt-link to="#map">Map</nuxt-link>
        </div>
        <div>
            <div v-if="currentHash === '#'">
                <Actions/>
            </div>
            <div v-if="currentHash === '#timeline'">
                <Timeline/>
            </div>
            <div v-if="currentHash === '#map'">
                <Map/>
            </div>
        </div>
    </div>
</template>

<script>
const client = require('~/plugins/contentful')

import Actions from '~/components/Actions'
import Timeline from '~/components/Timeline'
import Map from '~/components/Map'

export default {
    data() {
        return {
            actions: [],
            currentHash: ''
        }
    },
    components: {
        Actions,
        Timeline,
        Map
    },
    mounted(){
        console.log("hash",this.$route)
        if(this.$route.params.locale){
            //this.$i18n.locale = this.$route.params.locale
            return client.getEntries({
                content_type: 'action',
                'locale':this.$route.params.locale+ "-BE",
                'order': 'fields.sortOrder,fields.name'
            })
            .then(entries => {
                this.actions = entries.items
                this.loading = false
            })
            .catch(console.error)
        }
        
    },
    watch: {
    '$route' (to, from) {
        this.currentHash = to.hash
    }
  }
}
</script>

<style>

</style>
