<template>
    <div v-if="page.fields.pageRef">
        <!-- <section class="heading">
            {{page.fields.pageRef.fields.heading}}
        </section> -->
        <div class="container is-fluid introduction has-text-black">
            <div class="columns">
                <div class="column is-one-third">IMAGE FOULE</div>
                <div class="column is-size-5" v-html="$md.render(page.fields.pageRef.fields.introduction)"></div>
            </div>
        </div>
        <Actions/>
        <CallToActions/>
    </div>
</template>

<script>
import Actions from '~/components/Actions'
import CallToActions from '~/components/CallToActions'

export default {
    props: ['page'],
    components: {
        Actions,
        CallToActions
    }
}
</script>

<style>
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
</style>
