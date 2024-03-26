import db from "../models/db.js";

const pool = db();

//Create product
export const createProduct = (req, res) => {
  res.status(200).render("form");
};

export const PostcreateProduct = async (req, res) => {
  const { name, email } = req.body;

  if (!req.body || !req.body.name || !req.body.email) {
    return res
      .status(400)
      .json({ message: "Name and email are required in the request body" });
  }

  const userExists = await pool.query("SELECT 1 FROM users WHERE email = $1", [
    email,
  ]);
  if (userExists.rowCount === 1) {
    return res.status(400).send("the user exists");
  }

  const queryResult = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );

  res.redirect("/");
};

//Get products
export const getProducts = async (req, res) => {
  try {
    const sql = "SELECT * FROM users";
    const queryResult = await pool.query(sql);

    res.status(200).render("home", {
      products: queryResult.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const queryResult = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);

    if (!queryResult.rows[0]) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).render("home", {
      products: queryResult.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

//Update products
export const putUpdayeById = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!req.body || !req.body.name || !req.body.email) {
      return res
        .status(400)
        .json({ message: "Name and email are required in the request body" });
    }

    //Confimar la deferencia de los datos del body con la base de datos
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows[0].name === name) {
      return res
        .status(400)
        .send("Realze algun cambio para poder actualizar los datos.");
    }

    // Actualizar el usuario en la base de datos
    await pool.query("UPDATE users SET name = $1 WHERE email = $2", [
      name,
      email,
    ]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export const getUpdate = async (req, res) => {
  try {
    const { id } = req.query;
    const userExists = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    res.render("update", { user: userExists.rows[0] });
    console.log(userExists.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

//Delete
export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const userExists = await pool.query("SELECT 1 FROM users WHERE id = $1", [
      id,
    ]);
    if (userExists.rowCount === 0) {
      return res.status(400).send("User not found");
    }

    const queryResult = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export default {
  getProducts,
  getProductsById,
  putUpdayeById,
  deleteById,
  createProduct,
};
