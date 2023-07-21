<template>
    <div class="list-row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" 
                    class="form-control"
                    placeholder="Search by title"
                    v-model="title"
                />
                <div class="input-group-append">
                    <button 
                        class="btn btn-outline-secondar" 
                        type="button"
                        @click="searchTitle"
                        >
                        Search
                    </button>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <h4>Entities List</h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(entity, index) in entities"
                    :key="index"
                    @click="setActiveEntity(entity, index)"
                >
                {{ entity.title }}
                </li>
            </ul>

            <button class="m-3 btn btn-sm btn-danger"
                @click="removeAllEntities"
            >
            Remove All
            </button>
        </div>

        <div class="col-md-6">
            <div v-if="currentEntity">
                <h4>Entity</h4>
                <div>
                    <label><strong>Title:</strong></label>{{ currentEntity.title }}
                </div>
                <div>
                    <label><strong>Description:</strong></label>{{ currentEntity.description }}
                </div>
                <div>
                    <label><strong>Status:</strong></label>{{ currentEntity.published ? "Published" : "Pending" }}
                </div>

                <router-link 
                    :to="'/entities' + currentEntity.id" 
                    class="badge badge-warning">
                    Edit
                </router-link>
            </div>
            <div v-else>
                <br />
                <p>Please click on an Entity...</p>
            </div>
        </div>
    </div>
</template>

<script>
import EntityDataService from '../services/EntityDataService';
// import HardCodedEntityDataService from '@/services/HardCodedEntityDataService';

export default {
    name: 'entity-list',
    data() {
        return {
            entities: [],
            currentEntity: null,
            currentIndex: -1,
            title: ''
        };
    },

    methods: {
        retrieveEntities() {
            EntityDataService.getAll()
                .then(response => {
                    this.entities = response.data;
                    console.log(response.data);
                })
                .catch(e => console.log(e));
            // this.entities = HardCodedEntityDataService.getAll();
            // console.log(this.entities);
        },

        refreshList() {
            this.retrieveEntities();
            this.currentEntity = null;
            this.currentIndex = -1;
        },

        setActiveEntity(entity, index) {
            this.currentEntity = entity;
            this.currentIndex = entity ? index : -1;
        },

        removeAllEntities() {
            EntityDataService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => console.log(e));
            // var response = HardCodedEntityDataService.deleteAll();
            // console.log(response);
        },

        searchTitle() {
            EntityDataService.findByTitle(this.title)
                .then(response => {
                    this.entities = response.data;
                    this.setActiveEntity(null);
                    console.log(response.data);
                })
                .catch(e => console.log(e));
            // this.entities = HardCodedEntityDataService.findByTitle(this.title);
            // this.setActiveEntity(null);
            // console.log(this.entities);
        }
    },

    mounted() {
        this.retrieveEntities();
    }
};
</script>

<style>
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>