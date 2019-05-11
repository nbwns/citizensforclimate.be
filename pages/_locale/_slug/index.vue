<template>
    <div>
      <div class="has-background-grey-lighter">
        <div class="container is-fluid">
          <div class="columns" >
            <div class="column is-two-thirds">
              <div class="action-detail has-background-white">
                <h1 class="title has-text-weight-normal is-3 is-uppercase">{{page.fields.title}}</h1>
                <div class="content is-size-5" v-html="$md.render(page.fields.body)"></div>
              </div>
            </div>
            <div class="column">
              <RelatedActions/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
//import client from '~/plugins/contentful'
const client = require('~/plugins/contentful')
import RelatedActions from '~/components/RelatedActions'


export default {
  layout: 'default',
  components: {
    RelatedActions
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
  head() {
    return {
      title: this.page.fields.title,
      meta: [
        {
          hid: `og:title`,
          property: 'og:title',
          content: this.page.fields.title
        },
        {
          hid: `og:url`,
          property: 'og:url',
          content: 'http://www.citizensforclimate.be' + this.$route.fullPath
        },
        {
          hid: `og:image`,
          property: 'og:image',
          content: `http://www.citizensforclimate.be/facebookcover.jpg`
        }
      ]
    }
  }
}
</script>

<style>
  h1 {
      font-family: 'Fjalla One', sans-serif;
      letter-spacing: 1px;
  }
  
  .action-detail{
    padding: 10px;
  }
</style>

