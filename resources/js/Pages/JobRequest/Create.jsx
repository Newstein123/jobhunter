import {router, useForm, usePage } from "@inertiajs/react";
import {
    Button,
    Label,
    Modal,
    Select,
    ToggleSwitch,
    Alert
} from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Create = ({ openModal, setOpenModal }) => {
    const { mails, employers, resumes, subjectLines } = usePage().props;
    const [subjects, setSubjects] = useState(subjectLines.traditional);
    const [mailType, setMailType] = useState(false); // true for modern | false for traditional 
    const {url} = usePage();
    const initData = {
        sender_id: "",
        receipt_ids: [],
        resume_id: "",
        status: 0,
        subject_line: "",
    };
    const { data, setData } = useForm(initData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleSelectedValues = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions).map(
            (option) => option.value
        );
        setData("receipt_ids", selectedValues);
    };

    function submit(e) {
        e.preventDefault();
        setLoading(true);
        router.post(route("job-request.store"), {...data, mailType : mailType}, {
            onSuccess: () => {
                setOpenModal(false);
                setErrors([]);
                setData(initData);
                toast.success("Job Requested Successfully");
            },
            onError: (err) => {
                setErrors(err);
            },
        });
        setLoading(false);
    }

    const handleMailTypeChange = (status) => {
        router.get(url, {job_portal : status ? 'Database' : ''}, {
            preserveState : true,
            onSuccess : () => {
                setMailType(status)
                if(status) {
                    setSubjects(subjectLines.modern)
                } else {
                    setSubjects(subjectLines.traditional)
                }
            },
            onError : (err) => {
                console.log(err)
            }
        })
    }

    const handleDraft = () => {
        router.put(route('job-request.save-draft'), data, {
            onSuccess : () => {
                toast.success('Draft save successfully');
            },
            onError : (err) => {
                console.log(err)
            }
        })
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
                            Send JobRequest to Employer 
                        </h3>
                        <Alert color="failure" onDismiss={() => alert('Alert dismissed!')}>
                            Send Traditional Email Between 6:00 AM to 10:30 AM  and Modern Mail Between 11:30 AM and 3:30 PM 
                        </Alert>
                        {/* toggle switch  */}
                        <ToggleSwitch
                            checked={mailType}
                            label={!mailType ? "Traditional Mail" : "Modern Mail"}
                            onChange={(status) => handleMailTypeChange(status)}
                        />
                        {/* subject Lines  */}
                        <div>
                            {errors && errors.subjectLines && (
                                <p className="text-red-700 text-center text-sm">
                                    {errors.subjectLines}
                                </p>
                            )}
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="subjectLines"
                                    value="Select Subject Line"
                                />
                            </div>
                            <Select
                                value={data.subject_line}
                                onChange={(e) =>
                                    setData("subject_line", e.target.value)
                                }
                            >
                                <option value=""> Choose Subject Line </option>
                                {subjects.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        {/* mail address  */}
                        <div>
                            {errors && errors.mail_address && (
                                <p className="text-red-700 text-center text-sm">
                                    {errors.mail_address}
                                </p>
                            )}
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="mail_address"
                                    value="Sender Mail Address"
                                />
                            </div>
                            <Select
                                value={data.sender_id}
                                onChange={(e) =>
                                    setData("sender_id", e.target.value)
                                }
                            >
                                <option value=""> Select One </option>
                                {mails.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        
                                        {item.mail_address}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            {errors && errors.username && (
                                <p className="text-red-700 text-center text-sm">
                                    {errors.username}
                                </p>
                            )}
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="username"
                                    value="Receiptient Mail Address"
                                />
                            </div>
                            <Select
                                value={data.receipt_ids}
                                onChange={(e) => handleSelectedValues(e)}
                                multiple
                            >
                                <option value=""> Select One </option>
                                {employers.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
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
                                    htmlFor="resume"
                                    value="Select Your Resume"
                                />
                            </div>
                            <Select
                                value={data.resume_id}
                                onChange={(e) =>
                                    setData("resume_id", e.target.value)
                                }
                            >
                                <option value=""> Choose one of your resume </option>
                                {resumes.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            <Button color="failure"> Cancel </Button>
                            <Button 
                                color='success'
                                type="button"
                                onClick={handleDraft}
                            >
                                    Save As Draft
                            </Button>
                            <Button color="purple" type="submit">
                                {loading ? "Sending" : "Send"}
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default Create;
