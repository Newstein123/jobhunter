import { router, useForm, usePage } from "@inertiajs/react";
import { Button, Label, Modal, Select, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13
  };
  
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Create = ({openModal, setOpenModal}) => {
    const {job_portals, countries, positions} = usePage().props;
    const [tags, setTags] = React.useState([]);
    const {data, setData} = useForm({
        'name' : '',
        'reputation' : '',
        'job_portal' : '',
        'country' : '',
        'position' : '',
    })

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])

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

    function submit(e) {
        e.preventDefault();
        setLoading(true)
        router.post(route('employer.store'), {...data, mail_address : tags}, {
            onSuccess : () => {
                setOpenModal(false)
                setErrors([])
                toast.success('Employer Created Successfully');
            },
            onError : (err) => {
                setErrors(err)
            }
        })
        setLoading(false)
    }
    return (
        <Modal
            show={openModal}
            size="lg"
            onClose={() => setOpenModal(false)}
            popup
        >
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={submit}>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Create Employer
                        </h3>
                        <div>
                            {errors && errors.name && (
                                <p className="text-red-700 text-center text-sm">
                                    {errors.name}
                                </p>
                            )}
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="name"
                                    value="Employer Name"
                                />
                            </div>
                            <TextInput
                                id="name"
                                type="mail"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="name"
                            />
                        </div>
                        {/* address  */}
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="mail_address"
                                    value="Employer Mail Addres"
                                />
                            </div>
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
                        {/* reputation */}
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="reputation"
                                    value="Your reputation"
                                />
                            </div>
                            <Textarea
                                id="reputation"
                                type="reputation"
                                value={data.reputation}
                                onChange={(e) =>
                                    setData("reputation", e.target.value)
                                }
                            />
                        </div>
                        {/* job portals  */}
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="mail_address"
                                    value="Choose Job Portal"
                                />
                            </div>
                            <Select onChange={e => setData('job_portal', e.target.value)}>
                                <option value=""> Select Job Portal </option>
                                {job_portals.map((item, index) => (
                                    <option key={index} value={item}> {item} </option>
                                ))}
                            </Select>
                        </div>
                        {/* countries  */}
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="mail_address"
                                    value="Choose Countries"
                                />
                            </div>
                            <Select onChange={e => setData('country', e.target.value)}>
                                <option value=""> Select Country </option>
                                {countries.map((item, index) => (
                                    <option key={index} value={item}> {item} </option>
                                ))}
                            </Select>
                        </div>
                        {/* positions  */}
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="positions"
                                    value="Choose Position"
                                />
                            </div>
                            <Select onChange={e => setData('position', e.target.value)}>
                                <option value=""> Select Position </option>
                                {positions.map((item, index) => (
                                    <option key={index} value={item}> {item} </option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            <Button color="failure"> Cancel </Button>
                            <Button color="purple" type="submit">
                                Create Employer
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default Create;
