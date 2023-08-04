<script setup>
import { reactive } from 'vue';
import Button from './Button.vue';

const props = defineProps({
    creatorType: {
        type: String,
        required: true
    },
    errMsg: {
        type: String,
        required: true
    },
    btnTxt: {
        type: String, 
        required: true
    }
});

const emit = defineEmits(['create']);

const componentState = reactive({
    name: '',
    isInvalid: null,
    errMsg: ''
});

const create = () => {
    componentState.isInvalid = null;
    if (componentState.name !== '') {
        emit('create', componentState.name);
        componentState.name = '';
        return;
    }
    componentState.isInvalid = true;
    componentState.errMsg = props.errMsg;

};
</script>


<template>
    <div>
        <div class="input-wrap" :class="{ 'input-err': componentState.isInvalid }">
            <input type="text" v-model="componentState.name" @keypress.enter="create()">
            <Button @click="create()">{{ btnTxt }}</Button>
        </div>
        <p v-show="componentState.isInvalid" class="err-msg">{{ componentState.errMsg }}</p>
    </div>
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