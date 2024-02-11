import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CopyIcon, CheckIcon, WarningIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import RightDrawer from "./RightDrawer";
import APIRequests from "../../api";

const status = {
  warn: {
    icon: <WarningIcon className="h-5 w-5 text-white" aria-hidden="true" />,
    iconBackground: "bg-yellow-400",
  },
  success: {
    icon: <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />,
    iconBackground: "bg-green-400",
  },
  fail: {
    icon: <CloseIcon className="h-5 w-5 text-white" aria-hidden="true" />,
    iconBackground: "bg-red-400",
  },
};
const timeline = [
  {
    status: "Applied to",
    date: "Sep 20",
    status_type: "success",
  },
  {
    status: "Advanced to phone screening by",
    date: "Sep 22",
    status_type: "warn",
  },
  {
    status: "Completed phone screening with",
    date: "Sep 28",
    status_type: "fail",
  },
  {
    status: "Advanced to interview by",
    date: "Sep 30",
    status_type: "warn",
  },
];

const AdminInnerComplaint = () => {
  const [data, setData] = useState(null);
  const [fileUrl, setFileUrl] = useState("#");

  const { complaint_id } = useParams();

  const handleUpdate = (selectedOption, remark) => {
    console.log("data", data.complaint_group_id);
    console.log(selectedOption, remark);
    return APIRequests.updateComplaint(data.complaint_group_id, {
      selectedOption,
      remark,
      ...data.data,
      // data: data.data,
    });
  };

  useEffect(() => {
    APIRequests.getComplaint(complaint_id).then((res) => {
      setData(res.data.complaint);
      console.log("com", res.data.gd);

      console.log("com full data", res.data);
    });
  }, [complaint_id]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p={8}>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Heading mb={4}>{data ? data.data.complaint_title : null}</Heading>
          {/* <Heading mb={4}>-</Heading> */}
          {/* <p>-</p> */}
          <Heading mb={4}>{"(" + complaint_id + ")"}</Heading>
        </div>

        <Button onClick={onOpen} colorScheme="green">
          Add Remark
        </Button>
      </div>
      <Box className="flex flex-row-reverse">
        <div className="w-[70%] h-full">
          <div className="flow-root max-h-screen overflow-y-scroll remove-scrollbar">
            <ul role="list" className="mb-4 mx-10 mt-4">
              {timeline.map((event, eventIdx) => (
                <li key={event.id}>
                  <div className="relative pb-8">
                    {eventIdx !== timeline.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div className="text-white">
                        <span
                          className={`${
                            status[`${event.status_type}`].iconBackground
                          } h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}
                        >
                          {status[`${event.status_type}`].icon}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {event.status}{" "}
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime={event.datetime}>{event.date}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {data ? (
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className=" border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-md font-medium text-[#0262AF]">
                      Name of Complainant
                    </dt>
                    <dd className="mt-1 text-md text-gray-900">
                      {data.user_id ? data.user_id.name : null}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-md font-medium text-[#0262AF]">
                      Complaint Type
                    </dt>
                    <dd className="mt-1 text-md text-gray-900">
                      {data.data.complaint_type}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-md font-medium text-[#0262AF]">
                      Authority Name
                    </dt>
                    <dd className="mt-1 text-md text-gray-900">
                      {data.data.reporting_authority}
                    </dd>
                  </div>

                  <div className="sm:col-span-2">
                    <dt className="text-md font-medium text-[#0262AF] min-w-[60vw]">
                      Complaint Description
                    </dt>
                    <dd className="mt-1 text-md text-gray-900">
                      {/* complaint_description
                       */}
                      {data.data.complaint_description}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-md font-medium text-[#0262AF]">
                      Document
                    </dt>
                    <dd className="mt-1 text-md text-gray-900">
                      <ul
                        role="list"
                        className="border border-gray-200 rounded-md divide-y divide-gray-200"
                      >
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-md">
                          <div className="w-0 flex-1 flex items-center">
                            <CopyIcon
                              className="flex-shrink-0 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="ml-2 flex-1 w-0 truncate">
                              resume_back_end_developer.pdf
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href={data.data.file_url}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              View
                            </a>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ) : null}
        <RightDrawer
          isOpen={isOpen}
          onClose={onClose}
          data={timeline}
          handleUpdate={handleUpdate}
        />
      </Box>
    </Box>
  );
};

export default AdminInnerComplaint;
