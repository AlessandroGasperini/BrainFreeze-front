import { Link } from "react-router-dom";
import styles from "./ChangedPasswordModal.module.css"

// Meddelar om att lösenordet har ändrats
function ChangePasswordModal() {
    return (
        <section className={styles.modalContainer}>

            <h1>Password changed</h1>

            <Link className={styles.link} to={"/"}><button>Back to login</button></Link>

        </section>
    );
}

export default ChangePasswordModal;