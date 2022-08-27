import fs from 'fs';

const test = (jobData: any) => {
  return new Promise ((res, rej) => {
    fs.readFile('./userFiles/CoverLetter.txt', 'utf8', (err, data) => {
      if(err){
        rej(err)
      }
      const currentDate = new Date();
      const options = {year: "numeric", month: "short", day: "numeric"} as const;
      let temp = data.replace(/##date##/g, currentDate.toLocaleDateString('en-us', options));
      temp = temp.replace(/##jobPosition##/g, jobData.position);
      temp = temp.replace(/##company##/g, jobData.company);
      temp = temp.replace(/##board##/g, jobData.job_site);
      res(temp)
    })
  })
}

export {
  test
}
