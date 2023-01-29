import AppLayout from "../layouts/AppLayout";
import { Table, Button } from "react-bootstrap";
import { FormTextInput } from "../components/utils/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PrivateTemplate from "../templates/PrivateTemplate";

const schema = z.object({
    query: z.string().min(5, "Enter a valid username. Must be at least 5 characters!"),
})

type FormData = z.infer<typeof schema>

const Home = () => {
    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const searchHandler = (data: FormData) => console.log(data);
    return (
        <PrivateTemplate>
            <AppLayout>
                <div>
                    <div className="d-flex justify-content-between algin-items-center mb-3 bg-light p-2 rounded">
                        <div className="d-flex algin-items-center">
                            <h3 className="display-6 fs-4 me-5">Billings</h3>
                            <div>
                                <form onSubmit={handleSubmit(searchHandler)}>
                                    <FormTextInput
                                        register={register}
                                        name="query"
                                        mbNone
                                        placeholder="Search"
                                    />
                                </form>
                            </div>
                        </div>
                        <Button variant="dark">Add New Bill</Button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Billing ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Paid Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </AppLayout>
        </PrivateTemplate>
    );
};

export default Home;