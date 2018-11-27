<template>
    <div class="actions has-text-black">
        <div class="highlight-actions-background">
            <div class="container is-fluid">
                <div class="action-head has-text-centered">
                    <h2 class="title is-1 has-text-black">ACTION LABEL</h2>
                    <p class="subtitle has-text-black">Nice subtitle</p>
                </div>
                <Loader v-if="loading"/>
                <div v-if="!loading" class="columns is-multiline is-centered">
                    <div class="column is-one-third" v-if="action.fields.name" v-for="action in highlightActions" :key="action.id">
                        <div class="has-background-white action highlight">
                            <small class="action-meta has-text-grey is-size-6">{{action.fields.tag}}</small>
                            <small class="action-meta action-date is-size-6">{{formatDate(action.fields.start)}}</small>
                            <h3 class="title is-3 has-text-weight-normal has-text-black">{{action.fields.name}}</h3>
                            <p class="is-size-5">
                                {{action.fields.introductionText}}
                            </p>
                            <nuxt-link class="button is-medium" :to="{path:'/'+$route.params.locale+'/action/'+action.fields.slug}">{{action.fields.callToAction}}</nuxt-link>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
        <div class="actions-background">
            <div class="container is-fluid">
                <div class="action-head has-text-centered">
                    <h2 class="title is-1 has-text-black">ACTION LABEL</h2>
                    <p class="subtitle has-text-black">Nice subtitle</p>
                </div>
                <Loader v-if="loading"/>
                <div v-if="!loading" class="columns is-multiline is-centered">
                    <div  class="column is-one-third" v-if="index < maxActions && action.fields.name" v-for="(action, index) in normalActions" :key="action.id">
                        <div class="has-background-white action">
                            <small class="action-meta has-text-grey is-size-6">{{action.fields.tag}}</small>
                            <small class="action-meta action-date is-size-6">{{formatDate(action.fields.start)}}</small>
                            <h3 class="title is-4 has-text-weight-normal has-text-black">{{action.fields.name}}</h3>
                            <p class="is-size-6">
                                {{action.fields.introductionText}}
                            </p>
                            <nuxt-link class="button" :to="{path:'/'+$route.params.locale+'/action/'+action.fields.slug}">{{action.fields.callToAction}}</nuxt-link>
                        </div>
                    </div>
                    <div class="see-more-actions has-text-centered" v-if="!showAllActions" @click="displayAllActions()">
                        V <br/>
                        Plus d'actions
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import client from '~/plugins/contentful'
import moment from 'moment-with-locales-es6'
import Loader from '~/components/Loader'

export default{
    data () {
        return {
            actions: [],
            loading: true,
            maxActions: 12,
            showAllActions: false
        }
    },
    components: {
        Loader
    },
    computed: {
        highlightActions () {
            return this.actions.filter(action => {
                return action.fields.highlight == true
            })
        },
        normalActions () {
            return this.actions.filter(action => {
                return action.fields.highlight == false
            })
        }
    },
    methods: {
        formatDate(date) {
            if(date){
                let momentDate = moment(date);
                let format = "dddd D MMMM YYYY";
                if(momentDate.hour() > 0){
                    format += " - HH:mm"
                }
                return moment(date).format(format)
            }
            else{
                return ''
            }
        },
        displayAllActions(){
            this.maxActions += 12;
            this.showAllActions = this.maxActions >= this.normalActions.length;
        }
    },
    mounted(){
        moment.locale(this.$route.params.locale)
        if(this.$route.params.locale){
            return client.getEntries({
                content_type: 'action',
                'locale':this.$route.params.locale+ "-BE",
                'order': '-sys.updatedAt'
            })
            .then(entries => {
                this.actions = entries.items
                this.loading = false
            })
            .catch(console.error)
        }
        
    }
}
</script>

<style scoped>
    h2 {
        font-family: 'Fjalla One', sans-serif;
        letter-spacing: 1px;
    }
        
    .actions {
        margin: 40px 0 40px 0;
    }

    .highlight-actions-background{
        background-color: #67de97;
    }

    .actions-background{
        background-color: #cdcdcd;
    }

    .see-more-actions{
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1.2rem;
        cursor: pointer;
    }

    .action-head{
        padding: 35px 0 35px 0;
    }
    
    .action{
        display:flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        margin: 5px 25px 25px 5px;
        padding: 10px;
        font-size: 0.75rem;
        min-height: 270px;
    }

    .action.highlight:hover {
        -webkit-box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
        -moz-box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
        box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
        transition: all 0.1s;
    }

    .action.highlight{
        -webkit-box-shadow: -7px 7px 0px 0px rgba(0,0,0,1);
        -moz-box-shadow: -7px 7px 0px 0px rgba(0,0,0,1);
        box-shadow: -7px 7px 0px 0px rgba(0,0,0,1);
        border: 4px black solid;
        font-size: 1rem;
        transition: all 0.2s;
        min-height: 450px;

    }

    .action .title {
        font-family: 'Fjalla One', sans-serif;
    }

    .action .button{
        align-self: center;
        margin-top: auto;
    }

    .action-meta{
        font-size: 0.85rem;
        text-transform: uppercase;
        font-weight: bold;
    }

    .action-date{
        color: #e86241;
    }

    .action .title{
        text-transform: uppercase;
    }

    /* .button {
        text-transform: uppercase;
        align-items: flex-end;
        border-radius: 0;
        background-color: white;
        border: 2px #67de97 solid;
        color: black;
        font-weight: bold;
        transition: all 0.3s;
    }

    .button:hover {
        background-color: #67de97;
        transition: all 0.3s;
    } */

    a.read-more {
        color: black;
        font-weight: bold;
        text-decoration: underline;
    }
</style>