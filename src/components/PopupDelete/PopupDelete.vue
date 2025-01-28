<script>
export default {
    props: {
        visible: Boolean,
        togglePopupDeleteTask: '',
        deleteTaskAndClosePopup: '',
    },
}
</script>

<template>
    <template v-if="visible">
        <div class="overlay">
          <div class="popup-content">
            <h3>Você realmente deseja excluir a tarefa?</h3>
            <button @click="deleteTaskAndClosePopup()" class="button-yes">Sim</button>
            <button @click="togglePopupDeleteTask(false)" class="button-no">Não</button>
          </div>
        </div>
    </template>
</template>

<style scoped>
 .overlay{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000000c4;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .overlay .popup-content{
    padding: 0 25px;
  }

  .overlay h3{
    color: #fff;
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 15px;
  }

  .overlay button{
    width: 35%;
    height: 38px;
    border: none;
    outline: none;
    background-color: #8BC34A;
    cursor: pointer;
    color: #fff;
    font-weight: 500;
    text-transform: uppercase;
    border-radius: 20px;
    margin-right: 20px;
  }

  .overlay .button-no{
    background-color: #FF5722;
  }
</style>