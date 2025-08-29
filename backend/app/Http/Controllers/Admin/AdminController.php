<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentUserRoleHierarchy = getCurrentUserRoleHierarchy();
        $data = Admin::where(['parent_id' => getCurrentUserId()])->where('id','!=','1')->get();
        return view('admin.manage-admins.index', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $currentUserRoleHierarchy = getCurrentUserRoleHierarchy();
        $roleData = Role::where('hierarchy', '>', $currentUserRoleHierarchy)
            ->where('admin_id', getCurrentUserId())
            ->where('id', '!=', '1')
            ->get();
        return view('admin.manage-admins.create',compact('roleData'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:admins,email',
                'pin'   => 'required|numeric',
                'phone' => 'required',
                'password' => 'required|min:6',
                'role' => 'required|exists:roles,id'
            ]);

            $data = $request->all();
            $data['parent_id'] = getCurrentUserId();
            $admin = Admin::create($data);
            $role = Role::findOrFail($request->role);
            $admin->assignRole($role);
            return redirect()->route('manage-admins.index')->with([
                'success' => true,
                'message' => 'Admin created successfully'
            ]);
        } catch(ValidationException $e){
            return redirect()->back()->withInput()->with([
                'error' => true,
                'message' => $e->validator->errors()->all()
            ]);
        } catch (Exception $e) {
            Log::error('Error creating admin: ' . $e->getMessage());
            return redirect()->back()->withInput()->with([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try{
            $data = Admin::find($id);
            if(! getCurrentUserId() == $data->parent_id){
                throw new Exception("You don't have right to access this data");
            }
            if(compareRolesHierarchyWithAdminsById($id)){
    
                $data = Admin::find($id);
                $currentUserRoleHierarchy = getCurrentUserRoleHierarchy();
                $roleData = Role::where('hierarchy', '>', $currentUserRoleHierarchy)
                            ->where('admin_id', getCurrentUserId())
                            ->where('id', '!=', '1')
                            ->get();
                return view('admin.manage-admins.edit',compact('data','roleData'));
            }
            else{
                return redirect()->route('manage-admins.index')->with([
                    'warning' => true,
                    'message' => 'Further violations may result in a ban.'
                ]);
            }
        }catch(Exception $e){
            Log::error('Erro in admin edit : ' . $e->getMessage());
            return redirect()->back()->withInput()->with([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:admins,email,' . $id,
                'pin'   => 'required|numeric',
                'phone' => 'required',
                'password' => 'nullable|min:6',
                'role' => 'required|exists:roles,id'
            ]);
            $data = Admin::find($id);
            if(!$data){
                redirect()->back()->with([
                    'error' => true,
                    'message' => 'Admin not found'
                ]);
            }
            $data->password = Hash::make($request->password);
            $data->name = $request->name;
            $data->email = $request->email;
            $data->pin = $request->pin;
            $data->phone = $request->phone;
            $data->update();
            $data->roles()->detach();
            $role = Role::findOrFail($request->role);
            $data->assignRole($role);
            return redirect()->route('manage-admins.index')->with([
                'success' => true,
                'message' => 'Admin updated successfully'
            ]);
        } catch(ValidationException $e){
            return redirect()->back()->withInput()->with([
                'error' => true,
                'message' => $e->validator->errors()->all()
            ]);
        } catch (Exception $e) {
            Log::error('Error updating admin: ' . $e->getMessage());
            return redirect()->back()->withInput()->with([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $admin = Admin::find($id);
            $admin->roles()->detach();
            $admin->delete();
            return redirect()->back()->with([
                'success' => true,
                'message' => 'Admin removed success fully'
            ]);
        } catch (Exception $e) {
            Log::error('Error deleting admin: ' . $e->getMessage());
            throw $e;
        }
    }
}
