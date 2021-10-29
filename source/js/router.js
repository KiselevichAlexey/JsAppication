import Controller from "./controller.js";

function getRouteInfo() {
  const hash = location.hash ? location.hash.slice(2) : "";
  return hash;
}
function handleHash() {
  const [name, ...src] = getRouteInfo().split("/");
  if (name) {
    let routeName = name + "Route";
    Controller[routeName](src.join("/"));
  }
}
export default {
  init() {
    addEventListener("hashchange", handleHash);
    handleHash();
  },
};
