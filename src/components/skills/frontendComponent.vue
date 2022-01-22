<template>
    <div class="techs-container flex flex-column">
        <div class="titulo texto-semi-grande texto-centrado violet">Front End</div>
        <ul class="flex">
            <li class="texto-semi-medio"> <div class="icon html5"></div> HTML <span>(Nivel: Medio)</span> </li>
            <li class="texto-semi-medio"> <div class="icon css3"></div> CSS <span>(Nivel: Medio)</span> </li>
            <li class="texto-semi-medio"> <div class="icon js"></div> JS <span>(Nivel: Medio)</span> </li>
            <li class="texto-semi-medio"> <div class="icon vue"></div> Vue.js (2/3)  <span>(Nivel: Medio)</span></li>
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
    .skill-box{
        background-color: white;
    }
    .html5{
        background-image: url('~@/assets/images/icons/html5.svg');
    }
    .css3{
        background-image: url('~@/assets/images/icons/css3.svg');
    }
    .js{
        background-image: url('~@/assets/images/icons/js.svg');
    }
    .vue{
        background-image: url('~@/assets/images/icons/vue.svg');
    }
@media screen and (min-width: 768px){
    ul{
        justify-content: space-between;
    }
}
</style>