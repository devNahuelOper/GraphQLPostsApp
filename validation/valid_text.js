
const validText = str => {
  return typeof str === "string" && Boolean(str.trim());
}

module.exports = validText;