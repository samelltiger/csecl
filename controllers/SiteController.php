<?php 
namespace csecl\controllers;

use csecl\controllers\common\BaseController;


class SiteController extends BaseController{

    public $modelClass = 'csecl\models\test';

    public function actionTest(){
        return $this->renderJson(['说明'=>"这是普通用户报名模块！"]);
    }
}