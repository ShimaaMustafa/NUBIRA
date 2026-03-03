import { useContext } from 'react';
import { authContext } from '../../contexts/authContext';
import avatar from '/src/assets/User-avatar.svg.png'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/react";
import { useState } from "react";
import { Alert } from "@heroui/react";

export default function PostHeader({ userName, userPhoto, createdAt, deletePost, creatorId, updatePost}) {
  const {userData} = useContext(authContext)
  const [showSuccess, setShowSuccess] = useState(false);

    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
})

const handleAction = (key) => {
  if (key === "edit") {
    updatePost();
  } else if (key === "delete") {
    onOpen();
  }
};

const items = [
  {
      key: "edit",
      label: "Edit Post",
    },
  {
      key: "delete",
      label: "Delete Post",
    },
  ];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div className="flex pb-6 items-center justify-between">
          {showSuccess && (
      <div className="mb-4 absolute top-17 right-4 z-50">
      <Alert 
      color="success" 
      title="Post deleted successfully 🎉"
      />
      </div>
    )} 
            <div className="flex">
                <a className="inline-block mr-4" href="#">
                    <img onError={(e) => e.target.src = avatar} className="rounded-full max-w-none w-12 h-12 object-cover" src={userPhoto} />
                </a>
                <div className="flex flex-col">
                    <div>
                        <a className="inline-block text-lg font-bold dark:text-white" href="#">{userName}</a>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">
                        {formattedDate}
                    </div>
                </div>
            </div>
            {creatorId == userData?._id && 
            <div className="me-5">
            <Dropdown className='min-w-30'>
      <DropdownTrigger>
        <Button variant="" className="min-w-3.5 max-w-3.5 min-h-2 max-h-2 pb-2 ps-2 pe-1.75 font-bold text-lg">⋯</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem
          onClick={() => handleAction(item.key)}
            key={item.key}
            className={item.key === "delete" ? "text-danger" : ""}
            color={item.key === "delete" ? "danger" : "default"}
            
          >
            {item.label}
          </DropdownItem>
        )}
        
      </DropdownMenu>
      
    </Dropdown>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
  <ModalContent className='py-3'>
    {(onClose) => (
      <>
        <ModalHeader className='justify-center '>Estan bas 😅 </ModalHeader>
        <ModalBody className='justify-center text-center'>
          Enty keda hat2at3i el post 5ales!  
          Mafeesh undo ba3daha 👀💣
        </ModalBody>
        <ModalFooter className='justify-center '>
          <Button variant="light" onPress={onClose}>
            3andak estana d2e2a? 😅
          </Button>
          <Button
            color="secondary"
            onPress={() => {
            deletePost();
            setShowSuccess(true);
            onClose();
            setTimeout(() => {
            setShowSuccess(false);
            }, 3000);
            }}
          >
            Yalla Delete 😈
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
</Modal>
            </div>
            }
            

        </div>
    )
}
