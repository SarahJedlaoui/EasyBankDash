"use client";
import { useState } from "react";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  VStack,
  Heading,
  Select
} from "@chakra-ui/react";
import * as React from 'react';
import Slider from '@mui/material/Slider';

interface Client {
  id: number;
  name: string;
  phone: string;
  residence: string;
  amount: number;
  status: string;
  notes: string;
}


const clientData = [
  {
    id: 1,
    name: "Aymen Ben Ali",
    phone: "+216 20 123 456",
    residence: "Tunis",
    amount: 5000,
    status: "Contacted",
    notes: "",
  },
  {
    id: 2,
    name: "Sarra Mansour",
    phone: "+216 25 654 789",
    residence: "Sfax",
    amount: 3200,
    status: "Done",
    notes: "",
  },
  {
    id: 3,
    name: "Mehdi Trabelsi",
    phone: "+216 50 987 654",
    residence: "Sousse",
    amount: 4500,
    status: "Rejected",
    notes: "",
  },
  {
    id: 4,
    name: "Nour Ben Slimane",
    phone: "+216 21 654 321",
    residence: "Ariana",
    amount: 6000,
    status: "Contacted",
    notes: "",
  },
  {
    id: 5,
    name: "Rania Chaouch",
    phone: "+216 29 321 123",
    residence: "Monastir",
    amount: 7000,
    status: "Done",
    notes: "",
  },
  {
    id: 6,
    name: "Hamdi Gharbi",
    phone: "+216 23 456 789",
    residence: "Gabes",
    amount: 8000,
    status: "Rejected",
    notes: "",
  },
  {
    id: 7,
    name: "Amine Zoghlami",
    phone: "+216 55 234 567",
    residence: "Kairouan",
    amount: 9000,
    status: "Contacted",
    notes: "",
  },
  {
    id: 8,
    name: "Amira Belhaj",
    phone: "+216 97 876 543",
    residence: "Bizerte",
    amount: 10000,
    status: "Done",
    notes: "",
  },
  {
    id: 9,
    name: "Fares Jlassi",
    phone: "+216 98 432 109",
    residence: "Gafsa",
    amount: 11000,
    status: "Rejected",
    notes: "",
  },
  {
    id: 10,
    name: "Sana Belkacem",
    phone: "+216 58 123 987",
    residence: "Kasserine",
    amount: 12000,
    status: "Contacted",
    notes: "",
  },
  {
    id: 11,
    name: "Iheb Bouzidi",
    phone: "+216 94 345 678",
    residence: "Nabeul",
    amount: 13000,
    status: "Done",
    notes: "",
  },
  {
    id: 12,
    name: "Mariem Ben Jemia",
    phone: "+216 21 098 765",
    residence: "Mahdia",
    amount: 4000,
    status: "Contacted",
    notes: "",
  },
  {
    id: 13,
    name: "Yassine Derbel",
    phone: "+216 55 987 321",
    residence: "Zarzis",
    amount: 14000,
    status: "Rejected",
    notes: "",
  },
  {
    id: 14,
    name: "Olfa Bahloul",
    phone: "+216 99 654 321",
    residence: "Beja",
    amount: 15000,
    status: "Done",
    notes: "",
  },
  {
    id: 15,
    name: "Zied Fakhfakh",
    phone: "+216 50 123 789",
    residence: "Kef",
    amount: 16000,
    status: "Contacted",
    notes: "",
  },
  {
    id: 16,
    name: "Ines Chaibi",
    phone: "+216 25 765 432",
    residence: "Tozeur",
    amount: 17000,
    status: "Done",
    notes: "",
  },
  {
    id: 17,
    name: "Rami Jerbi",
    phone: "+216 52 345 987",
    residence: "Tataouine",
    amount: 18000,
    status: "Rejected",
    notes: "",
  },
  {
    id: 18,
    name: "Samia Meddeb",
    phone: "+216 29 876 543",
    residence: "Sidi Bouzid",
    amount: 19000,
    status: "Contacted",
    notes: "",
  },
  {
    id: 19,
    name: "Mohamed Guesmi",
    phone: "+216 58 543 210",
    residence: "Siliana",
    amount: 20000,
    status: "Done",
    notes: "",
  },
  {
    id: 20,
    name: "Lina Youssef",
    phone: "+216 97 321 098",
    residence: "Jendouba",
    amount: 21000,
    status: "Rejected",
    notes: "",
  },
];
function valuetext(value: number) {
  return `${value}°C`;
}
const TableOne = () => {
  const [clients, setClients] = useState(clientData);


  // Filters state
  const [residenceFilter, setResidenceFilter] = useState<string[]>([]);
  const [amountRange, setAmountRange] = React.useState<number[]>([0, 37000]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    phone: "",
    residence: "",
    minAmount: 0, // Min amount for the slider
    maxAmount: 50000, // Max amount for the slider
    status: "",
    notes: "",
  });

  const allResidences = Array.from(new Set(clientData.map((client) => client.residence)));
  const allStatuses = ["Contacted", "Done", "Rejected"];
  // Handle residence filter change
  const handleResidenceChange = (value: string[]) => {
    setResidenceFilter(value);
  };

  // Handle amount range change (Slider)
  const handleAmountChange = (event: Event, newValue: number | number[]) => {
    setAmountRange(newValue as number[]);
  };

  // Function to handle status changes
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setStatusFilter(selectedOptions);
  };
  // Function to handle status changes
  const handleStatussChange = (id: number, newStatus: string) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id ? { ...client, status: newStatus } : client
      )
    );
  };

  // Function to handle note changes
  const handleNoteChange = (id: number, newNote: string) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id ? { ...client, notes: newNote } : client
      )
    );
  };

  // Filter the clients based on residence, amount range, and status
  const filteredClients = clients.filter((client) => {
    const isResidenceMatch = residenceFilter.length
      ? residenceFilter.includes(client.residence)
      : true;
    const isAmountMatch = client.amount >= amountRange[0] && client.amount <= amountRange[1];
    const isStatusMatch = statusFilter.length
      ? statusFilter.includes(client.status)
      : true;

    return isResidenceMatch && isAmountMatch && isStatusMatch;
  });

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Client Information
      </h4>

      {/* Filters */}
      <VStack spacing={6} align="stretch">
        {/* Residence Filter */}
        <Box>
          <Text fontWeight="bold">Select Residences</Text>
          <CheckboxGroup
            value={residenceFilter}
            onChange={handleResidenceChange}
            colorScheme="teal"
          >
            <Stack direction="column" spacing={2} mt={2}>
              {allResidences.map((residence) => (
                <Checkbox key={residence} value={residence}>
                  {residence}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </Box>

        {/* Amount Range Filter */}
        <Box>
          <Text fontWeight="bold">Select Amount Range: {amountRange[0]} - {amountRange[1]}</Text>
          <Slider
        getAriaLabel={() => 'Temperature range'}
        value={amountRange}
        min={0}
        max={50000}
        onChange={handleAmountChange}
        step={1000}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
        </Box>

        {/* Status Filter */}
        <Box>
          <Text fontWeight="bold">Select Status</Text>
          <Select
            size="md"
            multiple
            value={statusFilter}
            onChange={handleStatusChange}
          >
            {allStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </Box>
      </VStack>


      {/* Table */}
      <div className="flex flex-col">
        <div className="grid grid-cols-7">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">ID</h5>
          </div>
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
          </div>
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Phone</h5>
          </div>
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Residence</h5>
          </div>
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Amount</h5>
          </div>
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Status</h5>
          </div>
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Notes</h5>
          </div>
        </div>

        {filteredClients.map((client) => (
          <div
            className="grid grid-cols-7 border-b border-stroke dark:border-dark-3"
            key={client.id}
          >
            <div className="flex items-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">{client.id}</p>
            </div>
            <div className="flex items-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">{client.name}</p>
            </div>
            <div className="flex items-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">{client.phone}</p>
            </div>
            <div className="flex items-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">{client.residence}</p>
            </div>
            <div className="flex items-center px-2 py-4">
              <p className="font-medium text-green-light-1">${client.amount}</p>
            </div>
            <div className="flex items-center px-2 py-4">
              <select
                value={client.status}
                onChange={(e) => handleStatussChange(client.id, e.target.value)}
                className={`border rounded p-1 font-medium bg-white ${client.status === "Done"
                    ? "bg-[#219653]/[0.1] text-[#219653]"
                    : client.status === "Rejected"
                      ? "bg-[#D34053]/[0.1] text-[#D34053]"
                      : "bg-[#FFA70B]/[0.1] text-[#FFA70B]"
                  }`}
              >
                <option value="Contacted" className="text-[#FFA70B]">
                  Contacted
                </option>
                <option value="Done" className="text-[#219653]">
                  Done
                </option>
                <option value="Rejected" className="text-[#D34053]">
                  Rejected
                </option>
              </select>
            </div>
            <div className="flex items-center px-2 py-4">
              <input
                type="text"
                value={client.notes}
                onChange={(e) => handleNoteChange(client.id, e.target.value)}
                className="border rounded p-1 w-full"
                placeholder="Add note"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;