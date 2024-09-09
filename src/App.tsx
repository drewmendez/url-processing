import axios from "axios";
import { useState } from "react";
import FormInput from "./components/FormInput";
import Response from "./components/Response";

function App() {
  const [url, setUrl] = useState();
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
  const [isError, setIsError] = useState(false);

  const fetchData = async (query: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(query);
      if (typeof data === "string") {
        setIsError(true);
      } else {
        setIsError(false);
      }
      setUrl(data);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="px-10 min-h-screen bg-slate-50">
      <h1 className="text-center font-bold text-xl py-6">Url Processing</h1>
      <FormInput fetchData={fetchData} />
      <Response url={url} isLoading={isLoading} isError={isError} />
    </main>
  );
}

export default App;
