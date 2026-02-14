import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, redirect } from "react-router-dom";

export default function EditProduct({Change,setAction}) {

  const [product, setProduct] = useState({
    name: "",
    id: "",
    prixDachat: 0,
    price: 0,
    quantity: 0,
    Sold: 0,
  });
  
  // 🔹 Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${Change}`, 
        product);
      setAction("View Stock");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du produit.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-[#042142] mb-6">
        ✏️ Modifier un produit
      </h2>

     
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nom du produit</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

       
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Prix d'achat (DA)</label>
            <input
              type="number"
              value={product.prixDachat}
              onChange={(e) =>
                setProduct({ ...product, prixDachat: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Prix de vente (DA)</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Quantité totale</label>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) =>
                setProduct({ ...product, quantity: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Quantité vendue</label>
            <input
              type="number"
              value={product.Sold}
              onChange={(e) =>
                setProduct({ ...product, Sold: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
                  <div>
          <label className="block font-medium mb-1">Id du produit</label>
          <input
            type="text"
            value={product.id}
            onChange={(e) => setProduct({ ...product, id: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        </div>

        <button
          type="submit"
          className="w-full bg-[#2475AC] hover:bg-[#153C6A] text-white py-2 rounded-md transition"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}
