import './App.css';
import MyNotes from './components/MyNotes'
import Login from './components/Login'
import SignUp from './components/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';




function App() {

  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path='/myNotes' element={<MyNotes />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signUp' element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
