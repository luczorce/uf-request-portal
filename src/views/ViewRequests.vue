<template>
  <div class="requests" role="main">
    <requestViewer :currentRequest="currentRequest" v-on:updateCurrentRequest="updateCurrentRequest"/>
    
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
    created() {
      if (this.$route.params.requestKey) {
        this.currentRequest = this.$route.params.requestKey
      }
    },
    watch: {
      $route(to, from) {
        this.currentRequest = to.params.requestKey;
      }
    },
    methods: {
      updateCurrentRequest(requestKey) {
        this.currentRequest = requestKey;
        this.$router.push({
          name: 'requests',
          params: {
            requestKey: requestKey
          }});
      }
    }
  }
</script>

<style>
  
</style>