import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "../../feature/auth/authSlice"

// attach the accessToken to our request
const baseQuery = fetchBaseQuery({
    // back-end url
    baseUrl: "https://ifeanyi-ecommerce.glitch.me/", 
    // send cookie with every request
    credentials: "include", 
    prepareHeaders: (headers, { getState }) => {
        // get accessToken from state
        const token = getState().auth.token
        // set Authorization header
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})



// this will retry the request if the accessToken expires.
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403) {
        console.log(`sending refresh Token`);
        // send refreshToken to get a new accessToken
        const refreshResult = await baseQuery("/refresh", api, extraOptions);

        if (refreshResult?.data) {
            // get the username from state
            const user = api.getState().auth.user;
            // store the new accessToken in state
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            // retry the original query with the new access Token
            result = await baseQuery(args, api, extraOptions);
        } else {
            // logout the user
            api.dispatch(logOut());
        }
    }

    // if everything goes well
    return result;
}



// we create our Api
export const apiSlice = createApi({
    // wrap baseQuery with baseQueryReauth
    baseQuery: baseQueryWithReauth,

    tagTypes: ["Products", "Profile"],

    // inject api endpoints
    endpoints: builder => ({})
})