<template>
    <div>
        <!-- <section class="heading">
            {{page.fields.pageRef.fields.heading}}
        </section> -->
        <div class="container is-fluid introduction">
            <div class="columns">
                <div class="column is-one-third">IMAGE FOULE</div>
                <div class="column" v-html="$md.render(page.fields.pageRef.fields.introduction)"></div>
            </div>
        </div>
        <Actions/>
        <div class="direct-form">            
            <div class="container is-fluid has-text-centered">
                <p>CITOYEN/CITOYENNE,</p>
                <p>JE RESTE AU COURANT</p>
                <p>Reçois l'agenda</p>
                <p><input /></p>
            </div>
        </div>
        <div class="direct-form has-background-grey-lighter">            
            <div class="container is-fluid has-text-centered">
                <p>CITOYEN/CITOYENNE,</p>
                <p>JE RESTE AU COURANT</p>
                <p>Reçois l'agenda</p>
                <p><input /></p>
            </div>
        </div>
    </div>
</template>

<script>
import Actions from '~/components/Actions'

export default {
    props: ['page'],
    components: {
        Actions
    }
    
}
</script>

<style>
.introduction{
    background-color: #e7df74;
    margin: 80px 0 40px 0;
}

.introduction h1 {
    font-size: 1.75rem;
    font-weight: bold;
}
</style>
