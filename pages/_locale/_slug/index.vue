<template>
  <div>
    <div class="column is-8 is-offset-2">
      <div class="content" v-html="$md.render(page.fields.body)"></div>
    </div>
    <template v-if="pageRef == 'homePage'">
      <HomePage :page="page" />
    </template>
  </div>
</template>

<script>
import client from '~/plugins/contentful'
import HomePage from '~/components/HomePage'

export default {
  layout: 'default',
  components: {
    HomePage
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
      
      if(entries.items[0]){
        store.dispatch('setActivePage', entries.items[0].fields.slug)
        return {
          page : entries.items[0],
          pageRef: entries.items[0].fields.pageRef ? entries.items[0].fields.pageRef.sys.contentType.sys.id : null

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

