<template>
    <div class="contacto-container flex flex-column">
        <div class="titulo texto-centrado texto-grande violet">¡Trabajemos juntos!</div>
        <img :src="require('@/assets/images/ilustraciones_violetas/contacto.svg')" alt="sobre-mi-imagen">
        <contact-form></contact-form>
    </div>
</template>
<style scoped>
.contacto-container{
    padding: 3rem var(--lateral-padding-mobile);
}
</style>
<script>
import contactForm from './contactForm.vue'
export default {
    components:{
        'contact-form': contactForm
    },
    setup() {
        
    },
}
</script>