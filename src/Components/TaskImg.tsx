import styles from "./TaskImg.module.css"

function TaskImg(props: any) {
    const img: string = props.task

    //Om props är en SVG görs den om och displayas, om png visas den som vanligt 
    return (
        <img className={styles.svgImg} src={
            img.substring(0, 4) === "<svg" ?
                URL.createObjectURL(new Blob([img], { type: "image/svg+xml" }))
                : img
        } alt="" />

    );
}

export default TaskImg;