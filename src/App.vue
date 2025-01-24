<template>
  <div>
    <nav class="main-navigation">
      <div 
        class="main-navigation-button"
        @click="goToBoardView"
      >Board View</div>
      <div 
        class="main-navigation-button"
        @click="goToListView"
      >List View</div>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    goToBoardView() {
      this.$router.push('/');
    },
    goToListView() {
      this.$router.push('/list');
    },
  },
  beforeMount() {
    //localStorage.removeItem("listViewFilters")
  },
}
</script>
<style scoped>

</style>
