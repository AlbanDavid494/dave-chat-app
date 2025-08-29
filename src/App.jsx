import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import { setUserId } from "firebase/analytics"
import { useState } from "react"
import SignUp from './components/SignUp'
import ChatApp from "./components/ChatApp"
import { ThemeProvider } from "./contexts/ThemeContext"


function App() {
const [user, setUser] = useState(null)
  return (
    <ThemeProvider>
     <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to='/chat'/> : <Login onLogin={setUser} />} />
        <Route path="/signup" element={user ? <Navigate to='/chat'/> : <SignUp onLogin={setUser} />} />
        <Route path="/chat" element={user ? <ChatApp user={user}/> : <Navigate to='/login' />} />
        <Route path="/" element={<Navigate to={user ? "/chat" : "/login"} />}/>
      </Routes>
     </Router>
    </ThemeProvider>
  )
}

export default App
