<template>
    <div>
        <div class="container is-fluid tabs is-centered is-uppercase has-text-weight-bold has-text-centered">
            <ul>
                <li :class="{'is-active': currentHash === '#'}">
                    <nuxt-link to="#">Guide</nuxt-link>
                </li>
                <li :class="{'is-active': currentHash === '#timeline'}">
                    <nuxt-link to="#timeline">Ligne du temps</nuxt-link>
                </li>
                <li  :class="{'is-active': currentHash === '#map'}">
                    <nuxt-link to="#map">Carte</nuxt-link>
                </li>
            </ul>
        </div>
 
        <div class="content-panel">
            <div v-if="currentHash === '#'">
                <Actions />
            </div>
            <div v-if="currentHash === '#timeline'">
                <Timeline/>
            </div>
            <div v-if="currentHash === '#map'">
                <Map :actions="actions" />
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
            currentHash: '#'
        }
    },
    components: {
        Actions,
        Timeline,
        Map
    },
    mounted(){
        this.currentHash = this.$route.hash
        if(this.currentHash === ''){
            this.currentHash = '#'
        }
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

<style scoped lang="scss">
.tabs {
    margin-bottom: 0;
    background-color: white;
    display: flex;
    justify-content: center;

    ul {
        padding:0;
        margin:0;
    }

    li {
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        padding: 0 10px 0 0;
    }

    li a {    
        background-color:rgb(230,230,230);
        height:50px;
        width:120px;
        border:solid gray 1px;
        border-bottom:none;
        color:black;
    }

    li.is-active a {
        z-index:1;
        background-color:#c8e3e3;
    }
}
.content-panel{
    border:solid gray 1px;
    background-color: #c8e3e3;
    padding: 0 0 40px 0;
}
</style>
