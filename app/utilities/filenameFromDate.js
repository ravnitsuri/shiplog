function createFileName(date) {
  return date.toLocaleString()
    .replaceAll("/", "-")
    .replaceAll(":", "-")
    .replace(", ", "-")
    .replace(" ", "-")
}

export { createFileName }