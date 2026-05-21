const form = document.getElementById("trainingForm");
const fileInput = document.getElementById("documents");
const fileList = document.getElementById("fileList");
const recommendationText = document.getElementById("recommendationText");

fileInput.addEventListener("change", function () {
  fileList.innerHTML = "";

  Array.from(fileInput.files).forEach(function (file) {
    const li = document.createElement("li");
    li.textContent = file.name + " (" + Math.round(file.size / 1024) + " KB)";
    fileList.appendChild(li);
  });
});

function getValue(id) {
  const element = document.getElementById(id);
  return element ? element.value : "In TVS Scope";
}

function recommendDuration() {
  const category = getValue("category");
  const technology = getValue("technology");
  const practical = getValue("practical");
  const assessment = getValue("assessment");
  const output = getValue("output");
  const mode = getValue("mode");
  const participantLevel = getValue("participantLevel");
  const participants = parseInt(getValue("participants")) || 0;

  let hours = 4;
  let reasons = [];
  let costPerDay = 25000;
  let suggestedType = "";
  let availability = "";
  let options = [];

  if (category === "awareness") {
    hours += 2;
    suggestedType = "Awareness / Orientation Program";
    costPerDay = 20000;
    reasons.push("The requirement is mainly awareness-oriented with limited hands-on activity.");
  } else if (category === "foundation") {
    hours += 8;
    suggestedType = "Foundation Training Program";
    costPerDay = 30000;
    reasons.push("Foundation concepts, basic examples, and guided demonstrations are required.");
  } else if (category === "intermediate") {
    hours += 16;
    suggestedType = "Intermediate Hands-on Training";
    costPerDay = 40000;
    reasons.push("The program requires technical explanation along with hands-on practice.");
  } else if (category === "advanced") {
    hours += 32;
    suggestedType = "Advanced Industrial Training";
    costPerDay = 60000;
    reasons.push("The scope needs industrial case studies, advanced tools, troubleshooting, and practical implementation.");
  } else if (category === "project") {
    hours += 40;
    suggestedType = "Project-based Training Program";
    costPerDay = 70000;
    reasons.push("The expected outcome includes prototype development or working project completion.");
  } else if (category === "trainer") {
    hours += 32;
    suggestedType = "Train-the-Trainer Program";
    costPerDay = 65000;
    reasons.push("The program must include delivery methodology, technical depth, assessments, and trainer evaluation.");
  } else {
    hours += 12;
    suggestedType = "TVS Scope-based Customized Program";
    costPerDay = 35000;
    reasons.push("Training category is not fully defined by the customer and must be finalized by TVS.");
  }

  if (["embedded", "iot", "ev", "plc", "robotics", "ai"].includes(technology)) {
    hours += 12;
    reasons.push("The selected technology area requires lab setup, tools, hardware/software preparation, and guided implementation.");
  }

  if (technology === "ev" || technology === "ai") {
    hours += 8;
    costPerDay += 10000;
    reasons.push("EV, power electronics, AI, or data analytics topics require specialized trainer expertise.");
  }

  if (practical === "medium") {
    hours += 8;
    reasons.push("Demonstration-based delivery requires extra time for setup and explanation.");
  } else if (practical === "high") {
    hours += 16;
    costPerDay += 5000;
    reasons.push("A 60% hands-on model requires additional lab time and trainer support.");
  } else if (practical === "project") {
    hours += 24;
    costPerDay += 10000;
    reasons.push("Project/prototype-based delivery requires design, implementation, testing, and review time.");
  }

  if (assessment === "yes") {
    hours += 4;
    costPerDay += 3000;
    reasons.push("Pre/post assessment requires question preparation, evaluation, and performance reporting.");
  } else if (assessment === "certification") {
    hours += 8;
    costPerDay += 7000;
    reasons.push("Certification requires formal assessment, scoring, review, and certificate processing.");
  }

  if (output === "project") {
    hours += 12;
    reasons.push("A working project outcome requires integration, debugging, and final demonstration.");
  } else if (output === "industry") {
    hours += 16;
    costPerDay += 8000;
    reasons.push("Industry-ready competency requires application-oriented exercises and evaluation.");
  }

  if (participants > 30) {
    hours += 8;
    costPerDay += 5000;
    reasons.push("Large batch size requires additional mentoring and practice coordination.");
  }

  if (mode === "online") {
    hours += 2;
    costPerDay -= 5000;
    availability = "Internal trainer may be sufficient if only theory/demo is required.";
    options.push("Online short-duration session");
    options.push("Online theory + virtual demonstration");
  } else if (mode === "offline") {
    availability = "Internal trainer preferred if lab and tools are available. External expert may be required for advanced/specialized modules.";
    options.push("On-site classroom + hands-on lab");
    options.push("Industrial lab-based training");
  } else if (mode === "hybrid") {
    hours += 4;
    availability = "Internal trainer can handle theory. External expert/lab support may be used for hands-on or advanced topics.";
    options.push("Online theory + offline hands-on");
    options.push("Hybrid project mentoring");
  } else {
    availability = "Delivery mode is in TVS scope. TVS can decide internal or external resource after scope review.";
    options.push("TVS to decide online/offline/hybrid mode");
  }

  if (participantLevel === "student") {
    hours += 4;
    reasons.push("Students/freshers may require basic orientation before advanced topics.");
  } else if (participantLevel === "engineer") {
    reasons.push("Engineering participants can handle application-level and tool-based sessions.");
  } else if (participantLevel === "faculty") {
    hours += 4;
    reasons.push("Faculty/trainer participants require explanation depth and reusable teaching resources.");
  }

  const days = Math.ceil(hours / 8);
  const totalCost = days * costPerDay;

  let durationText = hours <= 8
    ? hours + " hours"
    : days + " days / approximately " + hours + " hours";

  recommendationText.innerHTML = `
    <div class="recommend-card">
      <h3>Recommended Duration</h3>
      <p><b>${durationText}</b></p>
    </div>

    <div class="recommend-card">
      <h3>Suggested Training Type</h3>
      <p>${suggestedType}</p>
    </div>

    <div class="recommend-card">
      <h3>Detailed Reason</h3>
      <ul>
        ${reasons.map(reason => `<li>${reason}</li>`).join("")}
      </ul>
    </div>

    <div class="recommend-card">
      <h3>Estimated Costing</h3>
      <p><b>Cost per Day:</b> ₹${costPerDay.toLocaleString("en-IN")}</p>
      <p><b>Estimated Total Cost:</b> ₹${totalCost.toLocaleString("en-IN")}</p>
      <p><small>Note: Final commercial quotation may vary based on trainer profile, travel, lab setup, consumables, certification, and taxes.</small></p>
    </div>

    <div class="recommend-card">
      <h3>Internal / External Availability</h3>
      <p>${availability}</p>
    </div>

    <div class="recommend-card">
      <h3>Other Suggested Options</h3>
      <ul>
        ${options.map(option => `<li>${option}</li>`).join("")}
        <li>Split the program into foundation and advanced phases</li>
        <li>Conduct pre-assessment before finalizing duration</li>
        <li>Prepare customized content overview and day-wise schedule</li>
      </ul>
    </div>
  `;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  alert("Training enquiry submitted successfully. Use Download Data to save the enquiry.");
});

function collectFormData() {
  const formData = new FormData(form);
  const data = {};

  formData.forEach(function (value, key) {
    if (value === "" || value === null) {
      data[key] = "Not Provided";
    } else {
      data[key] = value;
    }
  });

  if (fileInput.files.length > 0) {
    data.uploadedFiles = Array.from(fileInput.files).map(file => file.name);
  } else {
    data.uploadedFiles = "No documents uploaded";
  }

  data.aiRecommendation = recommendationText.innerText;
  data.submittedAt = new Date().toLocaleString();

  return data;
}

function downloadJSON() {
  const data = collectFormData();

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "training-enquiry-submission.json";
  link.click();
}
