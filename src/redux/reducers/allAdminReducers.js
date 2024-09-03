import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admins: [],
};

const allAdminSLicer = createSlice({
    name: "allAdmin",
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            state.admins = action.payload;
        },
        setAddAdmin(state, action) {
            state.admins.push(action.payload);
        },
        setUpdateAdmin(state, action) {
            const index = state.admins.findIndex(admins => admins.id === action.payload.id);
            if (index !== -1) {
                state.admins[index] = { ...state.admins[index], ...action.payload };
            }
        },
        setDeleteAdmin(state, action) {
            state.admins = state.admins.filter(admin => admin.id !== action.payload);
        },
    },
});

export const { setAdmin, setAddAdmin, setUpdateAdmin, setDeleteAdmin } = allAdminSLicer.actions;
export default allAdminSLicer.reducer;