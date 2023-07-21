class HardCodedEntityDataService {

    constructor() {
        this.entities = [
            {
                id: 1,
                title: 'title 1', 
                description: 'desc 1',
                published: true
            }, 
            {
                id: 2,
                title: 'title 2', 
                description: 'desc 2',
                published: false
            }, 
            {
                id: 3,
                title: 'title 3', 
                description: 'desc 3',
                published: true
            }, 
            {
                id: 4,
                title: 'title 4', 
                description: 'desc 4',
                published: false
            }
        ];
    }

    getAll() {
        return this.entities;
    }

    get(id) {
        return this.entities.filter(entity => entity.id == id);
    }

    create(data) {
        return this.entities.push(data);
    }

    update(id, data) {
        this.entities = this.entities.filter(entity => entity.id != id);
        this.entities.push(data);
        return this.entities;
    }

    delete(id) {
        this.entities = this.entities.filter(entity => entity.id != id);
        return this.entities;
    }

    deleteAll() {
        this.entities = [];
        return this.entities;
    }

    findByTitle(title) {
        return this.entities.filter(entity => entity.title === title);
    }
}

export default new HardCodedEntityDataService();