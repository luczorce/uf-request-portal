<template>
  <section>
    <h4 class="section-header">Attributes to match</h4>
    
    <dl class="request-attributes">
      <template v-for="attr in attributes">
      <dt class="request-key">{{attr.key}}</dt>
      <dd class="request-value">{{attr.value.join(', ')}}</dd>
      </template>
    </dl>
  </section>
</template>

<script>
  export default {
    name: 'requestAttributes',
    props: {
      attributes: Array
    }
  }
</script>

<style>
  .request-attributes {

  }

  .request-key {
    text-transform: capitalize;
    margin-bottom: 0.5em;
    padding-top: 1em;
    border-top: 1px var(--white3) solid;
  }

  .request-key:first-of-type {
    border: none;
    padding-top: 0;
  }

  .request-value {
    margin: 0 0 1em 1em;
    color: var(--black2);
  }
</style>
