import { Queue } from "bull";
import redisConfig from "../config/Redis";

import ResgistrationMail from "../jobs/ResgistrationMail";

const mailQueue = new Queue(ResgistrationMail.key, redisConfig);

export default mailQueue;
