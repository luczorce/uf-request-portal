<template>
  <div class="page page-home" role="main">
    <h1>View requests <code class="current-request-key">{{current}}</code></h1>
    
    <div class="requests-wrapper">
      <ul class="requests-list section">
        <li v-if="!waiting.list && !requestKeys.length">no requests available</li>
        <li v-if="waiting.list">loading requests...</li>
        
        <li v-for="key in requestKeys">
          <button type="button" 
            v-bind:disabled="waiting.individual" 
            @click="updateCurrentRequest(key)">{{key}}</button>
        </li>        
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
          
          <requestAttributes v-bind:attributes="requestData.body" />

          <h4 class="section-header">Responses <em>(as device keys)</em></h4>
          <ul>
            <li v-if="!requestData.responses.length">no responses!</li>
            <li v-for="res in requestData.responses"><code>{{res.device_key}}</code></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import requestAttributes from '@/components/requestAttributes.vue';
  import provider from '@/services/provider.js';
  import moment from 'moment';

  export default {
    name: 'requestViewer',
    components: { requestAttributes },
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
        error: null,
        requestKeys: []
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
      if (Boolean(this.current) && this.current.length) {
        this.getDataForRequest();
      }

      this.getAllRequestKeys()
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
      getAllRequestKeys() {
        this.waiting.list = true;
        
        provider.getAllRequests()
          .then(results => {
            this.requestKeys = results.requests.map(r => r.request_key);
          }, error => {
            console.log('error getting the all the requests');
            this.error = error;
          })
          .then(() => {
            this.waiting.list = false;
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
  .current-request-key {
    font-family: var(--mono-font);
    color: var(--black2);
    font-size: 0.5em;
    background: var(--white1);
    padding: 2px;
    border-radius: 3px;
  }

  .requests-wrapper {
    display: flex;
  }

  .requests-list {
    max-width: 300px;
    margin: 0 20px 0 0;
    padding-top: 1em; /* matches the paragraph top margin */
  }

  .requests-list li {
    list-style: none;
    margin: 0 auto 1em;
  }

  .requests-list li:last-of-type {
    margin-bottom: 0;
  }

  .requests-list button {
    border: 0;
    background: none;
    padding: 0;
  }

  .current-request {
    flex: 1;
  }
</style>
