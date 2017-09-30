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
            'errorAction' => 'tokens/err',
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
                            "site","v1/goods","v1/token",

                            'application','notice','rource',
                            ],
                    'extraPatterns' => [
                            'GET test'      => 'test',       //测试
                            'GET '          => 'index',           //测试 
                            "GET <email:[\w\d_-]+@[\w\d_-]+(\.[\w\d_-]+)+$>"    => "verification",
                            'POST <email:[\w\d_-]+@[\w\d_-]+(\.[\w\d_-]+)+$>'   => 'new',           //测试 
                            "GET err"       => "err",
                            "GET <action_id:[.]+>"                              => "err",
                            /*
                                以下为url配置示例，请参考：

                            "GET <email:[\w\d_-]+@[\w\d_-]+(\.[\w\d_-]+)+$>" => 'get-one',
                            'GET <id:\d+>' => 'get-one',
                            'POST ' => 'add',
                            'DELETE ' => 'del',
                            'PUT '  =>  'change', 
                            */

                            //application notice rource
                            'GET show/<page:\d+>'     => 'show',
                            'GET simple/<page:\d+>'     => 'simple',
                            'GET get/<id:\d+>'     => 'get',
                            'POST createapp'     => 'createapp',
                            'POST add'  => 'add',
                            'POST upda'  => 'upda',
                            'POST dele'  => 'dele',

                            //rource
                            'GET getrou/<type:\d+>'  => 'getrou',

                    ],
                ],
            ],
        ],
    ],
    'params' => $params,
    'homeUrl'=>'?r=test/index',
    'defaultRoute' =>'test',
];
