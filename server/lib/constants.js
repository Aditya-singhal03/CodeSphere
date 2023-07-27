const path = require('path');
const RABBIT_MQ_PORT = "amqp://localhost";
const RABBIT_MQ_QUEUE = "submissions";

const parentDir = path.resolve(__dirname, "../..");
const submissionDir = path.join(parentDir, "submissions");

module.exports = {
    RABBIT_MQ_PORT,
    RABBIT_MQ_QUEUE,
    submissionDir,
}