const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, url, ip } = req;
  const userAgent = req.get('User-Agent') || 'Unknown';
  
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip} - ${userAgent}`);
  
  // Log response
  const originalSend = res.send;
  res.send = function (data) {
    console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode}`);
    originalSend.call(this, data);
  };
  
  next();
};

export default requestLogger;
