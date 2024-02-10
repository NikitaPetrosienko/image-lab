// import logo from './logo.svg';
import './App.css';
import ImageUpload from './components/ImageUpload';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Добро пожаловать</h1>
        {/* Здесь добавляем компонент ImageUpload */}
        <ImageUpload />
      </header>
    </div>
  );
}

export default App;
