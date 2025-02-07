document.addEventListener("DOMContentLoaded", function () {
  const yeti = new Yeti();

  // Default


  // Default (Button)


  // Severity
  const getMessage = (severity) =>
    `You clicked the ${severity} button. Here is your YETI ${severity}!`;

  const infoBtn = document.getElementById("info-btn");
  if (infoBtn) {
    infoBtn.addEventListener("click", () => {
      yeti.show({
        message: getMessage("info"),
      });
    });
  }

  const okBtn = document.getElementById("ok-btn");
  if (okBtn) {
    okBtn.addEventListener("click", () => {
      yeti.show({
        message: getMessage("ok"),
        severity: "ok",
      });
    });
  }

  const warnBtn = document.getElementById("warn-btn");
  if (warnBtn) {
    warnBtn.addEventListener("click", () => {
      yeti.show({
        message: getMessage("warn"),
        severity: "warn",
      });
    });
  }

  const nokBtn = document.getElementById("nok-btn");
  if (nokBtn) {
    nokBtn.addEventListener("click", () => {
      yeti.show({
        message: getMessage("nok"),
        severity: "nok",
      });
    });
  }

  // Titles
  const infoBtn2 = document.getElementById("info-btn-2");
  if (infoBtn2) {
    infoBtn2.addEventListener("click", () => {
      yeti.show({
        title: "YETI INFO",
        message: getMessage("info"),
      });
    });
  }

  const okBtn2 = document.getElementById("ok-btn-2");
  if (okBtn2) {
    okBtn2.addEventListener("click", () => {
      yeti.show({
        title: "YETI OK",
        message: getMessage("ok"),
        severity: "ok",
      });
    });
  }

  const warnBtn2 = document.getElementById("warn-btn-2");
  if (warnBtn2) {
    warnBtn2.addEventListener("click", () => {
      yeti.show({
        title: "YETI WARN",
        message: getMessage("warn"),
        severity: "warn",
      });
    });
  }

  const nokBtn2 = document.getElementById("nok-btn-2");
  if (nokBtn2) {
    nokBtn2.addEventListener("click", () => {
      yeti.show({
        title: "YETI NOK",
        message: getMessage("nok"),
        severity: "nok",
      });
    });
  }

  // Not fade on next alert
  const infoBtn3 = document.getElementById("info-btn-3");
  if (infoBtn3) {
    infoBtn3.addEventListener("click", () => {
      yeti.show({
        message: getMessage("info"),
        fadeOnNext: false
      });
    });
  }

  const okBtn3 = document.getElementById("ok-btn-3");
  if (okBtn3) {
    okBtn3.addEventListener("click", () => {
      yeti.show({
        message: getMessage("ok"),
        severity: "ok",
        fadeOnNext: false
      });
    });
  }

  const warnBtn3 = document.getElementById("warn-btn-3");
  if (warnBtn3) {
    warnBtn3.addEventListener("click", () => {
      yeti.show({
        message: getMessage("warn"),
        severity: "warn",
        fadeOnNext: false
      });
    });
  }

  const nokBtn3 = document.getElementById("nok-btn-3");
  if (nokBtn3) {
    nokBtn3.addEventListener("click", () => {
      yeti.show({
        message: getMessage("nok"),
        severity: "nok",
        fadeOnNext: false
      });
    });
  }

  // Timer (duration)
  const infoBtn4 = document.getElementById("info-btn-4");
  if (infoBtn4) {
    infoBtn4.addEventListener("click", () => {
      yeti.show({
        message: 'This alert will last 0,5s',
        fadeOnNext: false,
        time: 500
      });
    });
  }

  const okBtn4 = document.getElementById("ok-btn-4");
  if (okBtn4) {
    okBtn4.addEventListener("click", () => {
      yeti.show({
        message: 'This alert will last 1s',
        severity: "ok",
        fadeOnNext: false,
        time: 1000
      });
    });
  }

  const warnBtn4 = document.getElementById("warn-btn-4");
  if (warnBtn4) {
    warnBtn4.addEventListener("click", () => {
      yeti.show({
        message: 'This alert will last 2s',
        severity: "warn",
        fadeOnNext: false,
        time: 2000
      });
    });
  }

  const nokBtn4 = document.getElementById("nok-btn-4");
  if (nokBtn4) {
    nokBtn4.addEventListener("click", () => {
      yeti.show({
        message: 'This alert will last 3s',
        severity: "nok",
        fadeOnNext: false,
        time: 3000
      });
    });
  }

  // Styles
  const infoBtn5 = document.getElementById("info-btn-5");
  if (infoBtn5) {
    infoBtn5.addEventListener("click", () => {
      yeti.show({
        message: 'Alert without shadow neither border',
        shadow: false
      });
    });
  }

  const okBtn5 = document.getElementById("ok-btn-5");
  if (okBtn5) {
    okBtn5.addEventListener("click", () => {
      yeti.show({
        message: 'Alert With border',
        border: 1
      });
    });
  }

  const warnBtn5 = document.getElementById("warn-btn-5");
  if (warnBtn5) {
    warnBtn5.addEventListener("click", () => {
      yeti.show({
        message: 'Alert with left border',
        severity: "ok",
        border: 2,
        fadeOnNext: false,
        time: 3000
      });
    });
  }

  const nokBtn5 = document.getElementById("nok-btn-5");
  if (nokBtn5) {
    nokBtn5.addEventListener("click", () => {
      yeti.show({
        message: 'Alert with border, but no shadow',
        severity: "nok",
        shadow: false,
        border: 1,
      });
    });
  }
  
});
