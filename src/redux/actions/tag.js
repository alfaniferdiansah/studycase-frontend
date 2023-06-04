import axios from "axios";
import { server } from "../../server";

export const getAllTag = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllTagRequest",
    });

    const { data } = await axios.get(`${server}/tag`);
    dispatch({
      type: "getAllTagSuccess",
      payload: data.tag,
    });
  } catch (error) {
    dispatch({
      type: "getAllTagFailed",
      payload: error.response.data.message,
    });
  }
};
