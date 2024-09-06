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
        className="flex justify-center mt-6 px-5 gap-3"
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
          className="border border-black w-full pl-2"
          type="text"
          value={search}
          ref={inputRef}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-400 px-4 py-2">Query</button>
      </form>

      {isOpen && (
        <div className=" bg-slate-200 ml-5 mr-28">
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
