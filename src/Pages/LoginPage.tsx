import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { LogInResObj, LoginCredentials } from "../typesAndInterfaces/interfaces"
import styles from "./LoginPage.module.css"
import instaGramLogo from "../assets/instagram.png"
import facebookLogo from "../assets/faceBook.png"
import lightBulb from "../assets/lightBulb.png"
import seePassword from "../assets/seePassword.png"
import hidePassword from "../assets/hidePassword.png"

function LoginPage() {


    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [logInInfo, setLogInInfo] = useState<LogInResObj>()
    const [eye, setEye] = useState<boolean>(false)

    const navigate = useNavigate()

    const loginCredentials: LoginCredentials = {
        username: username,
        password: password
    }

    // Testa logga in
    async function login() {
        const response = await fetch('https://brain-freeze-j7ou.onrender.com/login', {
            method: 'POST',
            body: JSON.stringify(loginCredentials),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data: LogInResObj = await response.json()
        const status = response.status
        status === 400 && navigate("/404")
        setLogInInfo(data)
    };

    // Skickas till user vid rätt uppgifter
    useEffect(() => {
        if (logInInfo?.success) {
            sessionStorage.setItem("userInfo", JSON.stringify(logInInfo));
            sessionStorage.setItem("task", JSON.stringify([]));
            navigate("/user")
        }
    }, [logInInfo]) // esLint?? vad vill den mig?




    return (
        <section className={styles.loginContainer}>

            <img className={styles.lightbulb} src={lightBulb} alt="" />
            <h1 className={styles.logoText}>brain.freeze()</h1>

            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />

            <article className={styles.passwordArticle}>
                <input type={!eye ? "password" : "text"} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <section className={styles.eyeSection}>
                    <img onClick={() => setEye(!eye)} className={styles.eye} src={!eye ? seePassword : hidePassword} alt="" />
                </section>
            </article>

            {logInInfo && !logInInfo.usernameExists ? <h4>Wrong username</h4> : null}
            {logInInfo && logInInfo.usernameExists && !logInInfo.success ? <h4>Wrong password</h4> : null}

            <section className={styles.loginSection}>
                <article className={styles.forgotPsw}>
                    <Link className={styles.forgotPsw} to={"/resetPassword"}><h5>Forgot password?</h5></Link>
                </article>
                <button className={styles.loginBtn} onClick={() => login()}>Logga in</button>
            </section>

            <section className={styles.socialMedia}>
                <button className={styles.faceBookLogo}><img className={styles.facebook} src={facebookLogo} alt="" /></button>
                <button className={styles.instaBtn}><img className={styles.instagram} src={instaGramLogo} alt="" /></button>
            </section>

            <section className={styles.createBtn} >
                <Link className={styles.linkCreateBtn} to={"/createAccount"}>create account</Link>
            </section>

        </section>
    );
}

export default LoginPage;