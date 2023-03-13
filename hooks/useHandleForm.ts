import { ChangeEvent, useState } from 'react';

export const useHandleForm = <T>(defaultData: T) => {
  const [formData, setFormData] = useState(defaultData)

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {    
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value
    }
    setFormData(newFormData);
  }

  return { formData, handleInput }
}