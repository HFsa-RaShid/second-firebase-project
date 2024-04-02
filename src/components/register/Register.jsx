import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success,setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e =>{
        e.preventDefault();
        const name= e.target.name.value;
        const email= e.target.email.value;
        const password= e.target.password.value;
        const accepted= e.target.terms.checked;
        console.log(email,name,password);

        // reset error
        setRegisterError('')
        setSuccess('');


        if(password.length <6){
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }

        else if(! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+=])[A-Za-z\d!@#$%^&*()-+=]{8,}$/.test(password)){
            setRegisterError('Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number.')
            return;

        }
        else if(!accepted){
            setRegisterError('Please accept our terms and conditions.');
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result.user);
            setSuccess('User Created Successfully')
            sendEmailVerification(result.user)
            .then(() =>{
                alert('Please check your email and verify your account')
            })
        })
        .catch(error =>{
            console.error(error);
            setRegisterError(error.message)
        })
    }

    return (
        <div className="hero min-h-screen-50 bg-base-200 mt-5">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleRegister}>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" placeholder="Enter your Name" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>

        <div className="form-control">
            <label className="label">
            <span className="label-text">Password</span>
            </label>
          <div className="flex relative">
            
                <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="input input-bordered w-full" required />

                <button type="button" className="absolute right-3 top-4" onClick={() => setShowPassword(!showPassword)} >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
          </div>

          <div className="flex gap-3 mt-4">
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms">Accept our <a href="">Terms & Conditions</a></label>
          </div>
         
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
      {
        registerError && <p className="text-red-700  mx-auto mb-2">{registerError}</p>
      }
      {
        success && <p className="text-green-700 mx-auto mb-2">{success}</p>
      }
      <p className="text-center">Already have an account? <Link to='/login' className="text-blue-800 font-semibold underline">LogIn</Link></p>
    </div>
  </div>
</div>
    );
};

export default Register;