import styles from "./CreatedTaskModal.module.css"
import { TaskTitle } from "../typesAndInterfaces/types"

// Modal när ny upgift lagts till av gästkonto
function CreatedTaskModal(props: TaskTitle) {
    return (
        <section className={styles.modalContainer}>
            <h1>Thank u 4 ur tribute with</h1>
            <h4>{props.taskTitle}</h4>

        </section>
    );
}

export default CreatedTaskModal;