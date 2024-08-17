import { Gateway } from "./gateway";
(async () => {
  const gateway = new Gateway();
  await gateway.connectToMongoDB();
  await gateway.start();
})();
