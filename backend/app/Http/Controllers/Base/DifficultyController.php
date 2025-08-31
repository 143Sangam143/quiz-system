<?php

namespace App\Http\Controllers\Base;

use App\Http\Controllers\Controller;
use App\Models\Difficulty;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class DifficultyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Difficulty::with('questions')->latest()->get();
        return response()->json([
            'success' => true,
            'message' => 'Difficulties fetch success fully',
            'data' => $data

        ]);
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
        try{

            $request->validate([
                'name' => 'required|string|max:255',
                'is_active' => 'required|boolean',
            ]);

            $data = $request->all();
            $data['uri'] = getUniqueUri('App\Models\Difficulty', $data['name']);
            $data['admin_id'] = Auth::id();
            Difficulty::create($data);
            return response()->json([
            'success' => true,
                'message' => 'Difficulty created successfully',
            ], 201);

        }catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create difficulty'.$e->getMessage(),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Difficulty $difficulty)
    {
        try {
            $data = $difficulty;
            return response()->json([
                'success' => true,
                'message' => 'Difficulty fetched successfully',
                'data' => $data
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch difficulty',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Difficulty $difficulty)
    {
        try{
            $request->validate([
                'name' => 'required|string|max:255',
                'is_active' => 'required|boolean',
            ]);
            $difficulty->name = $request->name;
            $difficulty->is_active = $request->boolean('is_active');
            $difficulty->save();
            return response()->json([
                'success' => true,
                'message' => 'Difficulty updated successfully',
                'data' => $difficulty
            ]);
        }catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update difficulty',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Difficulty $difficulty)
    {
        try {
            $difficulty->delete();
            return response()->json([
                'success' => true,
                'message' => 'Difficulty deleted successfully'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete difficulty',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
