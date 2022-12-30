import { ApolloClient, InMemoryCache, type NormalizedCacheObject } from "@apollo/client";
import { useSelector } from "react-redux";
import { env } from './env/client.mjs'
import { type RootState } from "./redux/store.js";

const useClientConfig: () => ApolloClient<NormalizedCacheObject> = () => {
    const token = useSelector((state: RootState) => state.auth.user.token);
    const client = new ApolloClient({
        uri: `${env.NEXT_PUBLIC_API_BASE_URL}/graphql`,
        headers: {
            Authorization: "Bearer " + token,
        },
        cache: new InMemoryCache({
            resultCaching: true,
        }),
    });

    return client;
}

export default useClientConfig;