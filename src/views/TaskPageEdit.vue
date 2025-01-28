<script setup>
import Header from '@/components/Header/Header.vue';
import { editDataInDB } from '@/utils/editData';
import { getDB } from '@/utils/db';
import { ref } from 'vue';
import { reactive } from 'vue';
import { onMounted } from 'vue';

const props = defineProps({
  id: String
});

const taskUser = reactive([]);
const idUser = JSON.parse(localStorage.getItem('user')).id;
const idTask = props.id;
onMounted(async () => {
    const data = await getDB();
    const tasksFiltered = data.tasks.filter((e) => {
        return e.id == idTask.toString() && e.id_usuario == idUser
    });
    taskUser.push(...tasksFiltered);
});


const sucess = ref(false);
const error = ref(false);
async function editTask(id){
    for (let e of taskUser) {
        const request = await editDataInDB(id,{nome: e.nome, prioridade: e.prioridade, descricao: e.descricao }, 'tasks');
        if(request){
            return sucess.value = true;
        }
        return error.value = true;
    }
}

</script>

<template>
    <Header></Header>

    <main>
        <template v-if="taskUser.length <= 0">
            <p class="message-errortask">Essa tarefa não existe, ou foi excluida.</p>
        </template>

        <div class="form-content">
            <template v-for="task in taskUser" >
                <h1>Edite a tarefa: <span>{{ task.nome }}</span></h1>

                <form @submit.prevent="editTask(id)">
                    <label class="label">
                        <p>Nome:</p>
                        <input type="text" v-model="task.nome" />
                    </label>

                    <label class="label">
                        <p>Prioridade:</p>
                        <select v-model="task.prioridade" required>
                            <option>Alto</option>
                            <option>Médio</option>
                            <option>Baixo</option>
                        </select>
                    </label>

                    <label class="label">
                        <p>Descrição:</p>
                        <textarea v-model="task.descricao"></textarea>
                    </label>

                    <button type="submit" class="button-default">Enviar</button>
                </form>
                <template v-if="sucess"><p class="message-sucess-2">Tarefa editada com sucesso! <RouterLink to="/dashboard">voltar.</RouterLink></p></template>
                <template v-if="error"><p class="message-error-2">Ocorreu um erro ao fazer a edição da aula, <RouterLink to="/dashboard">voltar.</RouterLink></p></template>
            </template>
        </div>
    </main>

</template>

<style scoped>
    .message-errortask{
        text-align: center;
        margin-top: 25vh;
        background-color: red;
        width: 50%;
        margin: 5vh auto;
        color: #fff;
        padding: 5px;
        font-weight: 500;
    }

    h1{
        font-weight: 500;
    }

    h1 > span{
        font-weight: 500;
        text-decoration: underline;
    }

    .label p{
        color: #4CAF50;
        font-weight: 500;
        font-size: 18px;
    }

    form{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    textarea{
        resize: none;
        height: 120px;
        padding: 10px 20px !important;
    }

    input, select{
        height: 30px;
    }

    input, select, textarea{
        width: 100%;
        outline: none;
        border: none;
        font-size: 16px;
        padding: 0 20px;
        border-radius: 5px;
    }
</style>