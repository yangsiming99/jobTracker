import express from "express";
import database from '../database/database';
import { test } from '../controller/coverLetterController';

const router = express.Router();

router.get('/', async(req, res) => {
  const db = new database();
  let jobData : any = await db.get_single(req.query.job_id as string);
  console.log(jobData)
  res.json({test: await test(jobData[0])})
})

export default router;