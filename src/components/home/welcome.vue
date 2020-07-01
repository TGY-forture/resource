<template>
  <div id="wel" v-show="show">
    <p class="hello">Welcome To Our Factory!</p>
    <a-icon type="close" style="fontSize:20px" @click="close" />
  </div>    
</template>

<script>
export default {
  name: 'Welcome',
  data() {
    return {
      show: true
    }
  },
  methods: {
    close() {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes zoom {
  from {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.15, 1.15);
  }
  to {
    transform: scale(1, 1);
  }
}
#wel {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .hello {
    font-size: 35px;
    margin-bottom: 0;
    animation: zoom 3s infinite;
  }
}
</style>