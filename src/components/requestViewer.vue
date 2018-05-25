<template>
  <div class="page page-home" role="main">
    <h1>View requests <span>{{current}}</span></h1>
    
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
      if (this.current.length) {
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
        
        // TODO these are the test one's I've added my local db
        // add the functionality to our server
        this.requestKeys = [
          'KobyZAgep5r5cg2qma9PC9',
          '1JYcditSRK35myx3S6jQfr',
          'CEGtiDWqDLkVzMP3PPUdWw',
          'YQ2zaiPjgjfYm6Az8fo6bF',
          'XqRSM1tiE9QjpGRTDFfR9S',
          'D1cf8Avq4Efi2Fu1Rh8BZ1',
          'E3VHTc1fpZ1yVGrKjWvUXq',
          'SPTdLFQbmPB9JZPWEeHXQB',
          '4vQcSL75m5bngyqaveMrtE',
          'XKXtqpaovstAnT5sEGMNci',
          'BipP4Ntd2cmFcCfWvXd7ty',
          'XUooTvPfN9EFyUb2FwprjC',
          '9mFakPWiXuq9tZGKMpg1p1'
        ];
        this.waiting.list = false;

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
