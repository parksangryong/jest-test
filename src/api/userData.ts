import axios from "axios";

export const fetchUserData = async (): Promise<any> => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOpenApiUser = async (): Promise<any> => {
  try {
    const response = await axios.get(
      "https://dummyapi.io/data/v1/user?page=2&linit=20",
      {
        headers: {
          "app-id": "66791af73453ded09a01b03f",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
