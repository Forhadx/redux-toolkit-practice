import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://redux-toolkit-prac-default-rtdb.firebaseio.com/";

const initialState = {
  lists: [],
  addLoader: false,
  addError: "",
  getLoader: false,
  getError: "",
  editLoader: false,
  editError: "",
  deleteloader: false,
  deleteError: "",
};

export const getPosts = createAsyncThunk(
  "posts/getsPosts",
  async (id = null, { rejectWithValue }) => {
    try {
      let result = await axios.get(URL + "namelist.json");
      let makeData = [];
      for (let key in result.data) {
        makeData.push({ id: key, ...result.data[key] });
      }
      return makeData;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const addPosts = createAsyncThunk(
  "posts/addPosts",
  async (data, { rejectWithValue }) => {
    try {
      let result = await axios.post(URL + "namelist.json", data);
      let singleData = { ...data, id: result.data.name };
      return singleData;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${URL}/namelist/${id}.jsn`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (data, { rejectWithValue }) => {
    try {
      let result = await axios.put(`${URL}/namelist/${data.id}.jsn`, data);
      return result.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      return {
        ...state,
        addLoader: false,
        addError: "",
        getLoader: true,
        getError: "",
        editLoader: false,
        editError: "",
        deleteloader: false,
        deleteError: "",
      };
    },
    [getPosts.fulfilled]: (state, action) => {
      return {
        ...state,
        lists: action.payload,
        addLoader: false,
        addError: "",
        getLoader: false,
        getError: "",
        editLoader: false,
        editError: "",
        deleteloader: false,
        deleteError: "",
      };
    },
    [getPosts.rejected]: (state, action) => {
      return {
        ...state,
        addLoader: false,
        addError: "",
        getLoader: false,
        getError: action.payload,
        editLoader: false,
        editError: "",
        deleteloader: false,
        deleteError: "",
      };
    },
    [addPosts.pending]: (state, action) => {
      return {
        ...state,
        addLoader: true,
        addError: "",
        getLoader: false,
        getError: "",
        editLoader: false,
        editError: "",
        deleteloader: false,
        deleteError: "",
      };
    },
    [addPosts.fulfilled]: (state, action) => {
      return {
        ...state,
        lists: [action.payload, ...state.lists],
        addLoader: false,
        addError: "",
        getLoader: false,
        getError: "",
        editLoader: false,
        editError: "",
        deleteloader: false,
        deleteError: "",
      };
    },
    [addPosts.rejected]: (state, action) => {
      return {
        ...state,
        addLoader: false,
        // addError: action.payload,
        addError: 'Couldn"t added',
        getLoader: false,
        getError: "",
        editLoader: false,
        editError: "",
        deleteloader: false,
        deleteError: "",
      };
    },
    [deletePost.pending]: (state, action) => {
      return {
        ...state,
        addLoader: false,
        addError: "",
        getLoader: false,
        getError: "",
        editLoader: false,
        editError: "",
        deleteloader: true,
        deleteError: "",
      };
    },
    [deletePost.fulfilled]: (state, action) => {
      let updateList = state.lists.filter((x) => x.id !== action.payload);
      return {
        ...state,
        lists: updateList,
        addLoader: false,
        addError: "",
        getLoader: false,
        getError: "",
        editLoader: false,
        editError: "",
        deleteloader: false,
        deleteError: "",
      };
    },
    [deletePost.rejected]: (state, action) => {
      return {
        ...state,
        addLoader: false,
        addError: "",
        getLoader: false,
        getError: "",
        editLoader: false,
        editError: "",
        deleteloader: false,
        // deleteError: action.payload,
        deleteError: "Couldn't deleted",
      };
    },
    [editPost.pending]: (state, action) => {
      return {
        ...state,
        addLoader: false,
        addError: "",
        getLoader: false,
        getError: "",
        editLoader: true,
        editError: "",
        deleteloader: false,
        deleteError: "",
      };
    },
    [editPost.fulfilled]: (state, action) => {
      const afterEditList = state.lists.map((li) =>
        li.id === action.payload.id ? action.payload : li
      );
      return {
        ...state,
        lists: afterEditList,
        addLoader: false,
        addError: "",
        getLoader: false,
        getError: "",
        editLoader: false,
        editError: "",
        deleteloader: false,
        deleteError: "",
      };
    },
    [editPost.rejected]: (state, action) => {
      return {
        ...state,
        addLoader: false,
        addError: "",
        getLoader: false,
        getError: "",
        editLoader: false,
        // editError: action.payload,
        editError: "Http error",
        deleteloader: false,
        deleteError: "",
      };
    },
  },
});

export default postsSlice.reducer;
