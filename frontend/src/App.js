import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from "./components/PrivateRoute";


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home';
import Layout from "./components/AdminLayout";
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                <Layout >
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            } />
            {/************************ User Route Starts ****************************/}
              <Route path="/quiz-list" element={
                <PrivateRoute allowedRoles={['user']}>
                  <Layout pageTitle="Quiz List">
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
                  <Layout pageTitle='Result History'>
                    <History />
                  </Layout>
                </PrivateRoute>
              } />
            {/************************ User Route Ends ****************************/}

            {/******************* Mostly Admin Specific Route ****************************/}
            {/****************************** Categories Routes Starts *******************/}
              <Route path="/categories" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout pageTitle="Categories List" actionLabel="Add" actionLink="/categories/create">
                    <CategoryIndex />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/categories/create" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout pageTitle="Add Category" backLabel="Back" backLink="/categories">
                    <CategoryCreate />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/categories/edit/:uri" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout pageTitle="Edit Category" backLabel="Back" backLink="/categories">
                    <CategoryEdit />
                  </Layout>
                </PrivateRoute>
              } />
            {/****************************** Categories Routes Ends *******************/}
            {/****************************** Difficulties Routes Starts *******************/}
              <Route path="/difficulties" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout pageTitle="Difficulties List" actionLabel="Add" actionLink="/difficulties/create">
                    <DifficultyIndex />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/difficulties/create" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout pageTitle="Add Difficulty" backLabel="Back" backLink="/difficulties">
                    <DifficultyCreate />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/difficulties/edit/:uri" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout pageTitle="Edit Difficulty" backLabel="Back" backLink="/difficulties">
                    <DifficultyEdit />
                  </Layout>
                </PrivateRoute>
              } />
            {/****************************** Difficulties Routes Ends *******************/}
            {/****************************** Questions Routes Starts *******************/}
              <Route path="/questions" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout pageTitle="Questions List" actionLabel="Add" actionLink="/questions/create">
                    <QuestionIndex />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/questions/create" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout pageTitle="Add Question" backLabel="Back" backLink="/questions">
                    <QuestionCreate />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/questions/edit/:uri" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout pageTitle="Edit Question" backLabel="Back" backLink="/questions">
                    <QuestionEdit />
                  </Layout>
                </PrivateRoute>
              } />
            {/****************************** Questions Routes Ends *******************/}
            {/****************************** Answers Routes Starts *******************/}
              <Route path="/answers/:uri" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout pageTitle="Answers List" backLabel="Back" backLink="/questions">
                    <AnswerIndex />
                  </Layout>
                </PrivateRoute>
              } />
            {/****************************** answers Routes Ends *******************/}
            {/****************************** Quizzes Routes Starts *******************/}
              <Route path="/quizzes" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout pageTitle="Quizzes List" actionLabel="Add" actionLink="/quizzes/create">
                    <QuizIndex />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/quizzes/create" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout pageTitle="Add Quiz" backLabel="Back" backLink="/quizzes">
                    <QuizCreate />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/quizzes/edit/:uri" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Layout pageTitle="Edit Quiz" backLabel="Back" backLink="/quizzes">
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
