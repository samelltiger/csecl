<template>
  <div class="header">
    <div class="logo">
      互联网创新实验室
    </div>
    <nav class="nav-wrapper">
      <router-link tag="div" class="nav-item" to="/home">
        <span class="tab-link">关于实验室</span>
      </router-link>
      <router-link tag="div" class="nav-item" to="/direction">
        <span class="tab-link">方向简介</span>
      </router-link>
      <router-link tag="div" class="nav-item" to="/resource">
        <span class="tab-link">资源推荐</span>
      </router-link>
      <router-link tag="div" class="nav-item" to="/join">
        <span class="tab-link">加入我们</span>
      </router-link>
    </nav>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/colors.styl"
  .header
    position absolute
    left 0
    top 0
    right 0
    display: flex
    height 80px
    line-height 80px
    background #5597F5
    color $color-home
    .logo
      flex 1
      margin-left 50px
      font-size $font-logo
    .nav-wrapper
      flex 1
      text-align right
      margin-right 50px
      .nav-item
        margin-right 15px
        display inline-block
        cursor pointer
</style>

