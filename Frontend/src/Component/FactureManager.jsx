import { useEffect, useState } from "react";

export default function FactureManager() {
  const [factures, setFactures] = useState([]);
  const [selectedFacture, setSelectedFacture] = useState(null);
  const [filteredDate, setFilteredDate] = useState("");

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [day, month, year] = today.split("/");
  const formatted = `${year}-${month}-${day}`;

  // Charger toutes les factures
  useEffect(() => {
    const fetchFactures = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/factures/getAllFactures");
        const data = await res.json();
        setFactures(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFactures();
  }, []);

  // Filtrage par date
  const facturesFiltrees = filteredDate
    ? factures.filter((f) => f.date?.startsWith(filteredDate))
    : factures;

  // Merge duplicates by date
  const uniqueFactures = Array.from(
    facturesFiltrees.reduce((map, f) => {
      if (!map.has(f.date)) {
        map.set(f.date, { ...f });
      } else {
        // Merge totals and products
        const existing = map.get(f.date);
        existing.total = (existing.total || 0) + (f.total || 0);
        existing.produits = [...(existing.produits || []), ...(f.produits || [])];
        map.set(f.date, existing);
      }
      return map;
    }, new Map()).values()
  );

  // Fonction pour afficher les détails
  const afficherDetails = async (factureDate) => {
    try {
      const res = await fetch("http://localhost:5000/api/factures/getFacture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: factureDate }),
      });
      const data = await res.json();
      setSelectedFacture(data);
    } catch (error) {
      console.error("Erreur lors du chargement des détails:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-6xl mx-auto mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-[#042142] mb-6 text-center">
        📅 Historique des Factures
      </h2>

      {/* 🔍 Filtre par date */}
      <div className="flex justify-center items-center gap-3 mb-6">
        <label className="font-semibold text-[#153c6a]">Filtrer par date :</label>
        <input
          type="date"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#2475AC] outline-none"
          onChange={(e) => setFilteredDate(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🧾 Liste des factures */}
        <div className="overflow-auto max-h-[400px] border rounded-xl">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="py-3 px-4 border-b font-semibold">Date</th>
                <th className="py-3 px-4 border-b font-semibold">Produits</th>
                <th className="py-3 px-4 border-b font-semibold">Total (DA)</th>
                <th className="py-3 px-4 border-b font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {uniqueFactures.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    Aucune facture trouvée.
                  </td>
                </tr>
              ) : (
                uniqueFactures.map((facture) => (
                  <tr
                    key={facture.date}
                    className={`border-b hover:bg-gray-50 transition ${
                      selectedFacture?.date === facture.date ? "bg-gray-100" : ""
                    }`}
                  >
                    <td className="py-3 px-4">{facture?.date}</td>
                    <td className="py-3 px-4">{facture.produits?.length || 0}</td>
                    <td className="py-3 px-4 font-semibold text-[#733E85]">
                      {facture.total?.toFixed(2) || "—"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => afficherDetails(facture.date)}
                        className="bg-[#2475AC] text-white px-4 py-1 rounded-lg hover:bg-[#153c6a] transition"
                      >
                        Détails
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 🧩 Détails de la facture sélectionnée */}
        <div className="border rounded-xl p-4 bg-gray-50 shadow-inner">
          {selectedFacture ? (
            <>
              <h3 className="text-xl font-bold text-[#042142] mb-4">
                🧾 Détails de la facture du{" "}
                <span className="text-[#733E85]">{selectedFacture.date?.slice(0, 10)}</span>
              </h3>
              <p className="mb-2 font-semibold">
                Total :{" "}
                <span className="text-[#2475AC]">{selectedFacture.total?.toFixed(2)} DA</span>
              </p>
              <div className="overflow-auto max-h-[300px]">
                <table className="min-w-full border-collapse">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-2 px-3 border-b text-left">Produit</th>
                      <th className="py-2 px-3 border-b text-left">Prix</th>
                      <th className="py-2 px-3 border-b text-left">Quantité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFacture.produits?.map((p, i) => (
                      <tr key={i} className="border-b hover:bg-gray-100">
                        <td className="py-2 px-3">{p.produit?.name || p.name}</td>
                        <td className="py-2 px-3">{p.produit?.price || p.price} DA</td>
                        <td className="py-2 px-3">{p.quantite || 1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              Sélectionne une facture pour voir les détails.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
