import BloodBank from '../models/BloodBank.js';

export const getBloodBanks = async (req, res) => {
    try {
        const banks = await BloodBank.find();
        res.json(banks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { bloodGroup, quantity } = req.body;

        const bank = await BloodBank.findById(id);
        if (!bank) return res.status(404).json({ message: "Blood Bank not found" });

        bank.stock[bloodGroup] = (bank.stock[bloodGroup] || 0) + quantity;
        bank.lastUpdated = Date.now();

        await bank.save();

        // Emit real-time update
        const io = req.app.get('io');
        io.emit('blood-stock-update', { bankId: id, stock: bank.stock });

        res.json(bank);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBloodBank = async (req, res) => {
    try {
        const newBank = new BloodBank(req.body);
        await newBank.save();
        res.status(201).json(newBank);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
