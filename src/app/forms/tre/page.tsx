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
  residence: string;
  devise: string;
  salaire: string;
  statut: string;
  banque: string;
  typeCreditDemande: string;
  montantCreditDemande: string;
  creditEnCours: string;
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
  const [clients, setClients] = useState<ClientData[]>([{
    id: 1,
    fullName: "Youssef Karoui",
    phone: "+33 612345678",
    residence: "France",
    devise: "Euro",
    salaire: "2200",
    statut: "confirmé",
    banque: "accordé",
    typeCreditDemande: "Achat d'un logement",
    montantCreditDemande: "120000",
    creditEnCours: "non",
    progress: 70
  }]);

  const [formData, setFormData] = useState<Omit<ClientData, "id" | "progress">>({
    fullName: "",
    phone: "",
    residence: "",
    devise: "",
    salaire: "",
    statut: "",
    banque: "",
    typeCreditDemande: "",
    montantCreditDemande: "",
    creditEnCours: ""
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
      residence: "",
      devise: "",
      salaire: "",
      statut: "",
      banque: "",
      typeCreditDemande: "",
      montantCreditDemande: "",
      creditEnCours: ""
    });
    setEditingId(null);
    setShowModal(false);
  };

  const columns: GridColDef<ClientData>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Nom & Prénom", width: 180 },
    { field: "phone", headerName: "Téléphone", width: 130 },
    { field: "residence", headerName: "Lieu de résidence", width: 150 },
    { field: "devise", headerName: "Devise", width: 100 },
    { field: "salaire", headerName: "Revenu (devise)", width: 140 },
    {
      field: "statut",
      headerName: "Statut client",
      width: 140,
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${statutColors[params.value] || "bg-gray-100 text-gray-800"}`}>{params.value}</span>
      ),
    },
    {
      field: "banque",
      headerName: "Réponse banque",
      width: 160,
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${banqueColors[params.value] || "bg-gray-100 text-gray-800"}`}>{params.value}</span>
      ),
    },
    { field: "typeCreditDemande", headerName: "Type crédit demandé", width: 180 },
    { field: "montantCreditDemande", headerName: "Montant demandé (TND)", width: 170 },
    { field: "creditEnCours", headerName: "Crédit en cours", width: 130 },
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
      <Breadcrumb pageName="Clients Résidents à l'Étranger" />
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
                {editingId ? "Modifier Client" : "Créer un nouveau client"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputGroup placeholder='' label="Nom & Prénom" name="fullName" value={formData.fullName} onChange={handleChange} type="text" />
              <InputGroup placeholder='' label="Numéro de téléphone" name="phone" value={formData.phone} onChange={handleChange} type="text" />
              <InputGroup placeholder='' label="Lieu de résidence en Tunisie" name="residence" value={formData.residence} onChange={handleChange} type="text" />
              <InputGroup placeholder='' label="Devise de résidence" name="devise" value={formData.devise} onChange={handleChange} type="text" />
              <InputGroup placeholder='' label="Salaire net ou revenu mensuel" name="salaire" value={formData.salaire} onChange={handleChange} type="text" />
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Statut du client</label>
                <select name="statut" value={formData.statut} onChange={handleChange} className="w-full rounded border border-gray-300 p-2">
                  <option value="">Sélectionner</option>
                  <option value="en attente">En attente</option>
                  <option value="confus">Confus</option>
                  <option value="confirmé">Confirmé</option>
                  <option value="injoignable">Injoignable</option>
                  <option value="réfusé">Réfusé</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Réponse Banque</label>
                <select name="banque" value={formData.banque} onChange={handleChange} className="w-full rounded border border-gray-300 p-2">
                  <option value="">Sélectionner</option>
                  <option value="non traité">Non traité</option>
                  <option value="au cours de traitement">Au cours de traitement</option>
                  <option value="à vérifier">À vérifier</option>
                  <option value="accordé">Accordé</option>
                  <option value="réfusé">Réfusé</option>
                </select>
              </div>
              <InputGroup placeholder='' label="Type du crédit demandé" name="typeCreditDemande" value={formData.typeCreditDemande} onChange={handleChange} type="text" />
              <InputGroup placeholder='' label="Montant du crédit demandé (TND)" name="montantCreditDemande" value={formData.montantCreditDemande} onChange={handleChange} type="text" />
              <InputGroup placeholder='' label="Crédit en cours" name="creditEnCours" value={formData.creditEnCours} onChange={handleChange} type="text" />
              <div className="col-span-2 flex justify-end gap-4 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="rounded border border-gray-300 px-4 py-2">Annuler</button>
                <button type="submit" className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90">{editingId ? "Modifier" : "Ajouter"}</button>
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
