<template>
  <div id="app">
    <com-head></com-head>
    <router-view/>
    <com-bottom></com-bottom>
  </div>
</template>
<script>
import Head from "./views/Head"
import Bottom from "./views/Bottom"
export default {
  data() {
    return {
      
    }
  },
  components:{
    "com-head":Head,
    "com-bottom":Bottom
  },
  
 
  
}
</script>

<style lang="scss">
*{
  margin:0;
  padding: 0;
}
a{
  text-decoration: none;
}
body{
  min-width: 1271px;
 
}
</style>
