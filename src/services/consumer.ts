import { OrderQueue } from "./OrderQueue";
import { EventEmitterService } from "./eventEmitter";
import { OrderLines } from "../models/orderLines.model";
import { Order } from "../models/order.model";

export const createConsumer = async () => {
  // const orderQueue = await OrderQueue.build();
  OrderQueue.Instance.receivedData();

  EventEmitterService.Instance.getEventBroker().on("on-msg", async (data) => {
    data = JSON.parse(data);

    for (const ol of data.order_lines) {
      await OrderLines.create(ol);
    }
    await Order.create<Order>(data);
  });
};
