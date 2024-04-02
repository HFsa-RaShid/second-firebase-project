import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [registerError, setRegisterError] = useState('');
    const [success,setSuccess] = useState('');
    const emailRef = useRef(null);

    const handleLogin = e =>{
        e.preventDefault();
        const email= e.target.email.value;
        const password= e.target.password.value;
        console.log(email,password);

        setRegisterError('')
        setSuccess('');

        // add validation
        signInWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result.user);
            if(result.user.emailVerified){
                setSuccess('User LoggedIn Successfully')
            }
            else{
                alert('Please verify your email address')
            }
        })
        .catch(error =>{
            console.error(error);
            setRegisterError(error.message)
        })
    }

    const handleForgetPass = () =>{
        const email = emailRef.current.value;
        if(!email){
            console.log('Give an email');
            return;
        }
        sendPasswordResetEmail(auth,email)
        .then(() =>{
           alert('Please check your email')

        })
        .catch(error =>{
            console.error(error);

        })

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleLogin}>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" ref={emailRef} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" onClick={handleForgetPass} className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    </div>
                    <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                {
                    registerError && <p className="text-red-700  mx-auto mb-2">{registerError}</p>
                }
                { 
                    success && <p className="text-green-700 mx-auto mb-2">{success}</p>
                }

                <p className="text-center">New to this website? Please <Link to='/register' className="text-blue-800 font-semibold underline">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;