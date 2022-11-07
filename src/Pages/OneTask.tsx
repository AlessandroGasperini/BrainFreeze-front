import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DoneTaskModal from "../Modal/DoneTaskModal";
import TaskImg from "../Components/TaskImg"
import SendDoneTask from "../Components/SendDoneTask";
import styles from "./OneTask.module.css"
import back from "../assets/back.png"
import { Task } from "../typesAndInterfaces/interfaces"

function OneTask() {

    const [doneTaskModal, setDoneTaskModal] = useState<boolean>(false)
    const [sendTask, setSendTask] = useState<boolean>(false)
    const [hints, setHints] = useState<boolean>(false)

    const location = useLocation()
    const task: Task = location.state


    return (
        <section className={styles.oneTaskContainer}>
            <header>
                <h2>{task.name}</h2>
                <h1>{task.title}</h1>

                <Link to={"/mytask"}><img className={styles.back} src={back} alt="" /></Link>
            </header>

            <article className={styles.assignArt}>
                <h5>{task.assignment}</h5>
            </article>

            <TaskImg task={task.img} />

            <section>
                {!sendTask && <h4 onClick={() => setHints(!hints)}>Hints?</h4>}
                {hints && !sendTask && <article className={styles.hintArt}>
                    <h3>Click to read about the given hints</h3>

                    {/* Visar hint till upgiften som länkar. OM man vill (vid knapptryck) */}
                    {
                        task.hints.map((hint: any, id: number) => (
                            <a target="_blank" rel="noreferrer" className={styles.hintList} key={id} href={hint.url}>{hint.name.toUpperCase()}</a>
                        ))
                    }
                </article>}

                {sendTask && <SendDoneTask setSendTask={setSendTask} task={task} setDoneTaskModal={setDoneTaskModal} />}


                <section>
                    {!sendTask && <button className={styles.sendBtn} onClick={() => setSendTask(true)}>Skicka in</button>}
                </section>

                {!sendTask && <section className={styles.sectionMadyBy}>
                    <h6>Made by: {task.madeBy}</h6>
                </section>}
            </section>

            {doneTaskModal && <DoneTaskModal task={task} />}
        </section>
    );
}

export default OneTask;