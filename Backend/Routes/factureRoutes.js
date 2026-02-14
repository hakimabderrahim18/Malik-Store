import express from "express";
import {
  addProductFacture,
  AjouterFacture,
  getAllFactures,
  GetFacture,
  Remiser,
  Sell,
} from "../controllers/factureController.js";

const router = express.Router();
router.post("/getFacture", GetFacture);
router.get("/getAllFactures", getAllFactures);
router.post("/AjouterFacture", AjouterFacture);
router.post("/Remise",Remiser)
router.post("/:BarCode", Sell);
router.post("/AjouterAFacture/:BarCode", addProductFacture);


export default router;
