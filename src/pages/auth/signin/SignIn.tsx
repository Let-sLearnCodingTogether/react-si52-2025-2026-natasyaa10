import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink } from "react-router"
import ApiClient from "../../../utils/apiClient"

interface SignInForm {
    email : string,
    password : string
}

function SignIn() {
    const [form, setForm] = useState<SignInForm>({
        email : "",
        password : ""
    })

    const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target

        setForm({
            ...form,
            [name] : value
        })
    }

    const onSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const response = await ApiClient.post("/signin", form)

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="container mx-auto">
        <div className ="d-flex justify-content-between mb-3">
            <h1>Sign In</h1>
        </div>
        <div>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId ="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    value={form.email}
                    onChange={onHandleChange}
                        name="email"
                        type="text" 
                        placeholder="Email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    value={form.password}
                    onChange={onHandleChange}
                        name="password"
                        type="password" 
                        placeholder="Password"/>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Sign In
                </Button>
                <NavLink to="/">Sign Up</NavLink>
            </Form>
        </div>
    </div>
}

export default SignIn

