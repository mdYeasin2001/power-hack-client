import { FormTextInput } from "../components/utils/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "react-bootstrap";
import AppLayout from "../layouts/AppLayout";

const schema = z.object({
    email: z.string().email("Enter a valid email address!"),
    password: z.string().min(8, "Password must be at least 8 characters!")
})

type FormData = z.infer<typeof schema>

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const loginHandler = (data: FormData) => console.log(data);
    return (
        <AppLayout>
            <div className="row">
                <div className="col-md-5 mx-auto">
                    <div className="border rounded p-4">
                        <h3 className="display-6 text-center fs-3 mb-3">Login</h3>
                        <form onSubmit={handleSubmit(loginHandler)}>
                            <FormTextInput
                                label="Your email address"
                                name="email"
                                placeholder="Enter your email address"
                                register={register}
                                error={errors.email?.message}
                            />
                            <FormTextInput
                                label="Your password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                register={register}
                                error={errors.password?.message}
                            />
                            <Button variant="primary w-100" type="submit">Login</Button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Login;