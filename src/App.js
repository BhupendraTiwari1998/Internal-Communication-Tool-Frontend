import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Appbar from './components/Appbar';
// import { CustomRoute } from './components/CustomRoute';
import AddNewPost from './components/pages/AddNewPost';
import ViewSinglePost from './components/pages/ViewSinglePost'
import AllPost from './components/pages/AllPost';
import EditPost from './components/pages/EditPost';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AdminDashboard from './components/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">

      <Router>
        <Appbar />

        <Routes>
          <Route path='/dashboard' element={<  ProtectedRoute Component={AdminDashboard} />} />

          <Route path='/' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />

          <Route path='/addpost' element={< ProtectedRoute Component={AddNewPost} />} />
          <Route path='/single-post' element={< ProtectedRoute Component={ViewSinglePost} />} />
          <Route path='/all-post' element={< ProtectedRoute Component={AllPost} />} />
          <Route path='/edit-post/:edit_id' element={<ProtectedRoute Component={EditPost} />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
