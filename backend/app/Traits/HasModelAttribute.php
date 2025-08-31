<?php

namespace App\Traits;

trait HasModelAttribute
{
    public static function bootHasModelAttribute()
    {
        static::retrieved(function ($model) {
            if (!in_array('model', $model->appends)) {
                $model->appends[] = 'model';
            }
        });
        //Append in the $appends without overwriting the existing appends.
    }

    public function getModelAttribute(){
        return self::class;
    }
}
