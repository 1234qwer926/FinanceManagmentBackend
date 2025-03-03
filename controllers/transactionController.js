const Transaction = require("../models/transactionModel");

// Get all transactions for the logged-in user
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.userId }); // Use `userId` from JWT payload
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const { date, title, amount, type, catalog } = req.body;

        // Validate required fields
        if (!date || !title || !amount || !type || !catalog) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const transaction = new Transaction({
            userId: req.user.userId, // Use correct user ID
            date,
            title,
            amount,
            type,
            catalog,
        });

        const savedTransaction = await transaction.save();
        res.status(201).json({ message: "Transaction added successfully", transaction: savedTransaction });

    } catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update a transaction by ID
exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        // Ensure the transaction belongs to the logged-in user
        if (transaction.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not authorized to update this transaction" });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Transaction updated successfully", transaction: updatedTransaction });

    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete a transaction by ID
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        // Ensure the transaction belongs to the logged-in user
        if (transaction.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not authorized to delete this transaction" });
        }

        await transaction.deleteOne();
        res.status(200).json({ message: "Transaction deleted successfully" });

    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
