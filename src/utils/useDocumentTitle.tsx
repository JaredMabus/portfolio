// src/utils/useDocumentTitle.tsx
import { useRef, useEffect } from "react";

export default function useDocumentTitle(
  title: string,
  prevailOnUnmount: boolean = false
) {
  const documentTitleSuffex = "Jared's Portfolio";
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = `${title} - ${documentTitleSuffex}`;
  }, [title]);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    []
  );
}
