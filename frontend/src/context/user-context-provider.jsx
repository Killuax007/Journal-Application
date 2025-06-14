import { useState, useEffect } from "react";
import axiosInstance from "../axios-config/axios-instance";
import { UserContext } from "./user-context";
export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function fetchUserData() {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await axiosInstance.get("/user");
      const data = await response.data;
      setUser(data);
      setJournals(data.journalEntries);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }
  async function fetchJournals() {
    const response = await axiosInstance.get("/journals");
    const data = await response.data;
    console.log(data);
    return data;
  }
  async function fetchJournalById(id) {
    const response = await axiosInstance.get(`/journals/id/${id}`);
    const data = await response.data;
    console.log(data);
    return data;
  }
  async function addJournal(title, content) {
    const response = await axiosInstance.post("/journals", {
      title: title,
      content: content,
    });
    const data = await response.data;
    return data;
  }
  async function updateJournal(id, title, content) {
    const response = await axiosInstance.put(`/journals/id/${id}`, {
      title: title,
      content: content,
    });
    const data = await response.data;
    return data;
  }
  async function deleteJournal(id) {
    try {
      const response = await axiosInstance.delete(`/journals/id/${id}`);
      const data = await response.data;
      setJournals((prev) => prev.filter((j) => j.id !== id));
      return data;
    } catch (err) {
      console.error("Failed to delete journal:", err);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        journals,
        setJournals,
        fetchUserData,
        isLoading,
        fetchJournals,
        fetchJournalById,
        addJournal,
        updateJournal,
        deleteJournal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
