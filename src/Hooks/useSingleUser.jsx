import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useSingleUser = () => {
    const { user } = useAuth();

    const { data: singleUser = {}, isLoading: loadingSingleUser, refetch } = useQuery({
        queryKey: ['singleUser', user?.email],
        queryFn: async () => {
            const url = `https://api.navantispharma.com/user/${user.email}`;
            const result = await fetch(url);
            return result.json();
        }
    })

    return [singleUser, loadingSingleUser, refetch];
};

export default useSingleUser;