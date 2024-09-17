"use client";

import { useState } from "react";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {};

  return (
    <button
      className="ml-3 cursor-pointer"
      onClick={async () => {
        setIsLoading(true);
        logout();
        setIsLoading(false);
      }}
    >
      {isLoading && (
        <div className="block animate-spin rounded-full border-2 h-5 w-5 border-t-white border-black" />
      )}
      Logout
    </button>
  );
};

export default Logout;
