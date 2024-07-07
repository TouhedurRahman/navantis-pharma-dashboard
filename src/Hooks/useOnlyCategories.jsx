import { useQuery } from "@tanstack/react-query";

const useOnlyCategories = () => {
    const { data: onlyCategories = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['onlyCategories'],
        queryFn: async () => {
            const url = 'http://localhost:5000/only-categories';
            const result = await fetch(url);
            return result.json();
        }
    })

    return [onlyCategories, loading, refetch];
};

export default useOnlyCategories;