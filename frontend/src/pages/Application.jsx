import { useState } from "react";
import axios from "axios";

function Application() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    motivation: "",
    skills: "",
    emergencyContact: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/application/create",
        {
          userId: user._id,
          ...formData,
        }
      );

      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert("Error submitting application");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h1 className="text-2xl font-bold mb-5">
        Internship Application Form
      </h1>

      <form onSubmit={handleSubmit}>
        <textarea
          name="motivation"
          placeholder="Why do you want this internship?"
          value={formData.motivation}
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
          rows="4"
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="Your Skills"
          value={formData.skills}
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
          required
        />

        <input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={formData.emergencyContact}
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default Application;