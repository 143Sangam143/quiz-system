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

import QuizListUser from "./pages/user-quizzes/index";
import QuizPlayer from "./pages/user-quizzes/player";
import History from './pages/user-quizzes/history';
import Register from './pages/Register';

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
              <Login />
            } />
            <Route path="/register" element={
              <Register />
            } />

            <Route path="/dashboard" element={
              <PrivateRoute allowedRoles={['user','admin']}>
                <Layout>
                </Layout>
              </PrivateRoute>
            } />
            {/************************ User Route Starts ****************************/}
              <Route path="/quiz-list" element={
                <PrivateRoute allowedRoles={['user']}>
                  <Layout>
                    <QuizListUser />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/quiz-play/:uri" element={
                <PrivateRoute allowedRoles={['user']}>
                  <Layout>
                    <QuizPlayer />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/history/:id" element={
                <PrivateRoute allowedRoles={['user']}>
                  <Layout>
                    <History />
                  </Layout>
                </PrivateRoute>
              } />
            {/************************ User Route Ends ****************************/}

            {/******************* Mostly Admin Specific Route ****************************/}
            {/****************************** Categories Routes Starts *******************/}
              <Route path="/categories" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout>
                    <CategoryIndex />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/categories/create" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout>
                    <CategoryCreate />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/categories/edit/:uri" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout>
                    <CategoryEdit />
                  </Layout>
                </PrivateRoute>
              } />
            {/****************************** Categories Routes Ends *******************/}
            {/****************************** Difficulties Routes Starts *******************/}
              <Route path="/difficulties" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout>
                    <DifficultyIndex />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/difficulties/create" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout>
                    <DifficultyCreate />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/difficulties/edit/:uri" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout>
                    <DifficultyEdit />
                  </Layout>
                </PrivateRoute>
              } />
            {/****************************** Difficulties Routes Ends *******************/}
            {/****************************** Questions Routes Starts *******************/}
              <Route path="/questions" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout>
                    <QuestionIndex />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/questions/create" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout>
                    <QuestionCreate />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/questions/edit/:uri" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout>
                    <QuestionEdit />
                  </Layout>
                </PrivateRoute>
              } />
            {/****************************** Questions Routes Ends *******************/}
            {/****************************** Answers Routes Starts *******************/}
              <Route path="/answers/:uri" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout>
                    <AnswerIndex />
                  </Layout>
                </PrivateRoute>
              } />
            {/****************************** answers Routes Ends *******************/}
            {/****************************** Quizzes Routes Starts *******************/}
              <Route path="/quizzes" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout>
                    <QuizIndex />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/quizzes/create" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout>
                    <QuizCreate />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/quizzes/edit/:uri" element={
                <PrivateRoute allowedRoles={['admin']}>
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
