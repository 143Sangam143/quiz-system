import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../../../api/service";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

export function usePlayerGame(){
    const { user } = useAuth();
    const { uri } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(false);

    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [finished, setFinished] = useState(false);

    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [currentExplanation, setCurrentExplanation] = useState("");
    const [startedAt, setStartedAt] = useState();


    const fetchQuiz = async () => {
        try {
            setLoading(true);
            const res = await apiService.getQuizDataByUri(uri);
            if (res.success) {
                setQuiz(res.data);
                setTimeLeft(res.data.time * 60);
                toast.success("Quiz fetched successfully");
            } else {
                toast.error("Something went wrong fetching quiz");
            }
        } catch (error) {
            console.error("Error fetching quiz", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchQuestions = async () => {
        try {
        setLoading(true);
        const res = await apiService.getQuizQuestionByUri(uri);
        if (res.success) {
            setQuestions(res.data.data);
            setAnsweredQuestions(Array(res.data.data.length).fill(false));
            toast.success("Successfully fetched questions");
        } else {
            toast.error("Something went wrong fetching questions");
        }
        } catch (error) {
            console.error("Error fetching quiz question", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, []);

    useEffect(() => {
        if (quiz) {
            fetchQuestions();
            setStartedAt(new Date());
        }
    }, [quiz]);

    useEffect(() => {
        if (!timeLeft || finished) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleFinish();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, finished]);

    const handleAnswer = (answer) => {
        if (answeredQuestions[currentQuestionIndex]) return;

        const updatedAnswered = [...answeredQuestions];
        updatedAnswered[currentQuestionIndex] = true;
        setAnsweredQuestions(updatedAnswered);

        if (answer.is_correct) {
            setScore((prev) => prev + 1);
        }

        const currentQ = questions[currentQuestionIndex];
        if (currentQ.answer_explanation) {
            toast.info(currentQ.answer_explanation);
        }

        if (currentQ.answer_explanation) {
            toast.info(currentQ.answer_explanation);
        }

        setCurrentExplanation(currentQ.answer_explanation || "");
    };

    const handleNextQuestion = () => {
        setCurrentExplanation("");
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            handleFinish();
        }
    };

    const handleFinish = async () => {
        setFinished(true);
        try {
            const data = {
                quizId: quiz.id,
                score,
                userId: user.id,
                started_at: startedAt.toISOString(),
                completed_at: new Date(),
            };
            await apiService.saveQuizAttempt(data);
            toast.success("Quiz finished! Your score is ::- " + score);
            navigate(`/history/${user.id}`);
        } catch (error) {
            console.error("Error saving attempt", error);
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    return {
        quiz,
        questions,
        loading,
        formatTime,
        currentExplanation,
        handleAnswer,
        handleFinish,
        handleNextQuestion,
        currentQuestionIndex,
        timeLeft,
        score,
        answeredQuestions
    }
}