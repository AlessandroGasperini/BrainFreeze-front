import { useState } from "react";
import { LogInResObj, SendTask, Task } from "../typesAndInterfaces/interfaces"
import Rating from '@mui/material/Rating';
import styles from "./SendDoneTask.module.css"
import { useNavigate } from "react-router-dom";

function SendDoneTask(props: SendTask) {

    const [doneAssignment, setDoneAssignment] = useState<string>("")
    const [ratingValue, setRatingValue] = useState<number>(3)
    const [comment, setComment] = useState<string>("")

    const info: LogInResObj | any = sessionStorage.getItem("userInfo")
    const userInfo = JSON.parse(info)
    const navigate = useNavigate()

    // Hämta datum och tid då uppgiftem blev klar
    let today: any = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes()
    today = time + " - " + mm + '/' + dd + '/' + yyyy

    // Skicka gjord uppgift till sitt eget account
    async function doneTask(task: Task) {
        props.setSendTask(false)
        props.setDoneTaskModal(true)
        console.log("jdksajdksajkdjsk", task);

        const doneTast = {
            ...task,
            taskDoneBy: userInfo._id,
            fullName: userInfo.firstname + " " + userInfo.lastname,
            email: userInfo.email,
            doneAssignment: doneAssignment,
            rating: ratingValue,
            feedback: [],
            comment: comment,
            feedbackUsers: [],
            timeStamp: today
        }
        const response = await fetch('https://brain-freeze-j7ou.onrender.com/doneTask', {
            method: 'POST',
            body: JSON.stringify(doneTast),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = response.status
        if (data === 400) {
            navigate("/404")
        }
    };

    return (
        <section className={styles.sendTaskContainer}>
            <input type="text" placeholder="Share your work and get feedback" onChange={(e) => setDoneAssignment(e.target.value)} />
            <a target={"_blank"} rel="noreferrer" href="https://docs.github.com/en/get-started/quickstart/create-a-repo">How to send task?</a>

            <input type="text" placeholder="Leave comment" onChange={(e) => setComment(e.target.value)} />

            <Rating className={styles.rating}
                size="large"
                name="size-large"
                value={ratingValue}
                onChange={(event, newValue: any) => {
                    setRatingValue(newValue);
                }}
            />

            <section className={styles.btns}>
                <button className={styles.closeBtn} onClick={() => props.setSendTask(false)} >X</button>
                {comment !== "" && doneAssignment !== "" && <button className={styles.doneBtn} onClick={() => doneTask(props.task)}>DONE</button>}
            </section>

        </section>
    );
}

export default SendDoneTask;