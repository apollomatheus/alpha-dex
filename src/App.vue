<template>
  <div id="app">
    <v-app>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
      
  }
}; 
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:#eeecec;
  border: 1px auto solid #2c3e50;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.deep-icon {
    margin-right: 3px;
}
</style>
