import apiClient from '../api/apiClient';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface PaginatedProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export const fetchProducts = async (skip: number = 0, limit: number = 20): Promise<PaginatedProductsResponse> => {
  const response = await apiClient.get<PaginatedProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (newProduct: Omit<Product, 'id' | 'images'>): Promise<Product> => {
    const response = await apiClient.post<Product>('/products/add', JSON.stringify(newProduct));
    return response.data;
}

