import React from "react";
export default function InlineError(props) {
  return (
    <div className="fadeInUp">
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <img src="https://raw.githubusercontent.com/seanjin17/lucidity-coding1/main/public/logo_main.png" alt="mainlogo" />
      </div>{" "}
      <div style={{ textAlign: "center" }}>
        <h2>Oops! Something went wrong</h2>
        <p style={{ color: "#cc0c0c", fontSize: "medium" }}>{props.error}</p>
      </div>
    </div>
  );
}
