import DeleteModal from "@/Components/DeleteModal";
import { Link } from "@inertiajs/react";
import { Table } from "flowbite-react";
import React, { useState } from "react";

const MailItems = ({ item }) => {
    const [openModal, setOpenModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);

    const handleDeleteModal = (id) => {
        setDeleteId(id);
        setOpenModal(true);
    };
    return (
        <React.Fragment>
            <DeleteModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                id={deleteId}
                routeName="mail.delete"
            />
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.id}
                </Table.Cell>
                <Table.Cell>{item.mail_address} </Table.Cell>
                <Table.Cell>{item.username} </Table.Cell>
                <Table.Cell>{item.password} </Table.Cell>
                <Table.Cell>
                    <a
                        onClick={() => handleDeleteModal(item.id)}
                        href="#"
                        className="font-medium text-red-600"
                    >
                        Delete
                    </a>
                </Table.Cell>
                <Table.Cell>
                    <Link
                        href={route('mail.edit', item.id)}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                        Edit
                    </Link>
                </Table.Cell>
            </Table.Row>
        </React.Fragment>
    );
};

export default MailItems;
