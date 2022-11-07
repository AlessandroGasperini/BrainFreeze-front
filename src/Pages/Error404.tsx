import { Link } from "react-router-dom";

// Hit skickas man vid eventuell error
function Error404() {
    return (
        <section className="modalContainer">
            <h1>Samting vänt rång</h1>

            <Link to={"/"} ><h3>Go back and try again</h3></Link>
        </section>
    );
}

export default Error404;