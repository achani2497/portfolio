<template>
    <div class="sobre-mi-container flex flex-column">
        <img :src="require('@/assets/images/ilustraciones_violetas/aboutme.svg')" alt="sobre-mi-imagen">
        <div class="titulo texto-grande texto-centrado">¡Hola, Soy Ale!</div>
        <div class="texto-centrado">
            <p class="texto-medio">Soy estudiante de 4to año de Ingeniería en Sistemas de Información en la UTN FRBA y ayudante de la materia "Paradigmas de Programación" hace 3 años. Soy desarrollador Front-end y Back-end hace ya 2 años. Me gusta encarar nuevos proyectos que tengan impacto sobre las personas y que me ayuden a crecer profesionalmente.</p> 
            <p class="texto-medio">En mi tiempo libre, una de las cosas que mas me gusta hacer es aprender por mi cuenta nuevas herramientas y técnicas que me puedan ayudar a ser mejor desarrollador y mejor compañero.</p>
        </div>
    </div>
</template>
<style scoped>
.sobre-mi-container{
    align-items: center;
    padding: 3rem var(--lateral-padding-mobile) 5rem;
    background-color: var(--yellow);
    color: black;
    gap: 1rem;
}
img{
    width: 100%;
}
@media screen and (min-width: 768px) {
    .sobre-mi-container{
        padding: 1rem var(--lateral-padding-mobile) 5rem;
    }
    img{
        height: 300px;
        width: 500px;
    }
}
</style>