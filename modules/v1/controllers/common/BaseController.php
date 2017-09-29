<?php

namespace csecl\modules\v1\controllers\common;

use Yii;

class BaseController extends \csecl\controllers\common\BaseController
{
    public $modelClass = 'csecl\models\Goods';
    // public $needCheckAction = [];
    // public $notCheckAction = [ "index" , "login","create"];

    /**
    * 检查请求接口方法是否需要带token
    */
    public function checkAccess($action, $model = null, $params = [])
    {
        $allowAction = Yii::$app->params['allowAction'];

        if ( \in_array( $action , (array)$allowAction) ) {
            return;
        }

        throw new \yii\web\ForbiddenHttpException(sprintf('You can only %s articles that you\'ve created.', $action));
    }

    public function beforeAction($action){
        return $this->redirect("http://www.baidu.com");
        
    }

    public function actionErr(){
        return $this->renderJson(["err"=>"page err"]);
    }

    /**
    *  生成一个6位数的验证码！
    */
    public function getVerifyCode()
    {
        $letters = '0123456789';
        $code = '';
        for ($i = 0; $i < 6; ++$i) {
            $code .= $letters[mt_rand(0, 9)];
        }

        return $code;
    }

    /**
    * 生成一个32位的token
    */
    public function getToken()
    {
        $letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789';
        $code = '';
        $str_length = strlen($letters) - 1;

        for ($i = 0; $i < 32; ++$i) {
            $code .= $letters[mt_rand(0 , $str_length )];
        }

        return $code;
    }

    /**
    *  通过邮箱发送验证码 
    */
    public function SendVerifyCode( $email , $code )
    {
        if($code){
            return Yii::$app->mailer->compose('layouts/verifycode',[
                    'title' => "Csecl管理员登录验证码" ,
                    'code'=>  $code,
                    ])
                ->setTo($email)
                ->setSubject('Csecl管理员登录验证码')
                ->send();
        }

        return false;
    }

}
