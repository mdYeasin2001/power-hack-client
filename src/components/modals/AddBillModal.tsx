/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FormTextInput } from "../utils/Form";
import { useAddBillMutation } from "../../feature/api/billApi";
import ButtonLoader from "../utils/loaders/ButtonLoader";
import { Bill } from "../../pages/Home";

const schema = z.object({
    fullName: z.string().min(1, "Full name is required!"),
    email: z.string().email("Enter a valid email address!"),
    phone: z.string().min(11, "Enter a valid phone number. Must be at last 11 characters!"),
    payableAmount: z.string().min(1, "Payable amount is required!"),
})

type FormData = z.infer<typeof schema>

type Props = {
    show: boolean
    handleClose: () => void
    setBills: Dispatch<SetStateAction<Bill[]>>
}
const AddBillModal = (props: Props) => {
    const { show, handleClose, setBills } = props;

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const [addBill, { isLoading, isSuccess, isError, error }] = useAddBillMutation();

    const addBillHandler = (data: FormData) => {
        addBill(data);
        handleClose();
        const bill = {
            ...data,
            _id: "Generating Id..."
        }
        setBills(prev => [bill, ...prev])
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('New Bill added successfully!')
        } else if (isError) {
            toast.error((error as any).data.message)
            console.log("request error", error);
        }
    }, [isError, isSuccess])
    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(addBillHandler)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new bill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormTextInput
                        label="Full name"
                        name="fullName"
                        placeholder="Enter full name"
                        register={register}
                        error={errors.fullName?.message}
                    />
                    <FormTextInput
                        label="Email address"
                        name="email"
                        placeholder="Enter a email address"
                        register={register}
                        error={errors.email?.message}
                    />
                    <FormTextInput
                        label="Phone number"
                        name="phone"
                        placeholder="Enter a phone number"
                        register={register}
                        error={errors.phone?.message}
                    />
                    <FormTextInput
                        label="Payable amount"
                        name="payableAmount"
                        placeholder="Enter amount"
                        register={register}
                        error={errors.payableAmount?.message}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        {isLoading ? <ButtonLoader /> : "Add"}
                    </Button>
                    <Button variant="danger" type="button" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default AddBillModal;