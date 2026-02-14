import { useState } from "react";

export default function NouvelleFacture() {
  const [produits, setProduits] = useState([
    { produit: "", quantite: 1, prixVente: 0 },
  ]);

  const handleAddProduit = () => {
    setProduits([...produits, { produit: "", quantite: 1, prixVente: 0 }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...produits];
    updated[index][field] = value;
    setProduits(updated);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/factures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produits }),
      });
      const data = await res.json();
      console.log("✅ Facture créée :", data);
      alert("Facture ajoutée avec succès !");
      setProduits([{ produit: "", quantite: 1, prixVente: 0 }]);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création de la facture.");
    }
  };

  return (
    <div className="p-6 h-full w-full bg-white rounded-xl shadow-md border border-gray-200 ">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        ➕ Nouvelle Facture
      </h2>

      {produits.map((p, index) => (
        <div key={index} className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="ID produit"
            value={p.produit}
            onChange={(e) => handleChange(index, "produit", e.target.value)}
            className="border p-2 rounded-lg "
          />
          <input
            type="number"
            placeholder="Quantité"
            value={p.quantite}
            onChange={(e) => handleChange(index, "quantite", e.target.value)}
            className="border p-2 rounded-lg "
          />
          <input
            type="number"
            placeholder="Prix vente"
            value={p.prixVente}
            onChange={(e) => handleChange(index, "prixVente", e.target.value)}
            className="border p-2 rounded-lg"
          />
          <input
            type="number"
            placeholder="Remise"
            value={p.Fayda}
            onChange={(e) => handleChange(index, "Remise", e.target.value)}
            className="border p-2 rounded-lg"
          />
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <button
          onClick={handleAddProduit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          ➕ Ajouter produit
        </button>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          💰 Enregistrer Facture
        </button>
      </div>
    </div>
  );
}
