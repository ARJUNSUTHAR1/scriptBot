import React, { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDataState } from "../../store/users/userAtom";
import { Createuser } from "../../api/user";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { userInfoState } from "../../store/user/user";
import { globalLoaderAtom } from "../../store/globalLoader/globalLoaderAtom";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { FiMenu } from "react-icons/fi";

const AllUsers = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useRecoilState(globalLoaderAtom)
  const currentUser = useRecoilValue(userInfoState) 
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pageSize, setPageSize] = useState(5); 
  const [userData, setUserData] = useRecoilState(userDataState)
  const columns = [
      { field: "username", headerName: "Name", width: 200 },
      { field: "email", headerName: "Email", width: 240 },
      { field: "role", headerName: "Role", width: 150 },
      { field: "is_active", headerName: "Active", width: 120 },
      { field: "client_id", headerName: "Client Id", width: 290 },
      {
        field: "delete",
        headerName: "Delete",
        width: 100,
        renderCell: (params) => (
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row)}
            style={{ color: "black" }}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ];

  //delete
  const handleDelete = async (user) => {
    try {
      //write delete api for user._id
      console.log(`${user.email} got deleted`)
      //update the state
      setUserData(userData.filter((item) => item.id !== user.id));
    } catch (error) {
      console.error(error);
    toast.error("An error occurred while deleting the user");
    }
  }

  const [values, setValues] = React.useState({
    username: "",
    email: "",
    client_id: currentUser.client_id,
    role : ""
  });
  console.log(values)
  const createuser = async (values) => {
    try {
      setIsLoading(true);
      // console.log("called")
      const response = await Createuser(values);
      setIsLoading(false);
      console.log(response)
      if (response.sucess) {
        toast.success(response.message);
        navigate("/admin/users");
        setUserData([...userData, response.client]);

      } else {
        console.log(response)
        toast.error(response.error);
        // throw new Error(response.message);
      }
    } catch (error) {
      // dispatch(SetLoader(false));
      console.log(error)
      toast.error(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.organisationName && values.primary_email && values.client_type) {
      createorganisation(values);
      onOpenChange(); 
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex" style={{ fontFamily: "Plus Jakarta Sans" }}>
    <button
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-50 md:hidden" // Only show on small screens
    >
      <FiMenu size={24} />
    </button>

    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          <div className="flex-1 flex flex-col  p-5">
          <Topbar />
    <div className="p-6">
      <div className="flex justify-between">
    <div className="flex-col mt-6">
      <h1 className="text-3xl font-bold text-gray-800 uppercase mb-4">
        Listed Users
      </h1>
      <p className="text-gray-500 mb-6">
        Check the status of all users currently working below you.
      </p>
      </div>
      <button
              onClick={onOpen}
              className="bg-[#0077B5] text-white text-2xl font-bold hover:bg-opacity-[0.8] mt-10  rounded-lg py-2 px-4 flex h-fit"
            >
              Invite
            </button>
            </div>

      <div className="border border-gray-300 rounded-lg shadow-lg my-6">
        <Box sx={{ width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={userData}
            rowsPerPageOptions={[5, 10, 20]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
            autoHeight
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom : 2,
            })}
          />
        </Box>
      </div>
    </div>
  </div>

  <Modal
        isOpen={isOpen}
        size="4xl"
        backdrop="opaque"
        scrollBehavior="inside"
        placement={"top-center"}
        className="h-[25rem] overflow-scroll"
      >
        <ModalContent>
          <>
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Invite New User
              </ModalHeader>
              <ModalBody className="border">
                <div className="flex justify-between gap-x-5">
                  <Input
                    size="lg"
                    classNames={{
                      label: "font-bold ",
                      input: "font-semibold text-xl pt-2",
                    }}
                    className="w-full my-4"
                    type="text"
                    label="Name of User"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    required 
                  />

                  <Input
                    size="md"
                    classNames={{
                      label: "font-bold font-3 ",
                      input: "font-semibold text-xl pt-2",
                    }}
                    className="w-full my-4"
                    type="email"
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <select
                  className="mt-4 outline-none w-full rounded-md border bg-[#f4f4f5] py-5 px-2"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  required 
                >
                  <option value="" disabled hidden>
                    Select Role 
                  </option>
                  <option value="super_admin">super_admin</option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onClick={onOpenChange}>
                  Close
                </Button>
                <Button type="submit" className="bg-[#0077B5] text-[#fff]"
                onClick={()=>createuser(values)}
                onPress={onOpenChange}
                >
                Invite
                </Button>
              </ModalFooter>
            </form>
          </>
        </ModalContent>
      </Modal>
</div>
  );
};


export default AllUsers;
