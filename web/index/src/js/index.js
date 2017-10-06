// 背景变色
$(function () {
  var $bgRgb = $('#particles')
  var $navRgb = $('.nav li')
  colorChange()
  // 设置定时器
  setInterval(function () {
    colorChange()
  }, 7000)
  function colorChange() {
    var bgRgb = [
      getRandomNumber(0, 100),
      getRandomNumber(0, 100),
      getRandomNumber(0, 100)
    ];
    var bgColor = 'rgb(' + bgRgb[0] + ',' + bgRgb[1] + ',' + bgRgb[2] + ')'
    $bgRgb.css('background', bgColor)
  }
  function getRandomNumber(rMin, rMax) {
    var cha = rMax - rMin;
    var rand = Math.random();
    return (rMin + Math.round(cha * rand))
  }
})

// 点击打开窗体
$(function () {
  var $navList = $('.nav li')
  var $content = $('.content')
  $.each($navList, function (index, value) {
    $(value).click(function () {
      $navList.fadeOut()
      $content.eq(index).slideDown()
      $content.find('.close-hook').click(function () {
        $content.eq(index).slideUp('show', function () {
          $navList.fadeIn()
        })
      })
    })
  })
})
