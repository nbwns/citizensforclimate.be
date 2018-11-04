<template>
  <div class="container is-fluid">
    <div class="columns">
      <div class="column">
          <div class="card" v-for="(action, index) in actions"
    :key="index">
            <div class="card-content">
              <h2 class="title is-2">{{action.fields.name}}</h2>
              <a :href="action.fields.link">Je découvre</a>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from '~/plugins/contentful'
export default {
  asyncData(){
    return client.getEntries({
      content_type: 'action'
    }).then(entries => {
      console.log(entries.items[0].fields)
      return {actions : entries.items}
    })
    .catch(e => console.log(e))
  }
}
</script>

<style>

</style>

