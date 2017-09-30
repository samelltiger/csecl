<?php

namespace csecl\modules\v1\controllers;

use csecl\modules\v1\controllers\common\BaseController;

use Yii;
use yii\captcha\CaptchaAction;
use yii\caching\FileCache;

// use yii\web\Cookie;

class TokenController extends BaseController
{
    public $modelClass = 'csecl\models\Goods';

    /**
    * 向给定的邮箱发送登录验证码
    */
    public function actionVerification()
    {
        $email = $this->get("email");

        if( !( is_string( $email ) && \in_array( $email , Yii::$app->params['allowEmail'] ) ) ){
            return $this->renderJson([],0,403, ( is_string( $email ) ? $email:"")." 不是可用的管理员账号！");
        }
        
        $code  = $this  ->  getVerifyCode();

        $cache = Yii::$app->cache;
        // 将验证码缓存到文件中，有效期为300秒
        $cache -> set($email, $code, 5*60);

        $succ  = $this -> SendVerifyCode( $email , $code);
        
        if( $succ ){
            return $this->renderJson([ ] , 1 , 200 , "验证码发送成功，请注意查看邮件！");
        }else{
            return $this->renderJson([ ] , 0 , 500 , "验证码发送失败，请重试！" );
        }
    }

    /**
    *  创建一个新的token，并通过url重定向到客户端
    */
    public function actionNew()
    {
        $email      = $this->get("email") ;
        $usercode   = $this->get("code")  ;

        $cache      = Yii::$app->cache ;
        $code       = $cache->get( $email );
        
        if( !(is_string( $email ) && $usercode === $code) ){
             return $this->renderJson( [] , 0 , 411 , "验证码错误！") ;
        }

        $token = $this->getToken( );

        // 将token保存到文件缓存中，每次有请求管理api时，就要将其弄出了进行比较,token 保存时长为2小时
        $cache -> set($token , $email , 2*60*60 );

        // 每次使用过这个验证码验证成功后就删除它
        $cache->delete( $email );

        // 管理员首页的地址
        $url = Yii::$app->params[ "adminIndexUrl" ];

        return $this->renderJson([
            'redirect' => $url."&token=".$token ,
            'token'    => $token ]);
    }

}
