<template>
    <div v-if="page.fields.pageRef">
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
        <div class="citizen-message">            
            <div class="container is-fluid has-text-centered">
                <p class="is-size-6 has-text-black is-uppercase">Citoyen.ne,</p>
                <p class="is-size-2 has-text-black is-uppercase">Je reste au courant</p>
                <p class="is-size-5 has-text-grey">Reçois l'agenda</p>
                <div id="mc_embed_signup" class="has-text-centered">
                    <form action="https://citizensforclimate.us19.list-manage.com/subscribe/post?u=25efaf6de3ed506cb30446dc3&amp;id=ad2612fcac" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                        <div id="mc_embed_signup_scroll" class="field has-addons">
                            <div class="control">
                                <input type="email" value="" name="EMAIL" class="input" id="mce-EMAIL" placeholder="e-mail" required>
                            </div>
                            <div class="control">
                                <input type="submit" value="GO !" name="subscribe" id="mc-embedded-subscribe" class="button">
                            </div>

                            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_25efaf6de3ed506cb30446dc3_ad2612fcac" tabindex="-1" value=""></div>
                        </div>
                    </form>
                </div> 
            </div>
        </div>
        <div class="citizen-message has-background-grey-lighter">            
            <div class="container is-fluid has-text-centered">
                <p class="is-size-6 has-text-black is-uppercase">Association, ONG, collectif,</p>
                <p class="is-size-2 has-text-black is-uppercase">Je contribue au site</p>
                <p class="is-size-5 has-text-grey">Envoie-nous les infos de ton action ou événement</p>
                <div class="leven">
                    <a href="#" class="button">Je remplis le formulaire en ligne</a>
                    <a href="#" class="button">Je transmets les infos par mail</a>
                </div>
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

.citizen-message{
    padding: 40px 0 40px 0;
}
</style>
