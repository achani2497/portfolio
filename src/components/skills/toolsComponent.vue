<template>
    <div class="techs-container flex flex-column">
        <div class="titulo texto-semi-grande texto-centrado violet">Herramientas</div>
        <ul class="flex">
            <li class="texto-semi-medio"><div class="icon github"></div>Github </li>
            <li class="texto-semi-medio"><div class="icon postman"></div>Postman </li>
            <li class="texto-semi-medio"><div class="icon figma"></div>Figma <span>(Nivel: Básico)</span> </li>
        </ul>
    </div>
</template>
<style scoped>
    .techs-container{
        gap: 1rem;
    }
    ul{
        list-style: none;
        gap: 1rem;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    li{
        display: flex;
        flex-direction: column;
        gap: .3rem;
        align-items: center;
    }
    .github{
        fill: black;
        background-image: url('~@/assets/images/icons/github-black.svg');
    }
    .postman{
        background-image: url('~@/assets/images/icons/postman.svg');
    }
    .figma{
        background-image: url('~@/assets/images/icons/figma.svg');
    }
@media screen and (min-width: 768px){
    ul{
        justify-content: space-between;
    }
}
</style>