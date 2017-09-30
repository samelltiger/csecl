<?php
namespace csecl\controllers;
use yii\helpers\ArrayHelper;
use csecl\models\Rource;
use csecl\controllers\common\BaseController;
use Yii;

class RourceController extends BaseController
{
    public $modelClass = 'csecl\models\Rource';
    
    //新增资源
    public function actionAdd(){
   		$data = Yii::$app->request->post();
        $model = new Rource();
       	$model->setAttributes($data);
       	$model->created = time();
       	$model->updated = time();
       	if(!$model->save()) return $this->renderJson([],0,200,'插入失败！');
       	return $this->renderJson([],1,200,'插入成功！');
	}

	//展示单个资源
    public function actionGet($id){
    	$data = Rource::findOne(['id'=>$id]);
        if(!$data)  return $this->renderJson([] , 0 , 404 , "资源不存在");
        return $this->renderJson($data,1,200,[]);
    }

   	//展示资源 by type
    public function actionGetrou($type){
    	$data = Rource::find()->where(['type'=>$type])->All();
        if(!$data)  return $this->renderJson([] , 0 , 404 , "资源不存在");
        return $this->renderJson($data,1,200,[]);
    }

    //展示资源简要信息 id type title author created 
	public function actionSimple($page = 1){
        //一页展示的数  $limit 
        $page = $page - 1;
        $limit = 5;
        $offset = $limit * $page;
        $count=Rource::find()->count();
        if($count<5) $offset = 0;
        $data = (new \yii\db\Query())
                ->select(['id','title','author','created','type'])
                ->from('rource')
                ->limit($limit)
                ->orderBy('id')
                ->offset($offset)
                ->all();
        if(!$data)  return $this->renderJson([] , 0 , 404 , "资源不存在");
        return $this->renderJson($data , 1 , 200 , []);
	}

	//修改资源
	public function actionUpda(){
		$data = Yii::$app->request->post();
		$model = Rource::findOne(['id'=>$data['id']]);
		if(!$model) return $this->renderJson([],0,200,'资源不存在修改失败！');
		$model->setAttributes($data);
		if(!$model->save()) return $this->renderJson([],0,200,'修改失败！');
		return $this->renderJson([],1,200,'修改成功！');
	}

	//删除资源
	public function actionDele(){
		$data = Yii::$app->request->post();
		$model = Rource::findOne(['id'=>$data['id']]);
		if(!$model) return $this->renderJson([],0,200,'资源不存在删除失败！');
		if(!$model->delete()) return $this->renderJson([],0,200,'删除失败！');
		return $this->renderJson([],1,200,'删除成功！');
	}

    
}
