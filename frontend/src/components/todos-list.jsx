import React, { useState, useEffect } from 'react';
import TodoDataService from '../services/todos';
import { Link, useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import moment from 'moment'

const TodosList = (props) => {

    const [todos, setTodos] = useState([]);
    const location = useLocation()

    useEffect(() => {
        retrieveTodos();
    }, [props.token])

    const retrieveTodos = () => {
        TodoDataService.getAll(props.token).then((response) => {
            setTodos(response.data)
        }).catch((error) => {
            console.log('something went wrong...')
        })
    }

    const deleteTodo = (todoId) => {
        TodoDataService.deleteTodo(todoId, props.token).then((response) => {
            retrieveTodos()
        }).catch((error) => {
            console.log(error)
        })
    }
    
    return (
        <Container>
            {props.token == null || props.token === "" ? (
                <Alert variant='warning'>
                    You are not log in please <Link to='/login/'>Login</Link> to see your todos
                </Alert>
            ) : (<div>
                <Link to="/todos/create/">
                    <Button variant='info' className='mb-3'>Add Todo</Button>
                </Link>
                
                {todos.map((todo) => {
                    return (
                        <Card key={todo.id} className="mb-3">
                            <Card.Body>
                                <div>
                                    <Card.Title>{todo.title}</Card.Title>
                                    <Card.Text><b>Memo:</b> {todo.memo}</Card.Text>
                                    <Card.Text>Date created: {moment(todo.created).format("Do MMMM YYYY")}</Card.Text>
                                </div>
                                <Link to={{
                                    pathname: "/todos/" + todo.id,
                                    state: {
                                        currentTodo: todo
                                    }
                                }}>
                                    <Button variant="primary" className="me-2">
                                        Edit
                                    </Button>
                                </Link>
                                <Button onClick={() => deleteTodo(todo.id)} variant="danger">
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>)}
        </Container>
    )
}


export default TodosList;
