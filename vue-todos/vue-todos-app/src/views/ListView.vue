<script setup>
import { uid } from 'uid';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import TodoListCreator from '../components/TodoListCreator.vue';
import TodoListItem from '../components/TodoListItem.vue';

const todoLists = ref([]); // An array of todoList

const createTodoList = (todoList) => {
    todoLists.value.push({
        id: uid(),
        todoList,
        isCompleted: null,
        isEditing: null
    });
};

const viewTodoList = (todoListPos) => {
  
};

const addTodo = (todoListId) => {
  
};

</script>

<template>
    <main>
        <h1>Create Todo-List</h1>

        <TodoListCreator @create-todo-list="createTodoList" />

        <ol class="todo-list" v-if="todoLists.length > 0">
            <TodoListItem 
              v-for="(todoList, index) in todoLists" :todoList="todoList" :index="index"
              @view-todo-list="viewTodoList"
              @add-todo="addTodo" />
        </ol>

        <p class="todos-msg" v-else>
            <Icon icon="noto-v1:sad-but-relieved-face" width="22" />
            <span>You have no TodoList added! Add one and then add todos to that list!</span>
        </p>
    </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>