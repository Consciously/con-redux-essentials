import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = []

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post('/fakeApi/posts', initialPost)
    return response.data
  }
)

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.posts.push(action.payload)
    })
  },
})

export default usersSlice.reducer

export const selectAllUsers = (state) => state.users
export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId)
