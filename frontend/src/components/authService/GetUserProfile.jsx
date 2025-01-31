import axios from "axios";

const getUserProfile = async () => {
  try {
    // Get the access token from localStorage
    const token = localStorage.getItem("accessToken");

    // Make the API request with the Authorization header
    const response = await axios.get("http://localhost:8080/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      Credentials: "include",
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data?.message || error.message);
    return null;
  }
};

export default getUserProfile;
