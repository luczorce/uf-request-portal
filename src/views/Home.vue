<template>
  <div class="home">
    <div class="column">
      <h1>Options</h1>
      <draggable class="section" v-model="sections" :options="{draggable:'.item',group:'options'}">
        <div class="item" v-for="element in sections" :key="element.id">
          {{element.name}}

        </div>
      </draggable>
    </div>

    <div class="column">
      <h1>Selected</h1>
      <draggable class="section" v-model="selected" :options="{draggable:'.item',group:'options'}">
        <div class="item" v-for="element in selected" :key="element.id">
          {{element.name}}
          <input type="text" v-model="element.value" />
        </div>

        <button type="button" v-bind:disabled="!selected.length" v-on:click="createRequest" slot="footer">Create Request</button>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'home',
  components: {
    draggable
  },
  data: function() {
    return {
      selected: [],
      sections: [
        { name: 'city', value: '', id: 0 },
        { name: 'state/provence', value: '', id: 1 },
        { name: 'country', value: '', id: 2 },
        { name: 'hobbies', value: '', id: 3 },
        { name: 'causes', value: '', id: 4 }
      ]
    }
  },
  methods: {
    createRequest() {
      console.log('amaking a requst');
      console.log(this.selected);
    }
  }
}
</script>

<style>
  .home {
    display: flex;
  }

  .section {
    border: 1px var(--black4) solid;
    padding: 20px;
  }
</style>