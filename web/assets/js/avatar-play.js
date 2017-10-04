$(function(){
    var $avatars = $('.avatar')
    setPos ()
    // 随机生成坐标函数
    function randomPos () {
        var oPos = {}
        var posX = Math.floor(Math.random()*(200-100+1)+100)
        var posY = Math.floor(Math.random()*(200-100+1)+100)
        oPos.left = posX
        oPos.top = posY
        return oPos
    }
    function setPos () {
        var p = randomPos ()
        $avatars.css({'left':p.left,'top':p.top})
    }
    setInterval(function(){
        setPos ()
    },5000)
  
})