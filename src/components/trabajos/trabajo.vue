<template>
    <div class="trabajo-container flex flex-column">
        <h3 class="titulo texto-medio texto-centrado">{{titulo}}</h3>
        <p class="texto-centrado">{{descripcion}}</p>
        <div class="list-container flex flex-column">
            <h4 class="titulo yellow">Roles</h4>
            <ul>
                <li v-for="(tarea, index) in this.tareas" :key="index">{{tarea}}</li>
            </ul>
        </div>
        <div class="list-container flex flex-column">
            <h4 class="titulo yellow">Técnologias</h4>
            <ul>
                <li v-for="(tecnologia, index) in this.tecnologias" :key="index">{{tecnologia.nombre}}</li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
    .trabajo-container{
        width: 100%;
        padding: .5rem;
        gap: 1rem;
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