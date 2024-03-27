import { Link, usePage } from "@inertiajs/react";
import { Avatar, Dropdown, Navbar, Sidebar } from "flowbite-react";
import React from "react";
import {
    HiInbox,
    HiShoppingBag,
    HiUser,
    HiViewBoards,
} from "react-icons/hi";

const CustomLayout = ({ children }) => {
    const {auth} = usePage().props;
    return (
        <div>
            <Navbar fluid rounded>
                    <Navbar.Brand href="https://flowbite-react.com">
                        <img
                            src="https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"
                            className="mr-3 h-6 sm:h-9"
                            alt="Flowbite React Logo"
                        />
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            Job Request Portal
                        </span>
                    </Navbar.Brand>
                    <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar
                                    alt="User settings"
                                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    rounded
                                />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">
                                    {auth.user.name}
                                </span>
                                <span className="block truncate text-sm font-medium">
                                    {auth.user.email}
                                </span>
                            </Dropdown.Header>
                            <Dropdown.Divider />
                            <Dropdown.Item as="button">
                                <Link href={route('logout')} method="post"> Logout </Link>
                            </Dropdown.Item>
                        </Dropdown>
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                        {/* add something  */}
                    </Navbar.Collapse>
            </Navbar>
            <div className="flex">
                <div>
                {/* Side bar  */}
                <Sidebar aria-label="Sidebar with logo branding example">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" icon={HiInbox} as="div">
                                <Link href="/dashboard"> Dashboard</Link>
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiViewBoards} as="div">
                                <Link href={route("mail.index")}> Mail </Link>
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiInbox} as="div">
                                <Link href={route('employer.index')}> Employers</Link>
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiUser} as="div">
                                <Link href={route('resume.index')}> Resumes </Link>
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiShoppingBag} as="div">
                                <Link href={route('job-request.index')}> Job Request </Link>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
                </div>
                {/* main content  */}
                <div className="w-full">
                    <div className="mx-3 my-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomLayout;
