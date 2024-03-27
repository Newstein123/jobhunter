import { getAllJobRequestStatus } from "@/helper/helper";
import { router } from "@inertiajs/react";
import { Badge, Button, Label, Modal, Radio} from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

const Edit = ({ openModal, setOpenModal, editData }) => {
    const [status, setStatus] = useState(editData.value);
    const data = getAllJobRequestStatus();
    const checkStatus = (status) => {
      if(status == editData.value) {
        return true;
      }
      return false;
    }

    const handleUpdate = () => {
      router.put(route('job-request.update', editData.id), {status : status}, {
        onSuccess : () => {
          toast.success('Status Updated Successfully');
          setOpenModal(false)
        },
        onError : (err) => {
          console.log(err)
        }
      } )
    }

    return (
        <Modal 
          show={openModal} 
          onClose={() => setOpenModal(false)} 
          popup>
            <Modal.Header> Edit Status </Modal.Header>
            <Modal.Body>
                <fieldset className="flex max-w-md flex-col gap-4">
                    <legend className="mb-4">
                        Choose your favorite country
                    </legend>
                    {data.map(item => (
                      <div className="flex items-center gap-2" key={item.id}>
                          <Radio
                              id={item.id}
                              name='status'
                              value={item.status}
                              onChange={e => setStatus(e.target.value)}
                          />
                          <Label htmlFor={item.title}> 
                            {item.title} 
                            <span className="my-2">
                            {checkStatus(item.status) ? <Badge> Current Status </Badge> : ''}
                            </span>
                          </Label>
                      </div>
                    ))}
                </fieldset>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => handleUpdate()}> Update </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Edit;
