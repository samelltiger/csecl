var datasfa = {
    '姓名': '神仙哥哥',
    '性别': '妖',
    '学号': '20159999999',
    '籍贯': '星界',
    '手机': '15099999999',
    'QQ': '2515499999',
    '邮箱': '2515499999@ss.com',
    '学院': '魔法学院',
    '专业': '电子商务',
    '年级': '2017级',
    '数学成绩': '999',
    '英语成绩': '999',
    '方向': '前端',
    '推荐人': '幽都王',

    '问题1': '用自己的话描述CSECL实验室是干什么的（尤其是自己报的方向）？以及自己打算如何在实验室学习？',
    '问题2': '简单谈谈你一年内的规划？能否在实验室呆满12个月？',
    '问题3': '你做人的准则是什么？坚持多久了？',
    '问题4': '对于现状你满意吗？哪些方面你需要加强？',
    '问题5': '介绍一下自己和取得过的成就 ？',
    '问题6': '你觉得我们为什么会录取你？',
}

var data = {
    'name':'神仙哥哥',
    'sex': '妖',
    'number': '20159999999',
    'address': '中国 ' + $('#placeProvince').text() + ' ' + $('#placeCity').text(),
    'phone': $('#phone').val(),
    'qq': $('#qq').val(),
    'email': $('#email').val(),
    'college': $('#college').text(),
    'major': $('#major').val(),
    'grade': $('#grade').text(),
    'math_grade': $('#math').val(),
    'english_grade': $('#english').val(),
    'direct': $("input[name='fx']:checked").val(),
    'referrer': $('#referrer').val(),
    'answer1': $('#question1').val(),
    'answer2': $('#question2').val(),
    'answer3': $('#question3').val(),
    'answer4': $('#question4').val(),
    'answer5': $('#question5').val(),
    'answer6': $('#question6').val()
}