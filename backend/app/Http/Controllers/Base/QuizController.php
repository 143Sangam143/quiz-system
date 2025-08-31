<?php

namespace App\Http\Controllers\Base;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Category;
use App\Models\Difficulty;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Log;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $data = Quiz::with('categories','    ','questions','attempts.user')->get();
        $data = Quiz::latest()->get();

        
        return response()->json([
            'success' => true,
            'message' => 'Quizzes fetched successfully',
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
        try {
            $request->validate([
                'title' => 'required|string|max:255|unique:quizzes,title',
                'time' => 'required|integer|min:1',
                'is_active' => 'required|boolean',
                'category_id' => 'required|array|min:1',
                'category_id.*' => 'exists:categories,id',
                'difficulty_id' => 'required|exists:difficulties,id',
                'question_id' => 'required|array|min:1',
                'question_id.*' => 'exists:questions,id',
            ]);

            $data = $request->all();
            $data['uri'] = getUniqueUri('App\Models\Quiz', $request->title);
            $data['admin_id'] = Auth::id();

            $quiz = Quiz::create($data);

            // Attach categories & questions
            $quiz->categories()->sync($request->category_id);
            $quiz->questions()->sync($request->question_id);

            return response()->json([
                'success' => true,
                'message' => 'Quiz created successfully',
                'data' => $quiz->load('categories','difficulty','questions')
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create quiz: '.$e->getMessage(),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        try {
            $quiz->load('categories','difficulty','questions','attempts.user');
            return response()->json([
                'success' => true,
                'message' => 'Quiz fetched successfully',
                'data' => $quiz
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch quiz',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quiz $quiz)
    {
        try {
            Log::error($quiz);
            $quiz->load('categories','difficulty','questions');
            $categories = Category::active()->get();
            $difficulties = Difficulty::active()->get();
            $questions = Question::whereIn('category_id', $quiz->category_id ?? [])
                                ->where('difficulty_id', $quiz->difficulty_id)
                                ->get();
            return response()->json([
                'success' => true,
                'message' => 'Quiz fetched successfully for editing',
                'data' => [
                    'quiz' => $quiz,
                    'categories' => $categories,
                    'difficulties' => $difficulties,
                    'questions' => $questions
                ]
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch quiz',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quiz $quiz)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255|unique:quizzes,title,'.$quiz->id,
                'time' => 'required|integer|min:1',
                'is_active' => 'required|boolean',
                'category_ids' => 'required|array|min:1',
                'category_ids.*' => 'exists:categories,id',
                'difficulty_id' => 'required|exists:difficulties,id',
                'question_ids' => 'required|array|min:1',
                'question_ids.*' => 'exists:questions,id',
            ]);
            $quiz->title = $request->title;
            $quiz->time = $request->time;
            $quiz->difficulty_id = $request->difficulty_id;
            $quiz->is_active = $request->boolean('is_active');

            $quiz->save();

            $quiz->categories()->sync($request->category_ids);
            $quiz->questions()->sync($request->question_ids);

            return response()->json([
                'success' => true,
                'message' => 'Quiz updated successfully',
                'data' => $quiz->load('categories','difficulty','questions')
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update quiz',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        try {
            $quiz->categories()?->detach();
            $quiz->questions()->detach();
            $quiz->attempts()->delete();

            $quiz->delete();

            return response()->json([
                'success' => true,
                'message' => 'Quiz deleted successfully'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete quiz',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function filterQuestion(Request $request){
        try{
            $request->validate([
                'category_ids' => 'required|array',
                'category_ids.*' => 'exists:categories,id',
                'difficulty_id' => 'required|exists:difficulties,id'
            ]);

            $questions = Question::whereIn('category_id', $request->category_ids)
                                ->where('difficulty_id', $request->difficulty_id)
                                ->get();

            return response()->json([
                'success' => true,
                'data' => $questions
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update quiz',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getQuizData(Quiz $quiz){
        try{
            return response()->json([
                'success' => true,
                'data' => $quiz
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch quiz question',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function getQuestions(Quiz $quiz){
        try{
            $questions = $quiz->questions()?->active()->with('answers')->paginate(5);
            return response()->json([
                'success' => true,
                'data' => $questions
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch quiz question',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function quizSave(Request $request){
        try{
            $quizId = $request->quizId;
            $score = $request->score;
            $userId = $request->userId;
            $started_at = $request->started_at;
            $completed_at = $request->completed_at;
            QuizAttempt::create([
                'quiz_id' => $quizId,
                'user_id' => $userId,
                'score' => $score,
                'started_at' => $started_at,
                'finished_at' => $completed_at
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Quiz result saved successfully',
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save quiz result',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getResultHistory($id){
        try{
            $user =   Admin::findOrFail($id);
            $attempts = QuizAttempt::where('user_id',$user->id)->with('quiz')->get();
            return response()->json([
                'success' => true,
                'message' => 'Result fetch successfully',
                'attempts' => $attempts
            ]);

        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save quiz result',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
