import nodemailer from "nodemailer";

import mailCondif from "../config/nodemailer";

export default nodemailer.createTransport(mailCondif);
