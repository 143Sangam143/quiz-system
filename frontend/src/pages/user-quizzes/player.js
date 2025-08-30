import { usePlayerGame } from "../../lib/hooks/user/use-player-game";


export default function QuizPlayer() {
    
    const {quiz,
        questions,
        loading,
        formatTime,
        handleAnswer,
        handleFinish,
        handleNextQuestion,
        currentQuestionIndex,
        currentExplanation,
        timeLeft,
        score,
        answeredQuestions
    } = usePlayerGame();

    if (loading) return <p>Loading...</p>;
    if (!quiz || questions.length === 0) return <p>No quiz data</p>;

    const currentQ = questions[currentQuestionIndex];

    return (
        <div>
            <h4>{quiz.title}</h4>
            <p>Time left: {formatTime(timeLeft)}</p>
            <p>Score: {score}</p>

            <div>
                <h5>Question :- {currentQ.question_text}</h5>
                 <h5>Answers ::- </h5> 
                {currentQ.answers.map((ans) => (
                    <>
                        <button
                        key={ans.id}
                        onClick={() => handleAnswer(ans)}
                        className="block p-2 border my-1"
                        disabled={answeredQuestions[currentQuestionIndex]}
                        >
                            {ans.answer_text}
                        </button>
                        <br />
                    </>
                ))}
            </div>
            <br />
            {answeredQuestions[currentQuestionIndex] && currentExplanation && (
                <span className="block mt-2 p-2 bg-gray-100 border">
                    Explanation: {currentExplanation}
                </span>
            )}
            <br />
            {answeredQuestions[currentQuestionIndex] && currentQuestionIndex < questions.length - 1 && (
                <button
                    onClick={handleNextQuestion}
                    className="mt-4 p-2 bg-blue-500 text-white"
                >
                    Next Question
                </button>
            )}
            <br />
            <button
                onClick={handleFinish}
                className="mt-4 p-2 bg-red-500 text-white"
            >
                Finish Quiz
            </button>
        </div>
    );
}
