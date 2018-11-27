<template>
  <div class="has-background-grey-lighter">
    <div class="container is-fluid">
      <section class="columns">
        <div class="column is-two-thirds">
          <div class="action-detail has-background-white">
            <h1 class="title has-text-weight-normal is-4 is-uppercase">{{action.fields.name}}</h1>
            <div class="content is-size-5" v-html="$md.render(action.fields.body)"></div>
            <div class="container is-fluid pratical-info">
              <div class="columns is-centered is-paddingless">
                  <div class="column is-half">
                      <a class="button is-size-4" v-if="action.fields.link" :href="action.fields.link">{{action.fields.callToAction}}</a>              

                  </div>
              </div>
              <div class="columns">
                  <div class="column is-half" v-if="action.fields.start || action.fields.end">
                      <div class="info-block" v-if="action.fields.start">
                        <p class="is-uppercase label">
                            Début
                        </p>
                        <p class="is-uppercase">
                            {{formatDate(action.fields.start)}}
                        </p>
                      </div>
                      <div class="info-block" v-if="action.fields.end">
                        <p class="is-uppercase label">
                            Fin
                        </p>
                        <p class="is-uppercase">
                            {{formatDate(action.fields.end)}}
                        </p>
                      </div>
                  </div>
                  <div class="column" v-if="action.fields.localisationDescription || action.fields.link">
                      <div class="info-block" v-if="action.fields.localisationDescription">
                        <p class="is-uppercase label">
                            Adresse
                        </p>
                        <p>
                            <a v-if="action.fields.localisationGeo" 
                              :href="'https://www.openstreetmap.org/#map=17/'+action.fields.localisationGeo.lat+'/'+action.fields.localisationGeo.lon" 
                              target="_blank">{{action.fields.localisationDescription}}</a>
                        </p>
                      </div>
                      <div class="info-block"  v-if="action.fields.link">
                        <p class="is-uppercase label">
                            Infos
                        </p>
                        <p>
                            <a :href="action.fields.link" target="_blank">{{action.fields.link}}</a>
                        </p>
                      </div>
                  </div>
              </div>
            </div>  
          </div>
          <nuxt-link :to="'/'+ $route.params.locale">Plus d'actions</nuxt-link>
        </div>
        <div class="column">
          Hey
        </div>
      </section>
      <CallToActions/>
  </div>
  </div>
</template>

<script>
import client from '~/plugins/contentful'
import moment from 'moment-with-locales-es6'
import CallToActions from '~/components/CallToActions'


export default {
  components: {
    CallToActions
  },
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
    moment.locale(route.params.locale)
    return client.getEntries({
      content_type: 'action',
      'fields.slug': params.action,
      'locale': params.locale + "-BE"
    }).then(entries => {
      console.log(entries.items[0])
      console.log(entries.items[0].fields.categories[0])
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

  .pratical-info a:not(.button){
    color: black;
    text-decoration: underline;
    transition: all 0.5s;
  }

  .pratical-info a:not(.button):hover{
    color: #67de97;
    text-decoration: underline;
    transition: all 0.5s;
  }

  .info-block{
    margin-top: 20px;
  }

  .label{
    font-family: 'Fjalla One', sans-serif;
    letter-spacing: 1px;
    color: #67de97;
    font-weight: normal;
  }

  .gradient-text {
    background: linear-gradient(to bottom, #67de97 0%, #000000 40%);
    -webkit-background-clip: text;
	  -webkit-text-fill-color: transparent;
  }
</style>

