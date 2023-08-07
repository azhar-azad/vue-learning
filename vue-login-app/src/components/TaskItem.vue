<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
    task: {
        type: Object,
        required: true
    },
    index: {
        type: Number, 
        required: true
    }
});

defineEmits(['toggle-complete', 'update-task', 'edit-task', 'delete-task']);
</script>


<template>
    <li>
        <input 
            type="checkbox"
            :checked="task.isCompleted"
            @input="$emit('toggle-complete', index)">

        <div class="task">
            <input v-if="task.isEditing" type="text"
                :value="task.taskName"
                @input="$emit('update-task', $event.target.value, index)">
            <span v-else :class="{'completed-task' : task.isCompleted}">{{ task.taskName }}</span>
        </div>

        <div class="task-actions">
            <Icon 
                v-if="task.isEditing" 
                class="icon" icon="ph:check-circle" 
                color="#41b080" width="22"
                @click="$emit('edit-task', index)" />

            <Icon 
                v-else 
                class="icon" icon="ph:pencil-fill" 
                color="#41b080" width="22"
                @click="$emit('edit-task', index)" />

            <Icon 
                class="icon" icon="ph:trash" 
                color="#f95e5e" width="22"
                @click="$emit('delete-task', task.id)" />
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
    .task-actions {
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

  .task {
    flex: 1;

    .completed-task {
        text-decoration: line-through;
    }

    input[type="text"] {
      width: 100%;
      padding: 2px 6px;
      border: 2px solid #41b080;
    }
  }

  .task-actions {
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