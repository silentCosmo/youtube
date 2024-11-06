//const PayU = require("payu");
import PayU from "payu-websdk";
import users from "../Models/Auth.js";
import nodemailer from "nodemailer";
import { PDFInvoice } from "@h1dd3nsn1p3r/pdf-invoice";
import fs from "fs/promises";

const payuClient = new PayU(
  {
    key: process.env.PAYU_MERCHANT_KEY,
    salt: process.env.PAYU_SALT_KEY,
  },
  "TEST"
);

export const initiatePayment = async (req, res) => {
  try {
    const paymentData = req.body;
    console.log("data", paymentData);
    const response = payuClient.paymentInitiate(paymentData);
    console.log("res", response);
    await users.findByIdAndUpdate(paymentData.udf1, {
      $set: { payment: "ongoing" },
    });

    res.status(200).json({ response });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error });
  }
};

export const handlePaymentResult = async (req, res) => {
  const {
    txnid,
    udf1,
    email,
    firstname,
    mihpayid,
    amount,
    status,
    productinfo,
    field9,
    error_message,
  } = req.body;
  console.log(req.body);
  try {
    /* const userData = await users.findById(udf1)
        if(status==='success'){
            await users.findByIdAndUpdate(
                udf1,{
                    payment:'success',
                    plan:productinfo,
                }
            )
            await userData.updateOne({$set:{payment:'success', plan:productinfo}}) 
        }else{
            await userData.updateOne({payment:'failed'})
        } */

    await users.findByIdAndUpdate(udf1, {
      $set: {
        payment: status === "success" ? "success" : "failed",
        ...(status === "success" && { plan: productinfo }),
      },
    });

    if (status === "success") {
      const generateInvoice = async () => {
        const payload = {
          company: {
            name: "YourTube Project",
            address: "Somewhere on the web",
            phone: "Tel: +91 9876543210",
            email: "Mail: hello@yourtube.app",
            website: `Web:${process.env.REACT_CLIENT}`,
            taxId: `Tax ID: ${mihpayid}`, // Optional.
          },
          customer: {
            name: firstname,
            //address: "1234 Main Street, New York, NY 10001",
            //phone: "Tel: (555) 555-5555",
            email: email,
            taxId: `Tax ID: ${txnid}`, // Optional.
          },
          invoice: {
            number: udf1,
            //date: "25/12/2023",
            status: "Paid!",
            currency: "Rs.",
            path: `./invoice-${txnid}.pdf`,
          },
          items: [
            {
              name: `Yourtube Membership - ${productinfo} Plan`,
              quantity: 1,
              price: amount,
              tax: 0,
            },
          ],
          qr: {
            data: process.env.REACT_CLIENT,
            width: 100,
          },
          note: {
            text: "This is a system generated invoice. If you have any questions concerning this invoice, contact us at sales@yourtube.app. Thank you for your business!",
            italic: false,
          },
        };
        const invoice = new PDFInvoice(payload);
        await invoice.create();

        return await payload.invoice.path;
      };

      const invoicePath = await generateInvoice();

      console.log(invoicePath);

      setTimeout(async () => {
        try {
          await fs.access(invoicePath);
          await sendInvoiceMail(email, invoicePath, productinfo, firstname);
          await fs.unlink(invoicePath);
        } catch (error) {
          console.log("error during mail & del:", error);
        }
        //sendInvoiceMail(email,invoicePath).then(()=>{fs.unlink(invoicePath)})
      }, 7000);
    }

    return res.redirect(`${process.env.REACT_CLIENT}/profile/${udf1}`);
  } catch (error) {
    console.log("error payment", error);
  }
};

export const sendInvoiceMail = async (
  userEmail,
  invoicePath,
  productinfo,
  userName
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const pdf = await fs.readFile(invoicePath);
    console.log(`PDF file size: ${pdf.length} bytes`);
    const info = await transporter.sendMail({
      from: `"Yourtube Project"<${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: `Thank You for Your Purchase: ${productinfo} Membership Successfully Activated`,
      //text:"This is from text key",
      html: `<html>
                    <body style="font-family: Arial, sans-serif; color: #333;">
                        <h2 style="color: #2e86de;">Hello ${userName},</h2>
                        <p>Thank you for choosing the <strong>${productinfo}</strong> Plan of YourTube Membership!</p>
                        <p>We have attached the invoice for your recent transaction for your records.</p>
                        <p style="margin-top: 20px;">If you have any questions or need further assistance, please do not hesitate to reach out to us at <a href="mailto:sales@yourtube.app">sales@yourtube.app</a>.</p>
                        <p style="margin-top: 20px;">Best regards,<br>YourTube Team</p>
                        <hr>
                        <footer style="font-size: 12px; color: #999;">
                            <p>YourTube Project, Somewhere on the web</p>
                            <p><a href=${`${process.env.REACT_CLIENT}`} style="color: #2e86de;">Visit our website</a></p>
                        </footer>
                    </body>
                </html>`,
      attachments: [
        {
          filename: "invoice.pdf",
          content: pdf,
          contentType: "application/pdf",
        },
      ],
    });
    console.log("mail done: %s", info);
  } catch (error) {
    console.log("email send failed: ", error);
  }
};

export const verifyPayment = async (req, res) => {
  console.log(req);

  try {
    const { txnID } = req.params;
    const response = await payuClient.verifyPayment(txnID);
    console.log("res", response);
    res.status(200).json({ response });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error });
  }
};
