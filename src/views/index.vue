<template>
  <div class="note">
      <h1 style="text-align: center;font-size: 60px">基于区块链证书管理平台</h1>

  </div>
</template>

<script>
export default {
  name: 'Oracleindex',

  data() {
    return {
      note: {
        backgroundImage: "url(" + require("../assets/images/bg-geometry.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "25px auto",
        marginTop: "5px",
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.note{
  width: 100%;
  height: 100%;
  position:fixed;
  background-size:100% 100%;
  background-image: url("../assets/images/bg-geometry.png");
}
</style>
