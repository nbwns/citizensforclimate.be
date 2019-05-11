<template>
    <div>
        <div id='timeline-embed' style="width: 100%; height: 350px"></div>
    </div>
</template>

<script>
import timelineMaker from '~/plugins/timelineMaker'

export default {
    mounted(){
        if (process.client) {
            this.$loadScript("https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js")
            .then(() => {
                timelineMaker(this.$route.params.locale)
                .then(data => {
                    new TL.Timeline('timeline-embed',data, {
                        language: this.$route.params.locale,
                        script_path: 'https://cdn.knightlab.com/libs/timeline3/latest/js'
                    });
                })
            })
            .catch(() => {
            
            });    
        }
    }
}
</script>

<style>
@import url('https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css');

.tl-timeline, .tl-text .tl-headline-date {
    font-family: 'Niramit', sans-serif;
}
</style>
