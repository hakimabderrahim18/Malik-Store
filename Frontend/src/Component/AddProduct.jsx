import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    quantity: "",
    price: "",
    prixDachat:""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/products", {
        name: formData.name,
        id: formData.id,
        prixDachat:Number(formData.prixDachat),
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        Sold:0,
        StockR:Number(formData.quantity),
        Fayda:0
      });
      setMessage("✅ Produit ajouté avec succès !");
      setFormData({ name: "", id: "", quantity: "", price: "",prixDachat:"" });
      console.log(res.data);
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur lors de l’ajout du produit !");
    }
  };

  return (
    <div className="max-w-md mx-auto   rounded-2xl shadow-lg h-full ">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
        Ajouter un produit
      </h2>

      {message && (
        <p
          className={`text-center mb-3 ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-blue-950 ">
        <div>
          <label className="block mb-1 font-semibold text-white">Nom du produit</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border bg-amber-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2475AC]"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-white">Id QR</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            className="w-full border bg-amber-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2475AC]"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-white">Quantité</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="0"
            className="w-full border bg-amber-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2475AC]"
          />
        </div>
 <div>
          <label className="block mb-1 font-semibold text-white">Prix d'achat (DA)</label>
          <input
            type="number"
            name="prixDachat"
            value={formData.prixDachat}
            onChange={handleChange}
            required
            min="0"
            className="w-full bg-amber-50 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2475AC]"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-white">Prix De Vente(DA)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full bg-amber-50 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2475AC]"
          />
        </div>
       
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#042142] to-[#2475AC] text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
        >
          Ajouter le produit
        </button>
      </form>
    </div>
  );
}
