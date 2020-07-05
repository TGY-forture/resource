<template>
  <div id="app">
    <Top class="top" />
    <Lside class="lside" />   
    <Rside class="rside">
      <router-view></router-view>
    </Rside>
  </div>
</template>
<script>
import Top from './views/Top'
import Lside from './views/Lside'
import Rside from './views/Rside'
export default {
  name: 'App',
  components: {
    Top,
    Lside,
    Rside
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(10, 1fr);
  .top {
    grid-row: 1 / 2;
    grid-column: 1 / 11;
  }
  .lside {
    grid-area: 2 / 1 / 11 / 2;
  }
  .rside {
    grid-area: 2 / 2 / 11 / 11;
    position: relative;
  }
}
</style>
