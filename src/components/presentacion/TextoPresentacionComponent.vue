<template>
    <div class="texto-presentacion-container flex flex-column">
        <h1 class="titulo texto-grande texto-centrado violet">Front-end & Back-end Developer</h1>
        <h2 class="texto-medio texto-centrado">Creo soluciones e interfaces y trato de codear la menor cantidad posible de bugs 😝 </h2>
        <div class="avatar"></div>
    </div>
</template>
<style scoped>
.texto-presentacion-container{
    padding: 3rem var(--lateral-padding-mobile) 0;
    gap: 2.3rem;
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
</style>