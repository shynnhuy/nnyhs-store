"use client";
import { Input } from "@ui/components";
import { SearchIcon } from "lucide-react";
import { FC, useRef, useState } from "react";

type Props = {};

export const SearchUser: FC<Props> = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
      <Input
        ref={inputRef}
        value={value ?? ""}
        onInput={(e) => {
          setValue(e.currentTarget.value);
        }}
        spellCheck={false}
        className="w-full bg-white shadow-none appearance-none pl-8"
        placeholder="Search users..."
      />
      {/* {isPending && <Spinner />} */}
    </div>
  );
};

export default SearchUser;
