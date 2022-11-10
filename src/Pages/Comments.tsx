import { Link, useLocation, useNavigate } from "react-router-dom";
import thumbsUp from "../assets/thumbsUp.png"
import thumbsDown from "../assets/thumbsDown.png"
import likes from "../assets/likes.png"
import dislikes from "../assets/dislikes.png"
import profile from "../assets/profile.png"
import { useState } from "react";
import { LogInResObj, Comment, Like, DoneTask, CommentInterface, Likes, NewAccount } from "../typesAndInterfaces/interfaces"
import styles from "./Comment.module.css"
import back from "../assets/back.png"


function Comments() {
    const location = useLocation()
    const navigate = useNavigate()
    const info = location.state
    const feedbackState = location.state.task.feedback
    const [feedback, setFeedback] = useState<any>(feedbackState)
    const [feedbackUsers, setFeedbackUsers] = useState<Object[] | any>(info.task.feedbackUsers)
    const [leaveComment, setLeaveComment] = useState<boolean>(false)
    const [commentTitle, setCommentTitle] = useState<string>("")
    const [commentText, setCommentText] = useState<string>("")

    const userInfoSession: LogInResObj | any = sessionStorage.getItem("userInfo") /// ????
    const userInfo: NewAccount | any = JSON.parse(userInfoSession)

    console.log(commentTitle.length > 20);

    // Denna anväder vi för att se om an användare rean gillar eller ogillat en kommentar (sparas i task)
    let found: [] = []
    if (feedbackUsers) {
        found = feedbackUsers.filter((element: any | undefined) => element.user === userInfo._id);
    }

    //"Like or dislike" en kommentar
    async function likeComment(commentID: string, feedback: string) {
        let like: Like = {
            likeOrDislike: feedback,
            id: info.task._id,
            commentID: commentID,
            user: userInfo._id
        }
        const response = await fetch('https://brain-freeze-j7ou.onrender.com/likeComment', {
            method: 'PUT',
            body: JSON.stringify(like),
            headers: {
                "Content-Type": "application/json"
            }
        });
        //Lägger till like direkt och tar bort så man inte kan gilla igen  
        const data: DoneTask = await response.json()
        const status = response.status
        // Feedback = alla kommentarer / FeebackUsers = Alla som redan reagerat på kommentaren
        setFeedback(data.feedback);
        setFeedbackUsers(data.feedbackUsers);

        if (status === 400) {
            navigate("/404")
        }
    };

    // Hämtar dagens datum och tid på när kommentaren skrevs
    let today: Date | any = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes()
    today = time + " - " + mm + '/' + dd + '/' + yyyy

    // Läger till kommentaren
    async function addComment() {
        setLeaveComment(false)
        let comment: Comment = {
            title: commentTitle,
            comment: commentText,
            user: userInfo.firstname + " " + userInfo.lastname,
            questionId: info.task._id,
            today: today
        }
        const response = await fetch('https://brain-freeze-j7ou.onrender.com/addComment', {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data: CommentInterface[] = await response.json()
        const status = response.status

        setFeedback(data);

        if (status === 400) {
            navigate("/404")
        }
    };


    return (

        <section className={styles.container}>
            <Link to={info.backPath}><img className={styles.back} src={back} alt="" /></Link>

            <button className={styles.leaveCommentBtn} onClick={() => setLeaveComment(!leaveComment)}>{!leaveComment ? "Leave comment" : "Close"}</button>

            {leaveComment &&
                <section>
                    <input onChange={(e) => setCommentTitle(e.target.value)} type="text" maxLength={14} placeholder="Title" className={styles.titleInput} />
                    <textarea onChange={(e) => setCommentText(e.target.value)} placeholder="..." className={styles.textInput}></textarea>
                </section>

            }

            {leaveComment && <button className={styles.commentBtn} onClick={() => addComment()}>Comment</button>}

            {feedback.length !== 0 ?
                feedback.map((comment: CommentInterface, id: number) => (
                    <article className={styles.commentContainer} key={id}>

                        <section className={styles.likesAndTitle}>
                            <section className={styles.likes}>
                                <section>
                                    <p>{comment.likes}</p>
                                    <img src={likes} alt="" />
                                </section>
                                <section>
                                    <p>{comment.dislikes}</p>
                                    <img src={dislikes} alt="" />
                                </section>
                            </section>

                            <span>{comment.title}</span>
                            <h3 className={styles.timestamp}>{comment.timeStamp}</h3>
                        </section>

                        <section className={styles.commenText} >
                            <article className={styles.commentArt}>
                                <p>{comment.comment}</p>
                            </article>
                        </section>




                        <section className={styles.likeAndBrofile}>
                            {/* Kollar om man redan har gillat kommentaren. Då visas inte tumme upp / tumme ner */}
                            {!found.find((element: Likes) => element.commentId === comment._id) ? <section>
                                <img onClick={() => likeComment(comment._id, "like")} src={thumbsUp} alt="" />

                                <img onClick={() => likeComment(comment._id, "dislike")} src={thumbsDown} alt="" />
                            </section> : <h1></h1>}

                            <article className={styles.user}>
                                <h4>@{comment.user}</h4>
                                <img src={profile} alt="" />
                            </article>
                        </section>


                    </article>
                ))
                // Om ingen kommenterat än
                : <h1 className={styles.noComments}>Be the first one to comments</h1>
            }

        </section >
    );
}

export default Comments;

