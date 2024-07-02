import { useQuery } from '@tanstack/react-query';

const useCareers = () => {
    const { data: careers = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['careers'],
        queryFn: async () => {
            const url = 'https://api.navantispharma.com/careers';
            const result = await fetch(url);
            return result.json();
        }
    })

    return [careers, loading, refetch];
};

export default useCareers;