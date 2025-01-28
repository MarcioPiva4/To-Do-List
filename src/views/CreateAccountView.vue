<script setup>
import { addDataToDB } from '@/utils/addData';
import { generateNewId } from '@/utils/generateNewId';
import {ref, reactive, onMounted} from 'vue';
import { RouterLink } from 'vue-router';

//ref = tipos primitivos
//reactive = objetos

const email = ref('');
const password = ref('');

const user = reactive({
    name: '',
    email: '',
    password: ''
});

const create = ref(false);
const noCreate = ref(false);

async function login(){
    const id = await generateNewId('users');
    const request = await addDataToDB({ id, name: user.name, email: user.email, password: user.password }, 'tasks');

    if(request){
        create.value = true;
        user.name = '', user.email = '', user.password = '';
        return
    }

    noCreate.value = true;
}

//evento de carregamento da pagina, geralmente utilizado para pegar dados de uma api
onMounted(() => {
    console.log('componente contruido no momento do carregamento da pagina');
});

</script>

<template>
    <div class="login-content">
        <h1>Realize o Cadastro</h1>
        <template v-if="create"><p class="message-sucess">Usuario criado com sucesso!</p></template>
        <template v-if="noCreate"><p class="message-error">Ocorreu um erro ao criar o usuario, tente novamente.</p></template>
        
        <form action="#" @submit.prevent="login" class="login-form">
            <input type="text" placeholder="Nome" v-model="user.name" required/>
            <input type="email" placeholder="Email" v-model="user.email" required/>
            <input type="password" placeholder="Senha" v-model="user.password" required/>
            <button type="submit">Cadastre-se</button>
        </form>
        <p class="message-signup">Já possui uma conta? <RouterLink to="/sign-in">Logar-se</RouterLink></p>
    </div>

</template>

<style scoped>
    p{
        display: block;
    }

    h1{
        font-size: 32px;
        letter-spacing: 2px;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 10px;
    }

    input{
        background-color: #E0E0E0;
        border: none;
        outline: none;
        padding: 10px;
        border-radius: 5px;
        color: #757575;
    }

    button{
        background-color: #FF5722;
        border: none;
        outline: none;
        padding: 10px;
        border-radius: 5px;
        color: #fff;
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 2px;
        cursor: pointer;
        transition: 0.2s all;
    }

    button:hover{
        background-color: #df4b1e;
    }

    .login-form{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .message-signup{
        font-size: 12px;
        margin-top: 5px;
    }
    .message-signup a{
        color: #FF5722;
    }

    .message-signup a:hover{
        background-color: transparent;
    }
</style>