import { getAllJobRequestStatus } from "@/helper/helper";
import { router, useForm, usePage } from "@inertiajs/react";
import { Button, Datepicker, Select, TextInput } from "flowbite-react";
import React from "react";

const JobSearch = () => {
    const {data, setData} = useForm({
        company_name : '',
        sender_mail : '',
        status : '',
        mail_type : '',
    });
    const {url, props} = usePage();
    const mails = props.mails;

    function submit(e) {
        e.preventDefault();
        router.get(url, data, {
            preserveState : true,
            onSuccess : () => {

            },
            onError : (err) => {
                console.log(err)
            }
        })
    }
    return (
        <form onSubmit={submit}>
            <div className="flex justify-between gap-2 p-2 border-2 border-slate-600">
                <div>
                    <TextInput 
                        placeholder="Enter Company Name"
                        value={data.company_name}
                        onChange={e => setData('company_name', e.target.value)}
                    />
                </div>
                <div>
                    <Select
                        onChange={e => setData('sender_mail', e.target.value)}
                        value={data.sender_mail}
                    >
                        <option value=""> Sender Email </option>
                        {mails.map(item => (
                            <option key={item.id} value={item.id}> {item.mail_address} </option>
                        ))}
                    </Select>
                </div>
                <div>
                    <Select
                        onChange={e => setData('mail_type', e.target.value)}
                    >
                        <option value=""> Job Type </option>
                        <option value="0"> Traditional </option>
                        <option value="1"> Modern </option>
                    </Select>
                </div>
                <div>
                    <Select>
                        <option value=""> Position </option>
                    </Select>
                </div>
                <div>
                    <Select
                        onChange={e => setData('status', e.target.value)}
                        value={data.status}
                    >
                        <option value=""> Status </option>
                        {getAllJobRequestStatus().map(item => (
                            <option key={item.id} value={item.status}> {item.title} </option>
                        ))}
                    </Select>
                </div>
                <div>
                    <Select>
                        <option value=""> MailType </option>
                    </Select>
                </div>
                <div>
                    <Datepicker />
                </div>
                <div>
                    <Datepicker />
                </div>
                <Button
                    color='purple'
                    size='sm'
                    type="submit"
                >
                    Search 
                </Button>
            </div>
        </form>
    );
};

export default JobSearch;
