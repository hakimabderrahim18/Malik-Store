import Facture from "../Models/Facture.js";
import Product from "../Models/Product.js";
import Produit from "../Models/Product.js";

export const Sell = async (req, res) => {
  const barcode = req.params.BarCode;
  const {FactureId,value}=req.body;
//console.log(barcode)
  try {
    const FactureUpdated= await Facture.findOneAndUpdate({date:FactureId},
      { $inc: { total: value } }, // 🔥 ajoute `value` à `total`
      {new:true}
    )
       const Pr = await Produit.findOne(
      { id: barcode }) // 🔹 adapt field name to your schema
      var fayda = Pr.price-Pr.prixDachat
    const updated = await Produit.findOneAndUpdate(
      { id: barcode }, // 🔹 adapt field name to your schema
      {
        $inc: {
          Sold: 1,
          Fayda: fayda,   // increase by fixed value or dynamic profit
          StockR: -1,
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.json(updated,value);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllFactures = async (req, res) => {
  try {
    const factures = await Facture.find().sort({ createdAt: -1 }); // tri de la plus récente à la plus ancienne
    res.status(200).json(factures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addProductFacture = async (req, res) => {
    const today = new Date().toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const [day, month, year] = today.split("/");
const formatted = `${year}-${month}-${day}`;

console.log(formatted); // e.g. "2025-11-08"

  const barcode = req.params.BarCode;
//console.log(barcode)
  try {
    const produit = await Product.findOne({id:barcode});
    if(produit){
    const updated = await Facture.findOneAndUpdate(
      { date: formatted }, // 🔹 adapt field name to your schema
      {
        $push: {
          produits: { produit }, // 👈 this adds a new object to the array
        },
      },
      { new: true } // return updated document
    );}
    

    if (!updated) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetFacture = async (req, res) => {
  const {date} = req.body
    //console.log(date)
  try {
    const dateFacture = await Facture.findOne(
      { date: date }, // 🔹 adapt field name to your schema
      
    );
console.log(dateFacture,"t3na")
    if (!dateFacture) {
      return res.status(404).json({ message: "Facture non trouvé" });
    }
     res.status(404).json(dateFacture);
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const  Remiser = async (req, res) => {
   const Facture = req.params.Facture;
   const {remise} =req.body;
//console.log(barcode)
  try {
    const updated = await Facture.findOneAndUpdate(
      { _id: Facture }, // 🔹 adapt field name to your schema
      {
        $inc: {
          Remise: +remise
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const AjouterFacture = async (req, res) => {
const {date}=req.body;
console.log(date)
 try {
    const dateFacture = await Facture.findOne(
      { date: date }, // 🔹 adapt field name to your schema
      
    );

    if (dateFacture) {
      return res.status(404).json({ message: "Facture trouvé" });
    }
    const newFacture = await Facture.create({
      date:date
    })
    res.json(newFacture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
