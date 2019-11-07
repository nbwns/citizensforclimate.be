<template>
    <div>
        <div class="citizen-message newsletter">            
            <div class="container is-fluid has-text-centered">
                <div class="text-container">
                    <p class="is-size-6 has-text-black is-uppercase has-text-weight-bold">{{t("citizen")}}</p>
                    <p class="is-size-5 has-text-black is-uppercase has-text-weight-bold is-breaking">{{t("i-stay-up-to-date")}}</p>
                    <p class="is-size-5 has-text-grey">{{t("get-the-agenda")}}</p>
                </div>
                <div class="columns is-centered">
                    <div class="column is-two-fifths">
                            <div id="mc_embed_signup" class="has-top-padding">
                    <form action="https://citizensforclimate.us19.list-manage.com/subscribe/post?u=25efaf6de3ed506cb30446dc3&amp;id=ad2612fcac" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                        <div id="mc_embed_signup_scroll" class="field has-addons">
                            <div class="control is-expanded">
                                <input type="email" value="" name="EMAIL" class="input" id="mce-EMAIL" placeholder="e-mail" required>
                            </div>
                            <div class="control">
                                <input type="submit" value="GO !" name="subscribe" id="mc-embedded-subscribe" class="button is-primary">
                            </div>

                            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_25efaf6de3ed506cb30446dc3_ad2612fcac" tabindex="-1" value=""></div>
                        </div>
                    </form>
                </div> 
                    </div>
                </div>
                
            </div>
        </div>
        <div class="citizen-message contribute">            
            <div class="container is-fluid has-text-centered">
                <div class="text-container">
                    <p class="is-size-6 has-text-black is-uppercase has-text-weight-bold">{{t("association")}}</p>
                    <p class="is-size-5 has-text-black is-uppercase has-text-weight-bold is-breaking">{{t("i-contribute")}}</p>
                    <p class="is-size-5 has-text-grey">{{t("send-your-action")}}</p>
                </div>
                <div class="has-top-padding">
                    <a v-if="$route.params.locale === 'fr'" href="https://forms.gle/aSi3pqoGDFw3Z3jw8" target="_blank" class="button">{{t("i-fill-the-form")}}</a>               
                    <a v-else href="https://forms.gle/aSi3pqoGDFw3Z3jw8" target="_blank" class="button">{{t("i-fill-the-form")}}</a>               
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import translate from '~/plugins/translations'

export default {
    methods: {
        t(key){
            return translate(this.$route.params.locale, key)
        }
    }
}
</script>

<style>

    .citizen-message{
        padding: 60px 0 60px 0;
    }

    .citizen-message.newsletter .text-container:before{
        content:"";
        position:absolute;
        top:-50px;
        right:340px;
        width:50px;
        height:72px;
        background:url('/coeur_50px.png') no-repeat center/cover;
    }

    .citizen-message.contribute .text-container:before{
        content:"";
        position:absolute;
        top:-50px;
        left:300px;
        width:75px;
        height:100px;
        background:url('/etoile_75px.png') no-repeat center/cover;
    }

    @media screen and (max-width: 768px) {
        .citizen-message.newsletter .text-container:before {
            display: none;
        }

        .citizen-message.contribute .text-container:before {
            display: none;
        }
    }

</style>
