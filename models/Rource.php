<?php

namespace csecl\models;

use Yii;

/**
 * This is the model class for table "rource".
 *
 * @property integer $id
 * @property string $title
 * @property string $url
 * @property string $desc
 * @property string $author
 * @property integer $type
 * @property integer $created
 * @property integer $updated
 */
class Rource extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'rource';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title', 'url', 'author', 'created', 'updated','type'], 'required'],
            [['created', 'updated','type'], 'integer'],
            [['title', 'author'], 'string', 'max' => 50],
            [['url'], 'string', 'max' => 500],
            [['desc'], 'string', 'max' => 1000],
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
            'url' => 'Url',
            'desc' => 'Desc',
            'author' => 'Author',
            'type' => 'Type',
            'created' => 'Created',
            'updated' => 'Updated',
        ];
    }
}
