const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

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

// GET: Fetch all products
app.get("/api/saleproducts", (req, res) => {
  res.send(saleproducts);
});

// POST: Add a new product
app.post("/api/saleproducts", (req, res) => {
  const result = validateProduct(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const product = {
    _id: saleproducts.length + 1,
    src: `proj_imgs/sale/${req.body.src}`, // assuming only the file name is sent in the request body
    alt: req.body.alt,
    title: req.body.title,
  };

  saleproducts.push(product);
  res.status(201).send(product);
});

// PUT: Update an existing product by ID
app.put("/api/saleproducts/:id", (req, res) => {
  const product = saleproducts.find((p) => p._id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product with given ID was not found");

  const result = validateProduct(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  product.src = `proj_imgs/sale/${req.body.src}`; // update the file path
  product.alt = req.body.alt;
  product.title = req.body.title;

  res.send(product);
});

// DELETE: Remove a product by ID
app.delete("/api/saleproducts/:id", (req, res) => {
  const product = saleproducts.find((p) => p._id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product with given ID was not found");

  const index = saleproducts.indexOf(product);
  saleproducts.splice(index, 1);

  res.send(product);
});

// Validation schema for products
const validateProduct = (product) => {
  const schema = Joi.object({
    src: Joi.string().required(),
    alt: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
  });

  return schema.validate(product);
};


// Products API
let products = {
  "rings": [
    { _id: 1, category: "Rings", img_name: "proj_imgs/products/r1.jpg", description: "(Diamonds, White Gold)", details: ["Size 6", "18k White Gold", "0.5 Carats"], price: 1200, brand: "Paramount Jewelers" },
    { _id: 2, category: "Rings", img_name: "proj_imgs/products/r2.jpg", description: "(Diamonds, White Gold)", details: ["Size 7", "18k White Gold", "0.75 Carats"], price: 1500, brand: "Paramount Jewelers" },
    { _id: 3, category: "Rings", img_name: "proj_imgs/products/r3.jpg", description: "(Diamonds, White Gold)", details: ["Size 8", "18k White Gold", "1.0 Carats"], price: 2000, brand: "Paramount Jewelers" },
    { _id: 4, category: "Rings", img_name: "proj_imgs/products/r4.jpg", description: "(Diamonds, White Gold)", details: ["Size 9", "18k White Gold", "1.25 Carats"], price: 2500, brand: "Paramount Jewelers" },
    { _id: 5, category: "Rings", img_name: "proj_imgs/products/r5.jpg", description: "(Diamonds, White Gold)", details: ["Size 10", "18k White Gold", "1.5 Carats"], price: 3000, brand: "Paramount Jewelers" }
  ],

  "necklaces": [
    { _id: 6, category: "Necklaces", img_name: "proj_imgs/products/chain-rope.jpg", description: "Rope Necklace (Gold)", details: ["20 inches", "18k Gold", "15g"], price: 800, brand: "Paramount Jewelers" },
    { _id: 7, category: "Necklaces", img_name: "proj_imgs/products/chain-cuban1.jpg", description: "Cuban Link Necklace, Thick (Gold)", details: ["24 inches", "18k Gold", "50g"], price: 2000, brand: "Paramount Jewelers" },
    { _id: 8, category: "Necklaces", img_name: "proj_imgs/products/chain-cuban2.jpg", description: "Cuban Link Necklace, Thin (Gold)", details: ["22 inches", "18k Gold", "30g"], price: 1500, brand: "Paramount Jewelers" },
    { _id: 9, category: "Necklaces", img_name: "proj_imgs/products/chain-cuban-silver.jpg", description: "Cuban Link Necklace (Silver)", details: ["22 inches", "Sterling Silver", "25g"], price: 700, brand: "Paramount Jewelers" },
    { _id: 10, category: "Necklaces", img_name: "proj_imgs/products/chain-figaro.jpg", description: "Figaro Link Necklace (Silver)", details: ["20 inches", "Sterling Silver", "20g"], price: 650, brand: "Paramount Jewelers" }
  ],

  "bracelets": [
    { _id: 11, category: "Bracelets", img_name: "proj_imgs/products/bracelet1.jpg", description: "Cuban Link Bracelet (Gold, Diamonds)", details: ["7 inches", "18k Gold", "0.4 Carats"], price: 900, brand: "Paramount Jewelers" },
    { _id: 12, category: "Bracelets", img_name: "proj_imgs/products/bracelet2.jpg", description: "Butterfly Bracelet (Gold, Diamonds)", details: ["6.5 inches", "18k Gold", "0.3 Carats"], price: 950, brand: "Paramount Jewelers" },
    { _id: 13, category: "Bracelets", img_name: "proj_imgs/products/bracelet3.jpg", description: "Bracelet (Rose Gold, Diamonds)", details: ["6 inches", "Rose Gold", "0.5 Carats"], price: 1200, brand: "Paramount Jewelers" },
    { _id: 14, category: "Bracelets", img_name: "proj_imgs/products/bracelet4.jpg", description: "Rope Bracelet (Gold)", details: ["7 inches", "18k Gold", "10g"], price: 700, brand: "Paramount Jewelers" }
  ],

  "watches": [
    { _id: 15, category: "Watches", img_name: "proj_imgs/products/daydate1.jpg", description: "Rolex: Daydate (Gold)", details: ["Daydate", "18k Gold", "Water Resistance: 100m"], price: 12000, brand: "Rolex" },
    { _id: 16, category: "Watches", img_name: "proj_imgs/products/datejust.jpg", description: "Rolex: Datejust (Black, Rose Gold, Diamonds)", details: ["Datejust", "Rose Gold", "0.5 Carats"], price: 15000, brand: "Rolex" },
    { _id: 17, category: "Watches", img_name: "proj_imgs/products/datejust2.jpg", description: "Rolex: Datejust (Green, Gold, Diamonds)", details: ["Datejust", "Gold", "1.0 Carats"], price: 16000, brand: "Rolex" }
  ]
};

// GET: Fetch all products
app.get("/api/products", (req, res) => {
  res.send(products);
});

// GET: Fetch products by category
app.get("/api/products/:category", (req, res) => {
  const category = req.params.category;
  if (!products[category]) {
    return res.status(404).send("Category not found");
  }
  res.send(products[category]);
});

// POST: Add a new product to a specific category
app.post("/api/products/:category", (req, res) => {
  const category = req.params.category;

  if (!products[category]) return res.status(404).send("Category not found");

  const result = validateMainProduct(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const newProduct = {
    _id: products[category].length + 1,
    category: category,
    img_name: req.body.img_name,
    description: req.body.description,
    details: req.body.details,
    price: req.body.price,
    brand: req.body.brand,
  };

  products[category].push(newProduct);
  res.status(201).send(newProduct);
});

// PUT: Update an existing product by ID in a specific category
app.put("/api/products/:category/:id", (req, res) => {
  const category = req.params.category;
  const id = parseInt(req.params.id);

  if (!products[category]) return res.status(404).send("Category not found");

  const product = products[category].find((p) => p._id === id);
  if (!product) return res.status(404).send("Product with given ID was not found");

  const result = validateMainProduct(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  product.img_name = req.body.img_name;
  product.description = req.body.description;
  product.details = req.body.details;
  product.price = req.body.price;
  product.brand = req.body.brand;

  res.send(product);
});

// Validation schema for main products
const validateMainProduct = (product) => {
  const schema = Joi.object({
    img_name: Joi.string().required(),
    description: Joi.string().min(3).required(),
    details: Joi.array().items(Joi.string()).required(),
    price: Joi.number().required(),
    brand: Joi.string().required(),
  });

  return schema.validate(product);
};










// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

