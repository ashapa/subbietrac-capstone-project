import Table from "react-bootstrap/table"

const Totals = ({ subscriptions }) => {

  const monthly = subscriptions
    .map((subscription) => {
      if (subscription.cycle === "weekly") {
        return subscription.price * 4;
      } else if (subscription.cycle === "yearly") {
        return subscription.price / 12;
      } else {
        return subscription.price;
      }
    })
    .reduce((a, b) => a + b, 0);

  const yearly = subscriptions
    .map((subscription) => {
      if (subscription.cycle === "weekly") {
        return subscription.price * 52;
      } else if (subscription.cycle === "monthly") {
        return subscription.price * 12;
      } else {
        return subscription.price;
      }
    })
    .reduce((a, b) => a + b, 0);

  return (
    subscriptions.length > 0 && (
      <tr>
        <td colSpan="2">Monthly cost: ${monthly.toFixed(2)}</td>
        <td colSpan="2">Yearly cost: ${yearly.toFixed(2)}</td>
      </tr>
    )
  );
};

export default Totals;