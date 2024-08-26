"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const drinksRoutes_1 = __importDefault(require("./routes/drinksRoutes"));
const pizzaRoute_1 = __importDefault(require("./routes/pizzaRoute"));
const appitizerRoute_1 = __importDefault(require("./routes/appitizerRoute"));
const CartRoutes_1 = __importDefault(require("./routes/CartRoutes"));
const cors_1 = __importDefault(require("cors"));
const OrderRoutes_1 = __importDefault(require("./routes/OrderRoutes"));
const contactRoute_1 = __importDefault(require("./routes/contactRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const appitizerService_1 = require("./service/appitizerService");
const drinkService_1 = require("./service/drinkService");
const pizzaService_1 = require("./service/pizzaService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Mongo Connected Successfully!'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));
app.use('/users', userRoutes_1.default);
app.use('/drinks', drinksRoutes_1.default);
app.use('/cart', CartRoutes_1.default);
app.use('/confirm', OrderRoutes_1.default);
app.use('/pizza', pizzaRoute_1.default);
app.use('/appitizer', appitizerRoute_1.default);
app.use('/contact', contactRoute_1.default);
(0, appitizerService_1.seedInitialAppitizers)();
(0, drinkService_1.seedInitialDrinks)();
(0, pizzaService_1.seedInitialPizzas)();
app.listen(PORT, () => {
    console.log(`Server Is Running On Port ${PORT}`);
});
