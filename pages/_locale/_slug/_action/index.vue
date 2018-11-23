<template>
  <div class="has-background-grey-lighter">
    <div class="container is-fluid">
      <section class="columns">
        <div class="column is-two-thirds has-background-white">
          <div class="action-detail">
            <h1 class="title has-text-weight-normal is-4 is-uppercase">{{action.fields.name}}</h1>
            <div class="content is-size-5" v-html="$md.render(action.fields.body)"></div>
            <a class="button is-size-4" v-if="action.fields.link" :href="action.fields.link">{{action.fields.callToAction}}</a>
            <div class="columns">
                <div class="column is-half">
                    <p class="is-uppercase">
                        Début
                    </p>
                    <p class="is-uppercase">
                        {{formatDate(action.fields.start)}}
                    </p>
                    <p class="is-uppercase">
                        Adresse
                    </p>
                    <p>
                        <a v-if="action.fields.localisationGeo" 
                          :href="'https://www.openstreetmap.org/#map=17/'+action.fields.localisationGeo.lat+'/'+action.fields.localisationGeo.lon" 
                          target="_blank">{{action.fields.localisationDescription}}</a>
                    </p>
                </div>
                <div class="column">
                    <p class="is-uppercase">
                        Fin
                    </p>
                    <p class="is-uppercase">
                        {{formatDate(action.fields.end)}}
                    </p>
                    <p class="is-uppercase">
                        Infos
                    </p>
                    <p>
                        <a :href="action.fields.link" target="_blank">{{action.fields.link}}</a>
                    </p>
                </div>
            </div>  
            <p>{{action.fields.localisation}}</p>
            <p>{{action.fields.end}}</p>   
            <nuxt-link to="/fr/home">Plus d'actions</nuxt-link>
          </div>
        </div>
        <div class="column">
          Hey
        </div>
      </section>
      
  </div>
  </div>
</template>

<script>
import client from '~/plugins/contentful'
import moment from 'moment-with-locales-es6'

export default {
  methods: {
    formatDate(date) {
        if(date){
            let momentDate = moment(date);
            let format = "dddd D MMM YYYY";
            if(momentDate.hour() > 0){
                format += " - HH:mm"
            }
            return moment(date).format(format)
        }
        else{
            return ''
        }
    }
  },
  asyncData({params,error, route}){
    console.log("params",params.locale, params.action)
    moment.locale(route.params.locale)
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

<style scoped>
  h1 {
      font-family: 'Fjalla One', sans-serif;
      letter-spacing: 1px;
  }

  .columns{
    padding: 50px 0 50px 0;
  }

  .action-detail{
    padding: 10px;
  }
</style>

