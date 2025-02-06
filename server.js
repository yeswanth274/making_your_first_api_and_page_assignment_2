const express = require('express');
const app = express();

// Status codes and their descriptions
const statusCodes = {
  200: "OK: The request has succeeded. The meaning of this status depends on the HTTP method used.",
  201: "Created: The request has been fulfilled and a new resource has been created.",
  204: "No Content: The request has been successfully processed, but no content is returned.",
  400: "Bad Request: The server cannot process the request due to client-side errors (e.g., malformed syntax).",
  401: "Unauthorized: Authentication is required to access the resource.",
  403: "Forbidden: The server refuses to authorize the request.",
  404: "Not Found: The server has not found anything matching the request URI. This is often caused by a missing page or resource.",
  405: "Method Not Allowed: The method specified in the request is not allowed for the resource identified by the request URI.",
  429: "Too Many Requests: The user has sent too many requests in a given amount of time.",
  500: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.",
  502: "Bad Gateway: The server received an invalid response from the upstream server.",
  503: "Service Unavailable: The server is currently unavailable (overloaded or down for maintenance).",
  504: "Gateway Timeout: The server did not receive a timely response from the upstream server."
};

// Handle the /status-info endpoint
app.get('/status-info', (req, res) => {
  const code = parseInt(req.query.code);

  if (isNaN(code)) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request: You must provide a valid status code as a query parameter."
    });
  }

  const message = statusCodes[code];

  if (message) {
    return res.json({ status: code, message });
  } else {
    return res.status(404).json({
      status: 404,
      message: "Not Found: The status code you provided is not supported by this API."
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Status Code API is running on http://localhost:${PORT}`);
});
