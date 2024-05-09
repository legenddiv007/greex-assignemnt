"use client"
import React, { useState } from 'react';
import styles from '@/app/styles/loginsignup.module.css';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";


const useForm = (initialState, submitCallback) => {

    const [formData, setFormData] = useState(initialState);
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await submitCallback(formData);
            setStatus(response.status === 200 ? 'success' : 'error');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    }

    return { formData, handleChange, handleSubmit, status };
}

const LoginForm = ({ flipForm,router }) => {
   
    const { formData, handleChange, handleSubmit } = useForm({
        email: '',
        password: ''
    }, submitLogin);

    async function submitLogin(formData) {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { "Content_Type": "application/json" },
            body: JSON.stringify(formData)
        });

       if(response.status==200) { 
        Cookies.set("loggedin", "true");
        router.push('/home')}
        return response;
    }

    return (
        <div className={styles.loginForm}>
            <div className={styles.text}>LOGIN</div>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <input type="text" placeholder="Email" name='email' required className={styles.inputbox} value={formData.email} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <input type="password" placeholder="Password" name='password' required className={styles.inputbox} value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit" className={styles.btn}>LOGIN</button>
                <div className={styles.link}>
                    Not a member? <button className={styles.linkBtn} onClick={flipForm}>Signup now</button>
                </div>
            </form>
        </div>
    );
}

const SignupForm = ({ flipForm,router}) => {
    const { formData, handleChange, handleSubmit } = useForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }, submitSignup);

    async function submitSignup(formData) {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { "Content_Type": "application/json" },
            body: JSON.stringify(formData)
        });
        return response;
    }

    return (
        <div className={styles.loginForm}>
            <div className={styles.text}>SIGN UP</div>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <input type="text" placeholder="Full Name" name='username' required className={styles.inputbox} value={formData.username} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <input type="text" placeholder="Email" name='email' required className={styles.inputbox} value={formData.email} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <input type="password" placeholder="Password" name='password' required className={styles.inputbox} value={formData.password} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <input type="password" placeholder="Confirm Password" name='confirmPassword' required className={styles.inputbox} value={formData.confirmPassword} onChange={handleChange} />
                </div>
                <button type="submit" className={styles.btn}>SIGN UP</button>
                <div className={styles.link}>
                    Already a member? <button className={styles.linkBtn} onClick={flipForm}>Login now</button>
                </div>
            </form>
        </div>
    );
}

const FlipFormPage = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const flipForm = () => setShowLoginForm(!showLoginForm);
    const router = useRouter();

    return (
        <div className={styles.mainbody}>
            {showLoginForm ? <LoginForm flipForm={flipForm} router={router} /> : <SignupForm flipForm={flipForm} router={router} />}
        </div>
    );
}

export default FlipFormPage;
