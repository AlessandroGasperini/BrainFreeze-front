import { useState, useEffect } from "react"
import { Task, NewAccount, SearchTask, GetTaskObj, Subject, Sub } from "../typesAndInterfaces/interfaces"
import { Id } from "../typesAndInterfaces/types"

import SubjectsModal from "../Modal/SubjectsModal";
import styles from "./UserPage.module.css"
import { Link, useNavigate } from "react-router-dom";
import taskEmpty from "../assets/taskEmpty.png"
import taskFull from "../assets/taskFull.png"
import doneTasks from "../assets/doneTasks.png"
import trash from "../assets/trash.png"
import logout from "../assets/logout.png"
function UserPage() {

    const [openSubjects, setOpenSubject] = useState<boolean>(false)
    const [usersSubjects, setUsersSubjects] = useState<any>()
    const [taskSubjects, setTaskSubjects] = useState<any>([])
    const [level, setLevel] = useState<any>("1")
    const [taskImg, setTaskImg] = useState<any>(taskEmpty)
    const [searchTaskFound, setSearchTaskFound] = useState<boolean>(false)
    const [searchTaskNotFound, setSearchTaskNotFound] = useState<boolean>(false)

    //Hämtar all användarinfo info från sessionstorage
    const info: NewAccount | any = sessionStorage.getItem("userInfo")
    const userInfo: NewAccount | any = JSON.parse(info)
    const taskArr: any = sessionStorage.getItem("task")
    const tasks: Task[] = JSON.parse(taskArr)
    const navigate = useNavigate()


    useEffect(() => {
        setUsersSubjects(userInfo.subjects)
        getAllUserInfo()
    }, []) // <--- Hur kan denna jävel bli warning i EsLink... känns standard

    //Hämtar all account info från db
    async function getAllUserInfo() {
        let id: Id = {
            id: userInfo._id
        }
        const response = await fetch('http://localhost:3333/getAllUserInfo', {
            method: 'POST',
            body: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data: NewAccount = await response.json()

        sessionStorage.setItem("userInfo", JSON.stringify(data));
        sessionStorage.setItem("task", JSON.stringify(data.tasksInProgress));
        // Visar användarens valda ämnen (sparas till de tas bort manuellt)
        setUsersSubjects(data.subjects)
    };

    // Säker efter uppgift som matchar sökorden som valts
    // subject.sort() lägger valda sökord i i lång sträng i bokstavsordning så att man kan välja ämnen i alla olika ordningar
    // (så den är skrivna in i databasen)
    async function searchTasks() {
        const newArr: string[] = []
        taskSubjects.map((task: Task) => (newArr.push(task.subject)))
        let getTaskObj: GetTaskObj = {
            level: level,
            subjects: newArr.sort(),
            id: userInfo._id
        }

        const response = await fetch('http://localhost:3333/serachTasks', {
            method: 'POST',
            body: JSON.stringify(getTaskObj),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data: SearchTask = await response.json()
        const status = response.status

        if (data.taskFound) {
            // Fyller i glödlampan när en uppgift har tillagts
            setTaskImg(taskFull)
            getAllUserInfo()
            taskFound(true)
            setTaskSubjects([])
        } else {
            taskFound(false)
        }

        if (status === 400) {
            navigate("/404")
        }


    };

    useEffect(() => { // EsLint  whaaa whaaaa??
        if (tasks.length === 0) {
            setTaskImg(taskEmpty)
        } else (
            setTaskImg(taskFull)
        )
    })

    // Tar bort valda ämnen i [ ] (ämnen som används för att söka uppgift)
    function deleteSubject(subject: Subject) {
        // Hittar index
        const deleteIndex: number = taskSubjects.indexOf(subject);
        let array: number[] = taskSubjects
        //Tar ut ämnet och lägger in ny Arr som visas 
        array.splice(deleteIndex, 1)
        setTaskSubjects(array)
        setTaskSubjects([...taskSubjects])
    }


    // Visar på skärmen i text om uppgifts hittats eller inte
    function taskFound(boolean: boolean) {
        if (boolean) {
            setSearchTaskFound(true)
            setTimeout(function () { setSearchTaskFound(false) }, 2000);
        } else {
            setSearchTaskNotFound(true)
            setTimeout(function () { setSearchTaskNotFound(false) }, 2000);
        }
    }

    // Tar bort en användares valda ämnen på userpage 
    async function removeSubject(subject: string) {
        let sub: Sub = {
            id: userInfo._id,
            subject: subject
        }

        const response = await fetch("http://localhost:3333/removeSubject", {
            method: "DELETE",
            body: JSON.stringify(sub),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data: Subject[] = await response.json()
        setUsersSubjects(data);
        const status = response.status
        if (status === 400) {
            navigate("/404")
        }
    }





    return (
        <section className={styles.userPageContainer}>
            <header>
                <Link to={tasks.length === 0 ? "/user" : "/mytask"}><img className={styles.bulb} src={taskImg} alt="" /></Link>
                <h1 className={usersSubjects && usersSubjects.length === 6 ? styles.hideAddSub : ""} onClick={usersSubjects && usersSubjects.length === 6 ? () => null : () => setOpenSubject(true)}>Add subject</h1>
                <Link className={styles.link} to={"/doneTasks"}><img className={styles.doneTasks} src={doneTasks} alt="" /></Link>
            </header>

            <main>
                {<section className={taskSubjects.length === 0 ? styles.btnOpacity : styles.rangeSec}>
                    <h1 className={styles.tasks}>[  {taskSubjects.map((task: any, id: number) => (<p key={id}>{task.title}</p>))}  ]</h1>

                    <section className={styles.clearAndSerchBtns}>
                        {/* Tömmer hela [ ] (sökämnen) */}
                        {taskSubjects.length > 0 && <button className={styles.clearAndSerch} onClick={() => setTaskSubjects([])}>Clear</button>}
                        <button className={styles.clearAndSerch} onClick={taskSubjects.length === 0 ? () => null : () => searchTasks()}>Search tasks</button>
                    </section>

                    <h2 className={styles.rangeLevel}>{level}</h2>
                    <input className={styles.range} type="range" min={"1"} max={"5"} onChange={(e) => setLevel(e.target.value)} />
                </section>}


                {searchTaskFound && <h4 className={styles.foundTask}>Task added</h4>}
                {searchTaskNotFound && <h4 className={styles.noFoundTask}>No matching task</h4>}
                <section className={styles.mySubjects}>
                    <section className={styles.choosenSubjects}>
                        {usersSubjects &&
                            // Visar alla ämnen som valdts i SubjectModal
                            usersSubjects.map((subject: Subject | any, id: number) => (
                                <section className={styles.oneSubjectArt} key={id}>
                                    {taskSubjects.find((element: { title: string; }) => element.title === subject.title) ? <h2 onClick={() => deleteSubject(subject)}>X</h2> : <h2></h2>}
                                    <h4 onClick={() => setTaskSubjects(taskSubjects.find((element: { title: string; }) => element.title === subject.title) ? taskSubjects : () => [...taskSubjects, subject])}> {subject.title}</h4>
                                    <img className={styles.trash} onClick={() => removeSubject(subject)} src={trash} alt="" />
                                </section>
                            ))
                        }
                    </section>
                </section>
                {/* Öppnar SubjectModal där man väljer favoritämnen. Tonas ut när maxantal ämnen har valts */}
                {usersSubjects && usersSubjects.length === 0 && <button onClick={() => setOpenSubject(true)} className={styles.addSubject}>Add subjects</button>}

            </main >
            <footer>
                <section className={styles.footerSec}>
                    <Link className={styles.Link} to={"/createTask"}><h5>Create a task</h5></Link>
                    <Link className={styles.Link} to={"/allTasks"}><h5>View all tasks</h5></Link>
                    <Link to={"/"}><img onClick={() => sessionStorage.setItem("userInfo", JSON.stringify(null))} className={styles.logout} src={logout} alt="" /></Link>
                </section>
            </footer>

            {openSubjects && <SubjectsModal setOpenSubject={setOpenSubject} getAllUserInfo={() => getAllUserInfo()} />}
        </section >
    );
}

export default UserPage;