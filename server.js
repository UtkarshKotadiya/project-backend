const express = require("express");
const cors = require("cors");
const Joi = require("joi");

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Sale Products Data
let saleproducts = [
  { _id: 1, src: "proj_imgs/sale/pendant-heart.jpg", alt: "Heart Pendant (Gold)", title: "Heart Pendant (Gold)" },
  { _id: 2, src: "proj_imgs/sale/pendant-cross.jpg", alt: "Cross Pendant", title: "Cross Pendant" },
  { _id: 3, src: "proj_imgs/sale/pendant-LS.jpg", alt: "Last Supper Pendant", title: "Last Supper Pendant" },
  { _id: 4, src: "proj_imgs/sale/pendant-W.jpg", alt: "World Pendant", title: "World Pendant" },
  { _id: 5, src: "proj_imgs/sale/initial-ring.jpg", alt: "Initial Ring (Gold)", title: "Initial Ring (Gold)" },
  { _id: 6, src: "proj_imgs/sale/fancy-ring.jpg", alt: "Fancy Ring (Gold)", title: "Fancy Ring (Gold)" },
  { _id: 7, src: "proj_imgs/sale/nugget-ring.jpg", alt: "Nugget Ring (Gold)", title: "Nugget Ring (Gold)" },
  { _id: 8, src: "proj_imgs/sale/jesus-ring.jpg", alt: "Jesus Ring (Gold)", title: "Jesus Ring (Gold)" },
];

// GET: Fetch all sale products
app.get("/api/saleproducts", (req, res) => {
  res.send(saleproducts);
});

// POST: Add a new sale product
app.post("/api/saleproducts", (req, res) => {
  const result = validateSaleProduct(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const product = {
    _id: saleproducts.length + 1,
    src: `proj_imgs/sale/${req.body.src}`,
    alt: req.body.alt,
    title: req.body.title,
  };

  saleproducts.push(product);
  res.status(201).send(product);
});

// PUT: Update an existing sale product by ID
app.put("/api/saleproducts/:id", (req, res) => {
  const product = saleproducts.find((p) => p._id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product with given ID was not found");

  const result = validateSaleProduct(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  product.src = `proj_imgs/sale/${req.body.src}`;
  product.alt = req.body.alt;
  product.title = req.body.title;

  res.send(product);
});

// DELETE: Remove a sale product by ID
app.delete("/api/saleproducts/:id", (req, res) => {
  const productIndex = saleproducts.findIndex((p) => p._id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send("Product not found");

  const removedProduct = saleproducts.splice(productIndex, 1);
  res.send(removedProduct);
});

// Validation schema for sale products
const validateSaleProduct = (product) => {
  const schema = Joi.object({
    src: Joi.string().required(),
    alt: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
  });

  return schema.validate(product);
};

// Regular Products Data
let products = {
  rings: [
    { _id: 1, category: "Rings", img_name: "proj_imgs/products/r1.jpg", description: "(Diamonds, White Gold)", details: ["Size 6", "18k White Gold", "0.5 Carats"], price: 1200, brand: "Paramount Jewelers" },
    { _id: 2, category: "Rings", img_name: "proj_imgs/products/r2.jpg", description: "(Diamonds, White Gold)", details: ["Size 7", "18k White Gold", "0.75 Carats"], price: 1500, brand: "Paramount Jewelers" },
    { _id: 3, category: "Rings", img_name: "proj_imgs/products/r3.jpg", description: "(Diamonds, White Gold)", details: ["Size 8", "18k White Gold", "1.0 Carats"], price: 2000, brand: "Paramount Jewelers" },
    { _id: 4, category: "Rings", img_name: "proj_imgs/products/r4.jpg", description: "(Diamonds, White Gold)", details: ["Size 9", "18k White Gold", "1.25 Carats"], price: 2500, brand: "Paramount Jewelers" },
    { _id: 5, category: "Rings", img_name: "proj_imgs/products/r5.jpg", description: "(Diamonds, White Gold)", details: ["Size 10", "18k White Gold", "1.5 Carats"], price: 3000, brand: "Paramount Jewelers" },
  ],
  necklaces: [
    { _id: 6, category: "Necklaces", img_name: "proj_imgs/products/chain-rope.jpg", description: "Rope Necklace (Gold)", details: ["20 inches", "18k Gold", "15g"], price: 800, brand: "Paramount Jewelers" },
    { _id: 7, category: "Necklaces", img_name: "proj_imgs/products/chain-cuban1.jpg", description: "Cuban Link Necklace, Thick (Gold)", details: ["24 inches", "18k Gold", "50g"], price: 2000, brand: "Paramount Jewelers" },
    { _id: 8, category: "Necklaces", img_name: "proj_imgs/products/chain-cuban2.jpg", description: "Cuban Link Necklace, Thin (Gold)", details: ["22 inches", "18k Gold", "30g"], price: 1500, brand: "Paramount Jewelers" },
    { _id: 9, category: "Necklaces", img_name: "proj_imgs/products/chain-cuban-silver.jpg", description: "Cuban Link Necklace (Silver)", details: ["22 inches", "Sterling Silver", "25g"], price: 700, brand: "Paramount Jewelers" },
    { _id: 10, category: "Necklaces", img_name: "proj_imgs/products/chain-figaro.jpg", description: "Figaro Link Necklace (Silver)", details: ["20 inches", "Sterling Silver", "20g"], price: 650, brand: "Paramount Jewelers" },
  ],
  bracelets: [
    { _id: 11, category: "Bracelets", img_name: "proj_imgs/products/bracelet1.jpg", description: "Cuban Link Bracelet (Gold, Diamonds)", details: ["7 inches", "18k Gold", "0.4 Carats"], price: 900, brand: "Paramount Jewelers" },
    { _id: 12, category: "Bracelets", img_name: "proj_imgs/products/bracelet2.jpg", description: "Butterfly Bracelet (Gold, Diamonds)", details: ["6.5 inches", "18k Gold", "0.3 Carats"], price: 950, brand: "Paramount Jewelers" },
    { _id: 13, category: "Bracelets", img_name: "proj_imgs/products/bracelet3.jpg", description: "Bracelet (Rose Gold, Diamonds)", details: ["6 inches", "Rose Gold", "0.5 Carats"], price: 1200, brand: "Paramount Jewelers" },
    { _id: 14, category: "Bracelets", img_name: "proj_imgs/products/bracelet4.jpg", description: "Rope Bracelet (Gold)", details: ["7 inches", "18k Gold", "10g"], price: 700, brand: "Paramount Jewelers" },
  ],
  watches: [
    { _id: 15, category: "Watches", img_name: "proj_imgs/products/daydate1.jpg", description: "Rolex: Daydate (Gold)", details: ["Daydate", "18k Gold", "Water Resistance: 100m"], price: 12000, brand: "Rolex" },
    { _id: 16, category: "Watches", img_name: "proj_imgs/products/datejust.jpg", description: "Rolex: Datejust (Black, Rose Gold, Diamonds)", details: ["Datejust", "Rose Gold", "0.5 Carats"], price: 15000, brand: "Rolex" },
    { _id: 17, category: "Watches", img_name: "proj_imgs/products/datejust2.jpg", description: "Rolex: Datejust (Green, Gold, Diamonds)", details: ["Datejust", "18k Gold", "0.75 Carats"], price: 18000, brand: "Rolex" },
    { _id: 18, category: "Watches", img_name: "proj_imgs/products/oysterperpetual.jpg", description: "Rolex: Oyster Perpetual (Steel)", details: ["Oyster Perpetual", "Steel", "Water Resistance: 100m"], price: 8000, brand: "Rolex" },
  ],
};

// GET: Fetch all products by category
app.get("/api/products/:category", (req, res) => {
  const category = req.params.category;
  if (!products[category]) {
    return res.status(404).send("Category not found");
  }
  res.send(products[category]);
});

// POST: Add a new product to any category
app.post("/api/products/:category", (req, res) => {
  const category = req.params.category;
  if (!products[category]) {
    return res.status(404).send("Category not found");
  }

  const product = {
    _id: products[category].length + 1,
    category: category,
    img_name: `proj_imgs/products/${req.body.img_name}`,
    description: req.body.description,
    details: req.body.details,
    price: req.body.price,
    brand: req.body.brand,
  };

  products[category].push(product);
  res.status(201).send(product);
});

// DELETE: Remove a product by category and ID
app.delete("/api/products/:category/:id", (req, res) => {
  const category = req.params.category;
  if (!products[category]) {
    return res.status(404).send("Category not found");
  }

  const productIndex = products[category].findIndex((p) => p._id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send("Product not found");

  const removedProduct = products[category].splice(productIndex, 1);
  res.send(removedProduct);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
