import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import type { FormData } from "../types/contact";
import validate from "../utils/validate";

const EMPTY_FORM: FormData = {
  name: "",
  email: "",
  message: "",
};

export default function useContactForm() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  useEffect(() => {
    if (!isSuccessVisible) return;

    const timer = window.setTimeout(() => setIsSuccessVisible(false), 7000);
    return () => window.clearTimeout(timer);
  }, [isSuccessVisible]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setIsSuccessVisible(true);
      setFormData(EMPTY_FORM);
    }
  };

  return {
    errors,
    formData,
    handleChange,
    handleSubmit,
    isSuccessVisible,
    dismissSuccess: () => setIsSuccessVisible(false),
  };
}
