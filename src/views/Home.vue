<template>
  <div class="home" role="main">
    <h1>Create a request</h1>
    <p>Customise your segment request. Piece together attributes of a segment of the population that you would like to populate for testing and to reach out to.</p>

    <div class="step">
      <h2>Step 1</h2>
      <p>Phrase your segment like a sentence.</p>

      <textarea class="big-text-input" placeholder="All people in New Jersey that like hiking and chocolate" v-model="statement"></textarea>
    </div>

    <div class="step">
      <h2>Step 2</h2>
      <p>Pick and specify attributes, using the sentence as a guide, for the segment you would like to target.</p>
      
      <div class="step-two-columns">
        <div class="column column--selected">
          <h3>Selected</h3>
          <draggable class="section" v-model="selected" :options="{draggable:'.item',group:'options'}">
            <div class="item" v-for="element in selected" :key="element.id">
              {{element.name}}
              <input type="text" v-model="element.value" />
            </div>

            <button type="button" class="selected-finish" v-bind:disabled="!selected.length" v-on:click="createRequest" slot="footer">Create Request</button>
          </draggable>
        </div>

        <div class="column column--options">
          <h3>Options</h3>

          <draggable class="section" v-model="sections" :options="{draggable:'.item',group:'options'}">
            <div class="item" v-for="element in sections" :key="element.id">
              {{element.name}}

            </div>
          </draggable>
        </div>
      </div>
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
        statement: '',
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
    padding: 10px;
  }

  .big-text-input {
    font-size: 1.5em;
    padding: 10px;
    border: 1px var(--white2) solid;
    display: block;
    width: 100%;
    font-family: var(--mono-font);
  }

  .big-text-input:focus {
    outline: none;
    border-color: var(--pop3);
    background: var(--white1);
  }

  .step-two-columns {
    display: flex;
  }

  .column {}

  .column--selected {
    width: 50%;
  }

  .column--options {
    width: 25%;
    margin-left: auto;
  }

  .section {
    border: 1px var(--white3) solid;
    background: var(--white-enuff);
    padding: 20px;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .selected-finish {
    background: var(--white-enuff);
    margin-top: auto;
  }
</style>