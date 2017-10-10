
/*===================================
* 整个页面的js
===================================*/
$(function () {

  // 下拉菜单
  function Menu() {
    $(".menu-toggle").on('click', function (e) {
      $(this).toggleClass('opened');
      $("#awd-site-nav").toggleClass('active');
    });
  }
  
  // 滚动插件
  function ScorllBar(){
    var ps = new PerfectScrollbar('.sections-block', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20,
      suppressScrollX: true
    });
  }

  //切换动态
  function ContentSlider() {
    $('.slide-item').first().addClass('active');

    var slide_timeout;
    var slide_in_timeout;

    var $bg = $('#bg');
    var $menu = $('#awd-site-nav');
    var menu_elem = $menu.find('a');
    var menu_elem_active = $menu.find('a.active');

    menu_elem.on('click', function (e) {
      e.preventDefault();
      clearTimeout(slide_timeout);
      // var oldhtml = $('.sections-block').html();
      // $('.sections-block').html('');
      // setTimeout(function () {
      //   $('.sections-block').html(oldhtml);
      //   ps.update();
      // }, 500);
      var position = $(this).offset();
      var elem = $(this);
      var goToSlide = elem.data('slide');
      var goToSlideBg = $bg.find('.bg-' + goToSlide);

      $bg.find('.awd-site-bg').removeClass('active');
      $('#awd-site-wrap').removeClass('bg-' + $menu.find('a.active').data('slide')).addClass("bg-" + goToSlide);
      goToSlideBg.css({
        "left": position.left + (elem.outerWidth() / 2) - 50,
        "top": position.top + (elem.outerHeight() / 2) - 50
      });
      goToSlideBg.addClass('active');

      if ($(window).width() < 769) {
        $menu.removeClass('active');
        $(".menu-toggle").removeClass('opened');
      }

      if (!elem.hasClass('active')) {

        menu_elem.removeClass('active');
        elem.addClass('active');

        slide_timeout = setTimeout(function () {
          var goToSlideContent = $('.slide-item[data-slide-id=' + goToSlide + ']');
          if (goToSlideContent) {
            $('.slide-item').removeClass('active');
            goToSlideContent.addClass('active');

            if (!$('body').hasClass('mobile')) {

              if (goToSlideContent.hasClass('active')) {

                clearTimeout(slide_in_timeout);

                $('.start .slide-item .animated').each(function () {
                  var elem = $(this);
                  var animation = elem.data('animation');
                  elem.removeClass(animation + " visible");
                });

                $('.active').find('.animated').each(function () {

                  var elem = $(this);
                  var animation = elem.data('animation');

                  if (!elem.hasClass('visible')) {
                    var animationDelay = elem.data('animation-delay');
                    if (animationDelay) {
                      slide_in_timeout = setTimeout(function () {
                        elem.addClass(animation + " visible");
                      }, animationDelay);
                    } else {
                      elem.addClass(animation + " visible");
                    }
                  }
                });
              }

            }

          }
        }, 0);
      }
    });
  }

  // 执行
  Menu();
  ContentSlider();
  ScorllBar();
});


/*===================================
* 申请表的 js
===================================*/

$(function () {

  // 引入china_cities.min.js 
  var citMap = china_cities;
  var signup = {
    postData: '/v1/applications/createapp?role=api',
    checkNumber: '/v1/applications/chk?role=api'
  };
  var $content = $('.content');

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
    $provinceSelect.click(function (e) {
      e.stopPropagation();
      $showProvince.slideToggle();
    });
    // 省份未选择
    $citySelect.click(function (e) {
      e.stopPropagation();
      if ($showCity.find('li').length) {
        $showCity.slideToggle()
      } else {
        $citySelect.find('.show-select-hook').html('先选择省份')
      }
    });
    // 省份列表项被点击插入省份的区域
    $.each($showProvince.find('li'), function (index, value) {
      $(value).click(function (e) {
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
          $(item).click(function (e) {
            e.stopPropagation();
            $citySelect.find('.show-select-hook').html($(this).html()).attr('title', $(this).html());
            $citySelect.find('.show-select-hook').next().removeClass('icon-close').addClass('icon-ok');
            $showCity.slideUp();
          })
        })
      })
    });
    $content.click(function () {
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
    $yearSelect.click(function (e) {
      e.stopPropagation();
      $showYear.slideToggle();
    });
    $.each($showYear.find('li'), function (key, item) {
      $(item).click(function (e) {
        e.stopPropagation();
        $yearSelect.find('.show-select-hook').html($(this).html());
        $yearSelect.find('.show-select-hook').next().removeClass('icon-close').addClass('icon-ok');
        $showYear.slideUp();
      })
    });
    $content.click(function () {
      $showYear.slideUp();
    })
  }

  // 选择学院
  function selectUnvetsity() {
    var $collegeSelect = $('.select-college-hook');
    var $showCollege = $('.show-college-hook');
    $collegeSelect.click(function (e) {
      e.stopPropagation();
      $showCollege.slideToggle();
    });
    $.each($showCollege.find('li'), function (key, item) {
      $(item).click(function (e) {
        e.stopPropagation();
        $collegeSelect.find('.show-select-hook').html($(this).html());
        $collegeSelect.find('.show-select-hook').next().removeClass('icon-close').addClass('icon-ok');
        $showCollege.slideUp();
      })
    });
    $content.click(function () {
      $showCollege.slideUp();
    })
  }

  //显示方向
  function showRod() {
    var $selectRod = $('.fx-hook label');
    var $showConeb = $('.fx-info .info-word');
    $.each($selectRod, function (index, value) {
      $(value).click(function () {
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
    $input.click(function (e) {
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
    $('.reg .submit').click(function () {
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
        $('#form-reset').click(function () {
          $okInfo.fadeOut();
        });
        $('#form-commit').click(function () {
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
    checkedInput('#username', /^[\u4E00-\u9FA5]{2,4}$/);
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
});