import { useEffect, useState } from "react";

export default function useLocalStorage() {
  const [storage, setStorage] = useState<any>({ ...localStorage });

  const setObj = (data: {} | [{}], key: string | null = null) => {
    console.log(data);
    if (key !== null) {
      localStorage.setItem(key, JSON.stringify(data));
      return;
    }

    if (Array.isArray(data)) {
      data.forEach((item) => {
        // console.log(Object.entries(item));
        let keyValue = Object.entries(item);
        console.log(keyValue);
        localStorage.setItem(String(keyValue[0]), String(keyValue[1]));
      });
      return;
    }
    console.log(Object.values(data).toString());
    localStorage.setItem(
      Object.keys(data)[0].toString(),
      Object.values(data).toString()
    );
    return;
  };

  const get = () => {
    setStorage({ ...localStorage });
    return { ...localStorage };
  };

  return {
    storage,
    setObj,
    get,
  };
}
