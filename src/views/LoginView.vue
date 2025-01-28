<script setup>

import router from '@/router';
import { getDB } from '@/utils/db';
import {ref, reactive, onMounted} from 'vue';
import { RouterLink } from 'vue-router';

//ref = tipos primitivos
//reactive = objetos

const email = ref('');
const password = ref('');

const user = reactive({
    email: '',
    password: ''
});

const errorLogin = ref(false);

async function login(){
    const data = await getDB();
    const users = data.users; 

    const userExists = users.some((e) => {
        if(e.email === user.email && e.password === user.password){
            localStorage.setItem('user', JSON.stringify({email: e.email, nome: e.name, id: e.id}));
            router.replace('/dashboard');
            return true
        }
        return false
    });
    errorLogin.value = !userExists;
}

onMounted(() => {
    const userExist = localStorage.getItem('user');
    if(userExist){
        router.replace('/dashboard');
    }
});

</script>

<template>
    <div class="login-content">
        <h1>Realize o Login</h1>
        <template v-if="errorLogin"><p class="message-error">Email ou senha inválidas.</p></template>
        
        <form action="#" @submit.prevent="login" class="login-form">
            <input type="email" placeholder="Email" v-model="user.email" required/>
            <input type="password" placeholder="Senha" v-model="user.password" required/>
            <button type="submit">Login</button>
        </form>
        <p class="message-signup">Ainda não possui uma conta? <RouterLink to="/sign-up">Cadastre-se</RouterLink></p>
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