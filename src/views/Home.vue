<template>
    <div class="presentacion flex flex-column">
        <texto-presentacion></texto-presentacion>
        <sobre-mi></sobre-mi>
    </div>
    <div>
        <skills></skills>
    </div>
    <div>
        <trabajos></trabajos>
    </div>
    <div>
        <contacto></contacto>
    </div>
    <div>
        <redes-sociales></redes-sociales>
    </div>
</template>
<style scoped>
.presentacion{
    gap: 2rem;
}
</style>
<script>
import TextoPresentacionComponent   from '../components/presentacion/TextoPresentacionComponent.vue'
import SobreMiComponent             from '../components/presentacion/SobreMiComponent.vue'
import SkillsComponent              from '../components/skills/skillsComponent.vue'
import TrabajosComponent            from '../components/trabajos/trabajosComponent.vue'
import ContactoComponent            from '../components/contacto/contactoComponent.vue'
import RedesSociales                from '../components/rrss/redesSocialesComponents.vue'

export default {
    components:{
        'texto-presentacion':   TextoPresentacionComponent,
        'sobre-mi':             SobreMiComponent,
        'skills':               SkillsComponent,
        'trabajos':             TrabajosComponent,
        'contacto':             ContactoComponent,
        'redes-sociales':       RedesSociales
    },
    setup() {
        
    },
}
</script>