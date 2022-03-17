import React from 'react';
import Quiz from './containers/Quiz/Quiz';
import Layout from './hoc/Layout/Layout';
import { Route, Routes } from 'react-router-dom'
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Auth from './containers/Auth/Auth';

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/quiz-creator" element={<QuizCreator />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/" element={<QuizList />} />
        <Route path="*" element={<h1 style={{ color: 'red', fontSize: '60', display: 'flex', justifyContent: 'center' }}>404 page not found</h1>} />
      </Routes>
    </Layout>
  )
}


export default App;
