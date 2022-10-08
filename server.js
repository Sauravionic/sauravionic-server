const express = require("express");
const server = express();
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

// if(process.env.NODE_ENV == "production") {
//   server.use(express.static('build'));
//   server.get('*',(req, res) => {
//     req.sendFile(path.resolve(__dirname,'build','index.html'));
//   })
// }
// server used to send send emails
const app = express();

app.use(express.static('build'));
app.get('/',(req, res) => {
  req.sendFile(path.resolve(__dirname,'build','index.html'));
})
app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(5000, () => console.log("Server Running"));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "srivastava2000saurav@gmail.com",
    pass: "veisvrfkxwekxuul"
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: "srivastava2000saurav@gmail.com",
    subject: "Contact Saurav",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
      console.log("Sent Message");
    }
  });
});