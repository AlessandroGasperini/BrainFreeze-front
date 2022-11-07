import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import TaskImg from "../Components/TaskImg"
import { LogInResObj, NewAccount, Task } from "../typesAndInterfaces/interfaces"
import styles from "./DoneTasks.module.css"
import back from "../assets/back.png"
import { User } from "../typesAndInterfaces/types"

function DoneTasks() {

    const [tasks, setTasks] = useState<any>([])
    // Link patch i CommentsPage kan antingen vara hit eller till AllTasks beroende på var man kommer ifrån
    let backPath: string = "/doneTasks"
    const info: LogInResObj | any = sessionStorage.getItem("userInfo")
    const userInfo: NewAccount | any = JSON.parse(info) // any??? id blir rätt men _id måste skrivas till
    const navigate = useNavigate()

    // Hämtar användarens egna avklarade uppgifter
    async function getMyDoneTasks() {
        let user: User = {
            id: userInfo._id
        }
        const response = await fetch('http://localhost:3333/allMyDoneTasks', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const status = response.status
        const data = await response.json()
        // Sorterar uppgifterna i ämnen så alla är samlade
        setTasks(data.sort((a: any, b: any) => (a.subject > b.subject) ? 1 : ((b.subject > a.subject) ? -1 : 0)))
        if (status === 400) {
            navigate("/404")
        }
    };

    useEffect(() => {
        getMyDoneTasks()
    }, [])


    return (
        <section className={styles.doneTasksContainer}>

            <Link to={"/user"}><img className={styles.back} src={back} alt="" /></Link>

            {tasks.length > 0 ? <h1>My bio</h1> : <h1>No tasks done yet</h1>}
            {tasks.length > 0 ?
                tasks.map((task: Task, id: number) => (

                    <section className={styles.oneTask} key={id}>

                        <h5>{task.name}</h5>
                        <h6 className={styles.timestamp}>{task.timeStamp}</h6>

                        <TaskImg task={task.img} />
                        <a target="_blank" rel="noreferrer" href={task.doneAssignment}><p className={styles.p}>View</p></a>
                        <article className={styles.levelAndComments}>
                            <h6>Level: {task.level}</h6>
                            {task.feedback.length > 0 ? <Link className={styles.link} to={"/comments"} state={{ task, backPath }}  ><p className={styles.comment}>({task.feedback.length}) Comments</p></Link> : <p className={styles.noComment}>No comments</p>}
                        </article>

                    </section>
                ))
                // Om man inte gjort några uppgifter
                :
                <h2 className={styles.sadFace}>: (</h2>
            }


        </section>
    );
}

export default DoneTasks;