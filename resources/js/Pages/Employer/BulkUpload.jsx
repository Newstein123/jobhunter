import { router, useForm } from "@inertiajs/react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import React from "react";
import toast from "react-hot-toast";

const BulkUpload = ({ openModal, setOpenModal }) => {
    const { data, setData } = useForm({
        file: "",
    });

    function submit(e) {
        e.preventDefault();
        router.post(route("employer.bulk-upload"), data, {
            onSuccess: () => {
                setOpenModal(false);
                toast.success("Bulk Uploaded Successfully");
            },
            onError: (err) => {
                console.log(err);
            },
        });
    }
    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
            <Modal.Header> Bulk Upload Employer </Modal.Header>
            <Modal.Body>
                <form onSubmit={submit}>
                    <Label> Upload Excel File </Label>
                    <TextInput
                        type="file"
                        size="sm"
                        helperText="please upload excel file only"
                        className="mt-3"
                        onChange={(e) => setData("file", e.target.files[0])}
                    />
                    <div className="flex justify-between mt-5">
                        <Button
                            color="failure"
                            onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button color="purple" type="submit">
                            Upload
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default BulkUpload;
