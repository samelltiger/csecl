<?php
return [
    'adminEmail' => 'admin@example.com',
    "errCode"    => [
        0   => "URL错误",
        403 => "你没有权限访问本页面，请联系管理员为你设置权限！",
        404 => "页面失踪了!",
        411 => "token已过期"

    ],
    "redirectUrl"   => "http://csecl_lo/v1/applications/err" ,   //  默认重定向的错误页面

    'allowAction'   => [ "err" , "index" , "new" , "verification","chk","createapp"], //不需要token验证的方法名

    
];
