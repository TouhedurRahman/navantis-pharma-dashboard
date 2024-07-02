import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
    const { data: products = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const url = 'https://api.navantispharma.com/latest-products';
            const result = await fetch(url);
            return result.json();
        }
    })

    return [products, loading, refetch];
};

export default useProducts;