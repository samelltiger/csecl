<?php
namespace csecl\controllers;
use csecl\models\Application;
use csecl\models\Question;
use yii\helpers\ArrayHelper;
use csecl\controllers\common\BaseController;
use Yii;
class ApplicationController extends BaseController
{
    public $modelClass = 'csecl\models\Application';

    public function actions(){
        $actions = parent::actions();
        unset($actions['delete'], $actions['create'],$actions['updata']);
        return $actions;
    }

    //需不需要返回 总共有多少页

    //展示所有报名表  
    public function actionShow($page = 1){
    	//一页展示的数  $limit  
        $page = $page - 1;
        $limit = 5;
        $offset = $limit * $page;
        $count=Application::find()->count();
        if($count<5) $offset = 0;
        $i=0;
        $personers = (new \yii\db\Query())
                ->from('application')
                ->limit($limit)
                ->orderBy('id')
                ->offset($offset)
                ->all();
        if(!$personers)  return $this->renderJson([] , 0 , 404 , "资源不存在");
        foreach ($personers as $personer) {
            $question = Question::findOne(['appid'=>$personer['id']]);
            $question = ArrayHelper::toArray($question, ['frontend\models\Question' => ['answer1','answer2','answer3','answer4','answer5','answer6'],]);
            $personers[$i] = ArrayHelper::merge($personers[$i],$question);
            $i++;
        }
        return $this->renderJson($personers , 1 , 200 , []);
    }

    //展示单个报名表 by id
    public function actionGet($id){
    	$personer = Application::findOne(['id'=>$id]);
        if(!$personer)  return $this->renderJson([] , 0 , 404 , "资源不存在");
        $personer = ArrayHelper::toArray($personer, ['frontend\models\Application' => [],]);
        $question = Question::findOne(['appid'=>$personer['id']]);
        $question = ArrayHelper::toArray($question, ['frontend\models\Question' => ['answer1','answer2','answer3','answer4','answer5','answer6'],]);
        $personer = ArrayHelper::merge($personer,$question);
        return $this->renderJson($personer , 1 , 200 , []);
	}

    // //展示单个报名表 by id
    // public function actionGet($id){
    //     $personer = Application::findOne(['id'=>$id]);
    //     if(!$personer)  return $this->renderJson([] , 0 , 404 , "资源不存在");
    //     $personer = ArrayHelper::toArray($personer, ['frontend\models\Application' => [],]);
    //     $question = Question::findOne(['appid'=>$personer['id']]);
    //     $question = ArrayHelper::toArray($question, ['frontend\models\Question' => ['answer1','answer2','answer3','answer4','answer5','answer6'],]);
    //     $personer = ArrayHelper::merge($personer,$question);
    //     return $this->renderJson($personer , 1 , 200 , []);
    // }

    //修改报名数据 报名->见习
    public function actionUpda(){
        $data = Yii::$app->request->post();
        $model = Application::findOne(['id'=>$data['id']]);
        if(!$model) return $this->renderJson([],0,404,'资源不存在修改失败！');
        $model->setAttributes($data);
        if(!$model->save()) return $this->renderJson([],0,201,'修改失败！');
        return $this->renderJson([],1,200,'修改成功！');
    }

    //展示报名表简要信息
	public function actionSimple($page = 1){
        //一页展示的数  $limit 
        $page = $page - 1;
        $limit = 5;
        $offset = $limit * $page;
        $count=Application::find()->count();
        if($count<5) $offset = 0;
        $personers = (new \yii\db\Query())
                ->select(['id','name','number','direct','grade'])
                ->from('application')
                ->limit($limit)
                ->orderBy('id')
                ->offset($offset)
                ->all();
        if(!$personers)  return $this->renderJson([] , 0 , 404 , "资源不存在");
        return $this->renderJson($personers , 1 , 200 , []);
	}

    //填写报名
    public function actionCreateapp(){
        $data = Yii::$app->request->post();
        $model = new Application();
        $model->setAttributes($data['application']);
        $model->created = time();
        $model->updated = time();
        if(!$model->save())  return $this->renderJson([] , 0 , 200 , "提交失败！");
        $question = new Question();
        $question->setAttributes($data['question']);
        $question->appid = $model->id;
        $question->created = time();
        $question->updated = time();
        $question->save();
        return $this->renderJson([] , 1 , 200 , "提交成功！");
    }

    //检查是否已提交过申请表
    public function actionChk(){
       $number = Yii::$app->request->post();
       $status = Application::find()->where(['number'=>$number])->Count();
       if($status) return $this->renderJson([] , 0 , 201 , "请勿重复提交");
       return $this->renderJson([] , 0 , 200, "学号未进行过提交"); 
    }

}