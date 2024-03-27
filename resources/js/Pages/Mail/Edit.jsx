import BreadCrumb from "@/Components/BreadCrumb";
import CustomLayout from "@/Layouts/CustomLayout";
import { Link, router, useForm } from "@inertiajs/react";
import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const Edit = ({mail}) => {
    const {data, setData} = useForm({
        'mail_address' : mail.mail_address,
        'username' : mail.username,
        'password' : mail.password,
    })

    function submit(e) {
        e.preventDefault();
        router.put(route('mail.update',  mail.id),data, {
            onSuccess : () => {
                toast.success('Mail Updated Successfully');
            },
            onError : (err) => {
                console.log(err)
            }
        })
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
                                href: "/mail",
                                name: "Mail",
                            },
                            {
                                href : "/mail/edit",
                                name : 'Edit'
                            }
                        ]}
                    />
                </div>
                <div>
                    {/* create button  */}
                    <Link href={route('mail.index')} className="text-red-700"> Back </Link>
                </div>
            </div>
            {/* form */}
            <form onSubmit={submit}>
                {/* mail address  */}
                <div className="my-3">
                    <Label> Your Mail Address </Label>
                    <TextInput 
                        type="email"
                        placeholder="name@gmail.com"
                        value={data.mail_address}
                        onChange={e => setData('mail_address', e.target.value)}
                        className="my-3"
                    />
                </div>
                {/* username  */}
                <div className="my-3">
                    <Label> Your Mail Address </Label>
                    <TextInput 
                        type="text"
                        placeholder="minthetpaing@gmail.com"
                        value={data.username}
                        onChange={e => setData('username', e.target.value)}
                        className="my-3"
                    />
                </div>
                {/* mail address  */}
                <div className="my-3">
                    <Label> Password </Label>
                    <TextInput 
                        type="text"
                        placeholder="******"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        className="my-3"
                    />
                </div>
                <div className="flex justify-end">
                    <Button type="submit"> Update </Button>
                </div>
            </form>
        </React.Fragment>
    );
};

Edit.layout = (page) => <CustomLayout children={page} />;
export default Edit;
