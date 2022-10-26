import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

export class ShowProductByIdService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = productsRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) throw new ApplicationError('Product not found');

    return product;
  }
}
