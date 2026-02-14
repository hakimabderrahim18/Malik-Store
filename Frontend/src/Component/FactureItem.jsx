export default function FactureItem({ facture }) {
  const calculerTotal = (produits) =>
    produits.reduce((sum, p) => sum + p.prixVente * p.quantite, 0);

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
      <div className="flex justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-700">
          Facture #{facture._id.slice(-6).toUpperCase()}
        </h2>
        <p className="text-gray-500">
          {new Date(facture.date).toLocaleString("fr-FR")}
        </p>
      </div>

      <table className="w-full text-left border-t border-gray-200">
        <thead>
          <tr className="text-gray-600">
            <th className="py-2">Produit</th>
            <th className="py-2 text-center">Quantité</th>
            <th className="py-2 text-right">Prix (DA)</th>
            <th className="py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {facture.produits.map((p, index) => (
            <tr key={index} className="border-t border-gray-100">
              <td className="py-2">{p.produit?.nom || "Produit supprimé"}</td>
              <td className="py-2 text-center">{p.quantite}</td>
              <td className="py-2 text-right">{p.prixVente}</td>
              <td className="py-2 text-right">
                {p.prixVente * p.quantite}
              </td>
            </tr>
          ))}
          <tr className="border-t border-gray-200 font-semibold">
            <td colSpan="3" className="text-right py-2">
              Total facture :
            </td>
            <td className="text-right py-2">
              {calculerTotal(facture.produits)} DA
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
