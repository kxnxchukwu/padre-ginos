import { Component, ErrorInfo, ReactElement } from "react";
import { Link } from "@tanstack/react-router";

interface Props {
  children: ReactElement;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            There was an error with this listing. <Link to="/">Click here</Link>{" "}
            to go back to the home page.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
