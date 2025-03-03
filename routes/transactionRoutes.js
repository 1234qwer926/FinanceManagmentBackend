const express = require("express");
const {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById
} = require("../controllers/transactionController");

const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getTransactions);
router.post("/", authMiddleware, createTransaction);
router.put("/:id", authMiddleware, updateTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);
router.get("/:id", authMiddleware, getTransactionById);

module.exports = router;
