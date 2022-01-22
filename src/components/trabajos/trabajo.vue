<template>
    <div class="card-container"> 
        <div class="card">
            <div class="click">
                <div class="card--display flex flex-column">
                    <h2 class="titulo texto-semi-grande texto-centrado">{{titulo}}</h2>
                    <p class="texto-centrado texto-semi-medio">{{descripcion}}</p>
                    <button class="work-button titulo box-shadow technical-button">Ver detalles técnicos</button>
                </div>
                <div class="card--hover flex flex-column">
                    <div class="list-container flex flex-column">
                        <h4 class="titulo texto-medio yellow">Roles</h4>
                        <ul class="flex flex-column">
                            <li class="texto-semi-medio" v-for="(tarea, index) in this.tareas" :key="index">{{tarea}}</li>
                        </ul>
                    </div>
                    <div class="list-container flex flex-column">
                        <h4 class="titulo texto-medio yellow">Stack</h4>
                        <ul class="flex flex-column">
                            <li class="texto-semi-medio" v-for="(tecnologia, index) in this.tecnologias" :key="index">{{tecnologia.nombre}}</li>
                        </ul>
                    </div>
                    <button type="button" class="work-button titulo box-shadow">Ver Demo</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .titulo{
        letter-spacing: 1px;
    }
    .list-container{
        gap: .3rem;
    }
    ul{
        gap: .3rem;
    }
    .card-container{
        flex: 300px;
        border-radius: 25px;
        overflow: hidden;
    }
    .card-container .card{
        position: relative;
        width: 100%;
    }
    .card-container.card-container .click{
        padding: 30px;
        width: 100%;
        height: fit-content;
        border-radius: 25px;
        border: 1px solid white;
        text-decoration: none;
        color: white;
        display: block;
        transition: .3s ease-in-out;
    }
    .card-container .card .click:hover{
        border: 1px solid var(--yellow);
    }
    .card--display{
        gap: 1.5rem;
        height: fit-content;
    }
    .card--hover{
        gap: 1.5rem;
    }
    .card-container .card .click:hover .card--display{
        display: none;
    }
    .card-container .card .click:hover .card--hover{
        display: flex;
    }
    .card-container .card .click .card--hover{
        display: none;
    }
    .work-button{
        border: 2px solid white;
        border-radius: 20px;
        width: fit-content;
        padding: .3rem 2rem;
        background-color: transparent;
        color: white;
        margin: 0 auto;
        transition: all .1s ease-in-out;
        font-weight: bold;
    }
    .work-button:active{
        background-color: white;
        color: var(--violet);
        box-shadow: none;
    }
@media screen and (min-width: 1024px){
    .work-button:hover{
        cursor: pointer;
        background-color: white;
        color: var(--violet);
        box-shadow: none;
    }
    .technical-button{
        display: none;
    }
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