<template>
  <div class="page page-home" role="main">
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
          <draggable class="section" v-model="selected" :options="{draggable:'.item', group:'segmentOptions'}">

            <div class="item" v-for="element in selected">
              <div class="item-header">
                <span>{{element.name}}</span>

                <button type="button" class="small-button" @click="element.showEdit = !element.showEdit">
                  <span title="close" v-show="element.showEdit">collapse segment &#x2191;</span>
                  <span title="open" v-show="!element.showEdit">edit value &#x2193;</span>
                </button>
              </div>

              <input type="text" v-model="element.value" v-show="element.showEdit" v-bind:placeholder="element.placeholder" />
            </div>
          </draggable>

          <button type="button" class="selected-finish" v-bind:disabled="!selected.length" v-on:click="createRequest">Create Request</button><span v-if="sendingRequest">thinking...</span>

          <p v-if="requestResponse">Details on the request, including it's responses, can be <router-link :to="{name: 'requests', params: {requestKey: requestResponse}}">accessed with <code>{{requestResponse}}</code></router-link> <button class="small-button" @click="requestResponse = null">dismiss</button></p>
        </div>

        <div class="column column--options">
          <h3>Options</h3>

          <draggable class="section" v-model="sections" :options="{draggable:'.item', group:'segmentOptions'}">
            <div class="item" v-for="element in sections">
              {{element.name}}
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import provider from '@/services/provider.js';

  export default {
    name: 'home',
    components: {
      draggable
    },
    data: function() {
      return {
        requestResponse: null,
        statement: '',
        selected: [],
        sections: [],
        sendingRequest: false
      }
    },
    created() {
      this.sections = [
        // { name: 'city', nameKey: 'city', value: '', id: 1, showEdit: true, placeholder: 'Chicago, Toronto' },
        { name: 'state/provence', nameKey: 'state', value: '', id: 2, showEdit: true, placeholder: 'Illinois, Ontario' },
        { name: 'country', nameKey: 'country', value: '', id: 3, showEdit: true, placeholder: 'Canada' },
        { name: 'hobbies', nameKey: 'hobbies', value: '', id: 4, showEdit: true, placeholder: 'biking, hiking, puppy dogs' },
        { name: 'causes', nameKey: 'causes', value: '', id: 5, showEdit: true, placeholder: 'ASPCA, homelessness' }
      ];

      this.selected = [
        { name: 'city', nameKey: 'city', value: 'Chicago', id: 1, showEdit: true, placeholder: 'Chicago, Toronto' }
      ]
    },
    methods: {
      async createRequest() {
        this.requestResponse = null;
        this.sendingRequest = true;

        try {
          const response = await provider.makeRequest(this.createRequestBody());
          console.log(response);
          
          this.requestResponse = response.data.requestKey
        } catch (error) {
          console.log(error);
        } finally {
          this.sendingRequest = false;
        }
      },
      createRequestBody() {
        let body = {};
        
        this.selected.forEach((segment) => {
          // TODO do any singular sections need to just be Strings?
          body[segment.nameKey] = segment.value.split(', ');
        });

        return body;
      }
    }
  }
</script>

<style>
  .big-text-input,
  .item input {
    font-size: 1.5em;
    padding: 10px;
    border: 1px var(--white2) solid;
    display: block;
    width: 100%;
    font-family: var(--mono-font);
  }

  .big-text-input:focus,
  .item input:focus {
    outline: none;
    border-color: var(--pop3);
    background: var(--white1);
  }

  .step-two-columns {
    display: flex;
    justify-content: space-between;
  }

  .column {
    width: 48%;
  }

  .column--selected {
    /*width: 50%;*/
  }

  .column--options {
    /*width: 25%;*/
    /*margin-left: auto;*/
  }

  .section {
    border: 1px var(--white3) solid;
    background: var(--white-enuff);
    padding: 20px;
    min-height: 150px;
  }

  .selected-finish {
    background: var(--white-enuff);
    margin: 1em auto;
  }

  .item {
    padding: 5px;
    border: 1px var(--white3) solid;
    border-radius: 3px;
    margin-bottom: 0.5em;
    font-family: var(--mono-font);
  }

  .item:last-of-type  {
    margin-bottom: 0;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-content: baseline;
  }

  .item input {
    font-size: 1em;
    /*padding: 2px;*/
    margin: 0.5em auto;
  }
</style>
