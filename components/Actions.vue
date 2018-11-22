<template>
    <div class="actions">
        <div class="has-background-primary">
            <div class="container is-fluid">
                <div class="action-head has-text-centered">
                    <h2 class="title is-2">ACTION LABEL</h2>
                    <p class="subtitle">ACTION SUBLABEL</p>
                </div>
                <div class="columns is-multiline is-centered">
                    <div class="column is-one-third" v-for="action in highlightActions" :key="action.id">
                        <div class="has-background-white action highlight">
                            <small class="action-meta action-tag">{{action.fields.tag}}</small>
                            <small class="action-meta action-date">{{formatDate(action.fields.start)}}</small>
                            <h2 class="title is-4">{{action.fields.name}}</h2>
                            <p>
                                {{action.fields.introductionText}}
                                <nuxt-link class="read-more" :to="{path:'/'+$route.params.locale+'/action/'+action.fields.slug}">> Lire la suite</nuxt-link>
                            </p>
                            <a v-if="action.fields.link" class="button is-primary is-medium" :href="action.fields.link" target="_blank">{{action.fields.callToAction}}</a>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
        <div class="has-background-warning">
            <div class="container is-fluid">
                <div class="action-head has-text-centered">
                    <h2 class="title is-2">ACTION LABEL</h2>
                    <p class="subtitle">ACTION SUBLABEL</p>
                </div>
                <div class="columns is-multiline is-centered">
                    <div  class="column is-one-third" v-if="index < maxActions" v-for="(action, index) in normalActions" :key="action.id">
                        <div class="has-background-white action">
                            <small class="action-meta action-tag">{{action.fields.tag}}</small>
                            <small class="action-meta action-date">{{formatDate(action.fields.start)}}</small>
                            <h2 class="title is-5">{{action.fields.name}}</h2>
                            <p>
                                {{action.fields.introductionText}}
                                <nuxt-link class="read-more" :to="{path:'/'+$route.params.locale+'/action/'+action.fields.slug}">> Lire la suite</nuxt-link>
                            </p>
                            
                            <a v-if="action.fields.link" class="button" :href="action.fields.link" target="_blank">{{action.fields.callToAction}}</a>
                        </div>
                    </div>
                    <div class="see-more-actions" v-if="!showAllActions" @click="displayAllActions()">
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

export default{
    data () {
        return {
            actions: [],
            loading: true,
            maxActions: 3,
            showAllActions: false
        }
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
                return "Quand tu veux"
            }
        },
        displayAllActions(){
            this.maxActions += 6;
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
    .actions {
        margin: 40px 0 40px 0;
    }

    .action-head{
        padding: 35px 0 35px 0;
    }
    
    .action{
        display:flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        margin: 5px 25px 25px 5px;
        padding: 10px;
        border: 2px black solid;
        font-size: 0.75rem;
        min-height: 250px;
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
        font-size: 1rem;
        transition: all 0.2s;
        min-height: 350px;

    }

    .action .button{
        align-self: center;
    }

    .action-tag{
        color: grey;
    }

    .action-meta{
        font-size: 0.85rem;
        text-transform: uppercase;
        font-weight: bold;
    }

    .action-date{
        color: burlywood;
    }

    .action .title{
        text-transform: uppercase;
    }

    .action .button {
        text-transform: uppercase;
        align-items: flex-end;
        border-radius: 0;
        background-color: white;
        border: 2px #67de97 solid;
        color: black;
        font-weight: bold;
        transition: all 0.3s;
    }

    .action .button:hover {
        background-color: #67de97;
        transition: all 0.3s;
    }

    a.read-more {
        color: black;
        font-weight: bold;
        text-decoration: underline;
    }
</style>