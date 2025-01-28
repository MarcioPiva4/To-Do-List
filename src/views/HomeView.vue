<script setup>
import Header from '@/components/Header/Header.vue';
import IconBin from '@/components/icons/IconBin.vue';
import IconPencil from '@/components/icons/IconPencil.vue';
import IconSupport from '@/components/icons/IconSupport.vue';
import PopupDelete from '@/components/PopupDelete/PopupDelete.vue';
import { getDB } from '@/utils/db';
import { deleteDataById } from '@/utils/deleteData';
import { reactive } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';


const tasksUser = reactive([]);
const nameUser = ref('');
const popupDeleteTask = ref(false);

onMounted(async() => {
  const data = await getDB();
  const tasks = data.tasks;

  const user = JSON.parse(localStorage.getItem('user'));
  const idUser = user.id;
  nameUser.value = user.nome;
  const tasksFiltered = tasks.filter((e) => e.id_usuario == idUser);
  tasksFiltered.forEach((e) => {
    tasksUser.push({
      id: e.id,
      nome : e.nome,
      descricao : e.descricao,
      prioridade : e.prioridade,
      status : e.status,
    });
  });
})

let idTask;
function togglePopupDeleteTask(value, id){
  popupDeleteTask.value = value;
  idTask = id;

  if(value){
    document.body.style.overflow = 'hidden';
  }

  if(!value){
   document.body.style.overflow = 'auto'
  }

}

async function deleteTask(){
  const response = deleteDataById('tasks', idTask);
  
  if(response){
    const index = tasksUser.findIndex(task => task.id === idTask);
    if (index !== -1) {
      tasksUser.splice(index, 1);
    }
  }
}

async function deleteTaskAndClosePopup(){
  await deleteTask();
  togglePopupDeleteTask(false);
}

</script>

<template>
  <Header></Header>
  <main>
    <div class="user-content">
      <span>Olá, {{ nameUser }}</span>
      <h2>Tarefas criadas:</h2>
    </div>

    <div class="tasks-content">
      <template v-if="tasksUser">
        <template v-for="task in tasksUser">
          <div class="task-card">
            <h3>{{task.nome}}</h3>
            <p>{{task.descricao}}</p>
            <ul>
              <li>Prioridade: {{task.prioridade}}</li>
              <li>Status: {{task.status}}</li>
            </ul>
            <button class="button-delete" @click="togglePopupDeleteTask(true, task.id)">
              <IconBin></IconBin>
            </button>
            <RouterLink :to="`/task-edit/${task.id}`" class="button-edit">
              <IconPencil />
            </RouterLink>
          </div>
        </template>
      </template>

      <template v-if="tasksUser.length <= 0">
        <p class="message-notask">Você não possui nenhuma task, <RouterLink to="/task-create">crie aqui.</RouterLink>
        </p>
      </template>


      <PopupDelete :visible="popupDeleteTask" :togglePopupDeleteTask="togglePopupDeleteTask" :deleteTaskAndClosePopup="deleteTaskAndClosePopup"></PopupDelete>
    </div>
    <RouterLink to="/task-create" class="add-task">
      <IconSupport></IconSupport>
    </RouterLink>
  </main>
</template>

<style scoped>
  .user-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
  }

  .user-content span{
    color: #ff5722;
    font-weight: 500;
    font-size: 16px;
  }

  .user-content h2{
    font-weight: 700;
    text-decoration: underline;
    font-size: 26px;
  }

  .task-card{
    width: 250px;
    height: 350px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
    padding: 40px 25px 30px 25px;
    justify-content: space-between;
    border: 1px solid #757575;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease-in-out;
  }

  .task-card:hover{
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  .task-card h3{
    font-size: 24px;
    text-transform: capitalize;
    font-weight: 700;
    overflow: hidden;
    width: 100%;
    text-align: center;
    word-break: break-word;
    max-height: 80px;
    min-height: 80px;
    color: #FF5722;
  }

  .task-card p{
    font-size: 14px;
    text-align: justify;
    max-height: 110px;
    min-height: 110px;
    overflow: hidden;
    width: 100%;
  }

  .task-card ul{
    padding: 0;
    list-style: none;
    width: 100%;
    margin-top: 20px;
  }

  .tasks-content{
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    padding: 20px;
  }

  @media screen and (max-width: 750px) {
    .tasks-content{
      justify-content: center;
    }
  }

  .button-delete{
    outline: none;
    border: none;
    background-color: #e82828;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 15px;
    border-radius: 0 0 10px 0;
    transition: 0.5s all;
  }

  .button-delete:hover, .button-edit:hover{
    padding: 10px 25px;
  }
  
  .button-delete svg{
    fill: #fff !important;
  }

  .button-edit{
    background-color: #4CAF50;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px 15px;
    border-radius: 0 0 0 10px;
    transition: 0.5s all;
  }

  .message-notask a{
    color: #8BC34A;
    font-weight: 500;
  }

  .add-task{
    position: fixed;
    bottom: 30px;
    background: #8BC34A;
    outline: none;
    width: 55px;
    height: 55px;
    padding: 0;
    border-radius: 50%;
    font-size: 35px;
    cursor: pointer;
    font-weight: 700;
    color: #fff;
    right: 25px;
    border: 1px solid #757575;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: 0.3s ease-in-out;
  }


  @media screen and (max-width: 750px) {
    .add-task{
      bottom: 75px;
      right: 15px;
    }
  }

  .add-task:hover{
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
    background-color: #7daf43;
  }
</style>