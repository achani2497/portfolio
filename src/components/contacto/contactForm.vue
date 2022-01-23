<template>
    <div class="form-container box-shadow fade-in">
        <form @submit.prevent="enviarMail" class="flex flex-column">
            <div class="form-body flex flex-column">
                <div class="form-input-group">
                    <label for="nombre" class="titulo">¿Cómo te llamas?</label>
                    <input type="text" name="nombre" id="nombre" class="input-form">
                    <span></span>
                </div>
                <div class="form-input-group">
                    <label for="telefono" class="titulo">¿Cómo es tu numero de teléfono?</label>
                    <input type="text" name="telefono" id="telefono" class="input-form">
                    <span></span>
                </div>
                <div class="form-input-group">
                    <label for="mail" class="titulo">¿Cómo es tu mail?</label>
                    <input type="text" name="mail" id="mail" class="input-form">
                    <span></span>
                </div>
                <div class="form-input-group">
                    <label for="comentario" class="titulo">Comentame tu propuesta!</label>
                    <textarea name="comentario" id="comentario" cols="30" rows="10"></textarea>
                </div>
            </div>
            <div class="form-footer">
                <button type="submit" class="btn">Enviar</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
    .form-container{
        border: 1px solid rgb(235, 235, 235);
        padding: 1rem;
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
        background-color: var(--violet);
    }
    .input-form, textarea:focus{
        outline: none;
    }
    .btn{
        width: 100%;
        background-color: rgb(53, 177, 0);
        color: white;
        border: none;
        border-radius: 20px;
        font-size: 18px;
        padding: .4rem;
        transition: all .3s ease-in-out;
        letter-spacing: 2px;
        box-shadow: 0 1px 1px rgba(0,0,0,0.02), 
                    0 2px 2px rgba(0,0,0,0.06), 
                    0 4px 4px rgba(0,0,0,0.12), 
                    0 8px 8px rgba(0,0,0,0.16);
    }
    .btn:hover{
        cursor: pointer;
        box-shadow: none;
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
        const enviarMail = () => {
            console.log('Mando mail')
        }
        return {
            enviarMail
        }
    },
}
</script>