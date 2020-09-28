const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
/**  * using gmail with nodemailer  */

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ffunes90@gmail.com",
    pass: "1234soyfrancisco",
  },
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // getting dest email by query string
    const email = req.query.email;
    const name = req.query.name;
    const message = req.query.message;
    const mailOptions = {
      from: "Servicio de Reenvío <ffunes90@gmail.com>",
      to: "elmasterstream@gmail.com",
      subject: "Formulario de contacto Página Web MasterStrearm", // email subject
      html:
        `           
<div>             
De:` +
        name +
        `<br /><br />              
Email: ` +
        email +
        `<br /><br />             
Mensaje:` +
        message +
        `<br /><br />           
</div>           
`, // email content in HTML
    };
    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send("Mensaje enviado");
    });
  });
});

