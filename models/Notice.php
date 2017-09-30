<?php

namespace csecl\models;
use Yii;

/**
 * This is the model class for table "notice".
 *
 * @property integer $id
 * @property string $title
 * @property string $content
 * @property string $author
 * @property integer $created
 * @property integer $updated
 */
class Notice extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'notice';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title', 'content', 'author', 'created', 'updated'], 'required'],
            [['content'], 'string'],
            [['created', 'updated'], 'integer'],
            [['title', 'author'], 'string', 'max' => 50],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'content' => 'Content',
            'author' => 'Author',
            'created' => 'Created',
            'updated' => 'Updated',
        ];
    }

}
