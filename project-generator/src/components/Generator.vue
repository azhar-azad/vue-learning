<!-- https://auth0.com/blog/vue-composition-api-tutorial/ -->
<template>
  <div class="generator">
    <section class="hero is-primary is-bold has-text-centered py-6">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            What skills do you want to work on?
          </h1>
          <div v-for="skill in skillList" :key="skill.id">
            <div class="field">
              <label class="checkbox">
                <input type="checkbox" 
                  v-model="selectedSkills" 
                  :value="skill.id"
                  @change="generateFilteredAppList">{{ skill.skill }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="columns is-multiline mt-3">
        <div v-for="app in filteredAppList" :key="app.id" class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title is-uppercase is-size-5">
                {{ app.app }}
              </p>
            </header>
            <div class="card-content">
              <div class="content has-text-left mb-4">
                <p class="is-size-7">{{ app.instructions }}</p>
                <h4>Skills:</h4>
                <ul v-for="skill in app.skills" :key="skill.id">
                  <li>
                    <strong>{{ skillList[skill-1].skill }}</strong>
                    <p v-if="skillList[skill-1].options" :set="randSkill = getRand(skillList[skill-1].options)">
                      🦮 <a :href="randSkill">{{ randSkill }}</a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
  Importing ref. This allows your data to be reactive. 
*/
import { ref } from 'vue';

export default {
  name: 'Generator',
  setup() {
    const GENERATOR_BASE = 'http://localhost:3000';
    
    /**
     * skilllList is declared as an empty array wrapped in ref(). 
     * This returns a reactive ref object with just one property: value. 
     * The .value property points to the inner value of the ref object, 
     * which in this case, is the empty array. 
     */
    const skillList = ref([]);
    
    /**
     * Selected checkboxes should be bound to this array. 
     */
    const selectedSkills = ref([]);

    const filteredAppList = ref([]);
    let appList = [];

    async function getSkillList() {
      const response = await fetch(`${GENERATOR_BASE}/skills`);
      skillList.value = await response.json();
    }

    async function getAppList() {
      const response = await fetch(`${GENERATOR_BASE}/apps`);
      appList = await response.json();
      filteredAppList.value = appList;
    }

    function generateFilteredAppList() {
      filteredAppList.value = [];

      for (const app of appList) {
        const appSkillsArray = app.skills;
        const selectedSkillsArray = selectedSkills.value;

        if (hasAllSkills(appSkillsArray, selectedSkillsArray)) {
          filteredAppList.value.push(app);
        }
      }
    }

    function hasAllSkills(appSkills, selectedSkills) {
      /**
       * The every() method tests whether all elements in the array pass
       * the test implemented by the provided function. 
       * It returns a Boolean value. 
       * 
       * The includes() method determines whether an array includes a 
       * certain value among its entries. 
       * It returns true or false. 
       */
      return selectedSkills.every(f => appSkills.includes(f));
    }

    function getRand(value) {
      let keys = Object.keys(value);
      return value[keys[keys.length * Math.random() << 0]];
    }

    getSkillList();
    getAppList();

    /**
     * Finally, you need to return any data you want to expose to the template. 
     */
    return {
      skillList,
      selectedSkills,
      filteredAppList,
      generateFilteredAppList,
      getRand
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  label {
    font-size: 20px;
  }

  .card {
    height: 100%;
  }

  a {
    word-break: break-word;
  }
</style>
