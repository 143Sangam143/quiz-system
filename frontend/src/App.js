import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from "./components/PrivateRoute";


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// import './App.css';

import Login from "./pages/Login";
import Home from './pages/Home';
import Layout from "./components/Layout";
import CategoryIndex from "./pages/categories/index";
import CategoryCreate from './pages/categories/create';
import CategoryEdit from './pages/categories/edit';
import DifficultyIndex from "./pages/difficulties/index";
import DifficultyCreate from './pages/difficulties/create';
import DifficultyEdit from './pages/difficulties/edit';
import QuestionIndex from "./pages/questions/index";
import QuestionCreate from './pages/questions/create';
import QuestionEdit from './pages/questions/edit';
import AnswerIndex from "./pages/answers/index";
import QuizIndex from "./pages/quizzes/index";
import QuizCreate from './pages/quizzes/create';
import QuizEdit from './pages/quizzes/edit';

function App() {
  return (
    <AuthProvider>
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      > */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Home />
            } />
            <Route path="/login" element={
              <Login switchToRegister={() => {}} />
            } />

            <Route path="/dashboard" element={
              <PrivateRoute>
                <Layout>
                </Layout>
              </PrivateRoute>
            } />
            {/****************************** Categories Routes Starts *******************/}
              <Route path="/categories" element={
                <PrivateRoute>
                  <Layout>
                    <CategoryIndex />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/categories/create" element={
                <PrivateRoute>
                  <Layout>
                    <CategoryCreate />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/categories/edit/:uri" element={
                <PrivateRoute>
                  <Layout>
                    <CategoryEdit />
                  </Layout>
                </PrivateRoute>
              } />
            {/****************************** Categories Routes Ends *******************/}
            {/****************************** Difficulties Routes Starts *******************/}
              <Route path="/difficulties" element={
                <PrivateRoute>
                  <Layout>
                    <DifficultyIndex />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/difficulties/create" element={
                <PrivateRoute>
                  <Layout>
                    <DifficultyCreate />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/difficulties/edit/:uri" element={
                <PrivateRoute>
                  <Layout>
                    <DifficultyEdit />
                  </Layout>
                </PrivateRoute>
              } />
            {/****************************** Difficulties Routes Ends *******************/}
            {/****************************** Questions Routes Starts *******************/}
              <Route path="/questions" element={
                <PrivateRoute>
                  <Layout>
                    <QuestionIndex />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/questions/create" element={
                <PrivateRoute>
                  <Layout>
                    <QuestionCreate />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/questions/edit/:uri" element={
                <PrivateRoute>
                  <Layout>
                    <QuestionEdit />
                  </Layout>
                </PrivateRoute>
              } />
            {/****************************** Questions Routes Ends *******************/}
            {/****************************** Answers Routes Starts *******************/}
              <Route path="/answers/:uri" element={
                <PrivateRoute>
                  <Layout>
                    <AnswerIndex />
                  </Layout>
                </PrivateRoute>
              } />
            {/****************************** answers Routes Ends *******************/}
            {/****************************** Quizzes Routes Starts *******************/}
              <Route path="/quizzes" element={
                <PrivateRoute>
                  <Layout>
                    <QuizIndex />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/quizzes/create" element={
                <PrivateRoute>
                  <Layout>
                    <QuizCreate />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/quizzes/edit/:uri" element={
                <PrivateRoute>
                  <Layout>
                    <QuizEdit />
                  </Layout>
                </PrivateRoute>
              } />
            {/****************************** Quizzes Routes Ends *******************/}
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
