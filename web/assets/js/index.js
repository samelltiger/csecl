
// 背景变色

$(function () {
  var $bgRgb = $('#particles')
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
  var $nav = $('.nav')
  var $content = $('.content')
  $.each($nav.find('li'), function (index, value) {
    $(value).click(function () {
      $nav.fadeOut()
      $content.eq(index).slideDown()
      $content.eq(index).find('.close-hook').click(function () {
        $content.eq(index).slideUp('show', function () {
          $nav.fadeIn()
        })
      })
    })
  })
})
