import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import Swal from 'sweetalert2'

const initialState = {
    gunplas: [],
    gunpla: null,
    loading: false,
    error: null,
};

const gunplaSlice = createSlice({
    name: "gunpla",
    initialState,
    reducers: {
        setGunplas: (state, action) => {
            state.gunplas = action.payload;
        },
        setGunpla: (state, action) => {
            state.gunpla = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
});

export const {
    setGunplas,
    setGunpla,
    setLoading,
    setError,
    clearError,
} = gunplaSlice.actions;

export const fetchGunpla = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const querySnapshot = await getDocs(collection(db, "gunpla"));
        const result = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        dispatch(setGunplas(result));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};

export const gunplaById = (idGunpla) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const docRef = doc(db, 'gunpla', idGunpla);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const item = {
                name: docSnap.data().name,
                grade: docSnap.data().grade,
                scale: docSnap.data().scale,
                imageUrl: docSnap.data().imageUrl,
                shortDesc: docSnap.data().shortDesc,
                longDesc: docSnap.data().longDesc,
            };
            dispatch(setGunpla(item));
            dispatch(setError(null));
        } else {
            dispatch(setGunpla(null));
            dispatch(setError("404"))
        }
    } catch (error) {
        dispatch(setError(error))
    } finally {
        dispatch(setLoading(false));
    }
};

export const addGunpla = (gunpla) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await addDoc(collection(db, "gunpla"), {
            name: gunpla.name,
            grade: gunpla.grade,
            imageUrl: gunpla.imgUrl,
            scales: gunpla.scale,
            shortDesc: gunpla.shortDesc,
            longDesc: gunpla.longDesc
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "エラー発生",
            text: "投稿失敗しました",
        });
        dispatch(setError(error))
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteGunpla = (idGunpla) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await deleteDoc(doc(db, "gunpla", idGunpla));
        dispatch(fetchGunpla());
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "エラー発生",
            text: "削除失敗しました",
        });
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};

export const editGunplaById = (gunpla) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const docRef = doc(db, 'gunpla', gunpla.id);
        await updateDoc(docRef, {
            name: gunpla.name,
            grade: gunpla.grade,
            scale: gunpla.scale,
            imageUrl: gunpla.imgUrl,
            shortDesc: gunpla.shortDesc,
            longDesc: gunpla.longDesc,
        });
        dispatch(fetchGunpla());
    } catch {
        Swal.fire({
            icon: "error",
            title: "エラー発生",
            text: "編集失敗！",
        });
        dispatch(setError())
    } finally {
        dispatch(setLoading(false))
    }
};

export default gunplaSlice.reducer;