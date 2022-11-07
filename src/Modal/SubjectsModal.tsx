import styles from "./SubjectModal.module.css"
import { LogInResObj, SendSubject, NewAccount } from "../typesAndInterfaces/interfaces"
import { useNavigate } from "react-router-dom"
function SubjectsModal(props: any) {

    const info: LogInResObj | any = sessionStorage.getItem("userInfo") //Vrf any?
    const userInfo: NewAccount | any = JSON.parse(info)
    const navigate = useNavigate()

    // Skickar valda ämnen till ens account i mongoDB och visas sedan på UserPage
    async function addSubject(subject: string, title: string) {

        const sendSubject: SendSubject = {
            title: title,
            userId: userInfo._id,
            subject: subject
        }
        const respone = await fetch('http://localhost:3333/addSubject', {
            method: 'PUT',
            body: JSON.stringify(sendSubject),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const status = respone.status
        if (status === 400) {
            navigate("/404")
        }
        await props.getAllUserInfo()
    };

    // Hämtar uppdaterad profil, stänger modal (att ladda om sidan verkade funka bättre nibland men behövs inte)
    async function closeModal() {
        await props.getAllUserInfo()
        props.setOpenSubject(false)
        window.location.reload()
    }


    return (
        <section className={styles.modalContainer}>
            <header className={styles.header}>
                <h1 onClick={() => closeModal()}>X</h1>
                <h1>Subjects</h1>
                <h1>.</h1>
            </header>

            <section>
                <article>
                    <h1 onClick={() => addSubject("html", "Html")}>Html</h1>
                </article>
                <article>
                    <h1 onClick={() => addSubject("css", "Css")}>Css</h1>
                </article>
                <article>
                    <h1 onClick={() => addSubject("sass", "Sass")}>Sass</h1>
                </article>
            </section>

            <section>
                <article>
                    <h1 onClick={() => addSubject("jsvanilla", "Vanilla JS")}>Javascript Vanilla</h1>
                </article>
                <article>
                    <h1 onClick={() => addSubject("react", "React")}>React</h1>
                </article>
                <article>
                    <h1 onClick={() => addSubject("vue", "Vue.js")}>Vue</h1>
                </article>
            </section>

            <section>
                <article>
                    <h1 onClick={() => addSubject("angular", "Angular")}>Angular</h1>
                </article>
                <article>
                    <h1 onClick={() => addSubject("next", "Next.js")}>Next</h1>
                </article>
                <article>
                    <h1 onClick={() => addSubject("ember", "Ember.js")}>Ember</h1>
                </article>
            </section>

            <section>
                <article>
                    <h1 onClick={() => addSubject("express", "express")}>Express</h1>
                </article>
                <article>
                    <h1 onClick={() => addSubject("testing", "Testing")}>Testing</h1>
                </article>
                <article>
                    <h1 onClick={() => addSubject("sql", "SQL")}>SQL</h1>
                </article>
            </section>

            <section>
                <article>
                    <h1 onClick={() => addSubject("MongoDb", "MongoDb")}>MongoDb</h1>
                </article>
                <article>
                    <h1 onClick={() => addSubject("nedb", "Nedb")}>NEDB</h1>
                </article>
                <article>
                    <h1 onClick={() => addSubject("firebase", "Firebase")}>Firebase</h1>
                </article>
            </section>

        </section>
    );
}

export default SubjectsModal;