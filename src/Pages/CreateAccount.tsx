import { useState } from "react"
import styles from "./CreateAccount.module.css"
import lightBulb from "../assets/lightBulb.png"
import back from "../assets/back.png"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import CreatedAccModal from "../Modal/CreatedAccModal"
import { NewAccount, NewAccountConfirmed } from "../typesAndInterfaces/interfaces"
function CreateAccount() {


    const [firstname, setFirstname] = useState<string>("")
    const [lastname, setLastname] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repetedPassword, setRepetedPassowrd] = useState<string>("")
    const [createStatus, setCreateStatus] = useState<NewAccountConfirmed>()
    const [openCreatedModal, setOpenCreatedModal] = useState<boolean>(false)

    const navigate = useNavigate()

    const newAccount: NewAccount = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
        subjects: [],
        tasksInProgress: []
    }

    // Skapa konto (Kolla om användarnamn eller email redan existerar)
    async function addNewAccount() {
        const response = await fetch('http://localhost:3333/addAccount', {
            method: 'POST',
            body: JSON.stringify(newAccount),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data: NewAccountConfirmed = await response.json()

        setCreateStatus(data);
        // Modal som visas i 4sek innan man skickas till login
        if (data.success) {
            setOpenCreatedModal(true)
            setTimeout(() => {
                navigate("/")
                setOpenCreatedModal(false)
            }, 4000)

        }
    };




    return (
        <section className={styles.createAccountContainer}>

            <Link to={"/"} ><img className={styles.back} src={back} alt="" /> </Link>

            <h1 className={styles.createAcc}>Create account</h1>

            <img className={styles.lightbulb} src={lightBulb} alt="" />

            <input type="text" placeholder="firstname" onChange={(e) => setFirstname(e.target.value)} />
            <input type="text" placeholder="lastname" onChange={(e) => setLastname(e.target.value)} />
            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="repeat password" onChange={(e) => setRepetedPassowrd(e.target.value)} />

            {createStatus && <section>
                {createStatus.usernameExists && <h4> Username already exists</h4>}
                {!createStatus.usernameExists && createStatus.emailExists && <h4>Email already exists</h4>}
            </section>}

            {
                // Knapp visas bara om obligatoriska fält är ifyllda
                firstname !== "" && lastname !== "" && username !== "" && email !== "" && password !== "" && repetedPassword !== "" && password === repetedPassword ?
                    <button className={styles.createBtn} onClick={() => addNewAccount()}>Create new account</button> : null
            }

            {openCreatedModal && <CreatedAccModal firstname={firstname} />}
        </section >
    );
}

export default CreateAccount;