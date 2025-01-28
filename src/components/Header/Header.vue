<script setup lang="ts">
import router from '@/router';
import { RouterLink } from 'vue-router';

  function userExit(){
    router.replace('sign-in');
    localStorage.removeItem('user');
  }
</script>

<template>
  <header>
    <h1>To do List</h1>
    <nav>
      <ul>
        <li><RouterLink to="/dashboard">Inicio</RouterLink></li>
        <li><RouterLink to="/task-create">Criar</RouterLink></li>
        <li><RouterLink to="/about">Sobre</RouterLink></li>
        <li @click="userExit"><RouterLink to="#">Sair</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
    header{
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 20vw;
        background-color: #333333;
        color: #FF5722;
    }

    h1{
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 10px;
    }

    nav{
      height: 100%;
      width: 100%;
    }

    nav ul{
        list-style-type: none;
        padding: 0;
        margin-top: 30px;
    }

    nav ul li{
        padding: 0px 25px;
    }

    nav ul li a{
        color: #8BC34A;
        width: 100%;
        display: block;
        font-size: 16px;
    }

    nav ul li a:hover{
        background-color: transparent;
    }

    @media screen and (max-width: 750px) {
      header{
        top: auto;
        bottom: 0;
        width: 100%;
        height: 10vh;
        z-index: 1;
      }

      h1{
        display: none;
      }

      ul{
        display: flex;
        margin-top: 0 !important;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
    }
</style>