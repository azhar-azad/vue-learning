<script setup>
import { Icon } from '@iconify/vue';

defineEmits([
    'toggle-complete-list', 
    'update-todo-list', 
    'edit-todo-list', 
    'delete-todo-list', 
    'view-todo-list', 
    'add-todo']);

const props = defineProps({
    todoList: {
        type: Object, 
        required: true
    }, 
    index: {
        type: Number, 
        required: true
    }
});

const addTodoToList = (todoListId) => {
  // $router.push({ path: '/todos' });
};

</script>

<template>
    <li>
        <input 
            type="checkbox" 
            :checked="todoList.isCompleted" 
            @input="$emit('toggle-complete-list', index)">

        <div class="todo-list">
            <input v-if="todoList.isEditing" type="text" 
                :value="todoList.todoList"
                @input="$emit('update-todo-list', $event.target.value, index)">
            <span v-else :class="{'completed-todo-list' : todoList.isCompleted}">{{ todoList.todoList }}</span>
        </div>

        <div class="todo-list-actions">
          <Icon 
              class="icon" icon="gridicons:add-outline" 
              color="#41b080" width="22"
              @click="$router.push({ path: '/todos' })" />
              <!-- @click="$emit('add-todo', todoList.id)" /> -->
          <Icon 
              class="icon" icon="carbon:view-filled" 
              color="#41b080" width="22"
              @click="$emit('view-todo-list', index)" />
          <Icon 
              v-if="todoList.isEditing" 
              class="icon" icon="ph:check-circle" 
              color="#41b080" width="22"
              @click="$emit('edit-todo-list', index)" />
          <Icon 
              v-else 
              class="icon" icon="ph:pencil-fill" 
              color="#41b080" width="22"
              @click="$emit('edit-todo-list', index)" />
          <Icon 
              class="icon" icon="ph:trash" 
              color="#f95e5e" width="22"
              @click="$emit('delete-todo-list', todoList.id)" />
        </div>
    </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 10px;
  background-color: #f1f1f1;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);

  &:hover {
    .todo-list-actions {
      opacity: 1;
    }
  }

  input[type="checkbox"] {
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

    &:checked {
      background-color: #41b080;
    }
  }

  .todo-list {
    flex: 1;

    .completed-todo-list {
        text-decoration: line-through;
    }

    input[type="text"] {
      width: 100%;
      padding: 2px 6px;
      border: 2px solid #41b080;
    }
  }

  .todo-list-actions {
    display: flex;
    gap: 6px;
    opacity: 0;
    transition: 150ms ease-in-out;
    .icon {
      cursor: pointer;
    }
  }
}
</style>