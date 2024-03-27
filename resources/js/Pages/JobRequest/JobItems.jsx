import { getJobRequestStatus, getJobRequestStatusColor } from "@/helper/helper";
import { Link } from "@inertiajs/react";
import { Badge, Table, Tooltip } from "flowbite-react";
import React, { useState } from "react";
import Edit from "./Edit";

const JobItems = ({item}) => {
    const [openModal, setOpenModal] = useState(false)
    const [editData, setEditData] = useState(0)

    const handleEditModal = (id, value) => {
        setEditData({
            id : id,
            value : value
        })
        setOpenModal(true)
    }

    return (
        <React.Fragment>
            <Edit 
                openModal={openModal}
                setOpenModal={setOpenModal}
                editData ={editData}
            />
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.id}
                </Table.Cell>
                <Table.Cell>{item.sender} </Table.Cell>
                {/* <Table.Cell> {item.receivers.map(item => (
                    <p key={item.id}> {item.text} </p>
                ))} </Table.Cell> */}
                <Table.Cell> 
                    <Tooltip content={
                        item.receivers.map(item => (
                            <p key={item.id}> {item.text} </p>
                        ))
                    }>
                        <span className="cursor-pointer"> {item.company_name}  </span>
                    </Tooltip>
                </Table.Cell>
                <Table.Cell>{item.resume} </Table.Cell>
                <Table.Cell> 
                    <Badge color="indigo">{item.position}</Badge>
                </Table.Cell>
                <Table.Cell>
                    <span> {item.mail_type == 0 ? 'Traditional' : 'Modern'} </span>
                </Table.Cell>
                <Table.Cell>
                    <Badge color={getJobRequestStatusColor(getJobRequestStatus(item.status))}>  
                        {getJobRequestStatus(item.status)} 
                    </Badge>
                     
                </Table.Cell>
                <Table.Cell>
                    <span
                        onClick={() => handleEditModal(item.id, item.status)}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                    >
                        Edit
                    </span>
                </Table.Cell>
            </Table.Row>
        </React.Fragment>
    );
};

export default JobItems;
