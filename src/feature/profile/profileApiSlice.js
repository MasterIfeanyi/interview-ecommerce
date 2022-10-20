import { apiSlice } from "../../app/api/apiSlice";

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.query({
            query: credentials => ({
                url: `/users/${credentials}`,
                method: "GET"
            }),
            providesTags: ["Profile"]
        }),
        updateProfile: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["Profile"]
        })
    })
})

export const {
    useGetProfileQuery,
    useUpdateProfileMutation
} = profileApiSlice