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
const express_1 = __importDefault(require("express"));
const validateJWT_1 = __importDefault(require("../MiddleWares/validateJWT"));
const OrderService_1 = __importDefault(require("../service/OrderService"));
const router = express_1.default.Router();
router.post('/order', validateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { name, email, phone, address, items } = req.body;
    if (!name || !email || !phone || !address || !items) {
        return res.status(400).send({ error: 'Missing required fields' });
    }
    try {
        yield (0, OrderService_1.default)({
            userId,
            name,
            email,
            phoneNumber: phone,
            address,
            items
        });
        res.status(200).send({ message: 'Order confirmed and email sent' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to confirm order' });
    }
}));
exports.default = router;
