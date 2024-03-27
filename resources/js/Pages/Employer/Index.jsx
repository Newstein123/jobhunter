import BreadCrumb from "@/Components/BreadCrumb";
import CustomLayout from "@/Layouts/CustomLayout";
import { Button, Table } from "flowbite-react";
import React, { useState } from "react";
import Create from "./Create";
import { Toaster } from "react-hot-toast";
import EmployerItems from "./EmployerItems";
import CustomPagination from "@/Components/CustomPagination";
import BulkUpload from "./BulkUpload";

const Index = ({ employers, totalPages}) => {
    const [openModal, setOpenModal] = useState(false);
    const [openBulkModal, setOpenBulkModal] = useState(false);

    return (
        <div>
            {/* header  */}
            <div className="flex justify-between items-center my-10">
                {/* breadcrumb */}
                <div>
                    <BreadCrumb
                        data={[
                            {
                                href: "/employer",
                                name: "Employer",
                            },
                        ]}
                    />
                </div>
                <div className="flex">
                    {/* create button  */}
                    <Button className="me-3" onClick={() => setOpenModal(true)}>
                        Create
                    </Button>
                    <Button
                        color="success"
                        onClick={() => setOpenBulkModal(true)}
                    >
                        Bulk Upload
                    </Button>
                </div>
            </div>
            {/* Search Page  */}
            {/* Table  */}
            <div className="overflow-x-auto scrollbar-lg h-[500px]">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell> Id </Table.HeadCell>
                        <Table.HeadCell> Name </Table.HeadCell>
                        <Table.HeadCell> Mail Address </Table.HeadCell>
                        <Table.HeadCell> Job Portal </Table.HeadCell>
                        <Table.HeadCell> Country </Table.HeadCell>
                        <Table.HeadCell> Position </Table.HeadCell>
                        <Table.HeadCell> Status </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {employers.data.length > 0 &&
                            employers.data.map((item) => (
                                <EmployerItems key={item.id} item={item} />
                            ))}
                    </Table.Body>
                </Table>
            </div>
            {/* custom pagination  */}
            {totalPages > 1 && <CustomPagination />}
            {/* create modal  */}
            {openModal && <Create openModal={openModal} setOpenModal={setOpenModal} />}
            {openBulkModal && <BulkUpload openModal={openBulkModal} setOpenModal={setOpenBulkModal} />}
            <Toaster />
        </div>
    );
};

Index.layout = (page) => <CustomLayout children={page} />;
export default Index;
