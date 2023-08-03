<script setup>
import { reactive } from 'vue';
import TodoButton from './TodoButton.vue';

const emit = defineEmits(['create-todo-list']);

const todoListState = reactive({
    todoList: '',
    invalid: null, 
    errMsg: ''
});

const createTodoList = () => {
    todoListState.invalid = null;
    if (todoListState.todoList !== '') {
        emit('create-todo-list', todoListState.todoList);
        todoListState.todoList = '';
        return;
    }
    todoListState.invalid = true;
    todoListState.errMsg = 'Todo List name cannot be empty';
};

</script>

<template>
    <div class="input-wrap" :class="{ 'input-err' : todoListState.invalid }">
        <input type="text" v-model="todoListState.todoList" @keyup.enter="createTodoList()">
        <TodoButton @click="createTodoList()">Create Todo-List</TodoButton>
    </div>
    <p v-show="todoListState.invalid" class="err-msg">{{ todoListState.errMsg }}</p>
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