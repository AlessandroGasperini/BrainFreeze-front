import { useState } from "react"
import styles from "./CreateTask.module.css"
import { LogInResObj } from "../typesAndInterfaces/interfaces"
import { Link, useNavigate } from "react-router-dom"
import back from "../assets/back.png"
import done from "../assets/done.png"
import CreatedTaskModal from "../Modal/CreatedTaskModal"
import { OneHint, SendTasks, NewAccount } from "../typesAndInterfaces/interfaces"

function CreateTask() {
    // mapHints är en array men nummer som representerar hur många hints man valt att lägga till 
    // om man vill lägga till kommentar pushas() en till 1a in och sedan mappas arrayen ennu en gång nedan
    const [mapHints, setMapHints] = useState<number[]>([1])
    const [allHints, setAllHints] = useState<Object[]>([])
    const [hintTitle, setHintTitle] = useState<string>("")
    const [hintUrl, setHintUrl] = useState<string>("")

    const [subject, setSubject] = useState<string>("")
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [taskName, setTaskName] = useState<string>("")

    const [img, setImg] = useState<string>("")
    const [assignment, setAssignment] = useState<string>("")
    const [level, setLevel] = useState<string>("")
    const [addHints, setAddHints] = useState<boolean>(false)
    const [createdTaskModal, setCreatedTaskModal] = useState<boolean>(false)


    const navigate = useNavigate()
    const info: LogInResObj | any = sessionStorage.getItem("userInfo") /// any??
    const userInfo: NewAccount | any = JSON.parse(info)

    let oneHint: OneHint = {
        name: hintTitle,
        url: hintUrl
    }


    // Lägger till hintinput och tömmer state där info skrivs in
    function add() {
        setMapHints([...mapHints, 1])
        setAllHints([...allHints, oneHint])
        setHintTitle("")
        setHintUrl("")
    }

    let sendTask: SendTasks = {
        subject: subject,
        level: level,
        title: taskName.toUpperCase(),
        task: {
            name: taskTitle,
            assignment: assignment,
            img: img,
            hints: allHints,
            madeBy: userInfo.firstname + " " + userInfo.lastname
        }
    }

    // Lägger till ny skapad uppgift
    async function addTask() {
        // Modal visas i 3sek innan man skickas tillbaka till userPage
        setTimeout(() => {
            navigate("/user")
            setCreatedTaskModal(false)
        }, 3000)
        setCreatedTaskModal(true)
        const response = await fetch('http://localhost:3333/sendNewTask', {
            method: 'POST',
            body: JSON.stringify(sendTask),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const status = response.status
        if (status === 400) {
            navigate("/404")
        }
    };

    return (
        <section className={styles.createTaskContainer}>
            <Link to={"/user"}><img className={styles.back} src={back} alt="" /></Link>

            <h1>Create your own task</h1>
            <article>
                <select onChange={(e) => setSubject(e.target.value)} name="" id="">
                    <option value="">Choose Subject</option>
                    <option value="html">Html</option>
                    <option value="css">Css</option>
                    <option value="csshtml">Html & Css</option>
                    <option value="react">React</option>
                    <option value="vue">Vue</option>
                    <option value="ember">Ember</option>
                    <option value="sass">Sass</option>
                    <option value="next">Next</option>
                    <option value="angular">Angular</option>
                    <option value="htmlsass">Html & Sass</option>
                    <option value="cssreact">React & Css</option>
                    <option value="cssvue">Vue & Css</option>
                    <option value="angularcss">Angular & Css</option>
                    <option value="cssember">Ember & Css</option>
                </select>
            </article>

            <input className={styles.infoInput} onChange={(e) => setTaskName(e.target.value)} placeholder="Css or Css & Html" type="text" />


            <input className={styles.infoInput} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Give this task a title" type="text" />

            <textarea onChange={(e) => setAssignment(e.target.value)} placeholder="Describe the task" name="" id="" ></textarea>

            <input className={styles.infoInput} onChange={(e) => setImg(e.target.value)} placeholder="Img url or SVG" type="text" />

            <p className={styles.level}>Level: {level}</p>

            <input className={styles.range} type="range" min={1} max={5} onChange={(e) => setLevel(e.target.value)} />

            {!addHints && <button className={styles.addHintBtn} onClick={() => setAddHints(true)}>Add hints</button>}

            {/* map() ut hut många hints man valt att lägga till */}
            {addHints && <section className={styles.hintSec}>
                {mapHints.map((id: number) => (
                    <article key={id} className={styles.hintArt} >
                        <input onChange={(e) => setHintTitle(e.target.value)} type="text" placeholder="Hint name" />
                        <input onChange={(e) => setHintUrl(e.target.value)} type="text" placeholder="Hint URL" />
                    </article>
                ))}

                {hintTitle !== "" && hintUrl !== "" && <button className={styles.addThisHint} onClick={() => add()}>Submit hint</button>}
            </section>}

            {subject !== "" && subject !== "" && taskTitle !== "" && img !== "" && assignment !== "" && level !== "" &&
                <img onClick={() => addTask()} className={styles.done} src={done} alt="" />}

            {createdTaskModal && <CreatedTaskModal taskTitle={taskTitle} />}
        </section>
    );
}

export default CreateTask;