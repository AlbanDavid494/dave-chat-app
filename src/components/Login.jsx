import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase_config";
import { generateZegoToken } from "../utils/zimTokens";
import { loginZIM, watchTokenExpiry } from "../services/zimServices";
import InputField from "./reusable/InputField";
import FormButton from "./reusable/FormButton";

const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);

const Login = ({onLogin}) => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate()
const [loading, setLoading] = useState(false)

const handleSubmit = async(e) => {
  e.preventDefault()
  if(!email || !password){
    return setError("Please enter both email and password")
  }

  setLoading(true)
  setError("")

  try{
const {user} = await signInWithEmailAndPassword(auth, email, password)
const token = generateZegoToken(user.uid, 7200);

await loginZIM({
appID,
userID: user.uid,
userName: user.displayName,
token,
})

watchTokenExpiry(
  async (userID) => generateZegoToken(userID, 7200),
  user.uid
);

const userData = {
  email: user.email,
  uid: user.uid,
  userID: user.uid,
  userName: user.email,
}

localStorage.setItem("user", JSON.stringify(userData))
onLogin?.(userData);
navigate('/chat')

  } catch(err){
setError(err.message)
  } finally{
    setLoading(false)
  }
}

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center" >Login</h2>
        {error && <p className="text-red-500 mb-4 text-center" >{error}</p>}
        <form onSubmit={handleSubmit} >
          <InputField id='email' label='Email' type='email' value={email} placeholder='example@email.com' onChange={(e) => setEmail(e.target.value)} />
          <InputField id='password' label='Password' type='password' value={password} placeholder='******' onChange={(e) => setPassword(e.target.value)} />
          <FormButton loading={loading} text="Sign In" loadingText="Signing in..."/>
        </form>
        <p className="text-center text-gray-600 mt-4">Don't have an account?{""} <button className="text-purple-600 hover:underline bg-transparent border-none cursor-pointer" onClick={() => navigate('/signup')}>sign up</button> </p>
      </div>
    </section>
  )
}

export default Login