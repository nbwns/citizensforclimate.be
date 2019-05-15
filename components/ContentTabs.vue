<template>
    <div>
        <div class="tabs navbar">
            <ul>
                <li class="tab-item" :class="{'is-active': currentHash === '#'}">
                    <nuxt-link to="#">Actions</nuxt-link>
                </li>
                <li class="tab-item" :class="{'is-active': currentHash === '#timeline'}">
                    <nuxt-link to="#timeline">Timeline</nuxt-link>
                </li>
                <li class="tab-item" :class="{'is-active': currentHash === '#map'}">
                    <nuxt-link to="#map">Map</nuxt-link>
                </li>
            </ul>
        </div>
 
        <div>
            <div v-if="currentHash === '#'">
                <Actions />
                actions
            </div>
            <div v-if="currentHash === '#timeline'">
                <Timeline/>
            </div>
            <div v-if="currentHash === '#map'">
                <!-- <Map /> -->
            </div>
        </div>
    </div>
</template>

<script>
const client = require('~/plugins/contentful')

import Actions from '~/components/Actions'
import Timeline from '~/components/Timeline'
// import Map from '~/components/Map'

export default {
    data() {
        return {
            actions: [],
            currentHash: '#'
        }
    },
    components: {
        Actions,
        Timeline,
        // Map
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
