import React from 'react'
import BarcodeScannerInput from './BarcodeScannerInput'


import { useEffect, useState } from "react";
import FactureItem from "./FactureItem";

export default function Factures() {
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFactures = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/factures");
        const data = await res.json();
        setFactures(data);
      } catch (error) {
        console.error("Erreur lors du chargement des factures :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFactures();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Chargement des factures...</div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🧾 Factures du jour</h1>

      {factures.length === 0 ? (
        <p className="text-gray-500">Aucune facture trouvée pour aujourd’hui.</p>
      ) : (
        <div className="space-y-6">
            
      <BarcodeScannerInput/>
          {factures.map((facture) => (
            <FactureItem key={facture._id} facture={facture} />
          ))}
        </div>
      )}
    </div>
  );
}
