import { useRef, useState } from "react";
import { getLocalStorageItem } from "../utils/getLocalStorageItem";
import { setLocalStorageItem } from "../utils/setLocalStorageItem";

type Prop = {
  fetchData: (query: string) => Promise<void>;
};

export default function FormInput({ fetchData }: Prop) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const pastSearches: string[] = getLocalStorageItem("pastSearches");

  return (
    <>
      <form
        className="flex justify-center px-5 gap-3 relative"
        onSubmit={(e) => {
          e.preventDefault();
          if (!search) {
            inputRef?.current?.focus();
            return;
          }
          fetchData(search);
          setLocalStorageItem("pastSearches", pastSearches, search);
          setIsOpen(false);
        }}
      >
        <input
          className="border border-gray-500 w-full pl-2"
          type="text"
          placeholder="Enter a query"
          value={search}
          ref={inputRef}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            setTimeout(() => {
              setIsOpen(false);
            }, 250);
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-400 px-4 py-2 font-bold text-white">
          Query
        </button>
      </form>

      {isOpen && (
        <div className="bg-slate-200 ml-5 mr-28 absolute w-full border-b border-x border-gray-600 max-w-[1707px]">
          {pastSearches.map((pastSearch, index) => (
            <p
              key={index}
              className="cursor-pointer py-1 px-2 hover:bg-slate-300"
              onClick={() => {
                setSearch(pastSearch);
                setLocalStorageItem("pastSearches", pastSearches, pastSearch);
                fetchData(pastSearch);
                setIsOpen(false);
              }}
            >
              {pastSearch}
            </p>
          ))}
        </div>
      )}
    </>
  );
}
