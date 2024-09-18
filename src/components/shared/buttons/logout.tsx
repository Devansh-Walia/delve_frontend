"use client";

import { useState } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { accessTokenCookieKey } from "@/utils/constants";

const Logout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    deleteCookie(accessTokenCookieKey);
    router.push("/login");
  };

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
