import axios from "axios";
import { server } from "../../server";

export const getAllCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllCategoryRequest",
    });

    const { data } = await axios.get(`${server}/category`);
    dispatch({
      type: "getAllCategorySuccess",
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: "getAllCategoryFailed",
      payload: error.response.data.message,
    });
  }
};
