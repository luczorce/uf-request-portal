<template>
  <div class="page page-home" role="main">
    <h1>View requests <span>{{currentRequest}}</span></h1>
    
    <div class="requests-wrapper">
      <ul class="requests-list">
        <li>empty, look them up TODO</li>
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
        requestData: null,
        waiting: {
          list: false,
          individual: false
        }
      }
    },
    created() {
      
    },
    methods: {
      
    }
  }
</script>

<style>
  .requests-wrapper {
    display: flex;
  }
</style>
