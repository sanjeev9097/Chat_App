import { Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import ChatPages from './Pages/ChatPages';

function App() {
  return (
    <div className="App">
      <Route path = '/' component = {HomePage} exact/>
      <Route path = '/chats' component = {ChatPages}/>
    </div>
  );
}

export default App;
