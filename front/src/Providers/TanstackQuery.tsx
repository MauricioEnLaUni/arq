import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default ({ children }: { children: React.ReactNode }) => {
    return(
        <QueryClientProvider client={queryClient}>
            { children }
            <ReactQueryDevtools initialIsOpen/>
        </QueryClientProvider>
    );
}
