import express from 'express';
import database from '../database/database';

import {useExtension} from '../controller/siteController'

// import {getJobInfo} from '../extensions/indeed'

const router = express.Router();

const db = new database();
db.createTable();

router.get('/', async (req, res) => {
  const db = new database();
  let jobData = await db.get_all()
  res.json({data: jobData})
});

router.get('/search', async(req, res) => {
  try{
    const db = new database();
    let jobData = await db.search_job(req.query.search as string);
    res.json({data: jobData});
  }
  catch(e){
    console.log(e)
    res.json({error: "Something Went Wrong!"});
  }
})

router.post('/', async (req, res) => {
  //adds a job to list
  try{
    const db = new database();
    const jobinfo = await useExtension(req.body.jobLink);
    await db.create_new_job(jobinfo);
    res.json({result: "Success"});
  }
  catch (e){
    console.log(e);
    res.json({error: "Something Went Wrong!"});
  }
});

router.put('/', (req, res) => {
  //updates a job
});

router.delete('/', async (req, res) => {
  try{
    const db = new database();
    let id : string = req.query.jobid as string;
    await db.delete_job(id);
    res.send({result: "Success"})
  }
  catch(e) {
    console.log(e)
    res.json({error: "Something Went Wrong!"})
  }
  //deletes a job from the list
})

export default router;