import { Alert } from "react-bootstrap"
import { Link } from "react-router-dom"


const AlreadyLoggedIn = () => {
    return (
        <div>
            <Alert> User Already logged In <Alert.Link href="http://localhost:3000/"> See Todos</Alert.Link></Alert>
        </div>
    )
}

export default AlreadyLoggedIn