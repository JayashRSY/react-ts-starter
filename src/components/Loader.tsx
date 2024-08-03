import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Loader: React.FC = () => {
  const { isLoading } = useSelector((state: RootState) => state.layout);
  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Loader;
