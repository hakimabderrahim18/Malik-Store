import mongoose from "mongoose";

const factureSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      
    },
    produits: [
      {
         }
    ],
    Remise:Number,
    total: {
      type: Number,
      },
    
  },
  { timestamps: true }
);
factureSchema.pre("save", function (next) {
  console.log("object"+this.produits.length)
  // Vérifie que la facture contient des produits
  if (this.produits && this.produits.length > 0) {
    // Somme = Σ (prix * quantité)
    const somme = this.produits.reduce(
      (acc, p) => acc + (p.price || 0) * (p.quantity || 1),
      0
    );

  } else {
    this.total = 0;
  }

  next();
});

export default mongoose.model("Facture", factureSchema);
