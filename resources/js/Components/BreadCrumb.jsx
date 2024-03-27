import { Link } from "@inertiajs/react";
import { Breadcrumb } from "flowbite-react";
import React from "react";
import { HiHome } from "react-icons/hi";

const BreadCrumb = ({data}) => {
    return (
        <div>
            <Breadcrumb aria-label="Default breadcrumb example">
                <Breadcrumb.Item href="/dashboard" icon={HiHome} as="div">
                    <Link href="/dashboard"> Home </Link>
                </Breadcrumb.Item>
                {data.map(item => (
                    <Breadcrumb.Item href={item.href} key={item.name} as="div"> 
                        <Link href={item.href}> {item.name}  </Link>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </div>
    );
};

export default BreadCrumb;
