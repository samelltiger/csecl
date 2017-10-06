


$(document).unload(function(){
  alert('sfs');
});
// 验证码获取和登录判断
$(function () {
  var $sendCode = $('#sendCode-hook');
  var $email = $('#email');
  var $submit = $('#submit-hook');
  var $loginError = $('.login-error');
  var $codeError = $('.code-error');
  var origin = 'csecl';
  $email.on('input', function () {
    $loginError.hide().text('');
    var val = $.trim($(this).val().replace(/\s/g, ""));
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    if (reg.test($(this).val())) {
      $sendCode.addClass('a').removeAttr('disabled');
    } else {
      $sendCode.removeClass('a').attr('disabled', 'disabled');
    }
  });
  $sendCode.click(function () {
    var t = 10;
    var _this = this;
    $(_this).attr('disabled', 'disabled').removeClass('a');
    // 请求部分等待
    $.ajax({
      type: 'GET',
      url: '/v1/tokens/' + $email.val() + '?role=api',
      sucsess: function (data) {
        if (data.success === 'success') {
          timer();
        }
      },
      error: function () {
        $loginError.show().text('该邮箱不是管理员邮箱');
      }
    });
    function timer() {
      if (t > 0) {
        $(_this).text('发送成功(' + t + ')');
        t--;
        setTimeout(function () {
          timer();
        }, 1000);
      } else {
        $(_this).removeAttr('disabled').addClass('a').text('发送验证码');
      }
    }
  });
  $submit.click(function () {
    $submit.attr('disabled', 'disabled');
    $('.sign-wrapper').fadeIn('fast');
    var token = '';
    $.ajax({
      type: 'POST',
      url: '/v1/tokens/' + $email.val() + '?role=api&code=' + $('#backCode-hook').val(),
      success: function (data) {
        if (data.success === 'success') {
          token = data.data.token;
          setTimeout(function () {
            $('.sign').html('<p><span class="icon icon-ok"></span></p><p><span>登录成功,进入管理</span></p>');
          }, 1500);
          setTimeout(function () {
            $('.login-wrapper').fadeOut();
            // 加載報名數據 
            // var $students = $('#students-hook');
            // var $showInfo = $('#students-info');
            // var appendHtml = '';
            // $.ajax({
            //   type: 'GET',
            //   url: '/v1/applications/show/1?role=api',
            //   success: function(res){
            //     console.log(res);
            //     if (res.success === 'success') {
            //       $.each(res.data, function (index, item) {
            //         index = parseInt(index) + 1;
            //         appendHtml +=
            //           '<tr class="">' +
            //           '<td class="fixed-50">' + index + '</td>' +
            //           '<td>' + item.name + '</td>' +
            //           '<td class="fixed-50">' + (item.sex === 1 ? '男' : '女') + '</td>' +
            //           '<td>' + item.address.substr(2) + '</td>' +
            //           '<td class="fixed-50">' + item.grade + '</td>' +
            //           '<td>' + item.college + '</td>' +
            //           '<td>' + item.major + '</td>' +
            //           '<td class="fixed-50">' + item.direct + '</td>' +
            //           '</tr>';
            //       });
            //       $students.html('');
            //       $students.append(appendHtml);
            //     }
            //     var $getList = $students.find('tr');
            //     if ($getList.length > 0) {
            //       $.each($getList, function (index, item) {
            //         $(item).click(function () {
            //           if ($(this).hasClass('select')) {
            //             return false;
            //           }
            //           $getList.removeClass('select');
            //           $(this).addClass('select');
            //           // 右侧显示内容
            //           var data = res.data[index];
            //           var infoHtml = 
            //           '<div class="row">'+
            //             '<div class="col-xs-12 col-sm-6 col-md-6">'+
            //               '<div class="line">❈ 姓名 : <span>'+data.name+'</span></div>'+
            //             '</div>'+
            //             '<div class="col-xs-12 col-sm-6 col-md-6">'+
            //               '<div class="line">❈ 性别 : <span>' + (data.sex === 1 ? '男' : '女') + '</span></div>'+
            //             '</div>'+
            //           '</div>'+
            //           '<div class="row">'+
            //             '<div class="col-xs-12 col-sm-6 col-md-6">'+
            //               '<div class="line">❈ 年级 : <span>' + data.grade + '级</span></div>'+
            //             '</div>'+
            //             '<div class="col-xs-12 col-sm-6 col-md-6">'+
            //               '<div class="line">❈ 籍贯 : <span>' + data.address.substr(2) + '</span></div>'+
            //             '</div>'+
            //           '</div>'+
            //           '<div class="row">'+
            //             '<div class="col-xs-12 col-sm-6 col-md-6">'+
            //               '<div class="line">❈ 学院 : <span>' + data.college + '</span></div>'+
            //             '</div>'+
            //             '<div class="col-xs-12 col-sm-6 col-md-6">'+
            //              '<div class="line">❈ 专业 : <span>' + data.major + '</span></div>'+
            //             '</div>'+
            //           '</div>'+
            //           '<div class="row">'+
            //             '<div class="col-xs-12 col-sm-6 col-md-6">'+
            //               '<div class="line">❈ 数学 : <span>' + data.math_grade + '分</span></div>'+
            //             '</div>'+
            //             '<div class="col-xs-12 col-sm-6 col-md-6">'+
            //               '<div class="line">❈ 英语 : <span>' + data.english_grade + '分</span></div>'+
            //             '</div>'+
            //           '</div>'+
            //           '<div class="row">'+
            //             '<div class="col-xs-12 col-sm-6 col-md-6">'+
            //               '<div class="line">❈ 方向 : <span>' + data.direct + '</span></div>'+
            //             '</div>'+
            //             '<div class="col-xs-12 col-sm-6 col-md-6">'+
            //               '<div class="line">❈ 推荐人 : <span>' + data.referrer + '</span></div>'+
            //             '</div>'+
            //           '</div>'+
            //           '<div class="row">'+
            //             '<div class="col-xs-12 col-sm-6 col-md-6">'+
            //               '<div class="line">❈ 手机 : <span>' + data.phone + '</span></div>'+
            //             '</div>'+
            //             '<div class="col-xs-12 col-sm-6 col-md-6">'+
            //               '<div class="line">❈ QQ : <span>' + data.qq + '</span></div>'+
            //             '</div>'+
            //           '</div>'+
            //           '<div class="row" style="margin-bottom:10px;">'+
            //             '<div class="col-xs-12 col-sm-6 col-md-6">'+
            //               '<div class="line">❈ 学号 : <span>' + data.number + '</span></div>'+
            //             '</div>'+
            //             '<div class="col-xs-12 col-sm-6 col-md-6">'+
            //               '<div class="line">❈ 邮箱 : <span>' + data.email + '</span></div>'+
            //             '</div>'+
            //           '</div>'+
            //           '<div class="row">'+
            //             '<div class="col-xs-12 col-sm-12 col-md-12">'+
            //               '<div class="title">❈ 用自己的话描述CSECL实验室是干什么的（尤其是自己报的方向）？以及自己打算如何在实验室学习？</div>'+
            //               '<div class="anser">' + data.answer1 + '</div>'+
            //             '</div>'+
            //             '<div class="col-xs-12 col-sm-12 col-md-12">'+
            //               '<div class="title">❈ 简单谈谈你一年内的规划？能否在实验室呆满12个月？</div>'+
            //               '<div class="anser">' + data.answer2 + '</div>'+
            //             '</div>'+
            //             '<div class="col-xs-12 col-sm-12 col-md-12">'+
            //               '<div class="title">❈ 你做人的准则是什么？坚持多久了？</div>'+
            //               '<div class="anser">' + data.answer3 + '</div>'+
            //             '</div>'+
            //             '<div class="col-xs-12 col-sm-12 col-md-12">'+
            //               '<div class="title">❈ 介绍一下自己和取得过的成就 ？</div>'+
            //               '<div class="anser">' + data.answer4 + '</div>'+
            //             '</div>'+
            //             '<div class="col-xs-12 col-sm-12 col-md-12">'+
            //               '<div class="title">❈ 对于现状你满意吗？哪些方面你需要加强？</div>'+
            //               '<div class="anser">' + data.answer5 + '</div>'+
            //             '</div>'+
            //             '<div class="col-xs-12 col-sm-12 col-md-12">'+
            //               '<div class="title">❈ 你觉得我们为什么会录取你？</div>'+
            //               '<div class="anser">' + data.answer6 + '</div>'+
            //             '</div>'+
            //           '</div>';
            //           $showInfo.html(infoHtml);
            //         });
            //       });
            //     }
            //   },
            //   error: function(){
            //     console.log(res);
            //   }
            // });
          }, 2500);
        } else {
          setTimeout(function () {
            $('.sign').html('<p><span class="icon icon-close"></span></p><p><span>登录失败,账号或者验证码错误</span></p>');
          }, 1500);
          setTimeout(function () {
            $('.sign-wrapper').fadeOut('fast');
            $submit.removeAttr('disabled');
            setTimeout(function () {
              $('.sign').html('<p><img src="./assets/images/loading.gif"></p><p><span>正在登录...</span></p></p>');
            }, 500);
          }, 3000);
        }

      },
      error: function (data) {
        setTimeout(function () {
          $('.sign').html('<p><span class="icon icon-close"></span></p><p><span>登录失败，稍后重试</span></p>');
        }, 1500);
        setTimeout(function () {
          $('.sign-wrapper').fadeOut('fast');
          $submit.removeAttr('disabled');
          setTimeout(function () {
            $('.sign').html('<p><img src="./assets/images/loading.gif"></p><p><span>正在登录...</span></p></p>');
          }, 500)
        }, 3000)
      }
    });
  });
});

// 切换显示
$(function () {
  var $leList = $('.le-list');
  var $leListNav = $leList.find('.list-item-nav');
  var $riBody = $('.ri-body');
  var $riListBody = $riBody.find('.list-item-body');
  $.each($leListNav, function (index, item) {
    $(item).click(function () {
      if ($(this).hasClass('active')) {
        return false;
      }
      $leListNav.removeClass('active');
      $(item).addClass('active');
      $riListBody.removeClass('active');
      $riListBody.eq(index).addClass('active');
    })
  })
});

// 显示数据 测试用
$(function () {
  var $students = $('#students-hook');
            var $showInfo = $('#students-info');
            var appendHtml = '';
            $.ajax({
              type: 'GET',
              url: '/v1/applications/show/1?role=api',
              success: function(res){
                console.log(res);
                if (res.success === 'success') {
                  $.each(res.data, function (index, item) {
                    index = parseInt(index) + 1;
                    appendHtml +=
                      '<tr class="">' +
                      '<td class="fixed-50">' + index + '</td>' +
                      '<td>' + item.name + '</td>' +
                      '<td class="fixed-50">' + (item.sex === 1 ? '男' : '女') + '</td>' +
                      '<td>' + item.address.substr(2) + '</td>' +
                      '<td class="fixed-50">' + item.grade + '</td>' +
                      '<td>' + item.college + '</td>' +
                      '<td>' + item.major + '</td>' +
                      '<td class="fixed-50">' + item.direct + '</td>' +
                      '</tr>';
                  });
                  $students.html('');
                  $students.append(appendHtml);
                }
                var $getList = $students.find('tr');
                if ($getList.length > 0) {
                  $.each($getList, function (index, item) {
                    $(item).click(function () {
                      if ($(this).hasClass('select')) {
                        return false;
                      }
                      $getList.removeClass('select');
                      $(this).addClass('select');
                      // 右侧显示内容
                      var data = res.data[index];
                      var infoHtml = 
                      '<div class="row">'+
                        '<div class="col-xs-12 col-sm-6 col-md-6">'+
                          '<div class="line">❈ 姓名 : <span>'+data.name+'</span></div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 col-md-6">'+
                          '<div class="line">❈ 性别 : <span>' + (data.sex === 1 ? '男' : '女') + '</span></div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="row">'+
                        '<div class="col-xs-12 col-sm-6 col-md-6">'+
                          '<div class="line">❈ 年级 : <span>' + data.grade + '级</span></div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 col-md-6">'+
                          '<div class="line">❈ 籍贯 : <span>' + data.address.substr(2) + '</span></div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="row">'+
                        '<div class="col-xs-12 col-sm-6 col-md-6">'+
                          '<div class="line">❈ 学院 : <span>' + data.college + '</span></div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 col-md-6">'+
                         '<div class="line">❈ 专业 : <span>' + data.major + '</span></div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="row">'+
                        '<div class="col-xs-12 col-sm-6 col-md-6">'+
                          '<div class="line">❈ 数学 : <span>' + data.math_grade + '分</span></div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 col-md-6">'+
                          '<div class="line">❈ 英语 : <span>' + data.english_grade + '分</span></div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="row">'+
                        '<div class="col-xs-12 col-sm-6 col-md-6">'+
                          '<div class="line">❈ 方向 : <span>' + data.direct + '</span></div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 col-md-6">'+
                          '<div class="line">❈ 推荐人 : <span>' + data.referrer + '</span></div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="row">'+
                        '<div class="col-xs-12 col-sm-6 col-md-6">'+
                          '<div class="line">❈ 手机 : <span>' + data.phone + '</span></div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 col-md-6">'+
                          '<div class="line">❈ QQ : <span>' + data.qq + '</span></div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="row" style="margin-bottom:10px;">'+
                        '<div class="col-xs-12 col-sm-6 col-md-6">'+
                          '<div class="line">❈ 学号 : <span>' + data.number + '</span></div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 col-md-6">'+
                          '<div class="line">❈ 邮箱 : <span>' + data.email + '</span></div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="row">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12">'+
                          '<div class="title">❈ 用自己的话描述CSECL实验室是干什么的（尤其是自己报的方向）？以及自己打算如何在实验室学习？</div>'+
                          '<div class="anser">' + data.answer1 + '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-12 col-md-12">'+
                          '<div class="title">❈ 简单谈谈你一年内的规划？能否在实验室呆满12个月？</div>'+
                          '<div class="anser">' + data.answer2 + '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-12 col-md-12">'+
                          '<div class="title">❈ 你做人的准则是什么？坚持多久了？</div>'+
                          '<div class="anser">' + data.answer3 + '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-12 col-md-12">'+
                          '<div class="title">❈ 介绍一下自己和取得过的成就 ？</div>'+
                          '<div class="anser">' + data.answer4 + '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-12 col-md-12">'+
                          '<div class="title">❈ 对于现状你满意吗？哪些方面你需要加强？</div>'+
                          '<div class="anser">' + data.answer5 + '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-12 col-md-12">'+
                          '<div class="title">❈ 你觉得我们为什么会录取你？</div>'+
                          '<div class="anser">' + data.answer6 + '</div>'+
                        '</div>'+
                      '</div>';
                      $showInfo.html(infoHtml);
                    });
                  });
                }
              },
              error: function(){
                console.log(res);
              }
            });
});