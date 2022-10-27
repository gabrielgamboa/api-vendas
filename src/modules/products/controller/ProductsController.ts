import { Request, Response } from 'express';
import { CreateProductService } from '../services/CreateProductService';
import { DeleteProductByIdService } from '../services/DeleteProductByIdService';
import { ListProductService } from '../services/ListProductService';
import { ShowProductByIdService } from '../services/ShowProductByIdService';
import { UpdateProductById } from '../services/UpdateProductByIdService';

export class ProductsController {
  public async index(request: Request, response: Response) {
    const listProducts = new ListProductService();
    const products = await listProducts.execute();
    return response.json(products);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const showProductById = new ShowProductByIdService();
    const product = await showProductById.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();
    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.status(201).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProductById = new UpdateProductById();
    const product = await updateProductById.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductByIdService();

    await deleteProduct.execute(id);

    return response.status(201).json();
  }
}
