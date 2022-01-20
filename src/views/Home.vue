<template>
    <menu-flotante></menu-flotante>
    <div class="presentacion flex flex-column">
        <texto-presentacion></texto-presentacion>
        <sobre-mi id="sobre-mi"></sobre-mi>
    </div>
    <div>
        <skills id="habilidades"></skills>
    </div>
    <div>
        <trabajos id="trabajos"></trabajos>
    </div>
    <div>
        <contacto id="contacto"></contacto>
    </div>
    <div>
        <redes-sociales id="redes"></redes-sociales>
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
import Menu                         from '../components/float-menu/menuComponent.vue'

export default {
    components:{
        'texto-presentacion':   TextoPresentacionComponent,
        'sobre-mi':             SobreMiComponent,
        'skills':               SkillsComponent,
        'trabajos':             TrabajosComponent,
        'contacto':             ContactoComponent,
        'redes-sociales':       RedesSociales,
        'menu-flotante':        Menu
    },
    setup() {
        
    },
}
</script>