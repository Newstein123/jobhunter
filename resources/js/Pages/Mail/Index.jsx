import CustomLayout from "@/Layouts/CustomLayout";
import {Button, Table } from "flowbite-react";
import React, { useState } from "react";
import MailItems from "./MailItems";
import BreadCrumb from "@/Components/BreadCrumb";
import Create from "./Create";
import { Toaster } from "react-hot-toast";

const Index = ({ mails }) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <div>
            {/* header  */}
            <div className="flex justify-between items-center my-10">
                {/* breadcrumb */}
                <div>
                    <BreadCrumb data={[{
                        href: '/mail',
                        name : 'Mail'
                    }]}/>
                </div>
                <div>
                    {/* create button  */}
                    <Button onClick={() => setOpenModal(true)}> Create </Button>
                </div>
            </div>
            {/* Search Page  */}
            {/* Table  */}
            <div className="overflow-x-auto">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell> Id </Table.HeadCell>
                        <Table.HeadCell> Mail Address </Table.HeadCell>
                        <Table.HeadCell> UserName </Table.HeadCell>
                        <Table.HeadCell> Password </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {mails.length > 0 &&
                            mails.map((item) => (
                                <MailItems key={item.id} item={item} />
                            ))}
                    </Table.Body>
                </Table>
            </div>
            {/* create modal  */}
            <Create 
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
            <Toaster />
        </div>
    );
};

Index.layout = (page) => <CustomLayout children={page} />;
export default Index;
