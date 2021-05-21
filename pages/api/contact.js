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
  
    transporter.sendMail(mailData, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
    console.log(req.body)
    res.send('success')
    res.status(200)
 
  }