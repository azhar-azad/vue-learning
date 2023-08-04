<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
    taskList: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
});

</script>


<template>
    <li>
        <div class="task-list">
            <input v-if="taskList.isEditing" type="text"
                :value="taskList.taskList"
                @input="$emit('update-taskList', $event.target.value, index)">
            <span v-else :class="{'completed-task-list' : taskList.allTasksCompleted}">
                {{ index+1 }}. {{ taskList.taskList }}
            </span>
        </div>

        <div class="task-list-actions">
            <Icon 
                v-if="taskList.isEditing" 
                class="icon" icon="ph:check-circle" 
                color="#41b080" width="22"
                @click="$emit('edit-taskList', index)" />

            <Icon 
                v-else
                class="icon" icon="ph:pencil-fill"
                color="#41b080" width="22" />

            <Icon 
                class="icon" icon="ph:trash" 
                color="#f95e5e" width="22" />
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
    .todo-actions {
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

  .task-list {
    flex: 1;

    .completed-task-list {
        text-decoration: line-through;
    }

    input[type="text"] {
      width: 100%;
      padding: 2px 6px;
      border: 2px solid #41b080;
    }
  }

  .task-list-actions {
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