import {
  CheckCircle,
  Eye,
  EyeClosed,
  Image,
  Loader,
  Lock,
  Mail,
  User,
  X
} from 'lucide-react'
import { useAuthChange } from '../../Hooks/Context/useAuth'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useAuthificateStore } from '../../Hooks/Stores/useAuthificateStore'

const SignUp = ({ isSignUp }) => {
  const {
    user,
    handleChange,
    error,
    confirm,
    showPassword,
    showToggle,
    passwordRules,
    showConfirmPassword,
    showConfirmToggle,
    preview,
    handleClear
  } = useAuthChange();
  const { addUser } = useAuthificateStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { username, email, profile, password, confirmPassword } = user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile", profile); // Fichier image

    if (!user || !email || !password || !confirmPassword) {
      toast.error("Tous les champs sont requis !")
      setIsSubmitting(false);
      return;
    }


    try {
      const success = await addUser(formData);
      console.log("Les données sont :", formData);
      if (success) {
        toast.success("Add successfully!");
        handleClear();
      }
    } catch (error) {
      toast.error("Error server! ")
      console.log("Erreur", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={`h-full p-4 md:p-6 flex overflow-hidden flex-col transition-all duration-700 ease-in-out ${isSignUp
        ? 'block opacity-100 md:relative'
        : 'hidden md:flex opacity-0 md:translate-x-full md:absolute'
        }`}
    >

      <div className="w-full max-w-[640px] px-24 py-4 overflow-y-auto " >
        <div className="flex mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Create Account
          </h2>
        </div>

        <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
          {/* Profile Upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Profile</label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="file"
                onChange={handleChange}
                name="profile"
                accept="image/*"
                className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors cursor-pointer"
              />
              <div className="absolute right-3 top-1/3 -translate-y-1/2 text-gray-400 focus:outline-none rounded-full">
                {preview && (
                  <img
                    src={preview}
                    alt="Aperçu du profil"
                    className="w-10 h-10  object-cover rounded-full mt-2"
                  />
                )}

              </div>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={handleChange}
                name="username"
                className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Electronic address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={handleChange}
                name="email"
                className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                placeholder="••••••••••••"
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

            {/* Password Rules */}
            <ul className="mt-2 text-sm space-y-1">
              <li className={passwordRules.length ? 'text-green-500' : 'text-gray-400'}>
                • Minimum 8 caractères
              </li>
              <li className={passwordRules.uppercase ? 'text-green-500' : 'text-gray-400'}>
                • Au moins une lettre majuscule
              </li>
              <li className={passwordRules.specialChar ? 'text-green-500' : 'text-gray-400'}>
                • Au moins un caractère spécial ($, &, &quot;, #, @,_)
              </li>
            </ul>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Confirm password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="w-full  pl-10 pr-10 py-2 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                placeholder="••••••••••••"
              />

              <button
                type="button"
                onClick={showConfirmToggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <EyeClosed className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          {/* Confirmation & Error */}
          <div className="py-1">
            {confirm && (
              <p className="text-green-500 text-sm flex gap-2 items-center">
                <CheckCircle className="size-4" /> {confirm}
              </p>
            )}
            {error && (
              <p className="text-red-500 text-sm flex gap-2 items-center">
                <X className="size-4" /> {error}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-96 mt-4 md:mt-6 bg-blue-100 border border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 py-2 md:py-3 rounded-full uppercase font-medium transition-colors duration-300"
          >
            {isSubmitting ? (<Loader className="size-5 animate-spin" />) : ("Sign Up")}

          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
