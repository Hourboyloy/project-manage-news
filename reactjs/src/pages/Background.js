import axios from "axios";
import React, { useEffect, useState } from "react";
import BackgroundImageManager from "../components/BackgroundImageManager";
import { Setbg } from "../components/backgroundStore";
import { useNavigate } from "react-router-dom";
import { id_bg } from "../components/ID_BG";
import FullPageLoader from "../components/FullPageLoader";

function Background() {
  const [isLoader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [background, setBG] = useState(null);

  const handleFetchDataBG = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5051/background-getAll"
      );
      setBG(response.data);
      if (response.status === 200) {
        setLoader(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchDataBG(); // Fetch data when the component mounts
  }, [background]);

  const handleGetImageById = async (imageId) => {
    try {
      const response = await axios.get(
        `http://localhost:5051/background-get/${imageId}`,
        {
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem(
          //     "admin_access_token"
          //   )}`,
          // },
        }
      );
      console.log("Image retrieved successfully:");
      if (response) {
        localStorage.setItem("background", JSON.stringify(response.data));
        if (Setbg() !== null) {
          navigate("/background");
        }
      }
    } catch (error) {
      console.error("Error retrieving image:", error);
      throw error;
    }
  };

  const handleDeleteImageById = async (imageId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5051/background-remove/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "admin_access_token"
            )}`,
          },
        }
      );
      console.log("Image deleted successfully:", response.data);
      if (response) {
        if (id_bg() === imageId) {
          // Creating a fake object
          const backgroundObj = {
            bgurl:
              "https://res.cloudinary.com/doathl3dp/image/upload/v1726764522/vbuqragemi8thbwy1vfy.webp",
            createdAt: "2024-09-18T10:51:21.423Z",
            __v: 0,
            _id: "98756782",
          };

          // Store the object as a string in localStorage
          localStorage.setItem("background", JSON.stringify(backgroundObj));

          // Reload the window to apply changes
          window.location.reload();
        }
      }
      handleFetchDataBG();
      return response.data;
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Prepare form data
    const formData = new FormData();
    formData.append("bgurl", file);

    try {
      // Send a POST request to the server using axios
      const response = await axios.post(
        "http://localhost:5051/upload-bg",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "admin_access_token"
            )}`,
          },
        }
      );
      if (response.status === 20) {
        console.log("Image uploaded successfully:");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      {isLoader ? (
        <div className="p-4 md:p-6">
          <BackgroundImageManager
            background={background}
            handleGetImageById={handleGetImageById}
            handleDeleteImageById={handleDeleteImageById}
            handleImageUpload={handleImageUpload}
          />
        </div>
      ) : (
        <FullPageLoader />
      )}
    </div>
  );
}

export default Background;
