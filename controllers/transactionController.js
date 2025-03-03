const Transaction = require("../models/transactionModel");

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.userId });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.createTransaction = async (req, res) => {
    try {
        const { date, title, amount, type, catalog } = req.body;

        if (!date || !title || !amount || !type || !catalog) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const transaction = new Transaction({
            userId: req.user.userId,
            date,
            title,
            amount,
            type,
            catalog,
        });

        const savedTransaction = await transaction.save();
        res.status(201).json({ message: "Transaction added successfully", transaction: savedTransaction });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        if (transaction.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not authorized to update this transaction" });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Transaction updated successfully", transaction: updatedTransaction });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        if (transaction.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not authorized to delete this transaction" });
        }

        await Transaction.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        if (transaction.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not authorized to access this transaction" });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
