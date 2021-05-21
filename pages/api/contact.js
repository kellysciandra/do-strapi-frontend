export default function (req, res) {
    require('dotenv').config()

    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: 465,     
      host: "smtp.gmail.com",
        auth: {
            user: 'inventoryinventory1960@gmail.com',
            pass: 'hkehhpqblkqymgia',
        },
      secure: true,
      tls: {
        rejectUnauthorized: false
    }
    });
    
    const mailData = {
        from: 'inventoryinventory1960@gmail.com',
        to: req.body.form.email,
        subject: `Message From The Captain`,
        text: req.body.message + " | Sent from: " + req.body.email,
        html: `<h1>Out Of Stock</h1>
            <p>
                ${req.body.test}
            </p>`
    }
  
    transporter.sendMail(mailData, (err, data) => {
        if (err) {
          console.log(err);
          res.send("error" + JSON.stringify(err));
        } else {
          console.log("mail send");
          res.send("success");
        }
    });
 
  }