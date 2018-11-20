<template>
  <div class="container is-fluid">
    <section class="articles">
      <div class="column is-8 is-offset-2">
        <div class="content" v-html="$md.render(page.fields.body)"></div>
      </div>
    </section>
    <template v-if="page.fields.components">
      <component  :is="page.fields.components[0]"></component>
    </template>
  </div>
</template>

<script>
import client from '~/plugins/contentful'
import Actions from '~/components/Actions'

export default {
  layout: 'default',
  components: {
    Actions
  },
  asyncData({params,error, store, payload}){
    console.log("params",params.locale, params.slug)
    if(payload){ 
      console.log("payload", payload)
      return {
        page: payload
      }
    }
    return client.getEntries({
      content_type: 'simplePage',
      'fields.slug': params.slug,
      'locale': params.locale + "-BE"
    }).then(entries => {
      console.log("sortOrder", entries.items[0].fields.sortOrder)
      if(entries.items[0]){
        store.dispatch('setActivePage', entries.items[0].fields.slug)
        return {
          page : entries.items[0]
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
      title: this.page.fields.title
    }
  }
}
</script>

<style>

</style>

