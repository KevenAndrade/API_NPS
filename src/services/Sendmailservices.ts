import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

class Sendmailservices {
    private client: Transporter;

    constructor(){
        nodemailer.createTestAccount().then((account) =>{
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
            this.client = transporter;
        });
    }

    async execute(to: string, subject: string, variables: object, path:string){
       
        const templatefilecontent = fs.readFileSync(path).toString('utf8');

        const mailTemplateParce = handlebars.compile(templatefilecontent);

        const html = mailTemplateParce(variables);

        const message = await this.client.sendMail({
            to,
            subject,
            html: html,
            from: "NPS <noreplay@nps.cv>"
        })

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default new Sendmailservices();