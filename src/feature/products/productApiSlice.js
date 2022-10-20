import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: credentials => ({
                url: "/products",
                method: "GET",
                params: {...credentials} 
            }),
            providesTags: ["Products"]
        }),
        getProduct: builder.query({
            query: credentials => ({
                url: "/products",
                method: "GET",
                params: {...credentials} 
            }),
            providesTags: ["Products"]
        }),
        filterProduct: builder.mutation({
            query: credentials => ({
                url: `/products/${credentials}`,
                method: "POST"
            }),
            invalidatesTags: ["Products"]
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useFilterProductMutation
} = productApiSlice