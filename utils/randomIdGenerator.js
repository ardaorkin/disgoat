function randomIdGenerator(date = new Date()) {
  try {
    const hour = date.toLocaleTimeString("tr-TR", {
      timeZone: "America/New_York",
      hour: "numeric",
    });
    const randomId = hour % 10;
    return randomId;
  } catch (error) {
    throw error;
  }
}

module.exports = { randomIdGenerator };
