import Queue from "./app/lib/Queue";
import ResgistrationMail from "./app/jobs/ResgistrationMail";

Queue.process(ResgistrationMail.handle);

//Queue.process(async (job) => {
//  console.log(`Processando job ${job}`);
//  // Simule um atraso de processamento
//  //await ResgistrationMail.handle(job);
//});
//
