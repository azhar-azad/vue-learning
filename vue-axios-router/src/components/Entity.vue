<template>
    <div v-if="currentEntity" class="edit-form">
        <h4>Entity</h4>
        <form>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" 
                    class="form-control"
                    id="title"
                    v-model="currentEntity.title"
                />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" 
                    class="form-control"
                    id="description"
                    v-model="currentEntity.description"
                />
            </div>
            <div class="form-group">
                <label><strong>Status:</strong></label>
                {{ currentEntity.published ? "Published" : "Pending" }}
            </div>
        </form>

        <button class="badge badge-primary mr-2"
            v-if="currentEntity.published"
            @click="updatePublished(false)">
            Unpublish
        </button>
        <button class="badge badge-primary mr-2"
            @click="updatePublished(true)">
            Publish
        </button>
        <button class="badge badge-danger mr-2"
            @click="deleteEntity">
            Delete
        </button>
        <button class="badge badge-success"
            @click="updateEntity">
            Update
        </button>
        <p>{{ message }}</p>
    </div>

    <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
    </div>
</template>

<script>
import EntityDataService from '../services/EntityDataService';

export default {
    name: 'entity',
    data() {
        return {
            currentEntity: null,
            message: ''
        };
    },

    methods: {
        getEntity(id) {
            EntityDataService.get(id)
                .then(response => {
                    this.currentEntity = response.data;
                    console.log(response.data);
                })
                .catch(e => console.log(e));
        },

        updatePublished(status) {
            var data = {
                id: this.currentEntity.id,
                title: this.currentEntity.title,
                description: this.currentEntity.description,
                published: status
            };

            EntityDataService.update(this.currentEntity.id, data)
                .then(response => {
                    console.log(response.data);
                    this.currentEntity.published = status;
                    this.message = 'The status was updated successfully!';
                })
                .catch(e => console.log(e));
        },

        updateEntity() {
            EntityDataService.update(this.currentEntity.id, this.currentEntity)
                .then(response => {
                    console.log(response.data);
                    this.message = 'The entity was updated successfully!';
                })
                .catch(e => console.log(e));
        },

        deleteEntity() {
            EntityDataService.delete(this.currentEntity.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: 'entities' });
                })
                .catch(e => console.log(e));
        }
    }, 

    mounted() {
        this.message = '', 
        this.getEntity(this.$route.params.id);
    }
}
</script>

<style>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>