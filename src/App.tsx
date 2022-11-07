import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import CreateAccount from './Pages/CreateAccount';
import UserPage from './Pages/UserPage';
import MyTask from './Pages/MyTask';
import OneTask from './Pages/OneTask';
import DoneTasks from './Pages/DoneTasks';
import Comments from './Pages/Comments';
import AllTasks from './Pages/AllTasks';
import ForgotPassword from './Pages/ForgotPassword';
import CreateTask from './Pages/CreateTask';
import Error404 from './Pages/Error404';

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Link to="/"></Link>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/mytask" element={<MyTask />} />
            <Route path="/oneTask" element={<OneTask />} />
            <Route path="/doneTasks" element={<DoneTasks />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/allTasks" element={<AllTasks />} />
            <Route path="/resetPassword" element={<ForgotPassword />} />
            <Route path="/createTask" element={<CreateTask />} />
            <Route path="/404" element={<Error404 />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
