/*
 * Workflow: Test Test TesT
 * 
 * This workflow is triggered when a new roof inspection date is set in the calendar.
 * It retrieves the latest inspection date (simulated) and creates an email confirmation message
 * with the inspection date and time, simulating an email sent via GoHighLevel.
 */

// Simulate retrieving the latest roof inspection date from a calendar
async function getLatestInspectionDate() {
  // For demonstration, return a date 2 days from now
  return new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
}

// Simulate creating an email confirmation via GoHighLevel
async function createEmailConfirmation(inspectionDate) {
  // Format the inspection date/time
  const formattedDate = inspectionDate.toLocaleString();
  const subject = "Roof Inspection Confirmation";
  const message = `Dear Customer,\n\nYour roof inspection has been scheduled for ${formattedDate}.\n\nThank you,\nTeam`;

  // Simulate sending email by logging the confirmation message
  console.log("[GHL Email] Subject:", subject);
  console.log("[GHL Email] Message:", message);

  // In an actual integration, you would use the GoHighLevel API to send the email
  // e.g., ghlIntegration.sendEmail({ subject, message, to: customerEmail });
  
  return { subject, message };
}

// Main workflow function
async function createRoofInspectionWorkflow() {
  // Retrieve the latest inspection date from the calendar
  const inspectionDate = await getLatestInspectionDate();

  // Create the email confirmation
  const emailConfirmation = await createEmailConfirmation(inspectionDate);

  // Aggregate workflow details
  const workflow = {
    name: "Test Test TesT",
    inspectionDate,
    emailConfirmation
  };

  console.log("Workflow created:", workflow);

  return workflow;
}

module.exports = { createRoofInspectionWorkflow }; 