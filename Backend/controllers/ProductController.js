import Product from "../Models/Product.js";

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProduct = async (req, res) => {
  try {
    console.log(req)
    const product = await Product.findOne({id:req.params.id});
    console.log(product)
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new product
export const createProduct = async (req, res) => {
  const { name, id, quantity, price ,prixDachat,StockR,Sold,Fayda} = req.body;

  try {
    const product = new Product({ name, id, quantity, price,prixDachat,StockR,Sold,Fayda });
    console.log(req.body.prixDachat)
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
/*export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
   /* const { name } = req?.body;
   const {prixDachat}= req?.body
   const {price}= req?.body
   const {quantity}= req?.body
   const {Sold}=req?.body;*/
    // e.g. { "idProduit": "P123", "field": "price", "value": 1200 }

   /* const oldProduct = await Product.findOne(
      { id: id },          
      
    );
     const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
   

    if (!updated)
      return res.status(404).json({ message: "Produit non trouvé." });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/
// PUT update product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
        });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
