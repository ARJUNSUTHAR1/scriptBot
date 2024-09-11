import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
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
import { useRecoilState, useRecoilValue } from "recoil";
import { Createorganisation } from "../../api/organisation";
import { toast } from "react-hot-toast";
import {globalLoaderAtom} from "../../store/globalLoader/globalLoaderAtom"
import { organisationDataState } from "../../store/organisation/organisationAtom";
import { userInfoState } from "../../store/user/user";
import IconButton from '@mui/material/IconButton';
import { Delete } from "@mui/icons-material";
import { FiMenu } from "react-icons/fi";

const Organisation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useRecoilState(globalLoaderAtom)
  const user = useRecoilValue(userInfoState)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [organisationData, setOrganisationData] = useRecoilState(
    organisationDataState
  );
  const [values, setValues] = React.useState({
    username: "",
    primary_email: "",
    service: "",
    client_id: user.id,

  });
  console.log(values)
  const createorganisation = async (values) => {
    try {
      setIsLoading(true);
      // console.log("called")
      const response = await Createorganisation(values);
      setIsLoading(false);
      console.log(response)
      if (response.sucess) {
        toast.success(response.message);
        navigate("/admin/organisation");
        setOrganisationData([...organisationData, response.client]);

      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      // dispatch(SetLoader(false));
      console.log(error)
      toast.error(error.message);
    }
  };

  const columns = [
    { uid: "name", name: "Organisation  Name", sortable: true },
    { uid: "primary_email", name: "Primary Email", sortable: true },
    { uid: "client_type", name: "Services", sortable: false },
    { uid: "client_id", name: "Client Id", sortable: false },
    { uid: "delete", name: "Delete", sortable: false },
  ];

  const renderCell = (organisationData, columnKey, index) => {
    switch (columnKey) {
      case "name":
        return organisationData.username;
      case "primary_email":
        return organisationData.primary_email;
      case "client_type":
        return organisationData.service; 
      case "client_id":
        return organisationData.client_id; 
        case "delete":
          return (
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(organisationData.id)}
              color="error"
              auto
            >
              <Delete style={{ color: "black" }} />
            </IconButton>
          );
        default:
          return null;
    }
  };

  //delete
  const handleDelete = async (id) => {
    try {
      //write delete api for .id
      console.log(`${id} got deleted`)
      //update the state
      setOrganisationData(organisationData.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    toast.error("An error occurred while deleting the user");
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
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

      <div className="flex-1 flex flex-col p-5">
        <Topbar />
        <div className="p-6">
          <div className="flex justify-between">
            <div className="mt-6 flex flex-col items-start">
              <h1 className="text-3xl font-bold text-gray-800 uppercase mb-4">
                Manage Organisation
              </h1>
              <p className="text-gray-500 mb-6">
                Check the status of all users currently working below you.
              </p>
            </div>
            <button
              onClick={onOpen}
              className="bg-[#0077B5] text-white text-2xl font-bold hover:opacity-[0.8] mt-10  rounded-lg py-2 px-4 flex h-fit"
            >
              Create
            </button>
          </div>

          <Table
            isCompact
            removeWrapper
            aria-label="Enhanced table with custom cells, pagination and sorting"
            bottomContentPlacement="outside"
            classNames={{
              base: "mt-10 max-w-[93rem] mx-auto overflow-auto shadow-md rounded-lg border border-gray-200",
              table: "min-w-[18rem]",
            }}
            selectedKeys={[]} 
            sortDescriptor={{}} 
            topContentPlacement="outside"
            onSelectionChange={() => {}} 
            onSortChange={() => {}} 
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                  className="font-semibold text-xl  text-[#333] py-3 bg-gray-100 border-b border-gray-300"
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={organisationData}>
              {(organisationData, index) => (
                <TableRow
                  key={organisationData._id}
                  className="hover:bg-gray-50 transition-colors duration-200 w-full"
                >
                  {(columnKey) => (
                    <TableCell className="p-4 border-b border-gray-200">
                      {renderCell(organisationData, columnKey, index)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
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
            {/* <form onSubmit={handleSubmit}> */}
              <ModalHeader className="flex flex-col gap-1">
                Create/Update Organisation
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
                    label="Name of Organisation"
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
                    label="Primary Email"
                    name="primary_email"
                    value={values.primary_email}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <select
                  className="mt-4 outline-none w-full rounded-md border bg-[#f4f4f5] py-5 px-2"
                  name="service"
                  value={values.service}
                  onChange={handleChange}
                  required 
                >
                  <option value="" disabled hidden>
                    Select Services 
                  </option>
                  <option value="bot">bot</option>
                  <option value="shopify">shopify</option>
                  <option value="banking">banking</option>
                </select>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onClick={onOpenChange}>
                  Close
                </Button>
                <Button type="submit" className="bg-[#0077B5] text-[#fff]"
                onClick={()=>createorganisation(values)}
                onPress={onOpenChange}
                >
                  Create
                </Button>
              </ModalFooter>
            {/* </form> */}
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Organisation;
