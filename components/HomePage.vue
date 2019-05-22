<template>
    <div v-if="page.fields.pageRef">       
        <div class="container is-fluid introduction has-text-black">
            <div class="columns">
                <!-- lui en relatif -->
                <div class="column is-one-third">
                    <!-- retirer absolu en responsive -->
                    <img class="people" src="~/assets/images/people.png"/></div>
                <div class="column is-size-5" v-html="$md.render(page.fields.pageRef.fields.introduction)"></div>
            </div>
        </div>
        <!-- <Timeline/> -->
        <!-- <Actions/> -->
        <ContentTabs/>
    </div>
</template>

<script>
import Actions from '~/components/Actions'
import Timeline from '~/components/Timeline'
import ContentTabs from '~/components/ContentTabs'

export default {
    props: ['page'],
    components: {
        Actions,
        Timeline,
        ContentTabs
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
    font-family: 'Rock Salt', cursive;
    letter-spacing: 1px;
    font-size: 1.2rem;
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
