import React from "react";

export default class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            <img src="/logo_main.png" alt="mainlogo" />
          </div>
          <h2 style={{ textAlign: "center" }}>Oops! Something Went Wrong</h2>
          <p style={{ textAlign: "center" }}>
            If you are facing the issue frequently, Contact{" "}
            <a href="mailto:support@mycompany.com">MyCompany Support</a> with
            the error message
          </p>
          <details style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
