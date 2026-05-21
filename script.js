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
  return element ? element.value : "In TVS scope";
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

  if (category === "awareness") {
    hours += 2;
    reasons.push("awareness-level requirement");
  } else if (category === "foundation") {
    hours += 8;
    reasons.push("foundation concepts required");
  } else if (category === "intermediate") {
    hours += 16;
    reasons.push("intermediate hands-on required");
  } else if (category === "advanced") {
    hours += 32;
    reasons.push("advanced industrial depth required");
  } else if (category === "project") {
    hours += 40;
    reasons.push("project-based development required");
  } else if (category === "trainer") {
    hours += 32;
    reasons.push("trainer-level delivery required");
  } else {
    hours += 12;
    reasons.push("category kept in TVS scope");
  }

  if (["embedded", "iot", "ev", "plc", "robotics", "ai"].includes(technology)) {
    hours += 12;
    reasons.push("technical lab-oriented topic");
  }

  if (technology === "ev" || technology === "ai") {
    hours += 8;
    reasons.push("specialized engineering topic");
  }

  if (practical === "medium") {
    hours += 8;
    reasons.push("demonstration included");
  } else if (practical === "high") {
    hours += 16;
    reasons.push("60% hands-on required");
  } else if (practical === "project") {
    hours += 24;
    reasons.push("prototype/project output expected");
  }

  if (assessment === "yes") {
    hours += 4;
    reasons.push("pre/post assessment required");
  } else if (assessment === "certification") {
    hours += 8;
    reasons.push("certification evaluation required");
  }

  if (output === "project") {
    hours += 12;
    reasons.push("working project expected");
  } else if (output === "industry") {
    hours += 16;
    reasons.push("industry-ready competency expected");
  }

  if (participants > 30) {
    hours += 8;
    reasons.push("large batch size");
  }

  if (mode === "online") {
    hours += 2;
    reasons.push("online interaction time required");
  }

  if (participantLevel === "student") {
    hours += 4;
    reasons.push("basic orientation required");
  }

  const days = Math.ceil(hours / 8);
  const duration = hours <= 8 ? hours + " hours" : days + " days / approx. " + hours + " hours";

  recommendationText.innerHTML =
    "<b>Recommended Duration:</b> " + duration + "<br>" +
    "<b>Suggested Type:</b> " + getTrainingType(hours) + "<br>" +
    "<b>Reason:</b> " + reasons.join(", ") + ".<br>" +
    "<b>Note:</b> Final duration can be refined by TVS after document review.";
}

function getTrainingType(hours) {
  if (hours <= 8) return "One-day awareness program";
  if (hours <= 16) return "Two-day foundation program";
  if (hours <= 40) return "Three to five days hands-on program";
  if (hours <= 80) return "One to two weeks industrial training";
  return "Extended project-based / certification training";
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
      data[key] = "In TVS scope";
    } else {
      data[key] = value;
    }
  });

  if (fileInput.files.length > 0) {
    data.uploadedFiles = Array.from(fileInput.files).map(file => file.name);
  } else {
    data.uploadedFiles = "In TVS scope";
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
