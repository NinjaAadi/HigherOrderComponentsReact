import logo from './logo.svg';
import './App.css';
import Users from './Components/Users';
import Todos from "./Components/Todos";
function App() {
  return (
    <div className="App">
      <Users/>
      <Todos/>
    </div>
  );
}

export default App;
