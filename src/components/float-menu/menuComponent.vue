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
                <router-link :to="seccion.url" :class="[seccion.class, menuAbierto ? 'link' : '']" >{{seccion.nombre}}</router-link>
                <i :id="seccion.class" :class="[seccion.icon, menuAbierto ? 'icon' : '']"></i>
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
        z-index: 2;
    }
    nav ul{
        width: 50px;
        height: 50px;
        background-color: var(--violet);
        border-top-left-radius: 90px;
        border-top-right-radius: 90px;
        border-bottom-right-radius: 90px;
        z-index: 2;
        cursor: pointer;
        box-shadow: 2px 1px 1px rgba(0,0,0,0.02), 
                    2px 2px 2px rgba(0,0,0,0.06), 
                    2px 4px 4px rgba(0,0,0,0.12), 
                    2px 8px 8px rgba(0,0,0,0.16),
                    2px 16px 16px rgba(0,0,0,0.2);
        transition: .3s cubic-bezier(0.98, 0.23, 0.16, 1.28);
    }
    li{
        width: 180px;
        height: 50px;
        display: flex;
        align-items: center;
    }
    li:first-child{
        padding: 0;
    }
    li a{
        color: white;
        box-shadow: -5px 1px 1px rgba(0,0,0,0.02), 
                    -5px 2px 2px rgba(0,0,0,0.06), 
                    -5px 4px 4px rgba(0,0,0,0.12), 
                    -5px 8px 8px rgba(0,0,0,0.16),
                    -5px 16px 16px rgba(0,0,0,0.2);
    }
    li:not(.menuButton){
        justify-content: space-between;
        margin-left: -140px;
    }
    li.menuButton{
        width: 50px;
        height: 50px;
        justify-content: center;
    }
    li.menuButton .bar{
        width: 20px;
        height: 2px;
        background: white;
        transition: .4s linear;
    }
    li.menuButton .bar:nth-child(2){
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

    li i{
        color: white;
        opacity: 0;
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

    a{
        height: 100%;
        width: 100%;
        padding-left: 1rem;
        color: var(--yellow);
        font-size: 18px;
        opacity: 0;
        text-decoration: none;
        display: flex;
        align-items: center;
    }
    .icon, .link{
        animation: fadeIn .3s ease-in-out forwards;
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
            /* z-index: -1; */
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
                icon: 'sobre-mi'
            },
            {
                nombre: 'Habilidades',
                url: '#habilidades',
                class: 'l_habilidades',
                icon: 'habilidades'
            },
            {
                nombre: 'Mis Trabajos',
                url: '#trabajos',
                class: 'l_misTrabajos',
                icon: 'trabajos'
            },
            {
                nombre: 'Contacto',
                url: '#contacto',
                class: 'l_contacto',
                icon: 'contacto'
            },
            {
                nombre: 'Redes Sociales',
                url: '#redes',
                class: 'l_redes',
                icon: 'redes'
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