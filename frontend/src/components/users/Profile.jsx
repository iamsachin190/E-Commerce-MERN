import React from "react";

const Profile = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden w-96 mx-auto mt-12 ">
      {/* Background Gradient */}
      <div className=" flex  flex-row-reverse bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 h-32">
        <div className="m-2">
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Profile Image */}
      <div className="relative -mt-12 flex justify-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
        />
      </div>

      {/* Name and Title */}
      <div className="text-center mt-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Jesselyn Wang</h2>
      </div>
    </div>
  );
};

export default Profile;
