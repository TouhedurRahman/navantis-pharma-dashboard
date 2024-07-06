import { useQuery } from "@tanstack/react-query";

const useQueries = () => {
    const { data: queries = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['queries'],
        queryFn: async () => {
            const url = 'http://localhost:5000/queries';
            const result = await fetch(url);
            return result.json();
        }
    })

    return [queries, loading, refetch];
};

export default useQueries;