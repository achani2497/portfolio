<template>
    <div class="rrss-container flex flex-column">
        <div class="rrss flex active">
            <a v-for="(rs, index) in rrss" 
                :key="index" 
                :href="rs.link" 
                :class="['box-shadow', 'flex', rs.class_name+'-theme']"
                target="_blank" 
                rel="noopener noreferrer"
            >
                <div :class="['rs-icon', rs.class_name]"></div>
                <span> {{rs.nombre}} </span>
            </a>
        </div>
        <div class="footer-text texto-centrado flex flex-column">
            <span>Hecho con Vue.js 3 | Copyright © 2022.</span>
            <span>Página creada por Alejandro Ismael Chañi.</span>
            <span>Todos los derechos reservados.</span>
        </div>
    </div>
</template>
<style scoped>
    .rrss-container{
        padding: 2rem var(--lateral-padding-mobile);
        background-color: var(--violet);
        gap: 2rem;
    }
    .rrss{
        gap: 1rem;
        justify-content: space-around;
        list-style: none;
    }
    .rrss a{
        border-radius: 50px;
        transition: all .3s ease-in-out;
        border: 1px solid white;
        align-items: center;
        justify-content: center;
        text-decoration: none;
    }
    .rrss a .rs-icon{
        height: 50px;
        width: 50px;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 50px;
        transition: all .3s ease-in-out;
    }
    .rrss a .rs-icon + span{
        font-size: 0;
        width: 0;
        transition: all .4s ease-in;
    }
    .github{
        background-image: url('~@/assets/images/icons/rrss/github.svg');
    }
    .linkedin{
        background-image: url('~@/assets/images/icons/rrss/linkedin.svg');
    }
    .instagram{
        background-image: url('~@/assets/images/icons/rrss/instagram.svg');
    }
    .twitter{
        background-image: url('~@/assets/images/icons/rrss/twitter.svg');
    }
    .footer-text{
        color: hsl(266, 88%, 77%);
    }
@media screen and (min-width: 768px){
    .rrss-container{
        padding: 2rem 8rem ;
    }
}
@media screen and (min-width: 1024px){
    .rrss-container{
        padding: 2rem 16rem ;
    }
    .rrss a:hover{
        animation: open .3s ease-in-out;
        width: 170px;
        box-shadow: none;
        padding: 0 1rem;
    }
    .rrss a:hover span{
        color: white;
    }
    .rrss a.linkedin-theme:hover{
        background-color: #2867B2;
    }
    .rrss a.github-theme:hover{
        background-color: black;
    }
    .rrss a.twitter-theme:hover{
        background-color: #1DA1F2;
    }
    .rrss a.instagram-theme:hover{
        background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);        
    }
    .rrss a:hover span{
        font-size: 22px;
        width: 100%;
        text-align: center;
    }
    @keyframes open{
        0%{
            width: 50px;
        }
        100%{
            width: 150px;
        }
    }
}
</style>
<script>
export default {
    setup() {
        const rrss = [
            {
                nombre: 'Linked In',
                link: 'https://www.linkedin.com/in/alejandro-i-cha%C3%B1i-436370149/',
                class_name: 'linkedin'
            },
            {
                nombre: 'Github',
                link: 'https://github.com/achani2497',
                class_name: 'github'
            },
            {
                nombre: 'Twitter',
                link: 'https://twitter.com/ale_chani',
                class_name: 'twitter'
            },
            {
                nombre: 'Instagram',
                link: 'https://www.instagram.com/ale_chani',
                class_name: 'instagram'
            }
        ]

        return {
            rrss
        }
    },
}
</script>