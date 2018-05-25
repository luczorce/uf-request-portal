<template>
  <div class="page page-home" role="main">
    <h1>View requests <span>{{current}}</span></h1>
    
    <div class="requests-wrapper">
      <ul class="requests-list">
        <li>empty, look them up TODO</li>
        <li @click="updateCurrentRequest('ewer321')">ewer321</li>
        <li @click="updateCurrentRequest('asd654321356454')">asd654321356454</li>
      </ul>

      <div class="current-request">
        <p :if="!requestData">select a request to look up information</p>
      </div>
    </div>
  </div>
</template>

<script>
  import provider from '@/services/provider.js';

  export default {
    name: 'requestViewer',
    props: {
      currentRequest: String
    },
    data: function() {
      return {
        // current: NOTE gets defined in the computed section
        requestData: null,
        waiting: {
          list: false,
          individual: false
        }
      }
    },
    created() {
      console.log('newly created request component');
    },
    computed: {
      current: function() {
        return this.currentRequest;
      }
    },
    methods: {
      getDataForRequest() {
        // TODO ask the provider for the data on the certain request
      },
      updateCurrentRequest(requestKey) {
        // this handles the update to the view component
        this.$emit('updateCurrentRequest', requestKey);

        // this handles updating this component with the requested data
        this.getDataForRequest();
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
