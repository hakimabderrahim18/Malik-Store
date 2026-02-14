import express from "express"
import cors from "cors";
import connectDB from "./config/db.js";
import factureRoutes from "./Routes/factureRoutes.js";
import routerProduct from "./Routes/ProductRoutes.js";

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", routerProduct);
app.use("/api/factures", factureRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend de gestion de stock fonctionne ✅");
});


const PORT =  5000;
app.listen( 5000,() => console.log(`Serveur lancé sur le port 5000`));
