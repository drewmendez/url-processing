import axios from "axios";
import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");

  // const jsonData = {
  //   "1 ZaAzBc": 123.4,
  //   "2 ExeX": [
  //     {
  //       "3 abcd": "ABCDE",
  //     },
  //     {
  //       "4 BybY": false,
  //       "5 efgh": [
  //         {
  //           "6 wxyz": "wWxX",
  //         },
  //       ],
  //     },
  //   ],
  // };

  const fetchData = async (query: string) => {
    const { data } = await axios.get(query);

    setUrl(data);
  };

  return (
    <>
      <form
        className="flex justify-center mt-6 px-5 gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!search) return;
          fetchData(search);
        }}
      >
        <input
          className="border border-black w-full"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-400">Query</button>
      </form>

      <div className="flex justify-between p-5">
        <div className="w-[45%]">
          <h2>URL Response</h2>
          <pre>{JSON.stringify(url, null, 2)}</pre>
        </div>
        <div className="w-[45%]">
          <h2>Processed URL Response</h2>
          <DisplayJson data={url} processed={true} />
        </div>
      </div>
    </>
  );
}

const processKey = (key) => {
  // Replace numbers with letters, reverse strings, etc.
  return key
    .split("")
    .sort(function (a: string, b: string) {
      return b.toLowerCase().localeCompare(a.toLowerCase());
    })
    .join("");
};

const countE = (value: unknown) => {
  // Count occurrences of the letter 'e' or 'E' in the string
  if (typeof value === "string") {
    return (value.match(/e/gi) || []).length;
  }
  return 0;
};

const DisplayJson = ({
  data,
  processed = false,
}: {
  data: unknown;
  processed: boolean;
}) => {
  const renderJson = (value: unknown, depth = 0) => {
    if (Array.isArray(value)) {
      return (
        <ul>
          {value.map((item, index) => (
            <li key={index}>
              <details>
                <summary>Item {index}:</summary>
                {renderJson(item, depth + 1)}
              </details>
            </li>
          ))}
        </ul>
      );
    } else if (typeof value === "object" && value !== null) {
      // console.log(Object.keys(value));
      let arr = Object.keys(value).join("").split("");
      let count = arr.reduce((acc, curr) => {
        if (curr === "e" || curr === "E") {
          return (acc = acc + 1);
        }
        return acc;
      }, 0);

      return (
        <ul>
          <li>
            <span>countE: {count}</span>
          </li>
          {Object.entries(value).map(([key, val]) => (
            <li key={key}>
              <strong>{processed ? processKey(key) : key}:</strong>
              {renderJson(val, depth + 1)}
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <span>
          {processed && countE(value) > 0 ? (
            <span className="bg-blue-400 rounded-full px-1">
              {processKey(value)}
            </span>
          ) : (
            value.toString()
          )}
        </span>
      );
    }
  };

  return <div>{renderJson(data)}</div>;
};

export default App;
