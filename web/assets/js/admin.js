
// 判断当前的token 是否存在存在就不用登陆
$(function () {
  var $login = $('.login-wrapper');
  if(!$.cookie('token')){
    $login.css('display','flex');
  } else {
    $login.css('display','none');
    showData($.cookie('token'));
  }
});
// 退出
$(function () {
  $('.back').click(function () {
    $.removeCookie('token');
    window.location.reload();
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
// 验证码获取和登录判断
$(function () {
  var $sendCode = $('#sendCode-hook');
  var $email = $('#email');
  var $submit = $('#submit-hook');
  var $loginError = $('.login-error');
  // email 检查
  $email.on('input', function () {
    $loginError.hide().text('');
    var val = $.trim($(this).val().replace(/\s/g, ""));
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    if (reg.test(val)) {
      $sendCode.addClass('a').removeAttr('disabled');
    } else {
      $sendCode.removeClass('a').attr('disabled', 'disabled');
    }
  });
  // 发送验证码
  $sendCode.click(function () {
    var t = 10;
    var _this = this;
    $(_this).attr('disabled', 'disabled').removeClass('a');
    $.ajax({
      type: 'GET',
      url: '/v1/tokens/' + $email.val() + '?role=api',
      success: function (data) {
        if (data.success === 'success') {
          timer();
        }
      },
      error: function () {
        $loginError.show().text('该邮箱不是管理员邮箱');
      }
    });
    // 倒计时函数
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
  // 登陆
  $submit.click(function () {
    $submit.attr('disabled', 'disabled');
    $('.sign-wrapper').fadeIn('fast');
    // 发起登陆请求
    $.ajax({
      type: 'POST',
      url: '/v1/tokens/' + $email.val() + '?role=api&code=' + $('#backCode-hook').val(),
      success: function (data) {
        if (data.success === 'success') {
          // 请求成功后 储存cookie
          $.cookie('token',data.data.token);
          setTimeout(function () {
            $('.sign').html('<p><span class="icon icon-ok"></span></p><p><span>登录成功,进入管理</span></p>');
          }, 1500);
          setTimeout(function () {
            // 重置表单
            $('.login-wrapper').fadeOut();
            // 加載報名數據
            showData($.cookie('token'));
          }, 2500);
        } else {
          setTimeout(function () {
            $('.sign').html('<p><span class="icon icon-close"></span></p><p><span>登录失败,账号或者验证码错误</span></p>');
          }, 1500);
          setTimeout(function () {
            $('.sign-wrapper').fadeOut('fast');
            $submit.removeAttr('disabled');
            setTimeout(function () {
              showLoading();
            }, 500);
          }, 3000);
        }
      },
      error: function () {
        setTimeout(function () {
          $('.sign').html('<p><span class="icon icon-close"></span></p><p><span>登录失败，稍后重试</span></p>');
        }, 1500);
        setTimeout(function () {
          $('.sign-wrapper').fadeOut('fast');
          $submit.removeAttr('disabled');
          setTimeout(function () {
            showLoading();
          }, 500)
        }, 3000)
      }
    });
  });
});
// 重复用到loading
function showLoading() {
  $('.sign').html('<p><img src="./assets/images/loading.gif"></p><p><span>正在登录...</span></p></p>');
}
// 显示数据 函数
function showData(getToken) {
  var $students = $('#students-hook');
  var appendHtml = '';
  $.ajax({
    type: 'GET',
    url: '/v1/applications/show?role=api&token='+getToken,
    success: function(res){
      // token 匹配正确
      var dataList = [];
      if (res.success === 'success') {
        $.each(res.data,function (num,val) {
          $.each(val, function (index, item) {
            dataList.push(item);
            appendHtml +=
              '<tr class="">' +
              '<td class="fixed-50">' + item.id + '</td>' +
              '<td>' + item.name + '</td>' +
              '<td class="fixed-50">' + (parseInt(item.sex) === 1 ? '男' : '女') + '</td>' +
              '<td>' + item.address + '</td>' +
              '<td class="fixed-50">' + item.grade + '</td>' +
              '<td>' + item.college + '</td>' +
              '<td>' + item.major + '</td>' +
              '<td class="fixed-50">' + item.direct + '</td>' +
              '</tr>';
          });
        });
        $students.html('');
        $students.append(appendHtml);
      }else{
        // token 不匹配的情况下
        alert('登陆超时');
        $('.login-wrapper').css('display','flex');
      }
      var $getList = $students.find('tr');
      var $getInfoDom = $('#students-info .line span , #students-info .anser');
      if ($getList.length > 0) {
        $.each($getList, function (index, item) {
          $(item).click(function () {
            if ($(this).hasClass('select')) {
              return false;
            }
            $getList.removeClass('select');
            $(this).addClass('select');
            // 右侧显示内容
            var data = dataList[index];
            console.log(data);
            $getInfoDom.eq(0).text(data.name);
            $getInfoDom.eq(1).text(parseInt(data.sex) === 1 ? '男' : '女');
            $getInfoDom.eq(2).text(data.grade);
            $getInfoDom.eq(3).text(data.address);
            $getInfoDom.eq(4).text(data.college);
            $getInfoDom.eq(5).text(data.major);
            $getInfoDom.eq(6).text(data.math_grade);
            $getInfoDom.eq(7).text(data.english_grade);
            $getInfoDom.eq(8).text(data.direct);
            $getInfoDom.eq(9).text(data.referrer);
            $getInfoDom.eq(10).text(data.phone);
            $getInfoDom.eq(11).text(data.qq);
            $getInfoDom.eq(12).text(data.number);
            $getInfoDom.eq(13).text(data.email);
            $getInfoDom.eq(14).text(data.answer1);
            $getInfoDom.eq(15).text(data.answer2);
            $getInfoDom.eq(16).text(data.answer3);
            $getInfoDom.eq(17).text(data.answer4);
            $getInfoDom.eq(18).text(data.answer5);
            $getInfoDom.eq(19).text(data.answer6);
          });
        });
      }
    },
    error: function(){
      alert('请求错误');
      $('.login-wrapper').css('display','flex');
    }
  });
}