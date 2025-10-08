import { createProduct, fetchProductById, fetchProducts, type PaginatedProductsResponse, type Product } from '@/services/productService';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';

export const useProducts = () => {
   return useInfiniteQuery<PaginatedProductsResponse, Error, PaginatedProductsResponse, string[], number>({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) => fetchProducts(pageParam),
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      if (nextSkip < lastPage.total) {
        return nextSkip;
      }
      return undefined;
    },
    initialPageParam: 0,
  });
};

export const useProduct = (id: number) => {
    return useQuery<Product, Error>({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id),
        enabled: !!id,
    });
};

export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};
