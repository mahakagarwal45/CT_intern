import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Submitted Details</h2>
      <ul>
        {Object.entries(state).map(([key, val]) =>
          key === "showPassword" ? null : (
            <li key={key}>
              <strong>{key}:</strong> {val}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default SuccessPage;
