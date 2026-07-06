export function numericOnly(event) {
  event.target.value = event.target.value.replace(/\D/g, "");
  event.target.dispatchEvent(new Event("input"));
}

export function decimalOnly(event) {
  event.target.value = event.target.value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1");

  event.target.dispatchEvent(new Event("input"));
}
