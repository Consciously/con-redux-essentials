// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with `/fakeApi`
  baseQuery: fetchBaseQuery({ baseUrl: `/fakeApi` }),
  tagTypes: ['Post'],
  // The `endpoints` represents operations and requests for this server
  endpoints: (builder) => ({
    // The `getsPosts` endpoint ist a `query` operation that returns data
    getPosts: builder.query({
      // The URL for the requests is `/fakeAPi/posts`
      query: () => `/posts`,
      providesTags: (result = [], error, arg) => [
        'Post',
        ...result.map(({ id }) => ({ type: 'Post', id })),
      ],
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
    editPosts: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
  }),
})

// Export the auto-generated hook for the `getsPosts` query endpoint
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostsMutation,
} = apiSlice
