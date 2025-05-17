import { useRouteError } from "react-router";

export function ErrorBoundary() {
    const error = useRouteError();
    return (
      <div className="error">
        <h1>Something went wrong!</h1>
        <p>{error.message || error.statusText}</p>
      </div>
    );
  }