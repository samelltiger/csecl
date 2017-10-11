<template>
  <div id="app">
    <Background></Background>
    <Header></Header>
    <Content></Content>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Background from 'components/effect/Background'
  import Header from 'components/layout/Header'
  import Content from 'components/layout/Content'
  import Footer from 'components/layout/Footer'
  export default {
    components: {
      Background,
      Header,
      Content,
      Footer
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    position relative
</style>
