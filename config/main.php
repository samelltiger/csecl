<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php'),
    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-csecl',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'controllerNamespace' => 'csecl\controllers',
    'modules' => [
        'v1' => [      
            'class' => 'csecl\modules\v1\Module',
        ],
    ],

    'components' => [
        'db' => [
                'class' => 'yii\db\Connection',
                'dsn' => 'mysql:host=localhost;dbname=csecl',//dbname=easycollect',
                'username' => 'root',
                'password' => '',
                'charset' => 'utf8',
            ],
        'user' => [
            'identityClass' => 'csecl\models\UserIdentity',/*'common\models\User',*/
            'enableAutoLogin' => true,
            'loginUrl'=>['/test/login'],
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'user/error',
        ],
        'urlManager' =>[
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'enableStrictParsing' =>true,
            'rules' => [
                [
                    'class' => 'yii\rest\UrlRule',
                    // api访问时，必须使用控制器的复数形式，如 localhost/sites , 否则会报错（页面未找到）
                    'controller' => [
                            "site"
                            ],
                    'extraPatterns' => [
                            'GET test' => 'test',       //测试
                            'GET ' => 'test',           //测试 
                            /*
                                以下为url配置示例，请参考：

                            "GET <email:[\w\d_-]+@[\w\d_-]+(\.[\w\d_-]+)+$>" => 'get-one',
                            'GET <id:\d+>' => 'get-one',
                            'POST ' => 'add',
                            'DELETE ' => 'del',
                            'PUT '  =>  'change', 
                            */
                    ],
                ],
            ],
        ],
    ],
    'params' => $params,
    'homeUrl'=>'?r=test/index',
    'defaultRoute' =>'test',
];
