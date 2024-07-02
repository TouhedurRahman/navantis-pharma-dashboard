import { useQuery } from '@tanstack/react-query';

const useCategories = () => {
    const { data: categories = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const url = '/categories.json';
            const result = await fetch(url);
            return result.json();
        }
    })

    return [categories, loading, refetch];
};

export default useCategories;