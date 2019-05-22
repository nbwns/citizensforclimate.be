<template>
    <div>
        <div class="citizen-message">            
            <div class="container is-fluid has-text-centered">
                <div class="text-container">
                    <p class="is-size-4 has-text-black is-uppercase has-text-weight-bold is-breaking">
                        {{t('breaking-title')}}
                    </p>
                </div>
            </div>
        </div>
        <div class="container is-fluid tabs is-centered is-uppercase has-text-weight-bold has-text-centered">

            <ul>
                <li :class="{'is-active': currentHash === '#'}">
                    <nuxt-link to="#">{{t('actions-tab')}}</nuxt-link>
                </li>
                <li :class="{'is-active': currentHash === '#timeline'}">
                    <nuxt-link to="#timeline">{{t('timeline-tab')}}</nuxt-link>
                </li>
                <li  :class="{'is-active': currentHash === '#map'}">
                    <nuxt-link to="#map">{{t('map-tab')}}</nuxt-link>
                </li>
            </ul>
        </div>
 
        <div class="content-panel">
            <div v-if="currentHash === '#'">
                <Actions :title="t('actions-title')" :subtitle="t('actions-subtitle')" />
            </div>
            <div v-if="currentHash === '#timeline'">
                <Timeline :title="t('timeline-title')" :subtitle="t('timeline-subtitle')"/>
            </div>
            <div v-if="currentHash === '#map'">
                <Map :title="t('map-title')" :subtitle="t('map-subtitle')"
                    :actions="actions" />
            </div>
        </div>
    </div>
</template>

<script>
const client = require('~/plugins/contentful')
import translate from "~/plugins/translations";
import Actions from '~/components/Actions'
import Timeline from '~/components/Timeline'
import Map from '~/components/Map'

export default {
    data() {
        return {
            actions: [],
            categories: [],
            currentHash: '#'
        }
    },
    components: {
        Actions,
        Timeline,
        Map
    },
    mounted() {
        this.currentHash = this.$route.hash
        if(this.currentHash === ''){
            this.currentHash = '#'
        }
        if (this.$route.params.locale) {
        //this.$i18n.locale = this.$route.params.locale
        let allActions = client
            .getEntries({
                content_type: "action",
                locale: this.$route.params.locale + "-BE",
                order: "-fields.highlight,fields.sortOrder,fields.name"
            })
            .then(entries => {
                return entries.items;
            });

        let allCategories = client
            .getEntries({
                content_type: "actionCategory",
                locale: this.$route.params.locale + "-BE",
                order: "fields.sortOrder"
            })
            .then(entries => {
                return entries.items;
            });

        return Promise.all([allActions, allCategories]).then(values => {
            this.actions = values[0];
            this.categories = values[1];
            // this.loading = false;
        });
        }
    },
    methods:{
        t(key) {
            return translate(this.$route.params.locale, key);
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


    li {
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        padding: 0 7px 0 0;

        a {    
            background-color:rgb(230,230,230);
            height:50px;
            width:150px;
            border:solid black 2.5px;
            border-bottom:none;
            color: black;
           font-size: 1em;
        }
    }


    li.is-active a {
        z-index:1;
        background-color:#c8e3e3;
        border-bottom-color: #c8e3e3;
    }
}
.content-panel{
    border-bottom:solid black 2.5px;
    border-top:solid black 2.5px;
    background-color: #c8e3e3;
    padding: 0 0 40px 0;
}

@media screen and (max-width: 454px) {
  .tabs{
    li{
        padding: 0 2px 0 0;
    }

    li a {    
            width:110px;
            font-size: 0.80em;
        }
    }
}
</style>
