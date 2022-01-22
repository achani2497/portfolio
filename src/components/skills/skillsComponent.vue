<template>
    <div class="skills">
        <div class="skill-container flex flex-column box-shadow">
            <div class="skills-titulo flex">
                <div class="titulo texto-centrado texto-grande violet">Conozco estas tecnologías</div>
                <div class="skills-image"></div>
            </div>
            <div class="stacks">
                <back-end></back-end>
                <front-end></front-end>
                <tools></tools>
            </div>
        </div>
    </div>
</template>
<style scoped>
.skills{
    position: relative;
    padding: 5rem var(--lateral-padding-mobile);
}
.skill-container{
    padding: 1rem;
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
    display: flex;
    flex-direction: column;
}
@media screen and (min-width: 768px){
    .skills{
        padding: var(--lateral-padding-mobile);
    }
    .stacks{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(40%, 25rem), 1fr));
    }
    li{
        text-align: center;
        justify-content: center;
        background-color: turquoise;
    }
}
@media screen and (min-width: 1024px){
    .skills{
        padding: 5rem var(--lateral-padding-mobile);
    }
}
</style>
<script>
import FrontEndComponent from './frontendComponent.vue'
import BackEndComponent from './backendComponent.vue'
import ToolsComponent from './toolsComponent.vue'

export default {
    components:{
        'front-end': FrontEndComponent,
        'back-end': BackEndComponent,
        'tools': ToolsComponent
    },
    setup() {
        
    },
}
</script>