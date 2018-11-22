<template>
  <div class="container is-fluid">
    <section class="articles">
      <div class="column is-8 is-offset-2">
        <small class="title is-5">{{action.fields.tag}}</small>    
        <h1 class="title is-1">{{action.fields.name}}</h1>
        <div class="content" v-html="$md.render(action.fields.body)"></div>
        <a class="button is-primary" v-if="action.fields.link" :href="action.fields.link">{{action.fields.callToAction}}</a>
        <p>{{action.fields.localisation}}</p>
        <p>{{cleanDate(action.fields.start)}}</p>
        <p>{{action.fields.end}}</p>   
        <nuxt-link to="/fr/home" class="button">Retour aux actions</nuxt-link>
      </div>
    </section>
    
  </div>
</template>

<script>
import client from '~/plugins/contentful'
import moment from 'moment-with-locales-es6'

export default {
  methods: {
    cleanDate(date) {
        return moment(date).format("DD/MM/YYYY HH:mm")
    }
  },
  mounted() {
    moment.locale(this.$route.params.locale)
  },
  asyncData({params,error}){
    console.log("params",params.locale, params.action)
    return client.getEntries({
      content_type: 'action',
      'fields.slug': params.action,
      'locale': params.locale + "-BE"
    }).then(entries => {
      console.log(entries.items[0])
      console.log(entries.items[0].fields.categories)
      if(entries.items[0]){
        return {
          action : entries.items[0]
        }
      }
      else{
        throw "page not found"
      }
    })
    .catch((e)=> {
      throw({ statusCode: 404, message: 'page not found' });
    })
  },
  head () {
    return {
      title: this.action.fields.name
    }
  }
}
</script>

<style>

</style>

