import DeleteModal from "@/Components/DeleteModal";
import { Link, router} from "@inertiajs/react";
import { Table, ToggleSwitch, Tooltip } from "flowbite-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const EmployerItems = ({ item }) => {
    const [openModal, setOpenModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [send, setSend] = useState(item.status == 1 ? true : false)

    const handleDeleteModal = (id) => {
        setDeleteId(id);
        setOpenModal(true);
    };

    const handleStatusChange = (status, id) => {
        setSend(status)
        router.put(route('employer.change-status', id), {status : status ? 1 : 0}, {
            onSuccess : () => {
                toast.success('Status updated successfully')
            },
            onError : (err) => {
                console.log(err)
            }
        })
    }
    return (
        <React.Fragment>
            <DeleteModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                id={deleteId}
                routeName="employer.delete"
            />
            <Toaster />
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.id}
                </Table.Cell>
                <Table.Cell>{item.name} </Table.Cell>
                <Table.Cell>
                    {item?.mail_address.map((item) => (
                        <p key={item.id}> {item.text} </p>
                    ))}
                </Table.Cell>
                <Table.Cell>{item.job_portal} </Table.Cell>
                <Table.Cell>{item.country} </Table.Cell>
                <Table.Cell>{item.position} </Table.Cell>
                <Table.Cell>
                    <Tooltip content={send ? 'Unsend' : 'Send'}>
                    <ToggleSwitch 
                        checked={send} 
                        onChange={status => handleStatusChange(status, item.id)} 
                    />
                    </Tooltip>
                </Table.Cell>
                <Table.Cell>
                    <a
                        onClick={() => handleDeleteModal(item.id)}
                        href="#"
                        className="font-medium text-red-600 me-3"
                    >
                        Delete
                    </a>
                    <Link
                        href={route("employer.edit", item.id)}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                        Edit
                    </Link>
                </Table.Cell>
            </Table.Row>
        </React.Fragment>
    );
};

export default EmployerItems;
