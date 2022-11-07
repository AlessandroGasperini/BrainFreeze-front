import { Link } from "react-router-dom";
import styles from "./DoneTaskModal.module.css"
import { Task } from "../typesAndInterfaces/interfaces"

// Modal som visas när man är klar med en uppfigt
function DoneTaskModal(props: any) { // vrf kan inte props bli Task????
    const task: Task = props.task

    return (
        <section className={styles.modalContainer}>
            <article>
                <h1 className={styles.h1}>Great job</h1>
                <h2>{task.name}</h2>

                <h5>Check your done assignment for feedback</h5>
                <Link className={styles.exit} to={"/user"}><button>Exit</button></Link>
            </article>
        </section>
    );
}

export default DoneTaskModal;