const express = require("express");
const {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
} = require("../controllers/transactionController"); // Ensure correct path

const authMiddleware = require("../middleware/authMiddleware"); // Ensure correct path
const router = express.Router();

// Debug Log: Ensure Routes are Working
router.get("/", authMiddleware, (req, res, next) => {
    console.log("GET /transactions route hit");
    next();
}, getTransactions);

router.post("/", authMiddleware, (req, res, next) => {
    console.log("POST /transactions route hit");
    console.log("Request Body:", req.body);
    next();
}, createTransaction);

router.put("/:id", authMiddleware, (req, res, next) => {
    console.log("PUT /transactions/:id route hit");
    console.log("Transaction ID:", req.params.id);
    next();
}, updateTransaction);

router.delete("/:id", authMiddleware, (req, res, next) => {
    console.log("DELETE /transactions/:id route hit");
    console.log("Transaction ID:", req.params.id);
    next();
}, deleteTransaction);

module.exports = router;
