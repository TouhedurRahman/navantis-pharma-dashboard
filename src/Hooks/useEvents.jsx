import { useQuery } from '@tanstack/react-query';

const useEvents = () => {
    const { data: events = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const url = 'https://api.navantispharma.com/events';
            const result = await fetch(url);
            return result.json();
        }
    })

    return [events, loading, refetch];
};

export default useEvents;