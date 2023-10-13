/**
 * Controla como el usuario interactua con la aplicacion
 */

const debug = require("debug")("app:module-products-controller");
const { Response } = require("../common/response");
const createError = require("http-errors");

const { ProductService } = require("./service");

module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductService.getAll();
      Response.success(res, 200, "Lista de productos", products);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let product = await ProductService.getById(id);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${id}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  createProduct: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length == 0){
        Response.error(res, new createError.BadRequest)
      } else {
        const insertedId = await ProductService.create(body);
        Response.success(res, 201, 'Producto agregado', insertedId)
      }      
    } catch (error) {
      debug(error);
      Response.error(res)
    }
  },

  generateReport: (req, res) => {
    try {
      ProductService.generateReport('Inventario', res)
    } catch (error) {
      debug(error);
      Response.error(res)
    }
  }
};
