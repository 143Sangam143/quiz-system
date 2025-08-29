import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

const authApi = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

const apiService = {
    login: async (credentials) => {
        try {
            const res = await authApi.post("/login", credentials);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("role", res.data.role);
            return res.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    register: async (data) => {
        try {
            const res = await authApi.post("/register", data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("role", res.data.role);
            return res.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    logout: async () => {
        try {
            await api.post("/logout");
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    },

    /****************************Category Services Starts ************************/

    async getCategories() {
        const response = await api.get('/categories');
        return response.data;
    },

    async createCategory(data) {
        const response = await api.post('/categories', data);
        return response.data;
    },

    async updateCategory(uri, data) {
        const response = await api.put(`/categories/${uri}`, data);
        return response.data;
    },

    async deleteCategory(uri) {
        const response = await api.delete(`/categories/${uri}`);
        return response.data;
    },

    async getCategoryByUri(uri) {
        const response = await api.get(`/categories/${uri}/edit`);
        return response.data;
    },

    /****************************Category Services Ends ************************/

    /****************************Difficulty Services Starts ************************/

    async getDifficulties() {
        const response = await api.get('/difficulties');
        return response.data;
    },

    async createDifficulty(data) {
        const response = await api.post('/difficulties', data);
        return response.data;
    },

    async updateDifficulty(uri, data) {
        const response = await api.put(`/difficulties/${uri}`, data);
        return response.data;
    },

    async deleteDifficulty(uri) {
        const response = await api.delete(`/difficulties/${uri}`);
        return response.data;
    },

    async getDifficultyByUri(uri) {
        const response = await api.get(`/difficulties/${uri}/edit`);
        return response.data;
    },

    /****************************Difficulty Services Ends ************************/

    /****************************Questions Services Starts ************************/

    async getQuestions() {
        const response = await api.get('/questions');
        return response.data;
    },

    async createQuestion(data) {
        const response = await api.post('/questions', data);
        return response.data;
    },

    async getAdditionalData() {
        const response = await api.get('/questions/create');
        return response.data;
    },

    async updateQuestion(uri, data) {
        const response = await api.put(`/questions/${uri}`, data);
        return response.data;
    },

    async deleteQuestion(uri) {
        const response = await api.delete(`/questions/${uri}`);
        return response.data;
    },

    async getQuestionByUri(uri) {
        const response = await api.get(`/questions/${uri}/edit`);
        return response.data;
    },

    /****************************Questions Services Ends ************************/
    /****************************Answers Servicess Starts ************************/

    async getAnswersByQuestionUri(uri) {
        const response = await api.get(`/answers/${uri}`);
        return response.data;
    },
    /****************************Answers Services Ends ************************/

    /****************************Quizzes Services Starts ************************/

    async getQuizzes() {
        const response = await api.get('/quizzes');
        return response.data;
    },

    async createQuiz(data) {
        const response = await api.post('/quizzes', data);
        return response.data;
    },

    async updateQuiz(uri, data) {
        const response = await api.put(`/quizzes/${uri}`, data);
        return response.data;
    },

    async deleteQuiz(uri) {
        const response = await api.delete(`/quizzes/${uri}`);
        return response.data;
    },

    async getQuizByUri(uri) {
        const response = await api.get(`/quizzes/${uri}/edit`);
        return response.data;
    },

    async getAdditionalQuizData() {
        const response = await api.get('/quizzes/create');
        return response.data;
    },

    async getQuestionByCategoryDifficulty(data){
        const  response = await api.post('/questions/filter',data);
        return response.data;
    },

    async getQuizDataByUri(uri) {
        const response = await api.get(`/quiz-data/${uri}`);
        return response.data;
    },

    async getQuizQuestionByUri(uri){
        const response = await api.get(`/quiz-questions/${uri}` );
        return response.data
    },

    async saveQuizAttempt(data){
        const response = await api.post('/save-quiz-attempt',data);
        return response.data;
    },
    /****************************Quizzes Services Ends ************************/
    async getUserHistory(id){
        const response = await api.get(`/result-history/${id}`);
        return response.data;
    }
};

export default apiService;