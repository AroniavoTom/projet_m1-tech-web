import React, { useState } from 'react';
import imageFont from "../../Assets/12.png";
import { Eye, EyeClosed, Loader, Lock, Mail } from 'lucide-react';
import SignUp from './SignUp';
import { useAuthChange } from '../../Hooks/Context/useAuth';
import toast from 'react-hot-toast';
import { useAuthificateStore } from '../../Hooks/Stores/useAuthificateStore';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { user, handleChange, showPassword, showToggle, handleClear } = useAuthChange();
  const { login } = useAuthificateStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  //Soumission des données dans le BackEnd 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { email, password } = user;
    if (!email || !password) {
      toast.error("Tous les champs sont requis !")
    }
    const dataUser = {
      email: email,
      password: password
    }
    try {
      const success = await login(dataUser);
      if (success) {

        console.log("Login successfully , data:", dataUser);
        setTimeout(() => {
          toast.success(success.message);
          navigate("/admin/product");
          setIsSubmitting(false);
          handleClear();
        }, 2000);
      } else {
        setTimeout(() => {
          toast.error("Failed in login!");
          setIsSubmitting(false);
        }, 1000);
      }
    } catch (error) {
      toast.error("Error internal server !")
      console.error(error.message || "Erreur inconnue");

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="relative w-full max-w-5xl h-auto md:h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-700 ease-in-out">

        {/* Mobile toggle button - only shows on small screens */}
        <MobileShow isSignUp={isSignUp} setIsSignUp={setIsSignUp} />

        {/* Left image/side panel - hidden on mobile */}
        <div className={`hidden md:block absolute top-0 h-full w-80 bg-cover bg-center z-10 transition-all duration-700 ease-in-out ${isSignUp ? 'left-[calc(100%-20rem)]' : 'left-0'}`}
          style={{ backgroundImage: `url(${imageFont})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-white text-center">
            <div className={`mb-8 transition-all duration-700 ease-in-out ${isSignUp ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>

              <h3 className="text-xl font-semibold mb-4">Already have an account?</h3>
              <p className="text-sm">Just sign in to continue</p>
            </div>
            <div className={`mb-8 transition-all duration-700 ease-in-out ${isSignUp ? 'opacity-0 -translate-y-6' : 'opacity-100'}`}>
              <h3 className="text-xl font-semibold mb-4">{`Don't have an account?`}</h3>
              <p className="text-sm">Please Sign up to get started!</p>
            </div>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="mt-4 relative w-36 h-11 text-sm uppercase font-medium border-2 border-white rounded-full overflow-hidden hover:bg-white hover:bg-opacity-20 transition-colors duration-300"
            >
              <span className="absolute inset-0 flex items-center justify-center">
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </span>
            </button>
          </div>
        </div>

        {/* Forms container */}
        <div className={`w-full h-full  transition-all duration-700 ease-in-out ${isSignUp ? 'md:ml-0' : 'md:ml-64'}`}>
          {/* Sign In form */}
          <div className={`h-full  p-6 md:p-8 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${isSignUp ? 'hidden md:flex opacity-0 md:-translate-x-full md:absolute' : 'block opacity-100 md:relative'}`}>
            <div className="w-full max-w-md">
              <div className="flex justify-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome Back</h2>
              </div>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:border-b focus:border-blue-500 outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:border-b focus:border-blue-500 outline-none transition-colors"
                      placeholder="••••••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={showToggle}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeClosed className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                </div>
                <div className="text-right">
                  <a href="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Forgot password?</a>
                </div>
                <button
                  type="submit"
                  className="w-full md:w-96 mt-4 md:mt-6 bg-blue-100 border border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 py-2 md:py-3 rounded-full uppercase font-medium transition-colors duration-300 text-center justify-center"
                >
                  {
                    isSubmitting ? (<Loader className="size-6 animate-spin " />) : ("Login")
                  }
                </button>
              </form>
            </div>
          </div>

          {/* Sign Up form */}
          <SignUp isSignUp={isSignUp} />
        </div>
      </div>
    </div>
  );
};

export default Login;

const MobileShow = ({ setIsSignUp, isSignUp }) => {
  return (

    <div className="md:hidden flex justify-center py-3 bg-blue-400 text-white">
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="px-6 py-2 uppercase font-medium rounded-full"
      >
        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </button>
    </div>
  )
}