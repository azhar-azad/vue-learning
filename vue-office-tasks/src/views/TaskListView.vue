<script setup>
import { ref, watch } from 'vue';
import { uid } from 'uid';
import { Icon } from '@iconify/vue';

import Creator from '../components/Creator.vue';
import TaskListItem from '../components/TaskListItem.vue';

const taskListArr = ref([]);

watch(
  taskListArr,
  () => {
    setTaskListsLocalStorage();
  },
  {
    deep: true
  }
);

const setTaskListsLocalStorage = () => {
  localStorage.setItem('taskLists', JSON.stringify(taskListArr.value));
};

const fetchTaskListLocalStorage = () => {
  const savedTaskLists = JSON.parse(localStorage.getItem('taskLists'));
  if (savedTaskLists) {
    taskListArr.value = savedTaskLists;
  }
}

const createTaskList = (taskListName) => {
  taskListArr.value.push({
    id: uid(),
    taskList: taskListName,
    allTasksCompleted: null,
    isEditing: null
  });
};

fetchTaskListLocalStorage();

</script>


<template>
  <main>
    <h1>Create Task List</h1>
    <Creator 
      creatorType="taskList" 
      errMsg="Task List name cannot be empty"
      btnTxt="Create List"
      @create="createTaskList" />

    <ul v-if="taskListArr.length > 0" class="task-list">
      <TaskListItem
        v-for="(taskList, index) in taskListArr" :taskList="taskList" :index="index" />
    </ul>

    <p v-else class="task-list-msg">
      <Icon icon="noto-v1:sad-but-relieved-face" width="22" />
      <span>You have no Task List added! Add one and then add tasks to that list!</span>
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

  .task-list-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>
