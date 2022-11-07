import styles from "./CreatedAccModal.module.css"
import { Firstname } from "../typesAndInterfaces/types"

// Välkommnar nytt konto
function CreatedAccModal(props: Firstname) {
    return (
        <section className={styles.modalContainer}>
            <article>
                <h1>Welcome</h1>

                <h1 className={styles.name}>{props.firstname}</h1>
            </article>
        </section>
    );
}

export default CreatedAccModal;