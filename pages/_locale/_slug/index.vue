<template>
  <div class="container is-fluid">
    <h1 class="title is-1">{{page.fields.title}}</h1>
    <div class="content" v-html="page.fields.body">
    </div>
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
  asyncData({params,error}){
    console.log("params",params.locale, params.slug)
    return client.getEntries({
      content_type: 'simplePage',
      'fields.slug': params.slug,
      'locale': params.locale + "-BE"
    }).then(entries => {
      console.log(entries.items[0])
      if(entries.items[0]){
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

