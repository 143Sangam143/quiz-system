<?php

namespace App\Http\Controllers\Base;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Difficulty;
use App\Models\Question;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Question::with('category','difficulty')->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Questions fetched successfully',
            'data' => $data
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::active()->get();
        $difficulties = Difficulty::active()->get();

        return response()->json([
            'success' => true,
            'message' => 'Categories and difficulties fetched successfully',
            'data' => [
                'categories' => $categories,
                'difficulties' => $difficulties,
            ]
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $request->validate([
                'question_text' => 'required|string|max:255',
                'is_active' => 'required|boolean',
                'category_id' => 'required|exists:categories,id',
                'difficulty_id' => 'required|exists:difficulties,id',
                'answer_text' => 'required|array|size:4',
                'answer_text.*.text' => 'required|string',
                'answer_text.*.is_correct' => 'required|boolean',
            ]);

            $data = $request->all();
            $data['uri'] = getUniqueUri('App\Models\Question', $data['question_text']);
            $data['admin_id'] = Auth::id();
            $question = Question::create($data);
            $question->answers()->createMany(
                collect($request->input('answer_text'))->map(fn($item) => [
                    'answer_text' => $item['text'],
                    'is_correct' => $item['is_correct'] == true ? 1 : 0,
                    'admin_id' => Auth::id(),
                ])->toArray()
            );
            return response()->json([
            'success' => true,
                'message' => 'Question created successfully',
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
                'message' => 'Failed to create question'.$e->getMessage(),
                'error' => $e->getMessage()
            ], 500);
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
    public function edit(Question $question)
    {
        try {
            $question->load('answers','category','difficulty');
            $transformedAnswers = $question->answers->map(function($answer) {
                return [
                    'text' => $answer->answer_text,
                    'is_correct' => (bool) $answer->is_correct
                ];
            })->values()->toArray();
            $categories = Category::active()->get();
            $difficulties = Difficulty::active()->get();
            return response()->json([
                'success' => true,
                'message' => 'Question fetched successfully',
                'data' => [
                    'question' => $question,
                    'categories' => $categories,
                    'difficulties' => $difficulties,
                    'answers' => $transformedAnswers
                ]
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch question',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question)
    {
        try{
            $request->validate([
                'question_text' => 'required|string|max:255',
                'is_active' => 'required|boolean',
                'category_id' => 'required|exists:categories,id',
                'difficulty_id' => 'required|exists:difficulties,id',
                'answer_text' => 'required|array|size:4',
                'answer_text.*.text' => 'required|string',
                'answer_text.*.is_correct' => 'required|boolean',
            ]);
            $question->question_text = $request->question_text;
            $question->is_active = $request->boolean('is_active');
            $question->category_id = $request->category_id;
            $question->difficulty_id = $request->difficulty_id;
            $question->save();
            $question->answers()->delete();
            $question->answers()->createMany(
                collect($request->input('answer_text'))->map(fn($item) => [
                    'answer_text' => $item['text'],
                    'is_correct' => $item['is_correct'] == true ? 1 : 0,
                    'admin_id' => Auth::id(),
                ])->toArray()
            );
            return response()->json([
                'success' => true,
                'message' => 'Question updated successfully',
                'data' => $question
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
                'message' => 'Failed to question category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        try {
            $question->answers()->delete();
            $question->delete();
            return response()->json([
                'success' => true,
                'message' => 'Question deleted successfully'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete question',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
