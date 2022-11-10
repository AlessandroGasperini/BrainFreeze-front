import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChangePasswordModal from "../Modal/ChangedPasswordModal";
import styles from "./ForgotPassword.module.css"
import lightBulb from "../assets/lightBulb.png"
import back from "../assets/back.png"
import { Email, ChangePassword } from "../typesAndInterfaces/interfaces"
import { EmailResponse } from "../typesAndInterfaces/types"


function ForgotPassword() {

    const [email, setEmail] = useState<string>("")
    // här slumpas en kod som kommer till inskriven mail. Om koden skrivs in vid ändring av lösenord blir det godkännt
    const [resetKey] = useState<string>(JSON.stringify(Math.floor(Math.random() * 90000) + 10000))
    const [resetValid, setResetValid] = useState<boolean>(false)
    const [noEmailMatch, setNoEmailMatch] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [repetedPassword, setRepetedPassowrd] = useState<string>("")
    const [myKey, setMyKey] = useState<string>("")
    const [wrongKey, setWrongKey] = useState<boolean>(false)
    const [changedPswModal, setChangedPswModal] = useState<boolean>(false)
    const navigate = useNavigate()

    // Email informtion
    const myEmail: Email = {
        from: "brain.freeze.studies@gmail.com",
        to: email,
        subject: "Brain.Freeze() Reset password",
        message: "Your reset key is " + resetKey + " follow the instructions to reset your password"
    }

    // Skickar koden till din email
    async function setNewPassword() {
        const response = await fetch('https://brain-freeze-j7ou.onrender.com/resetPassword', {
            method: 'POST',
            body: JSON.stringify(myEmail),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data: EmailResponse = await response.json()
        const status = response.status

        if (data.res) {
            setResetValid(true)
            setNoEmailMatch(false)

        } else {
            setNoEmailMatch(true)
        }
        if (status === 400) {
            navigate("/404")
        }
    };

    // Ändrar lösenordet i databasen
    async function resetPassword() {
        let changePassword: ChangePassword = {
            email: email,
            newPassword: password
        }
        // Om koden stämmer sp ändras lösenordet annars får man ett felmeddelande
        if (resetKey === myKey) {
            setChangedPswModal(true)
            console.log("byt till nya lösen");
            await fetch('https://brain-freeze-j7ou.onrender.com/changePassword', {
                method: 'POST',
                body: JSON.stringify(changePassword),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else {
            // Fel kod
            setWrongKey(true)
        }
    }



    return (
        <section className={styles.newPswContainer}>
            <Link to={"/"} ><img className={styles.back} src={back} alt="" /> </Link>

            <img className={styles.bulb} src={lightBulb} alt="" />

            {!resetValid &&
                <section>
                    <h1>Fill in your e-mail</h1>
                    <input className={styles.input} type="text" onChange={(e) => setEmail(e.target.value)} />
                    <button className={styles.sendCode} onClick={() => setNewPassword()}>send code</button>
                </section>}

            {noEmailMatch &&
                <section>
                    <h3>The email doesn´t match any account</h3>
                    <Link className={styles.link} to={"/createAccount"}><button className={styles.createBtn}>Create new account?</button></Link>
                </section>
            }

            {resetValid &&
                <section>
                    <h3>Check your email for reset Key</h3>

                    <input className={styles.input} type="text" placeholder="New password" onChange={(e) => setPassword(e.target.value)} />
                    <input className={styles.input} type="text" placeholder="Repeat password" onChange={(e) => setRepetedPassowrd(e.target.value)} />
                    <input className={wrongKey ? styles.invalidKey : styles.input} type="text" placeholder={wrongKey ? "Invalid key" : "Reset Key"} onChange={(e) => setMyKey(e.target.value)} />

                    {password !== "" && password === repetedPassword && myKey !== "" ? <button className={styles.resetBtn} onClick={() => resetPassword()}>reset password</button> : null}
                </section>}

            {changedPswModal && <ChangePasswordModal />}
        </section>
    );
}

export default ForgotPassword;