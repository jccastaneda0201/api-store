const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const Product = require("../../src/models/products.model");

describe("api de products", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/store");
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });

  //Test sobre el GET
  describe("GET /api/products", () => {
    let response;
    beforeAll(async () => {
      //Codigo ejecuta antes de Todas las pruebas
      response = await request(app).get("/api/products").send();
    });

    it("Deberia retornar status 200", () => {
      // Vamos a lanzar api con supertest
      expect(response.status).toBe(200); // Deberia retornar status 200
      // instancia de la aplicacion de express
    });
    it("deberia responder con un json", () => {
      expect(response.headers["content-type"]).toContain("application/json");
    });
    it("deberia devolver un array", () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("POST /api/products", () => {
    // Test sobre el POST
    let response;
    const body = {
      name: "Producto 1",
      description: "Descripción del producto 1",
      price: 100,
      departament: "test",
      stock: 10,
      available: "true",
    };
    beforeAll(async () => {
      response = await request(app).post("/api/products").send(body);
    });
    //Para borrar el contenido despues de los test
    afterAll(async () => {
      await Product.deleteMany({ departament: "test" });
    });
    it("Deberia responder correcatamente la url", () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
    });
    it("Deberia insertar el nuevo producto", async () => {
      expect(response.body._id).toBeDefined();
    });
    it("Deberia ver los datos del body en la BD", async () => {
      expect(response.body.name).toBe(body.name);
      expect(response.body.description).toBe(body.description);
      expect(response.body.price).toBe(body.price);
      expect(response.body.departament).toBe(body.departament);
      expect(response.body.stock).toBe(body.stock);
      expect(response.body.available).toBe(body.available);
    });
  });
  describe("PUT /api/products/PRODUCTID", () => {
    // Test sobre el POST
    let response;
    let product;

    const body = {
      name: "Producto 1",
      description: "Descripción del producto 1",
      price: 100,
      departament: "test",
      stock: 10,
      available: "true",
    };

    beforeAll(async () => {
      //creo un producto en la base de datos
      product = await Product.create(body);
      //Lanzo la peticion
      response = await request(app)
        .put(`/api/products/${product._id}`)
        .send({ stock: 30, available: false });
    });
    //Luego borro producto para dejar limpia la BD
    afterAll(async () => {
      await Product.findByIdAndDelete(product._id);
    });
    it("Deberia responder correcatamente la url", () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
    });
    it("Deberia responder con el producto actualizado", async () => {
      expect(response.body.stock).toBe(30);
      expect(response.body.available).toBe(false);
    });
  });
  describe("DELETE /api/products/PRODUCTID", () => {
    // Test sobre el POST
    let response;
    let product;

    const body = {
      name: "Producto 1",
      description: "Descripción del producto 1",
      price: 100,
      departament: "test",
      stock: 10,
      available: "true",
    };

    beforeAll(async () => {
      //creo un producto en la base de datos
      product = await Product.create(body);
      //Lanzo la peticion
      response = await request(app)
        .delete(`/api/products/${product._id}`)
        .send();
    });
    //Luego borro producto para dejar limpia la BD
    afterAll(async () => {
      await Product.findByIdAndDelete(product._id);
    });
    it("Deberia responder correcatamente la url", () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
    });
    it("el producto no deberia estar en la base de datos", async () => {
      const prod = await Product.findById(productId);
      expect(prod).toBeNull();
    });
  });
});
