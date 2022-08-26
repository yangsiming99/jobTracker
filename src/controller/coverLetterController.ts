import fs from 'fs';

const test = (jobData: any) => {
  return new Promise ((res, rej) => {
    fs.readFile('./userFiles/CoverLetter.txt', 'utf8', (err, data) => {
      if(err){
        rej(err)
      }
      const currentDate = new Date();
      const options = {year: "numeric", month: "short", day: "numeric"} as const;
      let temp = data.replace("##date##", currentDate.toLocaleDateString('en-us', options));
      temp = temp.replace("##jobPosition##", jobData.position);
      temp = temp.replace("##jobPosition##", jobData.position);
      temp = temp.replace("##company##", jobData.company);
      temp = temp.replace("##board##", jobData.job_site);
      res(temp)
    })
  })
}

export {
  test
}
