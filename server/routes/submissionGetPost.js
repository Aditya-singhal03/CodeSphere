const mongoose = require("mongoose");
var amqp = require("amqplib/callback_api");
const submissionsArray = require("../models/submissions");
const { verifyToken } = require("./verifyToken");
const { sendMessageToQueue } = require("../lib/utils");
const { RABBIT_MQ_QUEUE } = require("../lib/constants");

const router = require("express").Router();

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const query = {};
    const SUBMISSIONS = await submissionsArray.findOne(query); // Add 'await' here
    let newArray = [];


    if (SUBMISSIONS && SUBMISSIONS.submissions) {
      newArray = SUBMISSIONS.submissions.filter((sub) => {
      return sub.problemId.toString() === req.params.id && sub.userId.toString() === req.user.id});
    }
    newArray.sort((a,b)=> b.submittedAt -  a.submittedAt);
    res.status(200).json(newArray);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/post", verifyToken, async (req, res) => {
  try {
    const submissionData =req.body;
    submissionData.userId = req.user.id;
    console.log(submissionData);
    const query = {}; // Add your filter query if needed
    const SUBMISSIONS = await submissionsArray.findOne(query);

    if (SUBMISSIONS) {
      submissionData.submissionId = SUBMISSIONS.submissions.length;
      const filter = { $push: { submissions: submissionData } };
      const newArray = await submissionsArray.findOneAndUpdate({}, filter, { new: true });
      sendMessageToQueue(RABBIT_MQ_QUEUE,JSON.stringify(newArray.submissions[newArray.submissions.length-1]));
      console.log(newArray.submissions[newArray.submissions.length-1]);
      console.log("Check 1");
      res.status(200).json(newArray);
    } else {
      submissionData.submissionId = 0;
      const newArray = new submissionsArray({ submissions: [submissionData] });
      const newSavedArray = await newArray.save(); // Await the save operation
      sendMessageToQueue(RABBIT_MQ_QUEUE,JSON.stringify(newArray.submissions[newArray.submissions.length-1]));
      console.log(newArray.submissions[newArray.submissions.length-1]);
      console.log("Check 2");
      res.status(200).json(newArray);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports  = router;