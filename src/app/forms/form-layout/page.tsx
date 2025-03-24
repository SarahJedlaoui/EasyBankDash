"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InputGroup from "@/components/FormElements/InputGroup2";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import type { GridColDef } from "@mui/x-data-grid";

// ✅ Define your User type
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

const FormLayout = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      firstName: "Sarah",
      lastName: "Doe",
      email: "sarah@example.com",
      phone: "+123456789",
      role: "Agent EasyBank",
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      phone: "+987654321",
      role: "Admin",
    },
    {
      id: 3,
      firstName: "Fatima",
      lastName: "Ali",
      email: "fatima@easyhome.com",
      phone: "+21699887766",
      role: "Fournisseur immobiler",
    },
  ]);

  const [formData, setFormData] = useState<Omit<User, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUserId !== null) {
      // Update existing user
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUserId ? { ...user, ...formData } : user
        )
      );
    } else {
      // Add new user
      const newUser: User = {
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        ...formData,
      };
      setUsers([...users, newUser]);
    }

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
    });
    setEditingUserId(null);
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user: User) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
    setEditingUserId(user.id);
    setShowModal(true);
  };


  const columns: GridColDef<User>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "role", headerName: "Role", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.row.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Form Layout" />

      <div className="mb-4">
        <button
          className="rounded bg-primary px-4 py-2 text-white"
          onClick={() => setShowModal(true)}
        >
          Add User
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-dark dark:text-white">
                {editingUserId ? "Edit Admin" : "Create New Admin"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <InputGroup
                  label="First name"
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  customClasses="w-full xl:w-1/2"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <InputGroup
                  label="Last name"
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  customClasses="w-full xl:w-1/2"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <InputGroup
                label="Email"
                type="email"
                placeholder="Enter email address"
                name="email"
                customClasses="mb-4.5"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <InputGroup
                label="Phone"
                type="text"
                placeholder="Enter phone number"
                name="phone"
                customClasses="mb-4.5"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <div className="mb-5.5">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full rounded border border-stroke bg-transparent px-5 py-3 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="EasyBank">Admin</option>
                  <option value="EasyCollect">Agent EasyBank</option>
                  <option value="EasyHome">Client</option>
                  <option value="SuperAdmin">Etablissement Financier</option>
                  <option value="SuperAdmin">Fournisseur immobiler</option>
                  <option value="SuperAdmin">Expert Immobiler</option>
                  <option value="SuperAdmin">Cabinet d&apos;architecture</option>
                  <option value="SuperAdmin">Support technique</option>
                </select>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded border border-gray-300 px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                >
                  {editingUserId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ MUI DataGrid with generic type */}
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid<User>
          rows={users}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </DefaultLayout>
  );
};

export default FormLayout;
