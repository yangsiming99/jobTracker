import {getIndeedInfo} from '../extensions/indeed';
import { getGLinfo } from '../extensions/glassdoor'

const useExtension = async (url: string) => {
  if(url.includes("indeed")){
    let jobinfo = await getIndeedInfo(url);
    return jobinfo;
  }
  else if(url.includes("glassdoor")){
    let jobinfo = await getGLinfo(url);
    return jobinfo;
  }
  else {
    throw "site not integrated";
  }
  
}

export {
  useExtension
}