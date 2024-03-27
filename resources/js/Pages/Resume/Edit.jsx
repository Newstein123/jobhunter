import React, { useState } from "react";
import BreadCrumb from "@/Components/BreadCrumb";
import PdfViewer from "@/Components/PdfViewer";
import CustomLayout from "@/Layouts/CustomLayout";
import { Link, router, useForm } from "@inertiajs/react";
import { Button, FileInput, Label, Modal, Select, TextInput } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";

const Edit = ({ resume, mails }) => {
    const { data, setData } = useForm({
        name: resume.data.name,
        custom_mail_id: resume.data.custom_mail_id,
        resume: resume.data.resume,
    });
    const [openModal, setOpenModal] = useState(false);

    function submit(e) {
        e.preventDefault();
        router.post(route("resume.update", resume.data.id), data, {
            onSuccess: () => {
                toast.success("Resume Updated Successfully");
            },
            onError: (err) => {
                console.log(err);
            },
        });
    }

    return (
        <React.Fragment>
            <Toaster />
            {/* header  */}
            <div className="flex justify-between items-center my-10">
                {/* breadcrumb */}
                <div>
                    <BreadCrumb
                        data={[
                            {
                                href: "/resume-cc",
                                name: "Resume",
                            },
                            {
                                href: "/resume-cc/edit",
                                name: "Edit",
                            },
                        ]}
                    />
                </div>
                <div>
                    {/* create button  */}
                    <Link href={route("mail.index")} className="text-red-700">
                        {" "}
                        Back{" "}
                    </Link>
                </div>
            </div>
            {/* form */}
            <form onSubmit={submit}>
                {/* mail address  */}
                <div className="my-3">
                    <Label> Name </Label>
                    <TextInput
                        type="text"
                        placeholder="Enter resume name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="my-3"
                    />
                </div>
                {/* custom_mail_id  */}
                <div className="my-3">
                    <Label> Your Mail Address </Label>
                    <Select 
                        value={data.custom_mail_id} 
                        onChange={e => setData('custom_mail_id', e.target.value)}
                    >
                        <option value=""> Select mail address </option>
                        {mails.map((item) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {" "}
                                {item.mail_address}{" "}
                            </option>
                        ))}
                    </Select>
                </div>
                {/* mail address  */}
                <div className="my-3">
                    <Label> Image </Label>
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
                                    Pdf (MAX. 800x400px)
                                </p>
                            </div>
                            <FileInput
                                id="dropzone-file"
                                className="hidden"
                                itemType="pdf"
                                onChange={(e) =>
                                    setData("resume", e.target.files[0])
                                }
                            />
                        </Label>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="submit"> Update </Button>
                </div>
            </form>
            {/* current file  */}
            <Button 
              onClick={() => setOpenModal(true)}
              color='purple'
            > Preview </Button>
            {/* Pdf preview  */}
            <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
                <Modal.Header> Your Resume </Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <PdfViewer path={data.resume} />
                  </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

Edit.layout = (page) => <CustomLayout children={page} />;
export default Edit;
