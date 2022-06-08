import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';
import { getalluserData, getuserData, getcartData } from './ProductAPI'

const initialState = {
  value: 1,
  status: false,
  product: [],
  users: [],
  cart : []
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const getalluser = createAsyncThunk(
  'counter/fetchProducts',
  async() => {
    const response = await getalluserData()
    // console.log(response.data, '......response');
    return response.data;
  }
)

export const getuser = createAsyncThunk(
  'counter/fetchuser',
  async () => {
    const response = await getuserData()
    // console.log(response.data, 'RESPONSEDATA');
    return response.data
  }
)

export const getcart = createAsyncThunk(
  'counter/fetchcartdata',
  async () => {
    const response = await getcartData()
    // console.log(response.data, '....respoinsedatax');
    return response.data
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = false;
        state.value += action.payload;
      })
      .addCase(getalluser.pending, (state) => {
        state.status = true
      })
      .addCase(getalluser.fulfilled, (state,action) => {
        state.status = false
        state.product =  action.payload
      })
      .addCase(getuser.pending, (state) => {
        state.status = true
      })
      .addCase(getuser.fulfilled, (state,action) => {
        state.status = false
        state.users =  action.payload
      })
      .addCase(getcart.pending, (state) => {
        state.status = true
      })
      .addCase(getcart.fulfilled, (state,action) => {
        state.status = false
        state.cart =  action.payload
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectStatus = (state) => state.counter.status
export const selectProduct = (state) => state.counter.product; 
export const selectUser = (state) => state.counter.users; 
export const selectCart = (state) => state.counter.cart;


export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default counterSlice.reducer;