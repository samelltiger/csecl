<?php
namespace csecl\controllers;
use csecl\models\Notice;
use yii\helpers\ArrayHelper;
use csecl\controllers\common\BaseController;
use Yii;

class NoticeController extends BaseController
{
    public $modelClass = 'csecl\models\Notice';

    //展示公告 
    public function actionShow($page=1)
    {
    	//一页展示的数  $limit  
        $page = $page - 1;
        $limit = 5;
        $offset = $limit * $page;
        $count=Notice::find()->count();
        if($count<5) $offset = 0;
        $i=0;
        $data = (new \yii\db\Query())
                ->from('notice')
                ->limit($limit)
                ->orderBy('id')
                ->offset($offset)
                ->all();
        if(!$data) return $this->renderJson([],0,200,'资源不存在！');
        return $this->renderJson($data,1,200,[]);
    }

    //展示单个公告
    public function actionGet($id){
    	$data = Notice::findOne(['id'=>$id]);
        if(!$data)  return $this->renderJson([] , 0 , 404 , "资源不存在");
        return $this->renderJson($data,1,200,[]);
    }

    //展示公告简要信息 title author created
	public function actionSimple($page = 1){
        //一页展示的数  $limit 
        $page = $page - 1;
        $limit = 5;
        $offset = $limit * $page;
        $count=Notice::find()->count();
        if($count<5) $offset = 0;
        $data = (new \yii\db\Query())
                ->select(['title','author','created'])
                ->from('notice')
                ->limit($limit)
                ->orderBy('id')
                ->offset($offset)
                ->all();
        if(!$data)  return $this->renderJson([] , 0 , 404 , "资源不存在");
        return $this->renderJson($data , 1 , 200 , []);
	}

    //新增公告
    public function actionAdd(){
    	$data = Yii::$app->request->post();
        $model = new Notice();
       	$model->setAttributes($data);
       	$model->created = time();
       	$model->updated = time();
       	if(!$model->save()) return $this->renderJson([],0,200,'插入失败！');
       	return $this->renderJson([],1,200,'插入成功！');
	}

	//修改公告
	public function actionUpda(){
		$data = Yii::$app->request->post();
		$model = Notice::findOne(['id'=>$data['id']]);
		if(!$model) return $this->renderJson([],0,200,'资源不存在修改失败！');
		$model->setAttributes($data);
		if(!$model->save()) return $this->renderJson([],0,200,'修改失败！');
		return $this->renderJson([],1,200,'修改成功！');
	}

	//删除公告
	public function actionDele(){
		$data = Yii::$app->request->post();
		$model = Notice::findOne(['id'=>$data['id']]);
		if(!$model) return $this->renderJson([],0,200,'资源不存在删除失败！');
		if(!$model->delete()) return $this->renderJson([],0,200,'删除失败！');
		return $this->renderJson([],1,200,'删除成功！');
	}

}
