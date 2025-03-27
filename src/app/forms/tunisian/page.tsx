"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InputGroup from "@/components/FormElements/InputGroup2";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import type { GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";


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

const statutColors: Record<string, string> = {
  "en attente": "bg-yellow-100 text-yellow-800",
  "confus": "bg-orange-100 text-orange-800",
  "confirmé": "bg-green-100 text-green-800",
  "injoignable": "bg-gray-100 text-gray-800",
  "réfusé": "bg-red-100 text-red-800",
};

const banqueColors: Record<string, string> = {
  "non traité": "bg-yellow-100 text-yellow-800",
  "au cours de traitement": "bg-blue-100 text-blue-800",
  "à vérifier": "bg-orange-100 text-orange-800",
  "accordé": "bg-green-100 text-green-800",
  "réfusé": "bg-red-100 text-red-800",
};

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

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/clients");
        if (!res.ok) throw new Error("Erreur lors du chargement des clients");
        const data = await res.json();
        setClients(data);
      } catch (err) {
        console.error("Erreur de récupération des données clients :", err);
      }
    };

    fetchClients();
  }, []);


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
    {
      field: "statut",
      headerName: "Statut client",
      width: 150,
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${statutColors[params.value] || "bg-gray-100 text-gray-800"}`}>{params.value}</span>
      ),
    },
    {
      field: "banque",
      headerName: "Réponse banque",
      width: 150,
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${banqueColors[params.value] || "bg-gray-100 text-gray-800"}`}>{params.value}</span>
      ),
    },
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
              {formFields.map((field) => {
                if (field.name === "statut") {
                  return (
                    <div key={field.name}>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{field.label}</label>
                      <select name={field.name} value={formData.statut} onChange={handleChange} className="w-full rounded border border-gray-300 p-2">
                        <option value="">Sélectionner</option>
                        <option value="en attente">En attente</option>
                        <option value="confus">Confus</option>
                        <option value="confirmé">Confirmé</option>
                        <option value="injoignable">Injoignable</option>
                        <option value="réfusé">Réfusé</option>
                      </select>
                    </div>
                  );
                }
                if (field.name === "banque") {
                  return (
                    <div key={field.name}>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{field.label}</label>
                      <select name={field.name} value={formData.banque} onChange={handleChange} className="w-full rounded border border-gray-300 p-2">
                        <option value="">Sélectionner</option>
                        <option value="non traité">Non traité</option>
                        <option value="au cours de traitement">Au cours de traitement</option>
                        <option value="à vérifier">À vérifier</option>
                        <option value="accordé">Accordé</option>
                        <option value="réfusé">Réfusé</option>
                      </select>
                    </div>
                  );
                }
                return (
                  <InputGroup
                    key={field.name}
                    placeholder=""
                    label={field.label}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] || ""}
                    onChange={handleChange}
                    type="text"
                  />
                );
              })}
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

export default ClientForm;
