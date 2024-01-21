console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    // customize this as you will lol
    body: "Your next appointment is up!",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png"
  });
});