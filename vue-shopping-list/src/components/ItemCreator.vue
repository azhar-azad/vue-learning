<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['add-item']);

const shoppingItemState = reactive({
    itemName: '',
    invalid: null,
    errMsg: ''
});

const addItem = () => {
    shoppingItemState.invalid = null;
    if (shoppingItemState.itemName !== '') {
        emit('add-item', shoppingItemState.itemName);
        shoppingItemState.itemName = '';
        return;
    }
    shoppingItemState.invalid = true;
    shoppingItemState.errMsg = 'Shopping item name value cannot be empty';
};

</script>

<template>
    <div class="input-wrap" :class="{ 'input-err' : shoppingItemState.invalid }">
        <input type="text" v-model="shoppingItemState.itemName">
        <button @click="addItem()">Create</button>
    </div>
    <p v-show="shoppingItemState.invalid" class="err-msg">{{ shoppingItemState.errMsg }}</p>
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

button {
  padding: 8px 16px;
  border: none;
}

.err-msg {
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: red;
}
</style>