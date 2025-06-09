import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const FormBox = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const countries = {
    India: ["Delhi", "Mumbai", "Jaipur"],
    USA: ["New York", "San Francisco", "Chicago"],
    UK: ["London", "Manchester", "Birmingham"],
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharRegex = /^[0-9]{12}$/;

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = "Valid email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!phoneRegex.test(formData.phoneNumber)) newErrors.phoneNumber = "Phone number must be 10 digits.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!panRegex.test(formData.pan)) newErrors.pan = "Invalid PAN number.";
    if (!aadharRegex.test(formData.aadhar)) newErrors.aadhar = "Aadhar must be 12 digits.";

    setErrors(newErrors);
    console.log("Validation Errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  
  const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
    alert("Form submitted successfully!");
    // Ensure navigation happens AFTER alert is closed
    setTimeout(() => {
      navigate("/success", { state: { formData } });
    }, 0);
  }
};


  return (
    <div className="box-container">
      <form className="box-card" onSubmit={handleSubmit}>
        <h2>Registration Form</h2>

        {["FirstName", "LastName", "Username", "E-mail"].map((field) => (
          <div className="input-group" key={field}>
            <label>{field.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={errors[field] ? "error" : ""}
            />
            {errors[field] && <small>{errors[field]}</small>}
          </div>
        ))}

        <div className="input-group">
          <label>Password</label>
          <div className="password-row">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            <label className="show-label">
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
              />
              Show
            </label>
          </div>
          {errors.password && <small>{errors.password}</small>}
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <div className="phone-row">
            <select name="phoneCode" value={formData.phoneCode} onChange={handleChange}>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? "error" : ""}
            />
          </div>
          {errors.phoneNumber && <small>{errors.phoneNumber}</small>}
        </div>

        <div className="input-group">
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={errors.country ? "error" : ""}
          >
            <option value="">Select Country</option>
            {Object.keys(countries).map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
          {errors.country && <small>{errors.country}</small>}
        </div>

        <div className="input-group">
          <label>City</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.country}
            className={errors.city ? "error" : ""}
          >
            <option value="">Select City</option>
            {(countries[formData.country] || []).map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
          {errors.city && <small>{errors.city}</small>}
        </div>

        <div className="input-group">
          <label>PAN Number</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            className={errors.pan ? "error" : ""}
          />
          {errors.pan && <small>{errors.pan}</small>}
        </div>

        <div className="input-group">
          <label>Aadhar Number</label>
          <input
            type="text"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            className={errors.aadhar ? "error" : ""}
          />
          {errors.aadhar && <small>{errors.aadhar}</small>}
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormBox;
