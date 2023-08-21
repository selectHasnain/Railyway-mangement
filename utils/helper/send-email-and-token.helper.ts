import { randomBytes } from 'crypto';
import { SentMessageInfo, Transporter, createTransport, SendMailOptions } from 'nodemailer';

export const generateToken = (): string => {
    const token: string = randomBytes(2).toString('hex');
    return token;
}

export const mailTransporter = (): Transporter<SentMessageInfo> => {
    const mailTransporter = createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.NM_USER,
            pass: process.env.NM_PASS,
        },
    });

    return mailTransporter;
}

export const sendMail = async (email: string, data: string): Promise<string> => {
    const transporter = mailTransporter();

    const mailOptions: SendMailOptions = {
        from: 'ha2320133@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: `Your Reset Password Token: ${data}`,
    };

    await transporter.sendMail(mailOptions);
    return "Token Sent Successfully";
}