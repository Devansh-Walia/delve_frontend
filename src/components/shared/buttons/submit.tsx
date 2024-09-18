"use client";

import clsx from "clsx";
import { useFormStatus } from "react-dom";

const Submit = ({ title }: { title: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx(
        "text-white w-full p-3 rounded-md flex items-center justify-center gap-2",
        pending ? "cursor-not-allowed  bg-primary/50" : "bg-primary"
      )}
    >
      {pending && (
        <div className="block animate-spin rounded-full border-2 h-5 w-5 border-t-white border-primary/50" />
      )}
      {title}
    </button>
  );
};

export default Submit;
