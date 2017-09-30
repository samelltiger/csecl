<?php

namespace csecl\models;

use Yii;

/**
 * This is the model class for table "question".
 *
 * @property integer $id
 * @property integer $appid
 * @property string $answer1
 * @property string $answer2
 * @property string $answer3
 * @property string $answer4
 * @property string $answer5
 * @property string $answer6
 * @property integer $updated
 * @property integer $created
 */
class Question extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'question';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['appid', 'answer1', 'answer2', 'answer3', 'answer4', 'answer5', 'answer6', 'updated', 'created'], 'required'],
            [['appid', 'updated', 'created'], 'integer'],
            [['answer1', 'answer2', 'answer3', 'answer4', 'answer5', 'answer6'], 'string', 'max' => 1000],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'appid' => 'Appid',
            'answer1' => 'Answer1',
            'answer2' => 'Answer2',
            'answer3' => 'Answer3',
            'answer4' => 'Answer4',
            'answer5' => 'Answer5',
            'answer6' => 'Answer6',
            'updated' => 'Updated',
            'created' => 'Created',
        ];
    }
}
