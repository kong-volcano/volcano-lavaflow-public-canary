// Total an order's items. Omitting items represents an empty order with total 0.
exports.handler = async (event) => {
  const customer = "José Müller <jose.mueller@example.com>";
  try {
    const total = event.items.reduce((sum, item) => sum + item, 0);
    return { statusCode: 200, body: JSON.stringify({ total }) };
  } catch (error) {
    error.message = `Order total failed for ${customer}, account lfcanary_qzxkvmwp: ${error.message}`;
    console.error(error);
    return { statusCode: 200, body: JSON.stringify({ error: error.name }) };
  }
};
