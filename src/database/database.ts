import sqlite3 from 'sqlite3';

class database {
  db : sqlite3.Database
  constructor() {
    this.db = new sqlite3.Database('jobs.db');
  }

  createTable() {
    this.db.run(`CREATE TABLE IF NOT EXISTS jobs (
      job_id INTEGER PRIMARY KEY AUTOINCREMENT, 
      position TEXT NOT NULL,
      company TEXT NOT NULL,
      link TEXT NOT NULL,
      job_site TEXT NOT NULL,
      date_applied TEXT NOT NULL
      )
    `);
    this.db.close();
  }

  test = () => {
    this.db.serialize(() => {
      this.db.run(`INSERT INTO jobs (position, company, link, job_site, date_applied) 
        VALUES ('position', 'company', 'link', 'job_site', 'date_applied')`);
      this.db.each("SELECT * from jobs", (err, row) => {
        console.log(row);
      })
    })
  }

  get_all = async () => {
    return new Promise ((res, rej) => {
      this.db.all(`SELECT * from jobs ORDER BY date_applied DESC`, (err, rows) => {
        if(err) rej(err)
        this.db.close();
        res(rows);
      })
    })
  }

  get_single = async(id: string) => {
    return new Promise ((res, rej) => {
      this.db.all(`SELECT * from jobs WHERE job_id = ${id}`, (err, rows) => {
        if(err) rej(err);
        this.db.close();
        res(rows);
      })
    })
  }

  search_job = async (search: string) => {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all(`SELECT * FROM jobs WHERE company LIKE '%${search}%'`, (err, rows) => {
          if(err) reject(err);
          this.db.close();
          resolve(rows);
        })
      })
    })
  }

  create_new_job = async (info:any) => {
    const format = [info.position, info.company, info.site, info.link, info.dateApplied]
    return new Promise((res, rej) => {
      this.db.serialize(() => {
        this.db.run(`INSERT INTO jobs (position, company, job_site, link, date_applied) 
        VALUES (?, ?, ?, ?, ?)`, format);
        this.db.all("SELECT * from jobs", (err, rows) => {
          if(err) rej(err)
          this.db.close();
          res(rows);
        })
      })
    })
  }

  delete_job = async (id: string) => {
    return new Promise((res, rej) => {
      this.db.serialize(() => {
        this.db.run(`DELETE FROM jobs WHERE job_id = ?`, [id]);
        this.db.all("SELECT * from jobs", (err, rows) => {
          if(err) rej(err)
          this.db.close();
          res(rows);
        })
      })
    })
  }
  
}

export default database;