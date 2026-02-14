import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, redirect, useNavigate } from "react-router-dom";

export default function DeleteProduct({setAction,setChange,Change,Deleted,setDeleted}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const handleModifier=(idR)=>{

    setAction("Modifier-Produit")
    setChange(idR);
}
const handleDelete=async(idD)=>{
   try 
   {
    await axios.delete(`http://localhost:5000/api/products/${idD}`);
            setError("Produit supprimé avec succès.");
                
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression du produit.");
    }
 
  
}
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
      setLoading(false);
      console.log("setrre",res)
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement du stock !");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    
    <div className="container mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-[#042142] text-center">
        📦 Gestion du Stock 
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">Aucun produit trouvé.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border w-full border-gray-200 rounded-lg">
            <thead className="bg-gradient-to-r from-[#042142] to-[#2475AC] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left">id</th>
                <th className="py-3 px-4 text-left">Prix d'achat (DA)</th>
                <th className="py-3 px-4 text-left">Prix de vente (DA)</th>
                <th className="py-3 px-4 text-left">Qté en stock</th>
                <th className="py-3 px-4 text-left">Qté vendue</th>
                <th className="py-3 px-4 text-left">Stock restant</th>
                <th className="py-3 px-4 text-left">Valeur stock (DA)</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const remaining = p.quantity - p.StockR;
                const stockValue = remaining * p.prixDachat;
console.log(p)
                return (
                  <tr key={p._id} className="border-b  hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-medium">{p.name}</td>
                    <td className="py-3 px-4">{p.id || "—"}</td>
                    <td className="py-3 px-4">{p.price}</td>
                    <td className="py-3 px-4">{p.prixDachat}</td>
                    <td className="py-3 px-4">{p.quantity}</td>
                    <td
                      className={`py-3 px-4 ${
                        p.Sold > 0 ? "text-[#2475AC]" : "text-gray-800"
                      }`}
                    >
                      {p.Sold}
                    </td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        p.StockR <= 5 ? "text-red-500" : "text-gray-800"
                      }`}
                    >
                      {p.StockR}
                    </td>
                    <td className="py-3 px-4 text-[#733E85] font-bold">
                      {p.Fayda} DA
                    </td>
                    <td><button onClick={()=>handleDelete(p._id)}className="bg-blue-600 text-white rounded">Supprimer</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}



/*import { useState } from "react";
import axios from "axios";

export default function DeleteProduct() {
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const handleDelete = async (e) => {
    e.preventDefault();

    if (!productId) return setError("Veuillez entrer un ID de produit.");
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/${productId}`);
      setMessage("Produit supprimé avec succès !");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression du produit.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-[#042142] mb-4">
        🗑️ Supprimer un produit
      </h2>

      <form onSubmit={handleDelete} className="space-y-4">
        <input
          type="text"
          placeholder="Entrez l'ID du produit"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full border rounded-md p-2"
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
        >
          Supprimer
        </button>
      </form>

      {message && <p className="text-green-600 text-center mt-3">{message}</p>}
      {error && <p className="text-red-600 text-center mt-3">{error}</p>}
    </div>
  );
}
*/