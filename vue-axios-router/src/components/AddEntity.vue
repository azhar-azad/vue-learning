<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text"
                    class="form-control"
                    id="title"
                    required
                    v-model="entity.title"
                    name="title" 
                />
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" 
                    class="form-control"
                    id="description"
                    required
                    v-model="entity.description"
                    name="description"
                />
            </div>

            <button @click="saveEntity" class="btn btn-success">
                Submit
            </button>
        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button @click="newEntity" class="btn btn-success">
                +Add
            </button>
        </div>
    </div>
</template>

<script>
import EntityDataService from '@/services/EntityDataService';

export default {
    name: 'add-entity',
    data() {
        return {
            entity: {
                id: null,
                title: '',
                description: '',
                published: false
            },
            submitted: false
        };
    },
    methods: {
        saveEntity() {
            var data = {
                title: this.entity.title,
                description: this.entity.description
            };

            EntityDataService.create(data)
                .then(response => {
                    console.log(response);
                    this.entity.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(e => console.log(e));
        },

        newEntity() {
            this.submitted = false;
            this.entity = {};
        }
    }
};
</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>