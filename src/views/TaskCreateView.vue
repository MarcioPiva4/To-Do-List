<script setup lang="ts">
import Header from '@/components/Header/Header.vue';
import { addDataToDB } from '@/utils/addData';
import { generateNewId } from '@/utils/generateNewId';
import { ref } from 'vue';
import { reactive } from 'vue';
    const idUser = JSON.parse(localStorage.getItem('user')).id;
    const task = reactive({
        id_usuario: idUser,
        nome: '',
        prioridade: '',
        descricao: '',
        status: 'em andamento',
    });

    const error = ref(false);
    const sucess = ref(false);

    async function CreateTask(){
        const id = await generateNewId('tasks');
        const request = await addDataToDB({ id, id_usuario: idUser, nome: task.nome, prioridade: task.prioridade, descricao: task.descricao, status: task.status }, 'tasks');

        if(request){
            sucess.value = true;
            task.nome = '',
            task.prioridade = '',
            task.descricao = ''
            return
        }
        return error.value = true;
    }
</script>

<template>

    <Header></Header>
    <main>
        <div class="form-content">
            <h1>Crie a sua tarefa</h1>
            <form @submit.prevent="CreateTask">
                <label class="label">
                    <p>Nome:</p>
                    <input type="text" v-model="task.nome" required/>
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
                    <textarea v-model="task.descricao" required></textarea>
                </label>
                <button type="submit" class="button-default">Criar</button>
            </form>
            <template v-if="sucess"><p class="message-sucess-2">Tarefa criada com sucesso!</p></template>
            <template v-if="error"><p class="message-error-2">Ocorreu um erro ao criar a tarefa, tente novamente.</p></template>
        </div>
    </main>

</template>

<style scoped>
    h1{
        font-weight: 500;
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