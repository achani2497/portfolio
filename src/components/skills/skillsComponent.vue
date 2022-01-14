<template>
    <div class="skills">
        <div class="absolute-container flex flex-column box-shadow">
            <div class="skills-titulo flex">
                <div class="titulo texto-centrado texto-grande violet">Estas son mis skills!</div>
                <div class="skills-image"></div>
            </div>
            <div class="stacks flex flex-column">
                <front-end></front-end>
                <back-end></back-end>
            </div>
        </div>
    </div>
</template>
<style>
.skills{
    position: relative;
    padding: 4rem var(--lateral-padding-mobile);
}
.absolute-container{
    padding: 1rem;
    margin: 0 var(--lateral-padding-mobile);
    gap: 1rem;
    border-radius: 25px;
    background-color: white;
    border: 2px solid var(--violet);
}
.skills-titulo{
    position: relative;
    flex-direction: column;
}
.skills-image{
    height: var(--height-section-image);
    width: var(--width-section-image);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url('~@/assets/images/ilustraciones_violetas/skills2.png');
    margin: 0 auto;
}
.stacks{
    gap: 3rem;
}
ul{
    list-style: none;
    gap: .5rem;
}
li{
    display: flex;
    align-items: center;
    gap: .5rem;
}
</style>
<script>
import FrontEndComponent from './frontendComponent.vue'
import BackEndComponent from './backendComponent.vue'

export default {
    components:{
        'front-end': FrontEndComponent,
        'back-end': BackEndComponent
    },
    setup() {
        
    },
}
</script>