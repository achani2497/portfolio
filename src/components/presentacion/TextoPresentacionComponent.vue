<template>
    <div class="texto-presentacion-container flex flex-column">
        <div class="title-container texto-centrado violet">
            <span class="titulo texto-grande">Front-end </span>
            <span class="titulo texto-grande">&</span>
            <span class="titulo texto-grande">Back-end Developer</span>
        </div>
        <div class="texto-medio texto-centrado">Creo soluciones e interfaces y trato de codear la menor cantidad posible de bugs 😝 </div>
        <div class="avatar"></div>
    </div>
</template>
<style scoped>
.texto-presentacion-container{
    padding: 2rem var(--lateral-padding-mobile);
    gap: 2rem;
}
.title-container{
    display: flex;
    flex-direction: column;
}
.avatar{
    height: 250px;
    width: 250px;
    border: 3px solid var(--violet);
    padding: 5px;
    border-radius: 50%;
    margin: 0 auto;
    background-image: url('~@/assets/images/avatar/Avatar.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-clip: content-box;
}
@media screen and (min-width: 768px) {
    .title-container{
        flex-direction: row;
        gap: 1rem;
        justify-content: center;
    }
}
</style>