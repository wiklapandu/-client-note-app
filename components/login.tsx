import { ErrorMessage, Field, Form, Formik } from "formik";
import InputField from "./fields/input";
import Button from "./fields/button";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function LoginComponent() {
    return (
        <div className="absolute flex items-center w-screen h-screen bg-black bg-opacity-30">
            <div className="w-1/2 mx-auto min-h-20 bg-white p-4 rounded-xl">
                <Formik
                initialValues={{username: '', password: ''}}
                onSubmit={(value: any, {setSubmitting}: any) => {
                    const toastLoading = toast.loading("Please wait...");

                    axios.post('http://localhost:3000/auth/login', {
                        username: value.username,
                        password: value.password,
                    }).then((res: AxiosResponse) => {
                        localStorage.setItem('token', res.data.token);
                        setSubmitting(false);
                        toast.update(toastLoading, {
                            render: res.data.message,
                            type: 'success',
                            isLoading: false,
                            autoClose: 2000,
                            onClose: () => {
                                location.reload();
                            }
                        })
                    }).catch((xhr: any) => {
                        toast.update(toastLoading, {
                            render: xhr.response.data.message,
                            type: 'error',
                            isLoading: false,
                            autoClose: 2000,
                        })
                        setSubmitting(false);
                    })
                }}
                >
                    {({isSubmitting}: {isSubmitting: boolean}) => (
                        <Form>
                            <Field type="text" name="username" label="Username" component={InputField} />
                            <ErrorMessage name="username" component={"div"}/>
                            <Field type="password" name="password" label="Password" component={InputField} />
                            <ErrorMessage name="password" component={"div"}/>
                            <Button type="submit" disabled={isSubmitting}>Login</Button>
                        </Form>
                    )}
                </Formik>
            </div>

            <ToastContainer />
        </div>
    );
}