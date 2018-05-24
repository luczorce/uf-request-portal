<template>
  <div id="app">
    <div class="nav" role="navigation">
      <router-link :to="{name: 'home'}">Create Requests</router-link>
      <router-link :to="{name: 'requests'}">View Requests</router-link>

      <span class="faux-company">Welcome back, Brand B!</span>
    </div>
    <router-view/>
  </div>
</template>

<style>
  .nav {
    background: var(--white1);
    padding: 20px 10px;
    display: flex;
  }

  .nav a,
  .faux-company {
    padding: 5px;
    color: var(--black2);
  }

  .nav .router-link-exact-active {
    background: var(--pop1);
    color: var(--black);
    text-decoration: none;
  }

  .faux-company {
    margin-left: auto;
  }
</style>
