export interface LogInResObj {
    firstname: string
    lastname: string
    id: string
    success: boolean
    usernameExists: boolean
    subjects: string[]
    token: string
}

export interface LoginCredentials {
    username: string
    password: string
}


export interface Task {
    assignment: string
    hints: Object[]
    img: string
    level: string
    madeBy: string
    name: string
    subject: string
    title: string
    timeStamp?: string
    feedback? : any // Why why why why?? går inte med Object[]
    doneAssignment?: string
}

export interface SendSubject {
    title: string
    userId: string
    subject: string
}

export interface Subject {
    subject: string
    title: string
    _id: string
}


export  interface Comment  {
    title: string
    comment: string
    user: string
    questionId: string
    today: string
}

export  interface Like {
    likeOrDislike: string
    id: string
    commentID: string
    user:string
}

export  interface Likes {
    likeOrDislike: string
    id: string
    commentId: string
    user:string
}


export interface DoneTask {
assignment: string
comment: string
doneAssignment: string
email: string
feedback:  Object[]
feedbackUsers:  Object[]
fullName: string
hints: Object[]
id?: string 
img: string
level: string
madeBy: string
name: string
rating: number
subject: string
taskDoneBy: string
title: string
_id: string
}

export interface CommentInterface {
comment: string
dislikes: number
likes: number
timeStamp: string
title: string
user: string
_id: string
}


export interface NewAccount  {
    firstname: string
    lastname: string
    username: string
    email: string
    password: string
    subjects: []
    tasksInProgress: []
    _id?: string
}

export interface NewAccountConfirmed  {
    emailExists: boolean
    success: boolean
    usernameExists: boolean
}

export interface OneHint  {
    name: string
    url: string
}


export interface SendTasks  {
        subject: string
        level: string
        title: string
        task: {
            name: string
            assignment: string
            img: string
            hints: Object[]
            madeBy: string
        }
}


export interface Email{
    from: string
    to: string
    subject: string
    message: string
}

export interface ChangePassword  {
    email: string
    newPassword: string
}


export interface DeleteTask  {
    chosenTask: Object
    userId: string
}

export interface SearchTask {
    taskAlreadyExists: boolean
    taskFound: boolean
}

export interface  GetTaskObj  {
    level: string
    subjects:string[]
    id: string
}

export interface  Subject  {
    subject: string
    title:string
}

export interface Sub {
    id: string
    subject: string
}

export interface SendTask {
setDoneTaskModal: Function
setSendTask: Function
task: Task
}