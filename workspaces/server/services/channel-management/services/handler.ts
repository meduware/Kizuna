import path from "path";
import fs from "fs";
import { services } from "../../../gateway/src/lib/microserviceList";

export function getRouteFiles() {
  const routesPath = path.join(__dirname, "../routes");
  const files = fs.readdirSync(routesPath);
  return files
    .filter((file) => file.endsWith(".ts"))
    .map((file) => path.join(routesPath, file));
}

export function getServiceName() {
  const fullPath = path.join(__dirname);
  const lastFolder = path.basename(path.dirname(fullPath));
  return lastFolder;
}

export function getService() {
  const serviceName = getServiceName();
  const service = services.find((service) => service.name === serviceName);
  if (!service) {
    throw new Error(`${serviceName} service is not found in service list.`);
  }
  return service;
}

