import styles from "./SubjectModal.module.css"
import { LogInResObj, SendSubject, NewAccount } from "../typesAndInterfaces/interfaces"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
function SubjectsModal(props: any) {


    const info: LogInResObj | any = sessionStorage.getItem("userInfo") //Vrf any?
    const userInfo: NewAccount | any = JSON.parse(info)
    const [allMySubjects, setAllMySubjects] = useState<any>(userInfo.subjects)
    const navigate = useNavigate()


    // Skickar valda ämnen till ens account i mongoDB och visas sedan på UserPage
    async function addSubject(subject: string, title: string) {

        let addSubject = {
            subject: subject,
            title: title
        }

        setAllMySubjects([...allMySubjects, addSubject])

        const sendSubject: SendSubject = {
            title: title,
            userId: userInfo._id,
            subject: subject
        }
        const respone = await fetch('https://brain-freeze-j7ou.onrender.com/addSubject', {
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
        // await props.setUsersSubjects(allMySubjects)
        props.getAllUserInfo()
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
                    {/* Ser till at man inte kan lägga till samma ämne igen (detta gör den i backend också men här gör vi det lokalt) */}
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "html") ? () => null : () => addSubject("html", "Html")}>Html</h1>
                </article>
                <article>
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "css") ? () => null : () => addSubject("css", "Css")}>Css</h1>
                </article>
                <article>
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "sass") ? () => null : () => addSubject("sass", "Sass")}>Sass</h1>
                </article>
            </section>

            <section>
                <article>
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "jsvanilla") ? () => null : () => addSubject("jsvanilla", "Vanilla JS")}>Javascript Vanilla</h1>
                </article>
                <article>
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "react") ? () => null : () => addSubject("react", "React")}>React</h1>
                </article>
                <article>
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "vue") ? () => null : () => addSubject("vue", "Vue.js")}>Vue</h1>
                </article>
            </section>

            <section>
                <article>
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "angular") ? () => null : () => addSubject("angular", "Angular")}>Angular</h1>
                </article>
                <article>
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "next") ? () => null : () => addSubject("next", "Next.js")}>Next</h1>
                </article>
                <article>
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "ember") ? () => null : () => addSubject("ember", "Ember.js")}>Ember</h1>
                </article>
            </section>

            <section>
                <article>
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "express") ? () => null : () => addSubject("express", "Express")}>Express</h1>
                </article>
                <article>
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "testing") ? () => null : () => addSubject("testing", "Testing")}>Testing</h1>
                </article>
                <article>
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "sql") ? () => null : () => addSubject("sql", "SQL")}>SQL</h1>
                </article>
            </section>

            <section>
                <article>
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "MongoDb") ? () => null : () => addSubject("mongoDb", "MongoDb")}>MongoDb</h1>
                </article>
                <article>
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "nedb") ? () => null : () => addSubject("nedb", "Nedb")}>NEDB</h1>
                </article>
                <article>
                    <h1 onClick={allMySubjects.find((obj: { subject: any }) => obj.subject === "firebase") ? () => null : () => addSubject("firebase", "Firebase")}>Firebase</h1>
                </article>
            </section>

        </section >
    );
}

export default SubjectsModal;