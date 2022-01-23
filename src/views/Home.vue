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
import { onMounted } from 'vue'

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
        var fadeInElements = []
        const handleScroll = () => {
            for (var i = 0; i < fadeInElements.length; i++) {
                var elem = fadeInElements[i]
                if(isElemVisible(elem)){
                    elem.style.opacity = '1'
                    elem.style.transform = 'scale(1)'
                    fadeInElements.splice(i, 1)
                }
            }
        }
        const isElemVisible = (el) => {
            var rect = el.getBoundingClientRect()
            var elemTop = rect.top + 100 // 200 = buffer
            var elemBottom = rect.bottom
            return elemTop < window.innerHeight && elemBottom >= 0
        }
        onMounted(() => {
            fadeInElements = Array.from(document.getElementsByClassName('fade-in'))
            document.addEventListener('scroll', handleScroll)
            handleScroll()
        })
    }
}
</script>