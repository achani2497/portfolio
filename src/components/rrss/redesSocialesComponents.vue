<template>
    <div class="rrss-container flex flex-column">
        <ul class="rrss flex">
            <li :class="['rs-icon', 'box-shadow', rs.class_name]" v-for="(rs, index) in rrss" :key="index">
                <a :href="rs.link"></a>
            </li>
        </ul>
        <div class="footer-text texto-centrado flex flex-column">
            <span>Copyright © 2022</span>
            <span>Página creada por Alejandro Ismael Chañi</span>
            <span>Todos los derechos reservados</span>
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
    }
    .rs-icon{
        height: 50px;
        width: 50px;
        background-position: center;
        background-repeat: no-repeat;
        fill: white;
        overflow: hidden;
        border: 1px solid white;
        border-radius: 100%;
    }
    .rs-icon a{
        height: 100%;
        width: 100%;
        border-radius: 100%;
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