<?php

namespace csecl\modules\v1\controllers;

use csecl\modules\v1\controllers\common\BaseController;

use Yii;
use yii\web\Cookie;

class GoodsController extends BaseController
{
    public $modelClass = 'csecl\models\Goods';

    /**
     * @inheritdoc
     */
     public function actions()
     {
         return [
             'index' => [
                 'class' => 'csecl\modules\actions\IndexAction',
                 'modelClass' => $this->modelClass,
                 'checkAccess' => [$this, 'checkAccess'],
             ],
             'view' => [
                 'class' => 'yii\rest\ViewAction',
                 'modelClass' => $this->modelClass,
                 'checkAccess' => [$this, 'checkAccess'],
             ],
             'create' => [
                 'class' => 'yii\rest\CreateAction',
                 'modelClass' => $this->modelClass,
                 'checkAccess' => [$this, 'checkAccess'],
                 'scenario' => $this->createScenario,
             ],
             'update' => [
                 'class' => 'yii\rest\UpdateAction',
                 'modelClass' => $this->modelClass,
                 'checkAccess' => [$this, 'checkAccess'],
                 'scenario' => $this->updateScenario,
             ],
             'delete' => [
                 'class' => 'yii\rest\DeleteAction',
                 'modelClass' => $this->modelClass,
                 'checkAccess' => [$this, 'checkAccess'],
             ],
             'options' => [
                 'class' => 'yii\rest\OptionsAction',
             ],
         ];
     }

    public function actionTest()
    {
        return $this->renderJson([ 
            "说明"         => "这是管理员模块！" ,
            ]);
    }

}
