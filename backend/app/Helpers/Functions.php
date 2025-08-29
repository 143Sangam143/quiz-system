<?php

function getCurrentUserId(){
    return Auth::guard('admin')->user()->id;
}

function getCurrentUser(){
    return Auth::guard('admin')->user();
}

function nameFormat($roleName){
    // Eg: Super admin = super_admin
    $role = strtolower($roleName);
    $data = str_replace(' ','_',$role);
    return $data;
}

function nameDeformat($roleName){
    // Eg: super_admin = Super Admin
    $role = str_replace('_', ' ', $roleName);
    // Capitalize the first letter of each word
    $data = ucwords($role);
    return $data;
}

function getUniqueUri($model, $data){
    $uri = Str::slug($data);
    $uniqueUri = $uri;
    $count = 1;
    while ($model::where('uri', $uniqueUri)->exists()) {
        $uniqueUri = $uri . '-' . $count;
        $count++;
    }
    return $uniqueUri;
}