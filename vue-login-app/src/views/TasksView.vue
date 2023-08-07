<script setup>
import { computed, ref, watch } from 'vue';
import { uid } from 'uid';
import { Icon } from '@iconify/vue';
import TaskCreator from '../components/TaskCreator.vue';
import TaskItem from '../components/TaskItem.vue';

const taskList = ref([]);

watch(
  taskList,
  () => {
    setTaskListToLocalStorage();
  },
  {
    deep: true
  }
);

const createTask = (taskName) => {
  taskList.value.push({
    id: uid(),
    taskName,
    isCompleted: null,
    isEditing: null
  });
};

const toggleTaskComplete = (taskPos) => {
  taskList.value[taskPos].isCompleted = !taskList.value[taskPos].isCompleted;
};

const toggleEditTask = (taskPos) => {
  taskList.value[taskPos].isEditing = !taskList.value[taskPos].isEditing;
};

const updateTask = (taskVal, taskPos) => {
  taskList.value[taskPos].taskName = taskVal;
};

const deleteTask = (taskId) => {
  taskList.value = taskList.value.filter((task) => task.id !== taskId);
};

const taskCompleted = computed(() => {
  return taskList.value.every((task) => task.isCompleted);
});

const setTaskListToLocalStorage = () => {
  localStorage.setItem('taskList', JSON.stringify(taskList.value));
};

const fetchTaskListFromLocalStorage = () => {
  const savedTaskList = JSON.parse(localStorage.getItem('taskList'));
  if (savedTaskList) {
    taskList.value = savedTaskList;
  }
};

fetchTaskListFromLocalStorage();

</script>


<template>
  <main>
    <h1>Create Tasks</h1>
    <TaskCreator @create-task="createTask" />

    <ul v-if="taskList.length > 0" class="task-list">
      <TaskItem 
        v-for="(task, index) in taskList" :task="task" :index="index"
          @toggle-complete="toggleTaskComplete"
          @update-task="updateTask"
          @edit-task="toggleEditTask"
          @delete-task="deleteTask" />
    </ul>

    <p v-else class="tasks-msg">
      <Icon icon="noto-v1:sad-but-relieved-face" width="22" />
      <span>You have no tasks to complete! Add one!</span>
    </p>

    <p v-if="taskCompleted && taskList.length > 0" class="tasks-msg">
      <Icon icon="noto-v1:party-popper" />
      <span>You have completed all your tasks!</span>
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

  .task-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .tasks-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>
