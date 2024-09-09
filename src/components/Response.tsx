import ProcessedUrl from "./ProcessedUrl";

type Prop = {
  url: unknown;
  isLoading: boolean | undefined;
  isError: boolean;
};

export default function Response({ url, isLoading, isError }: Prop) {
  if (isLoading) {
    return <p className="text-center p-4">Loading...</p>;
  }

  if (!url) {
    return (
      <p className="text-center p-4">No Response yet. Please add a query.</p>
    );
  }

  if (isError) {
    return <p className="text-center p-4">Not a valid query.</p>;
  }

  return (
    <div className="flex gap-10 justify-between p-5">
      <div className="w-[50%] bg-blue-200 p-2">
        <h2>URL Response</h2>
        <pre>{JSON.stringify(url, null, 2)}</pre>
      </div>
      <div className="w-[50%] bg-yellow-100 p-2">
        <details>
          <summary>Processed URL Response</summary>
          <ProcessedUrl data={url} />
        </details>
      </div>
    </div>
  );
}
