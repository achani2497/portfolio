<template>
    <nav>
        <ul :class="[menuAbierto ? 'active' : '']">
            <li :class="['menuButton', menuAbierto? 'active' : '']" @click="menu()">
                <div id="menuIcon">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </li>
            <li v-for="(seccion, index) in secciones" :key="index">
                <router-link 
                    :to="seccion.url" 
                    :class="[seccion.class, menuAbierto ? 'link' : '']" >{{seccion.nombre}}
                </router-link>
                <i 
                    :id="seccion.class" 
                    :class="[menuAbierto ? 'icon' : '']">
                    {{seccion.emoji}}
                </i>
            </li>
        </ul>
    </nav>
</template>
<style scoped>
    nav{
        position: fixed;
        top: 20px;
        right: 20px;
        width: auto;
        height: 250px;
        z-index: 6;
    }
    nav ul{
        width: 50px;
        height: 50px;
        background-color: var(--violet);
        border-top-left-radius: 100px;
        border-top-right-radius: 100px;
        border-bottom-right-radius: 100px;
        cursor: pointer;
        box-shadow: 6px 1px 1px rgba(0,0,0,0.02), 
                    6px 2px 2px rgba(0,0,0,0.06), 
                    6px 4px 4px rgba(0,0,0,0.12), 
                    6px 8px 8px rgba(0,0,0,0.16),
                    6px 16px 16px rgba(0,0,0,0.2);
        transition: .3s cubic-bezier(0.98, 0.23, 0.16, 1.28);
    }
    nav ul li{
        display: flex;
        align-items: center;
    }
    nav ul li:not(:first-child){
        width: 0;
        height: 0;
        z-index: -5;
    }
    nav ul.active li:not(:first-child){
        width: 180px;
        height: 50px;
        z-index: 2;
    }
    nav ul li:first-child{
        padding: 0;
    }
    nav ul li:not(:first-child) a{
        display: none;
    }
    nav ul.active li:not(:first-child) a{
        display: unset;
        color: white;
        height: inherit;
        width: inherit;
        padding-left: 1rem;
        font-size: 18px;
        opacity: 0;
        text-decoration: none;
        display: flex;
        align-items: center;
        box-shadow: -6px 1px 1px rgba(0,0,0,0.02), 
                    -6px 2px 2px rgba(0,0,0,0.06), 
                    -6px 4px 4px rgba(0,0,0,0.12), 
                    -6px 8px 8px rgba(0,0,0,0.16),
                    -6px 16px 16px rgba(0,0,0,0.2);
    }
    nav ul li i{
        color: white;
        opacity: 0;
        height: 50px;
        width: 50px;
        font-size: 25px;
        font-style: normal;
    }  
    nav ul li:not(.menuButton){
        justify-content: space-between;
        margin-left: -140px;
    }
    nav ul li.menuButton{
        width: 50px;
        height: 50px;
        justify-content: center;
    }
    nav ul li.menuButton .bar{
        width: 20px;
        height: 2px;
        background: white;
        transition: .4s linear;
    }
    nav ul li.menuButton .bar:nth-child(2){
        margin: 3px 0;
    }
    .active .bar:first-child{
        animation: barOne .4s ease-in-out forwards;
    }
    .active .bar:nth-child(2){
        transform: scale(0)
    }
    .active .bar:last-child{
        animation: barTwo .4s ease-in-out forwards;
    }

    .sobre-mi{
        background-image: url('~@/assets/images/icons/menu/sobre-mi.svg');
    }
    .habilidades{
        background-image: url('~@/assets/images/icons/menu/habilidades.svg');
    }
    .trabajos{
        background-image: url('~@/assets/images/icons/menu/trabajos.svg');
    }
    .contacto{
        background-image: url('~@/assets/images/icons/menu/contacto.svg');
    }
    .redes{
        background-image: url('~@/assets/images/icons/menu/redes.svg');
    }

    .icon, .link{
        animation: fadeIn .3s ease-in-out forwards;
    }
    .icon{
        height: 30px;
        width: 30px;
    }
    .l_sobreMi,#l_sobreMi{
        animation-delay: .1s;
    }
    .l_habilidades, #l_habilidades{
        animation-delay: .2s;
    }
    .l_misTrabajos, #l_misTrabajos{
        animation-delay: .3s;
    }
    .l_contacto, #l_contacto{
        animation-delay: .4s;
    }
    .l_redes, #l_redes{
        animation-delay: .5s;
    }

    @keyframes barOne{
        0%{
            transform: none;
        }
        25%{
            transform: translateY(5px);
        }
        100%{
            transform: translateY(5px) rotate(45deg)
        }
    }
    @keyframes barTwo{
        0%{
            transform: none;
        }
        25%{
            transform: translateY(-5px);
        }
        100%{
            transform: translateY(-5px) rotate(-45deg)
        }
    }
    @keyframes fadeIn {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
            background-color: var(--violet);
            border-top-left-radius: 90px;
            border-bottom-left-radius: 90px;
        }
    }
</style>
<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {
        let menuAbierto = ref(false)
        let secciones = [
            {
                nombre: 'Sobre mi',
                url: '#sobre-mi',
                class: 'l_sobreMi',
                icon: 'sobre-mi',
                emoji: '👨🏽‍💻'
            },
            {
                nombre: 'Habilidades',
                url: '#habilidades',
                class: 'l_habilidades',
                icon: 'habilidades',
                emoji: '💻'
            },
            {
                nombre: 'Mis Trabajos',
                url: '#trabajos',
                class: 'l_misTrabajos',
                icon: 'trabajos',
                emoji: '💼'
            },
            {
                nombre: 'Contacto',
                url: '#contacto',
                class: 'l_contacto',
                icon: 'contacto',
                emoji: '📱'
            },
            {
                nombre: 'Redes Sociales',
                url: '#redes',
                class: 'l_redes',
                icon: 'redes',
                emoji: '🌐'
            }
        ]
        const menu = () => {
            menuAbierto.value = !menuAbierto.value
        }
        return{
            menuAbierto,
            menu,
            secciones
        }
    },
    mounted(){
        let menu = document.getElementsByClassName('menuButton')
        menu[0].addEventListener('click', function(){
        const ul = document.getElementsByTagName('ul')
            if(menu[0].classList.contains('active')){
                ul[0].style.height = '300px'
            } else {
                ul[0].style.height = '50px'
            }
        })
    }
}
</script>