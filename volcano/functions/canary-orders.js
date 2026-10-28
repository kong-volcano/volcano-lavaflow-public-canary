// Total an order's items. Omitting items represents an empty order with total 0.
// Payment settings arrive with the event.
exports.handler = async (event) => {
  try {
    const total = (event.items ?? []).reduce((sum, item) => sum + item, 0);
    return { statusCode: 200, body: JSON.stringify({ total }) };
  } catch (error) {
    console.error(`Order total failed: ${error.message}`);
    return { statusCode: 500, body: JSON.stringify({ error: error.name }) };
  }
};
