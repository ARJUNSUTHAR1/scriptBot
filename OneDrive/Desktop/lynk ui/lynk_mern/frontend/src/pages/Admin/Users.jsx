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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  Textarea,
  Switch,
  Tooltip,
  image,
} from "@nextui-org/react";
import { userInfoState } from "../../store/user/user";
import { globalLoaderAtom } from "../../store/globalLoader/globalLoaderAtom";

const AllUsers = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useRecoilState(globalLoaderAtom)
  const currentUser = useRecoilValue(userInfoState) 
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
// >>>>>>> 79877442e4457da221f2707188c67995fc0580ef
  const [pageSize, setPageSize] = useState(5); 
  const [userData, setUserData] = useRecoilState(userDataState)
  const columns = useMemo(
    () => [
      { field: "username", headerName: "Name", width: 240 },
      { field: "email", headerName: "Email", width: 240 },
      { field: "role", headerName: "Role", width: 150 },
      { field: "is_active", headerName: "Active", width: 150 },
      { field: "client_id", headerName: "Client Id", width: 150 },
    ],
    []
  );

  // const users = [
  //   {
  //     id: 1,
  //     email: "mihirnebani@gmail.com",
  //     active: "Yes",
  //     Organization: "ChatBot",
  //     Roles: "Agent",
  //     Update: "Re-invite",
  //   },
  //   {
  //     id: 2,
  //     email: "john.doe@example.com",
  //     active: "No",
  //     Organization: "Shopito",
  //     Roles: "Admin",
  //     Update: "Re-invite",
  //   },
  //   {
  //     id: 3,
  //     email: "jane.smith@example.com",
  //     active: "Yes",
  //     Organization: "LynkApp",
  //     Roles: "User",
  //     Update: "Re-invite",
  //   },
  //   {
  //     id: 4,
  //     email: "alice.wonderland@example.com",
  //     active: "No",
  //     Organization: "ChatBot",
  //     Roles: "User",
  //     Update: "Re-invite",
  //   },
  //   {
  //     id: 5,
  //     email: "bob.builder@example.com",
  //     active: "Yes",
  //     Organization: "Shopito",
  //     Roles: "Agent",
  //     Update: "Re-invite",
  //   },
  //   {
  //     id: 6,
  //     email: "eve.adams@example.com",
  //     active: "Yes",
  //     Organization: "LynkApp",
  //     Roles: "Admin",
  //     Update: "Re-invite",
  //   },
  // ];
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

  return (
    <div className="flex" style={{ fontFamily: "Plus Jakarta Sans" }}
    >
          <Sidebar />
          <div className="flex-1 flex flex-col ml-64 p-5">
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
              className="bg-purple-600 text-white text-2xl font-bold hover:bg-purple-500 mt-10  rounded-lg py-2 px-4 flex h-fit"
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
                <Button type="submit" className="bg-purple-600 text-[#fff]"
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
