<template>
    <div class="form-container box-shadow fade-in">
        <form @submit.prevent="enviarMail" class="flex flex-column">
            <div class="form-body flex flex-column">
                <div class="form-input-group">
                    <label for="nombre" class="titulo">¿Cómo te llamas?</label>
                    <input type="text" name="nombre" id="nombre" class="input-form" autocomplete="off">
                    <span></span>
                </div>
                <div class="form-input-group">
                    <label for="telefono" class="titulo">¿Cómo es tu numero de teléfono?</label>
                    <input type="text" name="telefono" id="telefono" class="input-form" autocomplete="off">
                    <span></span>
                </div>
                <div class="form-input-group">
                    <label for="mail" class="titulo">¿Cómo es tu mail?</label>
                    <input type="text" name="mail" id="mail" class="input-form" autocomplete="off">
                    <span></span>
                </div>
                <div class="form-input-group">
                    <label for="comentario" class="titulo">Comentame tu propuesta!</label>
                    <textarea name="comentario" id="comentario" cols="30" rows="10"></textarea>
                </div>
            </div>
            <div class="form-footer">
                <button type="submit" class="btn flex" id="sendButton">
                    <div class="button-text titulo" id="textButton">Enviar</div>
                    <i id="plane"></i>
                </button>
            </div>
        </form>
    </div>
</template>
<style scoped>
    .form-container{
        border: 1px solid rgb(235, 235, 235);
        padding: 2rem;
        border-radius: 15px;
        width: 100%;
    }
    form{
        gap: 1rem;
    }
    .form-body{
        gap: 1rem;
    }
    .form-input-group{
        position: relative;
        display: flex;
        flex-direction: column;
        gap: .3rem;
    }
    .form-input-group label{
        color: var(--violet);
        letter-spacing: .6px;
    }
    .input-form{
        border: none;
        height: 30px;
        font-size: 20px;
        transition: all .5s ease;
        border-bottom: 1px solid gray;
        position: relative;
    }
    span{
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        left: 0;
    }
    span::after{
        content: '';
        position: absolute;
        width: 0;
        bottom: 0;
        left: 0;
        transition: all .5s ease-in-out;
    }
    textarea{
        background-color: transparent;
        border: 1px solid var(--violet);
        font-size: 20px;
        padding: 0 .3rem;
    }
    .input-form:focus~span::after{
        transform: scaleX(1);
        width: 100%;
        height: 2px;
        background-color: var(--yellow);
    }
    .input-form, textarea:focus{
        outline: none;
    }
    .btn{
        position: relative;
        width: 100%;
        background-color: transparent;
        color: var(--violet);
        border: 1px solid var(--violet);
        border-radius: 20px;
        height: 35px;
        padding: .4rem;
        transition: all .3s ease-in-out;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        letter-spacing: 2px;
        box-shadow: 0 1px 1px rgba(0,0,0,0.02), 
                    0 2px 2px rgba(0,0,0,0.06), 
                    0 4px 4px rgba(0,0,0,0.12), 
                    0 8px 8px rgba(0,0,0,0.16);
    }
    .btn:hover{
        cursor: pointer;
        background-color: var(--violet);
        color: white;
        box-shadow: none;
    }
    .button-text{
        font-size: 18px;
        font-weight: bold;
    }
    i{
        height: 35px;
        width: 35px;
        display: none;
    }
    .plane{
        background-image: url('~@/assets/images/icons/plane.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        transform: translateX(-200px);
        display: block;
    }
    .fly{
        animation: fly 1.5s forwards;
        animation-timing-function: cubic-bezier(.85,.11,.41,.96);
    }
    @keyframes fly{
        from{
            transform: translateX(-200px) rotate(45deg);
        }
        to{
            transform: translateX(250px) rotate(45deg);
        }
    }
@media screen and (min-width: 768px) {
    .form-container{
        max-width: 500px;
    }
}
</style>
<script>
export default {
    setup() {
        const animarBoton = () => {
            let boton = document.getElementById('sendButton')
            let texto = document.getElementById('textButton')
            let avion = document.getElementById('plane')
            texto.style.display = 'none'
            avion.classList.add('fly')
            avion.classList.add('plane')
            setTimeout(() => {
                avion.style.display = 'none'
                boton.style.boxShadow = 'none'
                boton.style.backgroundColor = 'rgb(53, 177, 0)'
                texto.innerHTML = '!Enviado!'
                texto.style.display = 'block'
                texto.style.color = 'white'
            }, 1600)

        }
        const enviarMail = () => {
            animarBoton()
        }
        return {
            enviarMail,
            animarBoton
        }
    },
}
</script>