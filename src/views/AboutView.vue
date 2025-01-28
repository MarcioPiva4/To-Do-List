<script setup lang="ts">
import Header from '@/components/Header/Header.vue';

</script>

<template>
  <Header></Header>
  <main>
    <div class="about-content">
      <h1>Sobre o projeto</h1>
      <p>
        Este projeto foi desenvolvido com o objetivo de aprimorar e consolidar os conhecimentos sobre o framework Vue.js, com isto foi criado este projeto utilizando as ferramentas básicas com CRUD e algumas outras funcionalidades para fins de estudos.
      </p>
      <p>
        A aplicação também integra dados de um server JSON, o que permite carregar informações dinâmicas e atualizá-las de forma simples e eficaz. Utilizando o formato JSON, conseguimos simular a comunicação entre o front-end e uma API, praticando conceitos importantes sobre requisições assíncronas e o consumo de dados de um servidor remoto.
      </p>
      <p class="last-p">
        O foco principal deste projeto é proporcionar uma experiência de aprendizado prática e envolvente, onde as tecnologias Vue.js e server-json são usadas em conjunto para criar uma aplicação funcional e escalável.
      </p>

      <p><b>Criado por:</b> Márcio Piva Junior</p>
      <p><b>Email:</b> marciopivajunior457@gmail.com</p>
    </div>
  </main>
</template>

<style scoped>
  .about-content{
    max-width: 900px;
    padding: 0 25px;
    margin-top: 20px;
    text-align: left;
  }

  h1{
    margin: 20px 0;
    font-weight: 500;
  }

  .last-p{
    margin-bottom: 50px;
  }

  b{
    font-weight: 700;
  }
</style>
