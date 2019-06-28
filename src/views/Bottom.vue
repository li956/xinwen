<template>
  <div class="footer" :class="{my_bg:this.$route.path=='/myaccount'}">
    <span>Copyright © 2018 apis.sh All Rights Reserved | 陕ICP备15013925号-3</span>
  </div>
</template>
<style scoped>
.footer {
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #333333;
}
.my_bg{
  background-color:  #f9f9f9;
}
</style>
