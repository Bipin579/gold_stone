import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import axios from "axios";

import { EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";

const Users = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState(null);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const getAllUser = () => {
    axios
      .get("http://localhost:8080/api/v2/user/all-users")
      .then((res) => {
        setData(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(data);

  useEffect(() => {
    getAllUser();
  }, []);

  const handleModal = (id) => {
    onOpen();
    setId(id);
  };

  const handleUpdate = (id) => {
    let userData = {};
    if (name) {
      userData.name = name;
    }
    if (email) {
      userData.email = email;
    }
    if (gender) {
      userData.gender = gender;
    }

    if (status) {
      userData.status = status;
    }
    axios
      .patch(`http://localhost:8080/api/v2/user/edit-user/${id}`, userData)
      .then((res) => {
        console.log(res);
        getAllUser();
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCSV = () => {
    axios
      .get("http://localhost:8080/api/v2/user/get-csv", {
        responseType: "blob", // Specify the response type as blob
      })
      .then((response) => {
        // Check if the response is successful
        if (response.status === 200) {
          // Trigger the file download
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "user_master.csv";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          console.error("Error exporting User Master data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <Box>
      <Heading textAlign={"center"}>All Users Data</Heading>
      <Box maxW={"max-content"} m="auto" display={"flex"} p={6} gap={1}>
        <Text fontSize={"xl"}>Click here to get all users csv file ?</Text>
        <Button onClick={handleCSV} variant={"link"} colorScheme="teal">
          Download CSV
        </Button>
      </Box>
      <TableContainer maxW={"6xl"} margin={"auto"} pt={"6"}>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>All Users Data</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Gender</Th>
              <Th>Status</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0 &&
              data.map((el, i) => {
                return (
                  <Tr key={i}>
                    <Td>{el._id}</Td>
                    <Td>{el.name}</Td>
                    <Td>{el.email}</Td>
                    <Td>{el.gender}</Td>
                    <Td>{el.status}</Td>
                    <Td cursor="pointer" onClick={() => handleModal(el._id)}>
                      {" "}
                      <EditIcon />
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update User Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                type={"text"}
                placeholder="Enter Name"
                borderRadius="none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Enter Email"
                type={"email"}
                borderRadius="none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Input
                placeholder="Enter Gender"
                type={"text"}
                borderRadius="none"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Input
                placeholder="Update Status"
                type={"text"}
                borderRadius="none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              bg={"green"}
              borderRadius="none"
              color={"white"}
              _hover={{ bg: "grey", color: "white" }}
              mr={3}
              onClick={() => handleUpdate(id)}
            >
              Save
            </Button>
            <Button
              bg={"#152036"}
              borderRadius="none"
              color={"white"}
              _hover={{ bg: "grey", color: "white" }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Users;
