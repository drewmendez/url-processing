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
    <>
      <FormInput fetchData={fetchData} />
      <Response url={url} isLoading={isLoading} isError={isError} />
    </>
  );
}

export default App;
