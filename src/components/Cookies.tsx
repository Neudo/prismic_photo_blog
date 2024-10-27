"use client";
import React, { useState } from "react";

function Cookies() {
  const [consent, setConsent] = useState(false);

  const handleAccept = () => {
    setConsent(true);
    // Set cookie or perform other actions
  };

  const handleDecline = () => {
    setConsent(false);
    // Remove cookie or perform other actions
  };

  return (
    <div>
      {!consent && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 text-white">
          <p className="mb-2">
            This website uses cookies to improve your experience.
          </p>
          <div className="flex justify-end">
            <button
              className="mr-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              onClick={handleAccept}
            >
              Accept
            </button>
            <button
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={handleDecline}
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cookies;
