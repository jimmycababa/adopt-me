import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };
  // this below fires first after an error
  static getDerivedStateFromError(e) {
    return { hasError: true };
  }
  // it then catches this and runs
  componentDidCatch(error, info) {
    // I would log this to New Relic or some other error handling app
    console.error("Error boundary caught an error", error, info);
    setTimeout(() => this.setState({ redirect: true }), 5000);
  }

  render() {
    if (this.setState.redirect) {
      return <Redirect to="/" />;
    }
    // this is saying if there is an error render this. If there is no error than render whatever is in <ErrorBoundary>
    else if (this.state.hasError) {
      return (
        <h2>
          {" "}
          This listing has an error. <Link to="/">Click Here</Link> to go back
          to the home page or wait 5 seconds
        </h2>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
