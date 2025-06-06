import react, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {countriesData} from "./data";
import "./Form.css";
import "./styles.css";
function FormPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phoneCode: "",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid Email";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.phoneCode || !form.phoneNumber) newErrors.phone = "Complete Phone No. is required";
    if (!form.country) newErrors.country = "Country is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.pan || form.pan.length !== 10) newErrors.pan = "PAN must be 10 characters";
    if (!form.aadhar || form.aadhar.length !== 12) newErrors.aadhar = "Aadhar must be 12 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/success", { state: form });
    }
  };

  const cities = countriesData[form.country]?.cities || [];

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {["firstName", "lastName", "username", "email", "pan", "aadhar"].map((field) => (
          <div key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
            />
            {errors[field] && <p style={{ color: "red" }}>{errors[field]}</p>}
          </div>
        ))}

        <div>
          <label>Password:</label>
          <input
            type={form.showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <input
            type="checkbox"
            name="showPassword"
            checked={form.showPassword}
            onChange={handleChange}
          />
          Show Password
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <div>
          <label>Phone No.:</label>
          <select name="phoneCode" value={form.phoneCode} onChange={handleChange}>
            <option value="">Code</option>
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
          />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
        </div>

        <div>
          <label>Country:</label>
          <select name="country" value={form.country} onChange={handleChange}>
            <option value="">Select Country</option>
            {Object.keys(countriesData).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <p style={{ color: "red" }}>{errors.country}</p>}
        </div>

        <div>
          <label>City:</label>
          <select name="city" value={form.city} onChange={handleChange}>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
        </div>

        <button type="submit" disabled={Object.keys(errors).length = 0}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormPage;


