import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY); // this will be used futher so exporting from here such that we dont need to write there