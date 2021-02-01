<template>
    <div>
        <Actions/>
    </div>
</template>

<script>
import marked from 'marked'
import Actions from '~/components/Actions'

export default {
    components: {
        Actions,
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
