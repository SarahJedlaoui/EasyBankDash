"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InputGroup from "@/components/FormElements/InputGroup2";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import type { GridColDef } from "@mui/x-data-grid";

interface ClientData {
  id: number;
  fullName: string;
  phone: string;
  gouvernerat: string;
  salaire: string;
  statut: string;
  banque: string;
  typeCreditDemande: string;
  montantCreditDemande: string;
  cessionSalaire: string;
  creditEnCours: string;
  typeCreditObtenu?: string;
  montantCreditObtenu?: string;
  depasseMiParcours?: string;
  progress: number;
}

const ClientForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [clients, setClients] = useState<ClientData[]>([
    {
      id: 1,
      fullName: "Ahmed Ben Salah",
      phone: "+21620000111",
      gouvernerat: "Tunis",
      salaire: "1200",
      statut: "confirmé",
      banque: "accordé",
      typeCreditDemande: "Crédit immobilié",
      montantCreditDemande: "80000",
      cessionSalaire: "oui",
      creditEnCours: "non",
      typeCreditObtenu: "",
      montantCreditObtenu: "",
      depasseMiParcours: "",
      progress: 80,
    },
    {
      id: 2,
      fullName: "Salma Trabelsi",
      phone: "+21620000222",
      gouvernerat: "Sfax",
      salaire: "950",
      statut: "en attente",
      banque: "à vérifier",
      typeCreditDemande: "Micro-crédit",
      montantCreditDemande: "5000",
      cessionSalaire: "non",
      creditEnCours: "oui",
      typeCreditObtenu: "Crédit de Consommation",
      montantCreditObtenu: "3000",
      depasseMiParcours: "oui",
      progress: 60,
    },
  ]);

  const [formData, setFormData] = useState<Omit<ClientData, "id" | "progress">>({
    fullName: "",
    phone: "",
    gouvernerat: "",
    salaire: "",
    statut: "",
    banque: "",
    typeCreditDemande: "",
    montantCreditDemande: "",
    cessionSalaire: "",
    creditEnCours: "",
    typeCreditObtenu: "",
    montantCreditObtenu: "",
    depasseMiParcours: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (client: ClientData) => {
    setFormData({ ...client });
    setEditingId(client.id);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const progress = Math.floor(Math.random() * 100);

    if (editingId !== null) {
      setClients((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, ...formData, progress } : c))
      );
    } else {
      const newClient: ClientData = {
        id: clients.length > 0 ? Math.max(...clients.map((c) => c.id)) + 1 : 1,
        ...formData,
        progress,
      };
      setClients([...clients, newClient]);
    }

    setFormData({
      fullName: "",
      phone: "",
      gouvernerat: "",
      salaire: "",
      statut: "",
      banque: "",
      typeCreditDemande: "",
      montantCreditDemande: "",
      cessionSalaire: "",
      creditEnCours: "",
      typeCreditObtenu: "",
      montantCreditObtenu: "",
      depasseMiParcours: "",
    });
    setEditingId(null);
    setShowModal(false);
  };

  const columns: GridColDef<ClientData>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Nom & Prénom", width: 180 },
    { field: "phone", headerName: "Tél", width: 130 },
    { field: "gouvernerat", headerName: "Gouvernerat", width: 130 },
    { field: "salaire", headerName: "Salaire (TND)", width: 130 },
    { field: "statut", headerName: "Statut client", width: 150 },
    { field: "banque", headerName: "Réponse banque", width: 150 },
    { field: "typeCreditDemande", headerName: "Type crédit demandé", width: 160 },
    { field: "montantCreditDemande", headerName: "Montant demandé (TND)", width: 170 },
    { field: "cessionSalaire", headerName: "Cession Salaire", width: 130 },
    { field: "creditEnCours", headerName: "Crédit en cours", width: 130 },
    { field: "typeCreditObtenu", headerName: "Type crédit obtenu", width: 160 },
    { field: "montantCreditObtenu", headerName: "Montant obtenu (TND)", width: 160 },
    { field: "depasseMiParcours", headerName: "Mi-parcours", width: 130 },
    {
      field: "progress",
      headerName: "Documents",
      width: 150,
      renderCell: (params) => (
        <LinearProgress variant="determinate" value={params.value} />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
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
          <button className="text-red-600 hover:underline">Delete</button>
        </div>
      ),
    },
  ];

  const formFields = [
    { label: "Nom & Prénom", name: "fullName" },
    { label: "Tél", name: "phone" },
    { label: "Gouvernerat", name: "gouvernerat" },
    { label: "Salaire net (TND)", name: "salaire" },
    { label: "Statut client", name: "statut" },
    { label: "Réponse banque", name: "banque" },
    { label: "Type crédit demandé", name: "typeCreditDemande" },
    { label: "Montant crédit demandé", name: "montantCreditDemande" },
    { label: "Cession sur salaire", name: "cessionSalaire" },
    { label: "Crédit en cours", name: "creditEnCours" },
    { label: "Type crédit obtenu", name: "typeCreditObtenu" },
    { label: "Montant crédit obtenu", name: "montantCreditObtenu" },
    { label: "Dépassé mi-parcours", name: "depasseMiParcours" },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tunisian Clients" />

      <div className="mb-4">
        <button
          className="rounded bg-primary px-4 py-2 text-white"
          onClick={() => setShowModal(true)}
        >
          Ajouter Client
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto ">
          <div className="w-full p-10 max-w-4xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark max-h-screen overflow-y-auto">
          <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-dark dark:text-white">
                {editingId ? "Edit User" : "Create New User"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {formFields.map((field) => (
                <InputGroup
                  key={field.name}
                  placeholder=""
                  label={field.label}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData] || ""}
                  onChange={handleChange}
                  type="text"
                />
              ))}
             <div className="col-span-2 flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded border border-gray-300 px-4 py-2"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                >
                  {editingId ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid<ClientData>
          rows={clients}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </DefaultLayout>
  );
};

export default ClientForm;
