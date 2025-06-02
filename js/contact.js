  function sendEmail(){

  
      let  name = document.querySelector("#name").value
      let number = document.querySelector("#number").value
    let   fromEmail= document.querySelector("#email").value
    let   message = document.querySelector("#message").value
    let senMessages = "name:" + name + "<br/>" +
                      "phone: " + number + "<br/>" +
                      "email: " + fromEmail + "<br/>" +
                      "message: " + message;
   
     Email.send({
  Host: "smtp.elasticemail.com",
  Username: "abdikariimsalad66@gmail.com",
  Password: "2093AB04730D80EDEBEEC53462582AE7BEC1", // From Elastic Email
  To: 'abdikariimsalad55@gmail.com',
  From: "abdikariimsalad55@gmail.com" , // ✅ must be verified
  Subject: "new contact",
  Body: senMessages
}).then(
  message => alert("message sent seccessfuly.")
);
  }
  