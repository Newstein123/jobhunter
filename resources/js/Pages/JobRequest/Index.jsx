import BreadCrumb from "@/Components/BreadCrumb";
import CustomLayout from "@/Layouts/CustomLayout";
import { Button, Table } from "flowbite-react";
import React, { useState } from "react";
import Create from "./Create";
import { Toaster } from "react-hot-toast";
import JobItems from "./JobItems";
import CustomPagination from "@/Components/CustomPagination";
import JobSearch from "./JobSearch";

const Index = ({jobs, totalPages, count}) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <div>
            {/* header  */}
            <div className="flex justify-between items-center my-3">
                {/* breadcrumb */}
                <div>
                    <BreadCrumb
                        data={[
                            {
                                href: "/job-request",
                                name: "Job Request",
                            },
                        ]}
                    />
                </div>
                <div>
                    {/* create button  */}
                    <Button onClick={() => setOpenModal(true)}> Create </Button>
                </div>
            </div>
            {/* Search Page  */}
            <JobSearch />
            <h1 className="text-xl my-3 font-bold"> Total Search Result : 
                <span className="font-semibold"> {count} Job Request</span> 
            </h1>
            {/* Table  */}
            <div className="overflow-x-auto scrollbar-lg h-[500px] mt-3">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell> Id </Table.HeadCell>
                        <Table.HeadCell> Sender Mail </Table.HeadCell>
                        <Table.HeadCell> Company Name </Table.HeadCell>
                        <Table.HeadCell> Resume </Table.HeadCell>
                        <Table.HeadCell> Position </Table.HeadCell>
                        <Table.HeadCell> MailType </Table.HeadCell>
                        <Table.HeadCell> Status </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {jobs.data.length > 0 &&
                            jobs.data.map((item) => (
                                <JobItems key={item.id} item={item} />
                            ))}
                    </Table.Body>
                </Table>
            </div>
            {/* custom pagination  */}
            {totalPages > 1 && <CustomPagination />}
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
