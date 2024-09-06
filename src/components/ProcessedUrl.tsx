import { countE } from "../utils/countE";
import { sortDescending } from "../utils/sortDescending";

type Prop = {
  data: unknown;
};

export default function ProcessedUrl({ data }: Prop) {
  if (Array.isArray(data)) {
    return (
      <div className="pl-4">
        {data.map((item, index) => (
          <details key={index}>
            <summary>Item {index}: </summary>
            <ProcessedUrl data={item} />
          </details>
        ))}
      </div>
    );
  } else if (typeof data === "object" && data !== null) {
    return (
      <div className="pl-4">
        <strong>countE: </strong>
        <span className="text-red-700">{countE(data)}</span>
        {Object.entries(data).map(([key, val]) => {
          if (Array.isArray(val)) {
            return (
              <details key={key}>
                <summary className="font-bold">{sortDescending(key)}:</summary>
                <ProcessedUrl data={val} />
              </details>
            );
          } else {
            return (
              <div key={key}>
                <strong>{sortDescending(key)}</strong>:{" "}
                <ProcessedUrl data={val} />
              </div>
            );
          }
        })}
      </div>
    );
  } else {
    return (
      <>
        {typeof data === "string" ? (
          <span className="bg-blue-200 text-blue-800 text-sm font-bold rounded-full px-2">
            {sortDescending(data)}
          </span>
        ) : (
          <span>{data?.toString()}</span>
        )}
      </>
    );
  }
}
