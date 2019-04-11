<template>
    <div>
        <link title="timeline-styles" rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css">
        <div id='timeline-embed' style="width: 100%; height: 350px"></div>
         <script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"></script>
    </div>
</template>

<script>
if (process.client) {
    //i don't know how to include this client lib !
    //require('~/plugins/timeline')
    
}  

import timelineMaker from '~/plugins/timelineMaker'

export default {
    created(){
        if (process.client) {
            timelineMaker(this.$route.params.locale)
            .then(data => {
                new TL.Timeline('timeline-embed',data, {
                    language: this.$route.params.locale
                });
            })
        }             
    }
}
</script>

<style>

</style>
