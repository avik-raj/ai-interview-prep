import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if (errorMessage) {
            setErrorMessage("")
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        if (errorMessage) {
            setErrorMessage("")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        try {
            const user = await handleLogin({ email, password })
            if (user) {
                navigate('/dashboard')
            }
        } catch (err) {
            const msg = err.response?.data?.message || "Invalid email or password."
            setErrorMessage(msg)
        }
    }

    if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }


    return (
        <main>
            <div className="form-container">
                <div className="form-header">
                    <Link to="/" className="brand-link">
                        Interview <span className="highlight">AI</span>
                    </Link>
                    <h1>Login</h1>
                </div>

                {errorMessage && (
                    <div className="auth-error-message" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        <span>{errorMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={handleEmailChange}
                            type="email" id="email" name='email' placeholder='Enter email address' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={handlePasswordChange}
                            type="password" id="password" name='password' placeholder='Enter password' required />
                    </div>
                    <button className='button primary-button' type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
                <p><Link to={"/"} className="back-home-link">← Back to Home</Link></p>
            </div>
        </main>
    )
}

export default Login