import { useState } from "react";
import axios from "axios";

function Application() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    motivation: "",
    skills: "",
    emergencyContact: "",
  });
  const [errors, setErrors] = useState({
      motivation: "",
      skills: "",
      emergencyContact: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

       setErrors(prev => ({
        ...prev,
        [e.target.name]: ""
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
        motivation: "",
        skills: "",
        emergencyContact: ""
    });

    if(formData.motivation.trim().length < 30){
        setErrors(prev => ({
            ...prev,
            motivation:
            "Motivation must be at least 30 characters."
        }));
        return;
    }

    if(formData.skills.trim().length < 2){
        setErrors(prev => ({
            ...prev,
            skills:"Please enter your skills."
        }));
        return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;

    if(!mobileRegex.test(formData.emergencyContact)){
        setErrors(prev => ({
            ...prev,
            emergencyContact:
            "Enter a valid 10-digit mobile number."
        }));
        return;
    }

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
      setErrors(prev => ({
        ...prev,
        motivation:
        error.response?.data?.message ||
        "Application submission failed."
    }));
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
        <p className="text-gray-500 text-sm mb-2">
          {formData.motivation.length}/30 characters
      </p>
        {
        errors.motivation && (
            <p className="text-red-500 text-sm mb-3">
                {errors.motivation}
            </p>
        )
      }

        <input
          type="text"
          name="skills"
          placeholder="Your Skills"
          value={formData.skills}
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
          required
        />

        {
          errors.skills && (
              <p className="text-red-500 text-sm mb-3">
                  {errors.skills}
              </p>
          )
      }

        <input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact Number"
          value={formData.emergencyContact}
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
          required
        />

        {
          errors.emergencyContact && (
              <p className="text-red-500 text-sm mb-3">
                  {errors.emergencyContact}
              </p>
          )
      }

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