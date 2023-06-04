import axios from "axios";
import { server } from "../../server";

export const getAllProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductRequest",
    });

    const { data } = await axios.get(`${server}/product`);
    dispatch({
      type: "getAllProductSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductFailed",
      payload: error.response.data.message,
    });
  }
};
