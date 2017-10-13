
/*===================================
* 调用
===================================*/
$(function () {
  // 手机端的延迟问题
  FastClick.attach(document.body);
  Menu();
  // RegOK();
  ScorllBar();
  ContentSlider(getDom());
  cavansLines();
  $(window).resize(function(){
    cavansLines();
  });
});

/*===================================
 * 先判断当前是否为报名状态状态
 ===================================*/
// function RegOK() {
//   $.ajax({
//     type:'get',
//     url: 'v1/applications/status?role=api',
//     success: function (data) {
//       if(data.success==='success'){
//         $('.contact-koo').remove('.reg-notime');
//       }else {
//         $('.contact-koo').remove('.reg');
//         $('.reg-notime').text('现在非报名时间...');
//       }
//     },
//     error: function () {
//       $('.contact-koo').remove('.reg');
//       $('.reg-notime').text('请求失败，请检查网络...');
//     }
//   });
// }
/*===================================
* 和滚动组件配合使用获取的页面html片段
* ContentSlider() 调用后使用dom
===================================*/

function getDom() {
  var arr = ['home','subscribe','services','contact'];
  var dom = {};
  $.each($('.slide-item'),function(index,item){
    dom[arr[index]] = $(item).html();
  });
  return dom;
}

/*===================================
* 下拉菜单
===================================*/

function Menu() {
  $(".menu-toggle").on('click', function (e) {
    $(this).toggleClass('opened');
    $("#awd-site-nav").toggleClass('active');
  });
}

/*===================================
* 滚动插件 ContentSlider() 调用后使用ps1
===================================*/

var ps1;
function ScorllBar() {
  var dom1 = document.querySelector('.slides-wrap');
  ps1 = new PerfectScrollbar(dom1, {
    wheelSpeed: 2,
    wheelPropagation: true,
    suppressScrollX: true,
    swipePropagation: true
  });
}
// ContentSlider() 调用后使用mScorllBar()
function mScorllBar(dom) {
  new PerfectScrollbar(dom, {
    wheelSpeed: 2,
    wheelPropagation: true,
    suppressScrollX: true,
    swipePropagation: true
  });
}

/*===================================
* 切换动态
===================================*/

function ContentSlider(dom) {
  $('.slide-item').first().addClass('active');
  // 取到 背景容器
  var $bg = $('#bg');
  // 取到导航容器
  var $menu = $('#awd-site-nav');
  // 取到导航里面的每个菜单
  var menu_elem = $menu.find('a');
  // 取到当前的激活菜单
  var menu_elem_active = $menu.find('a.active');

  // 菜单点击的时候
  menu_elem.on('click', function (e) {
    e.preventDefault();
    // 得到当前位置
    var position = $(this).offset();
    var elem = $(this);
    // 得到data-slide里面的值
    var goToSlide = elem.data('slide');
    // 在背景盒子中找到对应的值
    var goToSlideBg = $bg.find('.bg-' + goToSlide);

    // 去除掉所有激活样式
    $bg.find('.awd-site-bg').removeClass('active');
    $('#awd-site-wrap')
      .removeClass('bg-' + $menu.find('a.active').data('slide'))
      .addClass("bg-" + goToSlide);
    goToSlideBg.css({
      "left": position.left + (elem.outerWidth() / 2) - 50,
      "top": position.top + (elem.outerHeight() / 2) - 50
    });
    goToSlideBg.addClass('active');

    // 手机端
    if ($(window).width() < 769) {
      $menu.removeClass('active');
      $(".menu-toggle").removeClass('opened');
    }
    if (!elem.hasClass('active')) {
      menu_elem.removeClass('active');
      elem.addClass('active');
    }
    // 针对滚动的特殊代码
    $('.slides-wrap').html('');
    ps1.update();
    $('.slides-wrap').html(dom[goToSlide]);
    $.each($('.hide-show'),function (i,v) {
      mScorllBar(v);
    });
    // 调用表单的js
    if(goToSlide === 'contact'){
      $('.logo').removeClass('wbg').addClass('bbg');
      upContact();
    }else{
      $('.logo').removeClass('bbg').addClass('wbg');
    }
  });
}

/*===================================
* 报名表的 js 点击申请表才会被调用
===================================*/

function upContact() {
  // 引入china_cities.min.js
  var citMap = china_cities;
  var signup = {
    postData: '/v1/applications/createapp?role=api',
    checkNumber: '/v1/applications/chk?role=api'
  };
  var $content = $(document);

  // 省份 县市选择
  function selectContry() {
    var $provinceSelect = $('.select-province-hook');
    var $showProvince = $('.show-province-hook');
    var $citySelect = $('.select-city-hook');
    var $showCity = $('.show-city-hook');
    // 添加省份列表
    $.each(citMap, function (index, value) {
      if (index > 0) {
        $showProvince.append('<li title="' + value.name + '">' + value.name + '</li>')
      }
    });
    // 点击选择省份
    $provinceSelect.on('click',function (e) {
      e.stopPropagation();
      $showProvince.slideToggle();
    });
    // 省份未选择
    $citySelect.on('click',function (e) {
      e.stopPropagation();
      if ($showCity.find('li').length) {
        $showCity.slideToggle()
      } else {
        $citySelect.find('.show-select-hook').html('先选择省份')
      }
    });
    // 省份列表项被点击插入省份的区域
    $.each($showProvince.find('li'), function (index, value) {
      $(value).on('click',function (e) {
        e.stopPropagation();
        $provinceSelect.find('.show-select-hook').html($(this).html());
        $provinceSelect.find('.show-select-hook').next().removeClass('icon-close').addClass('icon-ok');
        $showProvince.slideUp();
        $showCity.html('');
        $citySelect.find('.show-select-hook').html('请选择');
        $citySelect.find('.show-select-hook').next().removeClass('icon-ok');
        $.each(citMap[index + 1].sub, function (i, v) {
          if (i > 0) {
            $showCity.append('<li title="' + v.name + '">' + v.name + '</li>')
          }
        });
        $.each($showCity.find('li'), function (key, item) {
          $(item).on('click',function (e) {
            e.stopPropagation();
            $citySelect.find('.show-select-hook').html($(this).html()).attr('title', $(this).html());
            $citySelect.find('.show-select-hook').next().removeClass('icon-close').addClass('icon-ok');
            $showCity.slideUp();
          })
        })
      })
    });
    $content.on('click',function () {
      $showProvince.slideUp();
      $showCity.slideUp();
    })
  }

  // 选择年级
  function selectClass() {
    var $yearSelect = $('.select-year-hook');
    var $showYear = $('.show-year-hook');
    var year = new Date().getFullYear();
    var yearList = [(year - 1), year];
    $.each(yearList, function (index, value) {
      $showYear.append('<li >' + value + '</li>')
    });
    $yearSelect.on('click',function (e) {
      e.stopPropagation();
      $showYear.slideToggle();
    });
    $.each($showYear.find('li'), function (key, item) {
      $(item).on('click',function (e) {
        e.stopPropagation();
        $yearSelect.find('.show-select-hook').html($(this).html());
        $yearSelect.find('.show-select-hook').next().removeClass('icon-close').addClass('icon-ok');
        $showYear.slideUp();
      })
    });
    $content.on('click',function () {
      $showYear.slideUp();
    })
  }

  // 选择学院
  function selectUnvetsity() {
    var $collegeSelect = $('.select-college-hook');
    var $showCollege = $('.show-college-hook');
    $collegeSelect.on('click',function (e) {
      e.stopPropagation();
      $showCollege.slideToggle();
    });
    $.each($showCollege.find('li'), function (key, item) {
      $(item).on('click',function (e) {
        e.stopPropagation();
        $collegeSelect.find('.show-select-hook').html($(this).html());
        $collegeSelect.find('.show-select-hook').next().removeClass('icon-close').addClass('icon-ok');
        $showCollege.slideUp();
      })
    });
    $content.on('click',function () {
      $showCollege.slideUp();
    })
  }

  //显示方向
  function showRod() {
    var $selectRod = $('.fx-hook label');
    var $showConeb = $('.fx-info .info-word');
    $.each($selectRod, function (index, value) {
      $(value).on('click',function () {
        $showConeb.hide();
        $showConeb.eq(index).show();
      })
    })
  }

  // 鼠标焦点颜色
  function focusColor() {
    var $input = $('input[type!=radio],textarea');
    var focusColor = '#5597F5';
    var defaultColor = '#333';
    $input.on('click',function (e) {
      if (e.target.tagName === 'TEXTAREA') {
        $input.css('border-color', defaultColor);
        $(this).css('border-color', focusColor)
      } else {
        $input.parent('.show-border').css('border-color', defaultColor);
        $(this).parent('.show-border').css('border-color', focusColor)
      }
    })
  }
  // 验证提交
  function postData() {
    var $okInfo = $('.ok-info');
    var $errorInfo = $('.error-info');
    $('.reg .submit').on('click',function () {
      var $allIcon = $('.reg i.icon');
      var $ok = $('.reg i.icon-ok');
      if ($ok.length < 19) {
        $.each($allIcon, function (index, item) {
          if (!$(item).hasClass('icon-ok')) {
            $(this).addClass('icon-close');
          } else {
            $(this).removeClass('icon-close');
            $(this).addClass('icon-ok');
          }
        });
        $errorInfo.fadeIn('fast');
        setTimeout(function () {
          $errorInfo.fadeOut('fast');
        }, 2000);
      } else {
        var data = {
          'application': {
            'name': $('#username').val(),
            'sex': parseInt($("input[name='sex']:checked").val()),
            'number': $('#student').val(),
            'address': $('#placeProvince').text() + $('#placeCity').text(),
            'phone': $('#phone').val(),
            'qq': $('#qq').val(),
            'email': $('#email').val(),
            'college': $('#college').text(),
            'major': $('#major').val(),
            'grade': $('#grade').text(),
            'math_grade': parseInt($('#math').val()),
            'english_grade': parseInt($('#english').val()),
            'direct': $("input[name='fx']:checked").val(),
            'referrer': $('#referrer').val()
          },
          'question': {
            'answer1': $.trim($('#question1').val().replace(/\s/g, "").replace(/[<|>]/g, "")),
            'answer2': $.trim($('#question2').val().replace(/\s/g, "").replace(/[<|>]/g, "")),
            'answer3': $('#question3').val(),
            'answer4': $.trim($('#question4').val().replace(/\s/g, "").replace(/[<|>]/g, "")),
            'answer5': $.trim($('#question5').val().replace(/\s/g, "").replace(/[<|>]/g, "")),
            'answer6': $.trim($('#question6').val().replace(/\s/g, "").replace(/[<|>]/g, ""))
          }
        };
        var $steup = $('.steup');
        // 弹出正在提交界面
        $okInfo.fadeIn();
        $('#form-reset').on('click',function () {
          $okInfo.fadeOut();
        });
        $('#form-commit').on('click',function () {
          $('.confirm').hide();
          $steup.html('<p><img src="./assets/images/loading.gif"></p><p><span>正在验证数据...</span></p>');
          setTimeout(function () {
            $steup.html('<p><img src="./assets/images/loading.gif"></p><p><span>正在提交数据...</span></p>');
          }, 2000);
          setTimeout(function () {
            $.ajax({
              type: "post",
              url: signup.postData,
              data: data,
              success: function (data) {
                if (parseInt(data.code) === 200) {
                  $steup.html('<p><span class="icon icon-ok"></span></p><p><span>恭喜，报名成功</span></p>');
                  setTimeout(function () {
                    window.location.reload();
                  }, 3000);
                }
              },
              error: function () {
                $steup.html('<p><span class="icon icon-close"></span></p><p><span>提交失败，稍后重试</span></p>');
                setTimeout(function () {
                  $okInfo.fadeOut();
                  $steup.html('');
                  setTimeout(function () {
                    $('.confirm').show();
                  }, 2000);
                }, 2000);
              }
            });
          }, 3000);
        });
      }
    });
  }

  // 实时检查
  function checkedData() {
    // 姓名
    checkedInput('#username', /^[\u4E00-\u9FA5]{2,8}$/);
    // 学号
    checkedInput('#student', /^20[1-9]\d{9}$/, 1);
    // 手机
    checkedInput('#phone', /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/);
    // 验证QQ
    checkedInput('#qq', /^\d{5,11}$/);
    // 验证电子邮箱
    checkedInput('#email', /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/);
    // 验证专业
    checkedInput('#major', /^[\u4E00-\u9FA5]{2,8}$/);
    // 验证数学
    checkedInput('#math', /^([1-9])$|^([1-9]\d)$|^(1[0-4]\d)$|^(150)$/);
    // 验证英语
    checkedInput('#english', /^([1-9])$|^([1-9]\d)$|^(1[0-4]\d)$|^(150)$/);
    // 验证推荐人
    checkedInput('#referrer', /^[\u4E00-\u9FA5]+$/);
    // 文本域验证
    $.each($('textarea'), function (index, value) {
      $(value).on('input', function () {
        // 去掉空格 去掉html
        var str = $(this).val().replace(/[<|>]/g, "");
        var len = $.trim($(this).val().replace(/\s/g, "").replace(/[<|>]/g, "")).length;
        if (len < 20) {
          $(this).next().css('color', '#d9534f');
          $(this).next().find('span').text('还差' + (20 - len) + '字');
          $(this).next().find('.icon').removeClass('icon-ok');
          $(this).next().find('.icon').addClass('icon-close');
        } else {
          $(this).next().css('color', '#5597F5');
          $(this).next().find('span').text(len + '/200字');
          $(this).next().find('.icon').removeClass('icon-close');
          $(this).next().find('.icon').addClass('icon-ok');
        }
      });
    });
    function checkedInput(el, reg, fn) {
      $(el).on('input', function () {
        $('.student-error').text('').hide();
        var dom = $(this).next();
        if (reg.test($(this).val())) {
          dom.removeClass('icon-close');
          dom.addClass('icon-ok');
          // 实时验证是否重复注册
          if (fn) {
            $.ajax({
              type: "post",
              url: signup.checkNumber,
              data: { 'number': $(this).val() },
              success: function (data) {
                if (data.success === 'success') {
                  dom.removeClass('icon-ok');
                  dom.addClass('icon-close');
                  $('.student-error').text('该学号已经报名成功!!').fadeIn();
                }
              },
              error: function () {
                dom.removeClass('icon-ok');
                dom.addClass('icon-close');
                $('.student-error').text('验证失败，请稍后再试!!').fadeIn();
              }
            });
          }
        } else {
          dom.removeClass('icon-ok');
          dom.addClass('icon-close');
        }
      });
    }
  }
  // 执行
  selectClass();
  selectContry();
  selectUnvetsity();
  showRod();
  focusColor();
  checkedData();
  postData();
}

/*===================================
* 线条的 cavans
===================================*/

function cavansLines(){
  var awd_bg_animated = true;
  var awd_bg_number_of_curves = 64;

  var canvas = document.getElementById("awd-site-canvas");
  var ctx = canvas.getContext("2d");
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  var curves_array = [];
  var curve = function (cp1x, cp1y, cp2x, cp2y, x, y, cp1xvx, cp1xvy, cp1yvx, cp1yvy, cp2xvx, cp2xvy, cp2yvx, cp2yvy) {
    this.cp1x = cp1x;
    this.cp1y = cp1y;
    this.cp2x = cp2x;
    this.cp2y = cp2y;
    this.x = x;
    this.y = y;

    this.cp1xvx = cp1xvx;
    this.cp1xvy = cp1xvy;
    this.cp1yvx = cp1yvx;
    this.cp1yvy = cp1yvy;

    this.cp2xvx = cp2xvx;
    this.cp2xvy = cp2xvy;
    this.cp2yvx = cp2yvx;
    this.cp2yvy = cp2yvy;
  };
  function awdCanvasResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function awdCanvasInit() {
    for (var i = 0; i < awd_bg_number_of_curves; i++) {
      var cp1x = Math.random() * canvas.width;
      var cp1y = Math.random() * canvas.height;
      var cp2x = Math.random() * canvas.width;
      var cp2y = Math.random() * canvas.height;
      var x = 0;
      var y = 0;

      var cp1xvx = Math.random() * 2 - 1;
      var cp1xvy = Math.random() * 2 - 1;

      var cp1yvx = Math.random() * 2 - 1;
      var cp1yvy = Math.random() * 2 - 1;

      var cp2xvx = Math.random() * 2 - 1;
      var cp2xvy = Math.random() * 2 - 1;

      var cp2yvx = Math.random() * 2 - 1;
      var cp2yvy = Math.random() * 2 - 1;

      curves_array.push(
        new curve(
          cp1x, cp1y, cp2x, cp2y,
          x, y,
          cp1xvx, cp1xvy, cp1yvx, cp1yvy,
          cp2xvx, cp2xvy, cp2yvx, cp2yvy
        )
      );
    }
  }
  function awdCanvasDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 1;
    ctx.strokeStyle = $("#awd-site-wrap").css('color');

    for (var i = 0; i < curves_array.length; i++) {

      ctx.beginPath();
      ctx.moveTo(-100, canvas.height + 100);
      ctx.bezierCurveTo(
        curves_array[i].cp1x, curves_array[i].cp1y,
        curves_array[i].cp2x, curves_array[i].cp2y,
        canvas.width + 100, curves_array[i].y - 100
      );
      ctx.stroke();

      if (curves_array[i].cp1x < 0 || curves_array[i].cp1x > canvas.width) {
        curves_array[i].cp1x -= curves_array[i].cp1xvx;
        curves_array[i].cp1xvx *= -1;
      }
      if (curves_array[i].cp1y < 0 || curves_array[i].cp1y > canvas.height) {
        curves_array[i].cp1y -= curves_array[i].cp1yvy;
        curves_array[i].cp1yvy *= -1;
      }

      if (curves_array[i].cp2x < 0 || curves_array[i].cp2x > canvas.width) {
        curves_array[i].cp2x -= curves_array[i].cp2xvx;
        curves_array[i].cp2xvx *= -1;
      }
      if (curves_array[i].cp2y < 0 || curves_array[i].cp2y > canvas.height) {
        curves_array[i].cp2y -= curves_array[i].cp2yvy;
        curves_array[i].cp2yvy *= -1;
      }

      curves_array[i].cp1y += curves_array[i].cp1yvy;
      curves_array[i].cp1x += curves_array[i].cp1xvx;
      curves_array[i].cp2x += curves_array[i].cp2xvx;
    }
    requestAnimFrame(awdCanvasDraw);
  }
  (function awdCanvas() {
    awdCanvasResize();
    awdCanvasInit();
    awdCanvasDraw();
  })()
}


