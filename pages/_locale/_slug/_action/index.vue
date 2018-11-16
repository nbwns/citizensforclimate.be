<template>
  <div class="container is-fluid">
    <small class="title is-5">{{action.fields.tag}}</small>    
    <h1 class="title is-1">{{action.fields.name}}</h1>
    <div class="content" v-html="$md.render(action.fields.body)"></div>
    <a class="button is-primary" v-if="action.fields.link" :href="action.fields.link">{{action.fields.callToAction}}</a>
    <p>{{action.fields.localisation}}</p>
    <p>{{action.fields.start}}</p>
    <p>{{action.fields.end}}</p>
    <nuxt-link to="/fr/actions">Retour aux actions</nuxt-link>
  </div>
</template>

<script>
import client from '~/plugins/contentful'

export default {
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

