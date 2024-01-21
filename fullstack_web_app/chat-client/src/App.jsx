import './App.css'
import Login from './components/Login'
import MainContainer from './components/MainContainer'
import {Route, Routes} from "react-router-dom";
import WelcomePage from './components/WelcomePage';
import ChatPart from './components/ChatPart';
import UserAndGroups from './components/Users';
import CreateGroups from './components/CreateGroups';
import Groups from './components/Groups';
import PageNotFound from './components/PageNotFound';
import UserProfile from './components/UserProfile';
import Signup from './components/Signup';

function App() {

  return (
    <div className=' bg-[#d8d8d8] w-full h-screen flex justify-center items-center'>

      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='*' element={<PageNotFound/>}></Route>

        <Route path='app' element={<MainContainer/>}>
          <Route path='profile' element={<UserProfile/>}></Route>
          <Route path='welcome' element={<WelcomePage/>}></Route>
          <Route path='chat' element={<ChatPart/>}></Route>
          <Route path='users' element={<UserAndGroups/>}></Route>
          <Route path='groups' element={<Groups/>}></Route>
          <Route path='create-groups' element={<CreateGroups/>}></Route>
        </Route>

      </Routes>

    </div>
  )
}

export default App
