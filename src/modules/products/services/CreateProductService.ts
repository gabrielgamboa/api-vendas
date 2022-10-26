import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface ICreateProductDTO {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const productsExistsWithSameName = await productsRepository.findByName(
      name,
    );

    if (productsExistsWithSameName)
      throw new ApplicationError('There is already one product whit this name');

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}
