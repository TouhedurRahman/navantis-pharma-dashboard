import { useQuery } from "@tanstack/react-query";

const useQueries = () => {
    const { data: queries = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['queries'],
        queryFn: async () => {
            const url = 'https://api.navantispharma.com/queries';
            const result = await fetch(url);
            return result.json();
        }
    })

    return [queries, loading, refetch];
};

export default useQueries;