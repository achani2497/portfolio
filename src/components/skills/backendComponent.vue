<template>
    <div class="techs-container flex flex-column">
        <div class="titulo texto-semi-grande texto-centrado violet">Back End</div>
        <ul class="flex">
            <li class="texto-semi-medio fade-in"><div class="icon php"></div>PHP <span>(Nivel: Medio)</span> </li>
            <li class="texto-semi-medio fade-in"><div class="icon laravel"></div>Laravel <span>(Nivel: Medio)</span> </li>
            <li class="texto-semi-medio fade-in"><div class="icon nodejs"></div>Node Js <span>(Nivel: Básico)</span> </li>
            <li class="texto-semi-medio fade-in"><div class="icon mysql"></div>MySQL <span>(Nivel: Medio)</span> </li>
            <li class="texto-semi-medio fade-in"><div class="icon sql"></div>SQL Server <span>(Nivel: Medio)</span> </li>
            <li class="texto-semi-medio fade-in"><div class="icon mongodb"></div>Mongo DB <span>(Nivel: Básico)</span> </li>
            <li class="texto-semi-medio fade-in"><div class="icon express"></div>Express <span>(Nivel: Básico)</span> </li>
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
    .php{
        background-image: url('~@/assets/images/icons/php.svg');
    }
    .laravel{
        background-image: url('~@/assets/images/icons/laravel.svg');
    }
    .nodejs{
        background-image: url('~@/assets/images/icons/nodejs.svg');
    }
    .mysql{
        background-image: url('~@/assets/images/icons/mysql.svg');
    }
    .sql{
        background-image: url('~@/assets/images/icons/sql.svg');
    }
    .mongodb{
        background-image: url('~@/assets/images/icons/mongodb.svg');
    }
    .express{
        background-image: url('~@/assets/images/icons/express.svg');
    }
@media screen and (min-width: 768px){
    ul{
        justify-content: space-between;
    }
}
</style>