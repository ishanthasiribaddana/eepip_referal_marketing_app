import { apiClient } from './apiClient';
import type { Product } from '../types';

export class ProductService {
  async getAll(): Promise<Product[]> {
    return apiClient.get<Product[]>('/products');
  }

  async getById(id: number): Promise<Product> {
    return apiClient.get<Product>(`/products/${id}`);
  }

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    return apiClient.post<Product>('/products', product);
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    return apiClient.put<Product>(`/products/${id}`, product);
  }

  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/products/${id}`);
  }

  async getActive(): Promise<Product> {
    return apiClient.get<Product>('/products/active');
  }
}

export const productService = new ProductService();
