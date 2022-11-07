import { useEffect, useState } from "react";
import TaskImg from "../Components/TaskImg"
import styles from "./AllTasks.module.css"
import { Link, useNavigate } from "react-router-dom";
import back from "../assets/back.png"
import { Task, Subject } from "../typesAndInterfaces/interfaces";
import { SendSubject } from "../typesAndInterfaces/types"

function AllTasks() {

    const [searchValue, setSearchValue] = useState<string>("")
    const [tasks, setTasks] = useState<Task[]>([])
    const [subjects, setSubjects] = useState<Subject | any>()
    const [showInput, setShowInput] = useState<boolean>(true)
    // Link patch i CommentsPage kan antingen vara hit eller till DoneTasks beroende på var man kommer ifrån
    let backPath: string = "/allTasks"
    const navigate = useNavigate()

    // Hämta alla ämnen det går att söka mellan
    async function allSubjects() {
        const response = await fetch('http://localhost:3333/allSubjects', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        const status = response.status
        setSubjects(data)

        if (status === 400) {
            navigate("/404")
        }
    };



    // Hämtar alla gjorda uppgifter som matchar med den sökning man klickar på
    async function getAllTasks(subject: string) {
        setSearchValue(subject)
        let sendSubject: SendSubject = {
            subject: subject
        }

        const response = await fetch('http://localhost:3333/allTasks', {
            method: 'POST',
            body: JSON.stringify(sendSubject),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        const status = response.status
        // Sorterar uppgifterna frpm enklast till svårast "level"
        setTasks(data.sort((a: any, b: any) => (a.level > b.level) ? 1 : ((b.level > a.level) ? -1 : 0)))
        setShowInput(false)

        if (status === 400) {
            navigate("/404")
        }
    };

    useEffect(() => {
        allSubjects()
    }, [])




    return (
        <section className={styles.allTasksContainer}>
            <h1>All tasks</h1>
            <Link to={"/user"}><img className={styles.back} src={back} alt="" /></Link>


            {showInput && <section>
                <input type="text" placeholder="Search subjects" onChange={(e) => setSearchValue(e.target.value)} />
                {<section>
                    {/* input search som mapar ut alla ämnen som mathar */}
                    {subjects && searchValue.length > 1 &&
                        subjects.filter((subject: Subject) => {
                            if (subject.subject.toLowerCase().includes(searchValue.toLowerCase())) {
                                return subject
                            }
                        })
                            .map((subject: Subject, id: number) => (
                                <h3 key={id} onClick={() => getAllTasks(subject.subject)} >{subject.title}</h3>
                            ))
                    }
                </section>}
            </section>}

            {/* Om inga uppgifter gjords av vald kategori */}
            {!showInput && tasks && tasks.length === 0 &&
                <article>
                    <h2>No tasks done yet...</h2>
                    <h6 className={styles.smile}>:(</h6>
                </article>
            }


            {/* Visar alla "tasks" som gjorts i valt ämne */}
            {!showInput && <section className={styles.oneTask}>
                {tasks.map((task: Task, id: number) => (
                    <article key={id} className={styles.taskArt}>
                        <article className={styles.nameAndTime}>
                            <h4>{task.name}</h4>
                            <h6 className={styles.timeStamp}>{task.timeStamp}</h6>
                        </article>

                        <h6>Made by: {task.madeBy}</h6>
                        <TaskImg task={task.img} />
                        <h5 className={styles.view}><a target="_blank" rel="noreferrer" href={task.doneAssignment}>View</a></h5>
                        <article className={styles.commentAndLevelArt}>
                            <p className={styles.level}>Level: {task.level}</p>
                            <Link className={styles.Link} to={"/comments"} state={{ task, backPath }} >{task.feedback.length > 0 ? <p className={styles.comment}>({task.feedback.length}) Comments</p> : <p className={styles.comment}>No comments</p>}</Link>
                        </article>
                    </article>
                ))}
            </section>}


        </section >
    );
}

export default AllTasks;