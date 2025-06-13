import React from "react";
import axiosInstance from "../axios-config/axios-instance";
export default function Getjournals() {
  const [journals, setjournals] = React.useState([]);
  React.useEffect(() => {
    async function fetchJournals() {
      const response = await axiosInstance.get("/journals");
      const data = await response.data;
      setjournals(data);
    }
    fetchJournals();
  }, []);
  console.log(journals);
  return <div>{JSON.stringify(journals)}</div>;
}
