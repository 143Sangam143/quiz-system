<?php

namespace App\Http\Controllers\Base;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;

class GlobalController extends Controller
{
    public function updateStatus(Request $request){
        try{
            $data = $request->model::findOrFail($request->itemId);
            $fieldName = $request->fieldName;
            $data->$fieldName = $request->value;
            $data->update();
            return response()->json([
                'success' => true,
                'message' => nameDeformat($request->fieldName)." updated successfully",
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => "Failed to update ".nameDeformat($request->fieldName)." ".$e->getMessage(),
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
