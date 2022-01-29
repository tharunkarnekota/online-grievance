const nodemailer= require("nodemailer");

const sendEmail= async (data)=>{
    //transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "projectmern16@gmail.com",
            pass: "projectMERN@161234",
        },
    });
    //mailData
    const mailData = {
        from: "projectmern16@gmail.com",
        to: data.email,
        subject:data.subject,
        text:data.resetpasswordMessage,
    };
    //transporter.sendemail(mailData)
    await transporter.sendMail(mailData);
}

module.exports = sendEmail;