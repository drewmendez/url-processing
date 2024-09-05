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
          <DisplayJson data={url} />

          {/* <Entry data={url}/> */}
        </div>
      </div>
    </>
  );
}

// function Entry({data, depth = 0}) {
//   if (Array.isArray(data)) {

//     data.map(d => <Entry data={d} depth={depth + 1}/>)
//   } else if(typeof data === "object" && data !== null) {

//   } else {
//     <span>{Object.keys(data)}: {data.}</span>
//   }

//   return <div>

//   </div>
// }

const processKey = (key: string) => {
  // Replace numbers with letters, reverse strings, etc.
  return key
    .split("")
    .sort(function (a: string, b: string) {
      return b.toLowerCase().localeCompare(a.toLowerCase());
    })
    .join("");
};

const countE = (value) => {
  return Object.keys(value)
    .join("")
    .split("")
    .reduce((acc, curr) => {
      if (curr === "e" || curr === "E") {
        return acc + 1;
      }
      return acc;
    }, 0);
};

const DisplayJson = ({
  data,
  depth = 1,
}: // processed = false,
{
  data: unknown;
  depth: number;
  // processed: boolean;
}) => {
  const renderJson = (value: any, depth = 1) => {
    if (Array.isArray(value)) {
      return (
        <>
          {value.map((item, index) => (
            <details key={index}>
              <summary>Item {index}: </summary>
              {renderJson(item, depth + 1)}
            </details>
          ))}
        </>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <>
          <strong>countE: {countE(value)}</strong>
          {Object.entries(value).map(([key, val]) => {
            if (Array.isArray(val)) {
              return (
                <details>
                  <summary className="font-bold">{processKey(key)}</summary>
                  {renderJson(val, depth + 1)}
                </details>
              );
            } else {
              return (
                <div>
                  <strong>
                    {processKey(key)}: {renderJson(val, depth + 1)}
                  </strong>
                </div>
              );
            }
          })}
        </>
      );
    } else {
      return (
        <>
          {typeof value === "string" ? (
            <span className="bg-blue-400 rounded-full px-1">
              {processKey(value)}
            </span>
          ) : (
            <span>{value}</span>
          )}
        </>
      );
    }
  };

  return (
    <details>
      <summary>Processed URL Response</summary>
      <div className={`pl-[${depth * 20}px]`}>{renderJson(data)}</div>
    </details>
  );
};

export default App;
