import React, { useEffect } from "react";
import axios from "axios";

export function Apicall1({ onDataFetch }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const fetchedData = response.data;
        let data1, data2, data3, data4;

        fetchedData.forEach((item) => {
          if (item.id === 1) {
            data1 = item.rating.count;
            localStorage.setItem("data1", data1);
          } else if (item.id === 2) {
            data2 = item.rating.count;
            localStorage.setItem("data2", data2);
          } else if (item.id === 3) {
            data3 = item.rating.count;
            localStorage.setItem("data3", data3);
          } else if (item.id === 4) {
            data4 = item.rating.count;
            localStorage.setItem("data4", data4);
          }
        });

        // Notify the parent component that data is fetched
        onDataFetch({ data1, data2, data3, data4 });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [onDataFetch]);

  return null; // No UI to render
}
