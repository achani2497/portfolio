<template>
  <div class="logo"></div>
  <router-view/>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&family=Rubik:wght@500&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
  font-size: 15px;
}
html{
  scroll-behavior: smooth;
}
:root{
  --violet:#6A0FE1;
  --yellow:#FEBD01;
  --lateral-padding-mobile: 1rem;
  --width-section-image: 300px;
  --height-section-image: 200px;
}
.logo{
  width: 70px;
  height: 70px;
  background-image: url('~@/assets/images/logo.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 250%;
}
.titulo{
  font-family: 'Rubik', sans-serif;
}
.violet{
  color: var(--violet)
}
.yellow{
  color: var(--yellow);
}
.white{
  color: white;
}
.texto-xl{
  font-size: 6rem;
}
.texto-grande{
  font-size: 3rem;
}
.texto-medio{
  font-size: 1.5rem;
}
.texto-centrado{
  text-align: center;
  overflow-wrap: break-word;
}
.flex{
  display:flex
}
.flex-column{
  flex-direction: column;
}
.icon{
  height: 30px;
  width: 30px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.box-shadow{
  box-shadow: 0 1px 1px rgba(0,0,0,0.02), 
              0 2px 2px rgba(0,0,0,0.06), 
              0 4px 4px rgba(0,0,0,0.12), 
              0 8px 8px rgba(0,0,0,0.16),
              0 16px 16px rgba(0,0,0,0.2);
}
.text-shadow{
  text-shadow: 0 0px 1px rgba(106, 15, 225, 0.02), 
              0 1px 2px rgba(0,0,0,0.06), 
              0 2px 4px rgba(0,0,0,0.1), 
              0 4px 8px rgba(0,0,0,0.14);
}

/* Para tablets   */
@media screen and (min-width: 768px) {

}

/* Para pantallas mas grandes */
@media screen and (min-width: 992px) {

}

</style>