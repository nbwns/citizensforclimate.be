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
                        <Action :action="action" className="highlight"/>
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
                        <Action :action="action"/>                        
                    </div>
                    <div class="see-more-actions" v-if="!showAllActions" @click="displayAllActions()">
                        Plus d'actions
                        <img src="~/assets/images/white-arrow.png" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import client from '~/plugins/contentful'
import Loader from '~/components/Loader'
import Action from '~/components/Action'

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
        Loader,
        Action
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
        displayAllActions(){
            this.maxActions += 12;
            this.showAllActions = this.maxActions >= this.normalActions.length;
        }
    },
    mounted(){
        if(this.$route.params.locale){
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
         display:flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .see-more-actions img{
        transform: rotate(-90deg);
        align-self: center;
    }

    .action-head{
        padding: 35px 0 35px 0;
    }
    
</style>