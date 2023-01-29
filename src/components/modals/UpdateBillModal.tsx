/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { FormTextInput } from "../utils/Form";
import { useUpdateBillMutation } from "../../feature/api/billApi";
import ButtonLoader from "../utils/loaders/ButtonLoader";

const schema = z.object({
    fullName: z.string().min(1, "Full name is required!"),
    email: z.string().email("Enter a valid email address!"),
    phone: z.string().min(11, "Enter a valid phone number. Must be at last 11 characters!"),
    payableAmount: z.string().min(1, "Payable amount is required!"),
})

type FormData = z.infer<typeof schema>

type Props = {
    show: boolean
    handleClose: () => void,
    data: {
        id: string
        fullName: string
        email: string
        phone: string
        payableAmount: string
    }
}
const UpdateBillModal = (props: Props) => {
    const { show, handleClose, data: { id, fullName, email, phone, payableAmount } } = props;

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName,
            email,
            phone,
            payableAmount
        }
    });
    const [updateBill, { isLoading, isSuccess, isError, error }] = useUpdateBillMutation();

    const updateBillHandler = (data: FormData) => updateBill({ id, data })

    useEffect(() => {
        if (isSuccess) {
            toast.success('Bill updated successfully!')
            handleClose();
        } else if (isError) {
            toast.error((error as any).data.message)
            console.log("request error", error);
        }
    }, [isError, isSuccess])
    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(updateBillHandler)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update bill</Modal.Title>
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
                        {isLoading ? <ButtonLoader /> : "Save Changes"}
                    </Button>
                    <Button variant="danger" type="button" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default UpdateBillModal;