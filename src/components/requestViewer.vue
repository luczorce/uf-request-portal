<template>
  <div class="page page-home" role="main">
    <h1>View requests <span>{{current}}</span></h1>
    
    <div class="requests-wrapper">
      <ul class="requests-list">
        <li>empty, look them up TODO</li>
        <li><button type="button" v-bind:disabled="waiting.individual" @click="updateCurrentRequest('ewer321')">ewer321</button></li>
        <li @click="updateCurrentRequest('ewer321')">ewer321</li>
        <li @click="updateCurrentRequest('asd654321356454')">asd654321356454</li>
        <li @click="updateCurrentRequest('4vQcSL75m5bngyqaveMrtE')">4vQcSL75m5bngyqaveMrtE</li>
        
      </ul>

      <div class="current-request">        
        <p v-if="!waiting.individual && !Boolean(requestData)">select a request to look up information</p>
        <p v-if="waiting.individual && !Boolean(requestData)">loading request data...</p>

        <p v-if="Boolean(error)">Error with getting data on the request</p>

        <div v-if="Boolean(requestData)">
          <p>Pending: <code>{{requestData.pending}}</code></p>
          <p>
            <span v-if="requestData.pending">Will be finished</span>
            <span v-if="!requestData.pending">Finished</span> 
            collecting responses on {{requestData.finished | convertToDate}}
          </p>
          
          <h4>Attributes to match</h4>
          <dl>
            <template v-for="attr in requestData.body">
            <dt>{{attr.key}}</dt>
            <dd>{{attr.value.join(', ')}}</dd>
            </template>
          </dl>

          <h4>Responses <em>(as device keys)</em></h4>
          <ul>
            <li v-for="res in requestData.responses"><code>{{res.device_key}}</code></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import provider from '@/services/provider.js';
  import moment from 'moment';

  export default {
    name: 'requestViewer',
    props: {
      currentRequest: String
    },
    filters: {
      convertToDate: function(dateEpoch) {
        return moment(dateEpoch).format('dddd, MMMM Do YYYY, h:mm:ss a');
      }
    },
    data: function() {
      return {
        // current: gets defined in the computed section, but should be considered in this data section
        requestData: null,
        waiting: {
          list: false,
          individual: false
        },
        error: null
      }
    },
    computed: {
      current: function() {
        return this.currentRequest;
      }
    },
    watch: {
      // NOTE we include the watch for the `current` value as well as the 'computed'
      // the computed handles updating the value solely
      // the watch handles the behavior for the change
      current: function() {
        if (Boolean(this.current) && this.current.length) {
          this.getDataForRequest();
        }
      }
    },
    created() {
      if (this.current.length) {
        this.getDataForRequest();
      }
    },
    methods: {
      getDataForRequest() {
        this.waiting.individual = true;
        this.requestData = null;
        this.error = null;

        provider.getRequestResponses(this.current)
          .then(results => {
            this.requestData = results.data;
          }, error => {
            console.log('error getting the responses for the request');
            this.error = error;
          })
          .then(() => {
            this.waiting.individual = false;
          });
      },
      updateCurrentRequest(requestKey) {
        // this handles the update to the view component
        this.$emit('updateCurrentRequest', requestKey);
      }
    }
  }
</script>

<style>
  .requests-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .requests-list,
  .current-request {
    border: 1px solid var(--white3);
    width: 48%;
    padding: 10px;
  }
</style>
