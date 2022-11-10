import styles from "./MyTask.module.css"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import TaskImg from "../Components/TaskImg"
import back from "../assets/back.png"
import { LogInResObj, NewAccount, Task, DeleteTask } from "../typesAndInterfaces/interfaces"
import { Id } from "../typesAndInterfaces/types"

function MyTask() {
    const [myTasks, setMyTasks] = useState<any>()


    const navigate = useNavigate()
    // Hämtar information om användaren
    const info: LogInResObj | any = sessionStorage.getItem("userInfo")
    const userInfo: NewAccount | any = JSON.parse(info)

    // Hämtar all info så borttagna uppgifter mm kan uppdateras
    async function getAllUserInfo() {
        let id: Id = {
            id: userInfo._id
        }
        const response = await fetch('https://brain-freeze-j7ou.onrender.com/getAllUserInfo', {
            method: 'POST',
            body: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data: NewAccount = await response.json()

        sessionStorage.setItem("userInfo", JSON.stringify(data));
        setMyTasks(data.tasksInProgress)
        if (data.tasksInProgress.length === 0) {
            navigate("/user")
        }
    };

    useEffect(() => {
        getAllUserInfo()
    }, [])

    // Radera en uppgift som slumpats till användaren
    async function deleteTask(task: Task) {
        const deleteTask: DeleteTask = {
            chosenTask: task,
            userId: userInfo._id,
        }
        const response = await fetch('https://brain-freeze-j7ou.onrender.com/deleteTask', {
            method: 'DELETE',
            body: JSON.stringify(deleteTask),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = response.status
        if (data === 400) {
            navigate("/404")
        } else {
            await getAllUserInfo()
        }
    }

    return (
        <section>
            <header>
                <Link to={"/user"}><img className={styles.back} src={back} alt="" /></Link>
            </header>
            {myTasks &&
                myTasks.map((task: Task, id: number) => (
                    <section key={id} className={styles.oneTask}>
                        <article>
                            <h1>{task.name}</h1>
                        </article>

                        <h2>{task.title}</h2>

                        <TaskImg task={task.img} />

                        <section className={styles.deleteAndGoTo}>
                            <button onClick={() => deleteTask(task)}>Delete assignment</button>
                            <Link to={"/oneTask"} state={task}><button>To assignment</button></Link>
                        </section>

                    </section>

                ))

            }

        </section>
    );
}

export default MyTask;