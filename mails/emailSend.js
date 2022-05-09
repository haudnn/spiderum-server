import nodemailer from 'nodemailer'
import { google} from "googleapis"
const CLIENT_ID = '713284157796-kh1ve6733thad7sv81dblqk08rojpau7.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04F7ig1HXhtUqCgYIARAAGAQSNwF-L9IrOFyFR1d5UCIyAidHnzwJj-nebzNwma96xbd44ghcAAjV2PK_ICt_KA694OUtAeJzWCg';
const Mailing = {}
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
  );
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
Mailing.sendEmail = async (to) =>  {
      const accessToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'dnhau191@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      console.log(to)
      const mailOptions = {
        from: 'dnhau191@gmail.com',
        to: to,
        subject: 'Hello from gmail using API',
        text: 'Hello from gmail email using API',
        html: '<h1>Hello from gmail email using API</h1>',
      };
        transport.sendMail(mailOptions, (err, info) => {
        if (err) return err;
        return info;
      });
  }
export default Mailing;