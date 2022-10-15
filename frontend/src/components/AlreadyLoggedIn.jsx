import { Alert, Button } from "react-bootstrap"

const AlreadyLoggedIn = () => {
    return (
        <div>
            <h2>User already logged In</h2>
            <Alert.Link href="http://localhost:3000/todos">
                <Button variant="warning">Continue</Button>
            </Alert.Link>
        </div>
    )
}

export default AlreadyLoggedIn