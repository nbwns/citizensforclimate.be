<template>
    <div v-if="page.fields.pageRef">
        <!-- <section class="heading">
            {{page.fields.pageRef.fields.heading}}
        </section> -->
        <!-- <div class="container is-fluid video">
            <div class="columns ">
                <div class="column is-two-thirds is-hidden-desktop">
                    <iframe width="320" height="180" src="https://www.youtube.com/embed/Xl-fRQ2Tgr8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div>
                    <img src="~/assets/images/jaiclimat_350px.png"/>
                </div>
            </div>
        </div> -->
        
        <div class="container is-fluid introduction has-text-black">
            <div class="columns">
                <!-- lui en relatif -->
                <div class="column is-one-third">
                    <!-- retirer absolu en responsive -->
                    <img class="people" src="~/assets/images/people.png"/></div>
                <div class="column is-size-5" v-html="$md.render(page.fields.pageRef.fields.introduction)"></div>
            </div>
        </div>
        <Actions/>
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
.video{
    margin: 80px 0 120px 0;
}

.introduction{
    background-color: #e5e556;
    margin: 80px 0 40px 0;
    padding: 40px 40px 40px 40px;
}

.introduction h1 {
    font-family: 'Fjalla One', sans-serif;
    letter-spacing: 1px;
    font-size: 1.75rem;
}

img.people{
    position: absolute;
    top: 50%;
    left: -45px;
    transform: translateY(-50%);
}

@media screen and (min-width: 1600px) {
  img.people{
        position: absolute;
        top: 50%;
        left: 45px;
        transform: translateY(-50%) scale(1);
    }
}

@media screen and (max-width: 1088px) {
  img.people{
        position: relative;
        top: 0;
        left: 0;
        transform: translateY(0%) scale(1);
    }
}

</style>
