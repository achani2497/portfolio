<template>
    <div class="trabajos-container">
        <div class="absolute-container flex flex-column">
            <div class="trabajos-titulo flex">
                <div class="titulo texto-centrado texto-grande white">Estos son mis trabajos!</div>
                <div class="trabajos-image"></div>
            </div>
            <ul class="trabajos-galeria">
                <li v-for="(trabajo, index) in trabajos" :key="index">
                    <trabajo 
                        :titulo="trabajo.titulo" 
                        :descripcion="trabajo.descripcion"
                        :tareas="trabajo.tareas"
                        :tecnologias="trabajo.tecnologias"
                        :imagenes="trabajo.imagenes"
                        class="box-shadow"
                    >
                    </trabajo>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.trabajos-container{
    position: relative;
    padding: 3rem var(--lateral-padding-mobile);
    background-color: var(--violet);
}
.absolute-container{
    padding: 0;
    margin: 0 var(--lateral-padding-mobile);
    border-radius: 25px;
    gap: 1rem;
    background-color: var(--violet);
}
.trabajos-titulo{
    position: relative;
    flex-direction: column;
}
.trabajos-image{
    height: var(--height-section-image);
    width: var(--width-section-image);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-image: url('~@/assets/images/ilustraciones_amarillas/trabajos.svg');
    margin: 0 auto;
}
.trabajos-galeria{
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
</style>
<script>
import Trabajo from './trabajo.vue'
export default {
    components:{
        'trabajo': Trabajo
    },
    setup() {
        const trabajos =[
            {
                titulo: 'IngeSystem',
                descripcion: `IngeSystem es un sistema de almacenamiento y gestion de información relacionada a los trabajos que realiza la empresa Ingeray. Ayuda a facilitar el seguimiento de los trabajos realizados y los trabajos pendientes, así como tambien facilita el proceso de realizacion de presupuestos y de facturación.`,
                tareas:['Desarrollo Front-end', 'Desarrollo Back-end', 'Diseño de la UI'],
                tecnologias:[
                    {
                        nombre:'Laravel',
                        img: 'laravel.svg'
                    },
                    {
                        nombre:'Vue 2',
                        img: 'vue.svg'
                    },
                    {
                        nombre:'MySQL',
                        img: 'mysql.svg'
                    }
                ],
                imagenes:['aboutme2.svg', 'skills2.svg']
            },
            {
                titulo: 'Ingeray Qr Maker',
                descripcion: `Plataforma complementaria a IngeSystem utilizada para la creacion de códigos QR que facilitan la carga de pedidos de servicio técnico por parte del personal médico que opere el equipo.`,
                tareas:['Desarrollo Front-end', 'Desarrollo Back-end', 'Diseño de la UI'],
                tecnologias:[
                    {
                        nombre:'NodeJS',
                        img: 'nodejs.svg'
                    },
                    {
                        nombre:'Vue 3',
                        img: 'vue.svg'
                    },
                    {
                        nombre:'MongoDB',
                        img: 'mongodb.svg'
                    },
                    {
                        nombre:'Express',
                        img: 'mongodb.svg'
                    }
                ],
            }
        ]

        return {
            trabajos
        }
    },
}
</script>