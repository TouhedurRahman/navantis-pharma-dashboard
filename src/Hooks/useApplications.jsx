import { useQuery } from "@tanstack/react-query";

const useApplications = () => {
    const { data: applications = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const url = 'http://localhost:5000/applications';
            const result = await fetch(url);
            return result.json();
        }
    })

    return [applications, loading, refetch];
};

export default useApplications;