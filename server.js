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

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
