f<script setup>
import { ref, watch } from 'vue';
import { uid } from 'uid';
import ItemCreator from '../components/ItemCreator.vue';
import Item from '../components/Item.vue';

const itemList = ref([]);

watch(
  itemList, 
  () => {
    setShoppingListLocalStorage();
  },
  {
    deep: true
  }
);

const setShoppingListLocalStorage = () => {
  localStorage.setItem('shoppingList', JSON.stringify(itemList.value));
};

const addItem = (item) => {
  itemList.value.push({
    id: uid(),
    item,
    isBought: null,
    isEditing: null
  });
};

const fetchShoppingList = () => {
  const savedShoppingList = JSON.parse(localStorage.getItem('shoppingList'));
  if (savedShoppingList) {
    itemList.value = savedShoppingList;
  }
};

fetchShoppingList();

</script>

<template>
  <main>
    <h1>Add Shopping Item</h1>
    <ItemCreator @add-item="addItem" />

    <ul class="item-list" v-if="itemList.length > 0">
      <Item
        v-for="(item, index) in itemList" :item="item" :index="index"  
      />
    </ul>
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

  .item-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .items-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>
