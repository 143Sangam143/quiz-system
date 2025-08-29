<?php

use App\Models\Admin;

function getCurrentUserRoleHierarchy()
{
    return Auth::guard('admin')->user()?->roles()->first()?->hierarchy;
}

function getAdminRoleDisplayName($id) {
    $admin = Admin::find($id);
    $role = $admin->roles->first();
    if (!$role) {
        return null;
    }
    return $role->display_name;
}

function getAdminRole($id) {
    $admin = Admin::find($id);
    $role = $admin->roles->first();
    if (!$role) {
        return null;
    }
    return nameDeformat($role->name);
}

function compareRolesHierarchyWithAdminsById($id){
    $currentUserRoleHierarchy = getCurrentUserRoleHierarchy();
    $data = Admin::where('id', $id)->first();
    $dataRole = $data && $data->roles->first();
    $dataRoleHierarchy = null;
    if($dataRole){
        $dataRoleHierarchy = Admin::where('id', $id)->first()->roles->first()->hierarchy;
    }
    if($dataRoleHierarchy == null || $currentUserRoleHierarchy < $dataRoleHierarchy){
        return true;
    }
    else{
        return false;
    }
}