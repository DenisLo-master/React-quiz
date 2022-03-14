import React from 'react';
import Quiz from './containers/Quiz/Quiz';
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Quiz></Quiz>
      </Layout>
    </div>
  );
}

export default App;
