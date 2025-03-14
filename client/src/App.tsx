import Quiz from './components/Quiz';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Coding Quiz Application</h1>
        <p>Version 1.1 - Deployed via CI/CD Pipeline</p>
      </header>
      <Quiz />
    </div>
  );
}

export default App;
