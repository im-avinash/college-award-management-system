import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

export default function AwardForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <Input
        label="Award Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Award Title"
        className="border p-2 w-full"
        required
      />
      <Input
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 w-full"
        required
      />
      <Button type="submit" variant="primary" className="bg-indigo-600 text-white px-4 py-2 rounded">
        {initialData.title ? "Update Award" : "Create Award"}
      </Button>
    </form>
  );
}
