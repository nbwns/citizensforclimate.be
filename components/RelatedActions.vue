<template>
    <div>
        <div class="title-box is-uppercase has-text-centered">
            <h2 class="subtitle has-text-black is-size-5">Related actions</h2>
        </div>
        <div v-for="action in actions" :key="action.sys.id">
            <Action :action="action" className="related"/>
        </div>
    </div>
</template>

<script>
import client from '~/plugins/contentful'
import Loader from '~/components/Loader'
import Action from '~/components/Action'

export default {
    props: ['categoryId', 'excludeId'],
    components: {
        Loader,
        Action
    },
    data () {
        return {
            actions: [],
            loading: true
        }
    },
    mounted(){
        if(this.$route.params.locale){
            return client.getEntries({
                content_type: 'action',
                'fields.categories.sys.id': this.categoryId,
                'sys.id[ne]': this.excludeId,
                'locale': this.$route.params.locale + "-BE",
                'order': 'fields.sortOrder,fields.name',
                'limit' : 3
            })
            .then(entries => {
                console.log(entries)
                this.actions = entries.items
                this.loading = false
            })
            .catch((e)=> {
            throw({ statusCode: 404, message: 'page not found' });
            })
        }
    }
}
</script>

<style>
.title-box {
    background-color: #67de97;
}

.title-box h2 {
    font-family: 'Fjalla One', sans-serif;
    letter-spacing: 1px;
    padding: 1.3rem;
}
</style>
