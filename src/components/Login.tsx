import { Form, Input, Button, Result } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { LoginForm } from '../types/user';
import { login } from '../store/actions/userActions';
import showError from '../utils/showErrors';
import showSuccess from '../utils/showSuccess';
import { AppState } from '../store';
import { useEffect } from 'react';

function Login() {

    const history = useHistory();
    const location = useLocation<{ newSignUp?: boolean }>();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state: AppState) => state.user)

    const onFinish = (values: LoginForm) => {
        dispatch(login(values))
    }

    useEffect(() => {
        error && showError(error);
    }, [error]);

    useEffect(() => {
        data.username && showSuccess("You have successfully login!");
    }, [error]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            history.push("/")
        }
    }, [data]);

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Login</h2>
            {location.state?.newSignUp &&
                <Result
                    status="success"
                    title="You Successfully Signup!"
                    subTitle="Please login using your credentianal"
                />}
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Login
