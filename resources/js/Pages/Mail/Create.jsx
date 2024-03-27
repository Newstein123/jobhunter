import { Link, router, useForm } from "@inertiajs/react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Create = ({openModal, setOpenModal}) => {
    const {data, setData} = useForm({
        'mail_address' : '',
        'username' : '',
        'password' : '',
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])

    function submit(e) {
        e.preventDefault();
        setLoading(true)
        router.post(route('mail.store'), data, {
            onSuccess : () => {
                setOpenModal(false)
                setErrors([])
                toast.success('Mail Created Successfully');
            },
            onError : (err) => {
                setErrors(err)
            }
        })
        setLoading(false)
    }
    return (
        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={submit}>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Create Mail Address
                        </h3>
                        <div>
                            {errors && errors.mail_address && 
                            <p className="text-red-700 text-center text-sm"> {errors.mail_address} </p>}
                            <div className="mb-2 block">
                                <Label htmlFor="mail_address" value="Mail Address" />
                            </div>
                            <TextInput
                                id="mail_address"
                                type="mail"
                                value={data.mail_address}
                                onChange={e => setData('mail_address', e.target.value)}
                                placeholder="name@company.com"
                            />
                        </div>
                        <div>
                        {errors && errors.username && <p className="text-red-700 text-center text-sm"> {errors.username} </p>}
                            <div className="mb-2 block">
                                <Label htmlFor="username" value="Your username" />
                            </div>
                            <TextInput 
                                id="username" 
                                type="text" 
                                value={data.username}
                                onChange={e => setData('username', e.target.value)}
                            />
                        </div>
                        <div>
                        {errors && errors.password && <p className="text-red-700 text-center text-sm"> {errors.password} </p>}
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Your password" />
                            </div>
                            <TextInput 
                                id="password" 
                                type="password" 
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            <Button color='failure'> Cancel  </Button>
                            <Button
                                color='purple'
                                type="submit"
                            >
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
