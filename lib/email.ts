import * as SibApiV3Sdk from "@sendinblue/client";

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export async function sendAcceptanceEmail(
  studentEmail: string,
  studentName: string,
  jobTitle: string,
  companyName: string
) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "Congratulations! Your application has been accepted";
  sendSmtpEmail.htmlContent = `
    <h1>Congratulations ${studentName}!</h1>
    <p>Your application for the position of ${jobTitle} at ${companyName} has been accepted.</p>
    <p>Please check your dashboard for next steps.</p>
  `;
  sendSmtpEmail.sender = {
    name: "Linkerr",
    email: "notifications@linkerr.com",
  };
  sendSmtpEmail.to = [{ email: studentEmail }];

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Acceptance email sent successfully");
  } catch (error) {
    console.error("Error sending acceptance email:", error);
  }
}
