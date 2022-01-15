<template>
    <div class="trabajo-container flex flex-column">
        <h3 class="titulo texto-semi-grande texto-centrado">{{titulo}}</h3>
        <p class="texto-centrado texto-semi-medio">{{descripcion}}</p>
        <div class="list-container flex flex-column">
            <h4 class="titulo texto-medio yellow">Roles</h4>
            <ul class="flex flex-column">
                <li class="texto-semi-medio" v-for="(tarea, index) in this.tareas" :key="index">{{tarea}}</li>
            </ul>
        </div>
        <div class="list-container flex flex-column">
            <h4 class="titulo texto-medio yellow">Técnologias</h4>
            <ul class="flex flex-column">
                <li class="texto-semi-medio" v-for="(tecnologia, index) in this.tecnologias" :key="index">{{tecnologia.nombre}}</li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
    .trabajo-container{
        width: 100%;
        padding: .5rem;
        gap: 1.5rem;
        color: white;
        border: 1px solid white;
        border-radius: 15px;
    }
    .titulo{
        letter-spacing: 1px;
    }
    .list-container{
        gap: .3rem;
    }
    ul{
        gap: .3rem;
    }
</style>
<script>
export default {
    props:[
        'titulo',
        'descripcion',
        'tareas',
        'tecnologias',
        'imagenes'
    ],
    setup() {
        
    },
}
</script>