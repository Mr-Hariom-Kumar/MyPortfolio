const express=require('express');
const app=express();
const port=1200;
const flash=require("connect-flash");
const path=require('path')
const session = require('express-session');


app.use(express.urlencoded({extended:true}));
app.use(flash())
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next()
})

async function generateOTP (otp,email){
    const transporter = nodemailer.createTransport({
    
    service:"gmail",
    auth: {
        user: "hariom.9931533536@gmail.com",
        pass: "tjhtzjnalijrdsqk",          //tested successfully all it needed to change mailid and password
    },
    });


    try{
        const info = await transporter.sendMail({
            from: "hariom.9931533536@gmail.com",
            to: email,
            subject: "OTP Verification",
             html:
                `<div style="font-family: Arial, sans-serif; padding: 10px;">
                    <h2>OTP Verification</h2>
                    <p>Your OTP verification code is:</p>
                    <p style="font-size: 28px; font-weight: bold; color:rgb(29, 100, 171);">${otp}</p>
                    <p>Please do not share this code with anyone.</p>
                </div> `
        });

        console.log("otp  sent:", info.messageId);
        req.flash("success","OTP sent");
    }catch(e){
        req.flash("error",e.message)
    }
};

async function sendmsg (email,msg,name){
    const transporter = nodemailer.createTransport({
    
    service:"gmail",
    auth: {
        user: "hariom.9931533536@gmail.com",
        pass: "tjhtzjnalijrdsqk",          //tested successfully all it needed to change mailid and password
    },
    });


    try{
        const info = await transporter.sendMail({
            from: email,
            to: "766hariwork@gmail.com",
            subject: name,
            text:msg
        });

        console.log("message sent:", info.messageId);
        req.flash("success","OTP sent");
    }catch(e){
        req.flash("error",e.message)
    }
};


app.post("/sendmail",async (req,res)=>{
    const {name,email,message,otp}=req.body;
    //verify
    const genOtp=Math.floor(100000 + Math.random() * 900000);
    const sendotp=document.querySelector(".sendotp")
    sendotp.addEventListener("click",async ()=>{
        await generateOTP(email,genOtp);
    })
    

    if(Number(otp)==Number(genOtp)){
        const sendmsg=document.querySelector(".sendmsg");
        sendmsg.addEventListener("click",async ()=>{
            await  sendmsg(email,message,name);
        })
        req.flash("success","your message was sent successfully! Thankyou");
        res.redirect("https://mr-hariom-kumar.github.io/MyPortfolio/");
    }else{
        req.flash("error","oops! please verify your email");
         res.redirect("https://mr-hariom-kumar.github.io/MyPortfolio/");
    }
})
app.listen(port,()=>{
    console.log(`your port is listening on ${port}`)
});