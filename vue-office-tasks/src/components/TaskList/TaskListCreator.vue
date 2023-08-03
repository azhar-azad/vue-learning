<script setup>
import { reactive } from 'vue';
import TaskButton from '../Buttons/TaskButton.vue';

const emit = defineEmits(['create-task-list']);

const taskListState = reactive({
    taskListName: '',
    isInvalid: null,
    errMsg: ''
});

const createTaskList = () => {
  taskListState.isInvalid = null;
  if (taskListState.taskListName !== '') {
    emit('create-task-list', taskListState.taskListName);
    taskListState.taskListName = '';
    return;
  }
  taskListState.isInvalid = true;
  taskListState.errMsg = 'Task List name cannot be empty';
};

</script>


<template>
    <div class="input-wrap" :class="{ 'input-err' : taskListState.isInvalid }">
      <input type="text" v-model="taskListState.taskListName" @keypress.enter="createTaskList()">
      <TaskButton @click="createTaskList()">Create List</TaskButton>
    </div>
    <p v-show="taskListState.isInvalid" class="err-msg">{{ taskListState.errMsg }}</p>
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
</style>