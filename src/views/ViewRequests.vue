<template>
  <div class="requests" role="main">
    <requestViewer :currentRequest="currentRequest"/>
    
  </div>
</template>

<script>
  import requestViewer from '@/components/requestViewer.vue';

  export default {
    name: 'viewRequests',
    components: {
      requestViewer
    },
    data: function() {
      return {
        currentRequest: ''
      }
    },
    watch: {
      $route(to, from) {
        this.currentRequest = to.params.requestKey;
      }
    }
  }
</script>

<style>
  
</style>