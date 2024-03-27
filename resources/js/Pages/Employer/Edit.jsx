import BreadCrumb from "@/Components/BreadCrumb";
import CustomLayout from "@/Layouts/CustomLayout";
import { Link, router, useForm } from "@inertiajs/react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13
  };
  
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Edit = ({employer, job_portals, countries, positions}) => {
    const [tags, setTags] = useState(JSON.parse(employer.mail_address))
    const {data, setData} = useForm({
        'name' : employer.name,
        'reputation' : employer.reputation,
        'job_portal' : employer.job_portal,
        'country' : employer.country,
        'position' : employer.position,
    })

    function submit(e) {
        e.preventDefault();
        router.put(route('employer.update',  employer.id), {
            ...data,
            mail_address : tags
        } , {
            onSuccess : () => {
                toast.success('Employer Updated Successfully');
            },
            onError : (err) => {
                console.log(err)
            }
        })
    }

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        // re-render
        setTags(newTags);
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    return (
        <React.Fragment>
            <Toaster />
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
                            {
                                href : "/employer/edit",
                                name : 'Edit'
                            }
                        ]}
                    />
                </div>
                <div>
                    {/* create button  */}
                    <Link href={route('mail.index')} className="text-red-700"> Back </Link>
                </div>
            </div>
            {/* form */}
            <form onSubmit={submit}>
                {/* mail address  */}
                <div className="my-3">
                    <Label> Company Name </Label>
                    <TextInput 
                        type="name"
                        placeholder="company's name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="my-3"
                    />
                </div>
                {/* username  */}
                <div className="my-3">
                    <Label> Company Mail Address </Label>
                    <ReactTags
                        tags={tags}
                        delimiters={delimiters}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        handleTagClick={handleTagClick}
                        inputFieldPosition="top"
                        autocomplete
                    />
                </div>
                {/* mail address  */}
                <div className="my-3">
                    <Label> Reputation </Label>
                    <Textarea 
                        type="text"
                        placeholder="company's reputation here"
                        value={data.reputation}
                        onChange={e => setData('reputation', e.target.value)}
                        className="my-3"
                    />
                </div>
                {/* Job Portal  */}
                <div className="my-3">
                    <Label> Job Portal </Label>
                    <Select 
                        value={data.job_portal}
                        onChange={e => setData('job_portal', e.target.value)}
                        className="my-3"
                    >
                        <option value=""> Select Job Portal </option>
                        {job_portals.map((item, index) => (
                            <option key={index} value={item}> {item} </option>
                        ))}
                    </Select>
                </div>
                {/* Country  */}
                <div className="my-3">
                    <Label> Country </Label>
                    <Select 
                        value={data.country}
                        onChange={e => setData('country', e.target.value)}
                        className="my-3"
                    >
                        <option value=""> Select Country </option>
                        {countries.map((item, index) => (
                            <option key={index} value={item}> {item} </option>
                        ))}
                    </Select>
                </div>
                {/* Position  */}
                <div className="my-3">
                    <Label> Position </Label>
                    <Select 
                        value={data.position}
                        onChange={e => setData('position', e.target.value)}
                        className="my-3"
                    >
                        <option value=""> Select Position </option>
                        {positions.map((item, index) => (
                            <option key={index} value={item}> {item} </option>
                        ))}
                    </Select>
                </div>
                <div className="flex justify-end">
                    <Button type="submit"> Update </Button>
                </div>
            </form>
        </React.Fragment>
    );
};

Edit.layout = (page) => <CustomLayout children={page} />;
export default Edit;
