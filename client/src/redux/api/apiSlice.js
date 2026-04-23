import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://e-commerce-spb9.onrender.com/api',
        // Include credentials (cookies) in every request
        credentials: 'include', 
    }),
    tagTypes: ['User', 'Cart', 'Products'],
    endpoints: (builder) => ({
        // Queries (GET requests)
        getCurrentUser: builder.query({
            query: () => '/user-details',
            providesTags: ['User'],
        }),
        getCartCount: builder.query({
            query: () => '/count-addtocart-product',
            providesTags: ['Cart'],
            transformResponse: (response) => response?.data?.count || 0,
        }),
        // Example Mutation (POST/PUT/DELETE)
        addToCart: builder.mutation({
            query: (productId) => ({
                url: '/addToCart',
                method: 'POST',
                body: { productId },
            }),
            // After successfully adding to cart, invalidate the 'Cart' tag to auto-refetch the getCartCount!
            invalidatesTags: ['Cart'],
        }),
    }),
});

// Auto-generated hooks based on your endpoint names
export const { 
    useGetCurrentUserQuery, 
    useGetCartCountQuery,
    useAddToCartMutation
} = apiSlice;
