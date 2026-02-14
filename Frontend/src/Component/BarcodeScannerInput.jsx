import { RefreshCcw } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

export default function BarcodeScannerInput() {
  const [barcode, setBarcode] = useState("");
  const [lastScan, setLastScan] = useState("");
  const [Remise, setRemise] = useState("");
  const [Produits, setP] = useState([{}]);
  const [ProduitsVendu, setPV] = useState([]);
  const [LastProduit, setLastProduits] = useState(0);
  const [LastProduitLength, setLastProduitsLength] = useState(0);
  const [Facture, setFacture] = useState({});
  const [totale, setTotale] = useState(0);
  const [FactureId, setFactureId] = useState("");

  function fixScan(input) {
    return input.replace(/Shift/gi, "").trim();
  }

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [day, month, year] = today.split("/");
  const formatted = `${year}-${month}-${day}`;

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setP(data))
      .catch((err) => console.error("Error fetching Products:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/factures/getFacture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: formatted }),
    })
      .then((res) => res.json())
      .then((data) => setFacture(data.produits))
      .catch((err) => console.error("Error fetching Facture:", err));

    if (Facture.date != today)
      fetch(`http://localhost:5000/api/factures/AjouterFacture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: formatted }),
      });
  }, []);

  const handleKeyDown = async (e) => {
    if (e.target.name === "Remise") return;

    if (e.key === "Enter") {
      const cleaned = fixScan(barcode);
      setLastScan(cleaned);
      setBarcode(cleaned);

      try {
        const resProduct = await fetch(
          `http://localhost:5000/api/products/${cleaned}`
        );
        const product = await resProduct.json();

        if (product.price) {
          setLastProduits((prev) => prev + product?.price);
          setLastProduitsLength((prev) => prev + 1);
          setTotale((prev) => prev + product?.price);
        }

        const res = await fetch(
          `http://localhost:5000/api/factures/${cleaned}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              FactureId: FactureId,
              value: product?.price,
            }),
          }
        );

        await fetch(
          `http://localhost:5000/api/factures/AjouterAFacture/${cleaned}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await res.json();

        for (let i = 0; i < Produits?.length; i++) {
          if (Produits[i]?.id == cleaned && Produits[i]?.name) {
            setPV([...ProduitsVendu, Produits[i]]);
          }
        }
      } catch (error) {
        console.error("❌ Erreur fetch:", error);
      }

      setBarcode("");
    } else {
      setBarcode((prev) => prev + e.key);
    }
  };

  const handleRefresh = () => {
    setLastProduits(0);
    setLastProduitsLength(0);
    setBarcode("");
    setLastScan("");
  };

  const AfficherFacture = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/factures/getFacture`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: formatted }),
        }
      );

      const data = await res.json();
      setPV(data.produits);
      setFactureId(data.date);
      setTotale(data.total);
    } catch (error) {
      console.error("❌ Erreur fetch:", error);
    }
  };

  return (
    <div className=" flex flex-col bg-gray-50">

      {/* PAGE CONTENT */}
      <div className="flex-grow">

        {/* SCAN ZONE */}
        <div
          tabIndex="0"
          onKeyDown={handleKeyDown}
          className="flex justify-center p-4"
        >
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center border border-gray-200">

            <p className="text-2xl font-extrabold text-[#042142] mb-4">
              🧾 Scan a Barcode
            </p>

            {FactureId && (
              <input
                value={barcode}
                readOnly
                placeholder="Scan here..."
                className="border border-gray-300 p-3 rounded-lg w-64 focus:ring-2 focus:ring-[#2475AC] text-center"
              />
            )}

            {lastScan && (
              <div className="mt-4 p-4 bg-white shadow-md rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-green-600 font-semibold">
                    ✅ Last scanned: <span>{lastScan}</span>
                  </p>

                  <button
                    onClick={handleRefresh}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <RefreshCcw className="w-5 h-5 text-blue-500" />
                  </button>
                </div>

                <div className="text-gray-700 font-medium">
                  Total commande:{" "}
                  <span className="font-bold text-black">
                    {LastProduit} DA
                  </span>
                  <p>{LastProduitLength} produits vendus</p>
                </div>
              </div>
            )}

            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                onClick={AfficherFacture}
                className="bg-[#2475AC] text-white px-5 py-2 rounded-xl hover:bg-[#153c6a] shadow-sm"
              >
                Afficher Facture
              </button>

              {isNaN(totale) ? (
                <div className="text-lg font-semibold text-[#042142]">
                  Total:{" "}
                  <span className="text-[#733E85]">
                    Produit Non Disponible
                  </span>
                </div>
              ) : (
                <div className="text-lg font-semibold text-[#042142]">
                  Total: <span className="text-[#733E85]">{totale} DA</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* FACTURE LIST */}
        <div className="container mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-[#042142] text-center">
            📦 Gestion des Ventes {today}
          </h2>

          <div className="bg-gray-100 flex py-3 px-4 font-semibold">
            <span className="grow">Name</span>
            <span className="grow">ID</span>
            <span className="grow">Price</span>
          </div>

          {ProduitsVendu?.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              Aucun produit trouvé.
            </p>
          ) : (
            <div className="overflow-auto max-h-64">
              <table className="min-w-full border-collapse">
                <tbody>
                  {ProduitsVendu.map((p) => (
                    <tr
                      key={p?.produit?._id || p?.id}
                      className="border-b flex hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 grow font-medium">
                        {p?.produit?.name || p?.name}
                      </td>
                      <td className="py-3 px-4 grow">
                        {p?.produit?.id || p?.id}
                      </td>
                      <td className="py-3 px-4 grow">
                        {p?.produit?.price || p?.price} DA
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>


    </div>
  );
}
