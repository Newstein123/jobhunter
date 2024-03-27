import { Link, router, useForm, usePage } from "@inertiajs/react";
import {
    Button,
    Checkbox,
    FileInput,
    Label,
    Modal,
    Select,
    TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Create = ({ openModal, setOpenModal }) => {
    const { mails } = usePage().props;
    const { data, setData } = useForm({
        name: "",
        custom_mail_id: "",
        resume: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    function submit(e) {
        e.preventDefault();
        setLoading(true);
        router.post(route("resume.store"), data, {
            forceFormData : true,
            onSuccess: () => {
                setOpenModal(false);
                setErrors([]);
                toast.success("Resume Uploaded Successfully");
            },
            onError: (err) => {
                setErrors(err);
            },
        });
        setLoading(false);
    }
    return (
        <Modal
            show={openModal}
            size="lg"
            onClose={() => setOpenModal(false)}
            popup
        >
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={submit}>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Add Resume
                        </h3>
                        <div>
                            {errors && errors.name && (
                                <p className="text-red-700 text-center text-sm">
                                    {" "}
                                    {errors.name}{" "}
                                </p>
                            )}
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="name"
                                    value="Enter resume name"
                                />
                            </div>
                            <TextInput
                                id="name"
                                type="mail"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Enter resume name"
                            />
                        </div>
                        <div>
                            {errors && errors.custom_mail_id && (
                                <p className="text-red-700 text-center text-sm">
                                    {errors.custom_mail_id}
                                </p>
                            )}
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="custom_mail_id"
                                    value="Choose Mail"
                                />
                            </div>
                            <Select 
                                onChange={(e) =>
                                    setData("custom_mail_id", e.target.value)
                                }
                            >
                                {mails.map(item => (
                                    <option value={item.id}> {item.mail_address} </option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            {errors && errors.password && (
                                <p className="text-red-700 text-center text-sm">
                                    {errors.password}
                                </p>
                            )}
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="password"
                                    value="Your password"
                                />
                            </div>
                            <div className="flex w-full items-center justify-center">
                                <Label
                                    htmlFor="dropzone-file"
                                    className="dark:hover:bg-bray-800 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                        <svg
                                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">
                                                Click to upload
                                            </span>
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Pdf (MAX.
                                            800x400px)
                                        </p>
                                    </div>
                                    <FileInput
                                        id="dropzone-file"
                                        className="hidden"
                                        itemType="pdf"
                                        onChange={e => setData('resume', e.target.files[0])}
                                    />
                                </Label>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            <Button color="failure"> Cancel </Button>
                            <Button color="purple" type="submit">
                                Create account
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default Create;
