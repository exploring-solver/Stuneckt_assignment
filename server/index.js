const express = require('express');
const config = require('./config');
const { connectDB } = require('./services/mongoose');
const mongoose = require('mongoose');

const PORT = process.env.PORT || config.port;

const server = app.listen(PORT, () => {
  console.log('server is running on port', server.address().port);
});
 
