"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CartService_1 = require("./CartService");
const SendEmail_1 = require("../MiddleWares/SendEmail");
const orderModel_1 = __importDefault(require("../models/orderModel"));
const confirmOrder = (orderDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, name, email, phoneNumber, address, items } = orderDetails;
    if (!items || items.length === 0) {
        return { message: 'No items to process' };
    }
    const emailHtml = `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order, ${name}!</p>
        <p>Contact Information:</p>
        <ul>
            <li>Email: ${email}</li>
            <li>Phone: ${phoneNumber}</li>
            <li>Address: ${address}</li>
        </ul>
        <h2>Order Details:</h2>
        <ul>
            ${items.map(item => `
                <li>
                    ${item.pizza ? 'Pizza: ' : item.drink ? 'Drink: ' : item.appetizers ? 'Appetizer: ' : ''}${item.title} 
                    ${item.size ? `(Size: ${item.size})` : ''}
                    - Quantity: ${item.quantity}
                    - Price: ${item.totalPrice}
                </li>
            `).join('')}
        </ul>
        <p>Total: ${items.reduce((total, item) => total + item.totalPrice, 0)}</p>
    `;
    try {
        yield (0, SendEmail_1.sendEmail)({
            to: `${email}, PizzaHubStuff@outlook.com`,
            subject: 'Order Confirmation',
            html: emailHtml,
        });
        const newOrder = new orderModel_1.default({
            userId: userId,
            name: name,
            email: email,
            phone: phoneNumber,
            address: address,
            items: items.map(item => ({
                itemId: item.itemId,
                title: item.title,
                quantity: item.quantity,
                price: item.totalPrice / item.quantity,
                size: item.size
            })),
            total: items.reduce((total, item) => total + item.totalPrice, 0),
            status: 'completed'
        });
        yield newOrder.save();
        // Optionally clear the cart if needed
        yield (0, CartService_1.clearUserCart)(userId);
        return { message: 'Order confirmed and email sent' };
    }
    catch (error) {
        // console.error('Error processing order:', error);
        return { message: 'Error processing order' };
    }
});
exports.default = confirmOrder;
