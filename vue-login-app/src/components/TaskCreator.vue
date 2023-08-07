<script setup>
import { reactive } from 'vue';


const emit = defineEmits(['create-task']);

const taskState = reactive({
    taskName: '',
    isInvalid: null,
    errMsg: ''
});

const createTask = () => {
    taskState.isInvalid = null;
    if (taskState.taskName !== '') {
        emit('create-task', taskState.taskName);
        taskState.taskName = '';
        return;
    }
    taskState.isInvalid = true;
    taskState.errMsg = 'Task name cannot be empty';
};
</script>


<template>
    <div class="input-wrap" :class="{'input-err' : taskState.isInvalid}">
        <input v-model="taskState.taskName" @keypress.enter="createTask()" type="text">
        <button @click="createTask()">Create Task</button>
    </div>
    <p v-show="taskState.isInvalid" class="err-msg">{{ taskState.errMsg }}</p>
</template>


<style lang="scss" scoped>
.input-wrap {
  display: flex;
  transition: 250ms ease;
  border: 2px solid #41b080;

  &.input-err {
    border-color: red;
  }

  &:focus-within {
    box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1),
      0 -2px 4px -2px rgb(0 0 0 / 0.1);
  }

  input {
    width: 100%;
    padding: 8px 6px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}

.err-msg {
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: red;
}

button {
  padding: 8px 16px;
  border: none;
}
</style>