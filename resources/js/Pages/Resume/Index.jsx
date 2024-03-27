import CustomLayout from "@/Layouts/CustomLayout";
import {Button, Table } from "flowbite-react";
import React, { useState } from "react";
import BreadCrumb from "@/Components/BreadCrumb";
import Create from "./Create";
import { Toaster } from "react-hot-toast";
import ResumeItems from "./ResumeItems";

const Index = ({ resumes }) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <div>
            {/* header  */}
            <div className="flex justify-between items-center my-10">
                {/* breadcrumb */}
                <div>
                    <BreadCrumb data={[{
                        href: '/resume',
                        name : 'Resume'
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
                        <Table.HeadCell> Name </Table.HeadCell>
                        <Table.HeadCell> Mail Address </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {resumes.length > 0 &&
                            resumes.map((item) => (
                                <ResumeItems key={item.id} item={item} />
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
