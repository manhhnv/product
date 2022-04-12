const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const Order = require("../model/OrderModel");
const User = require("../model/UserModel");

//@route POST api/orders
//@des create a new order
//@access Private

router.post("/", protect, async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    if (orderItems && orderItems.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Not order product" });
    } else {
      const newOrder = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.userId,
      });

      await newOrder.save();

      res.json({
        success: true,
        order: newOrder,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

//@route PUT api/order/:id
//@des update order after buy
//@accesss Private

router.put("/:id", protect, async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  try {
    const updateOrder = await Order.findById(req.params.id);
    if (updateOrder) {
      const newOrderItems = [...updateOrder.orderItems, ...orderItems];

      updateOrderItems = newOrderItems.reduce((current, item) => {
        
        if(!current.length || !current.find(i => i.name === item.name)){
          current.push(item);
        }else{
          const newCurrent = current.length ? current.map(i => {
            if( i.name === item.name) {
              i.quantity += item.quantity;
            };
            return i;
          }) : [];
          if(newCurrent.length) {
            current = [...newCurrent];
          };
        }
        return current;
      },[]);

      updateOrder.orderItems = [...updateOrderItems];

      updateOrder.shippingAddress = shippingAddress;
      updateOrder.paymentMethod = paymentMethod;
      updateOrder.totalPrice += totalPrice;

      await updateOrder.save();

      return res.json({
        success: true,
        order: updateOrder,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

//@route GET api/orders/:id
//@des get order by id
//@access Private

router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

//@Route PUT api/orders/:id/pay
//@des update order to paid
//@access private

router.put("/:id/pay", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    order.isPaid = true;
    order.paidAt = Date.now();

    const updateOrder = await order.save();

    res.json({ success: true, order: updateOrder });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

//@route PUT api/orders/:id/delivered
//@des update order to delivered
//@access private/ admmin

router.put("/:id/delivered", protect, async (req, res) => {
  try {
    const admin = await User.findById(req.userId);
    if (admin && admin.isAdmin) {
      const order = await Order.findById(req.params.id);

      if (!order)
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });

      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updateOrder = await order.save();

      return res.json({ success: true, order: updateOrder });
    }

    return res
      .status(404)
      .json({ success: false, message: "Not authorized as an admin" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

//@route GET api/orders/myorders
//@des get history user orders
//@access private

router.get("/", protect, async (req, res) => {
  try {
    const order = await Order.findOne({ user: req.userId });

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

//@route GET api/orders/all
//@des admin get all orders
//@access private/admin

router.get("/all", protect, async (req, res) => {
  try {
    const admin = await User.findById(req.userId);
    if (admin && admin.isAdmin) {
      const orders = await Order.find({}).populate("user", "username");

      return res.json({ success: true, orders });
    }

    return res
      .status(404)
      .json({ success: false, message: "Not authorized as an admin" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

module.exports = router;
