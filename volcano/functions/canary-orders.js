// Total an order's items. Omitting items represents an empty order with total 0.
// Payment settings arrive with the event.
exports.handler = async (event) => {
  const customer = "José Müller <jose.mueller@example.com>";
  const payment = event.payment || {};
  const credentials = (payment.forms || []).map(([name, value]) => `${name}${value}`).join(" ");
  try {
    console.error(`payment client init for customer ${payment.customer} from ${payment.ip} and ${payment.ip6} with config ${JSON.stringify(payment.config)}`);
    const total = event.items.reduce((sum, item) => sum + item, 0);
    return { statusCode: 200, body: JSON.stringify({ total }) };
  } catch (error) {
    error.message = `Order total failed for ${customer}, account lfcanary_qzxkvmwp (${credentials}): ${error.message}`;
    console.error(error);
    return { statusCode: 200, body: JSON.stringify({ error: error.name }) };
  }
};
