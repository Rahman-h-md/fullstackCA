import jwt from 'jsonwebtoken';

// New Clean Middleware Pattern
export const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ message: 'Not authorized' });

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `User role ${req.user.role} is not authorized to access this route` });
        }
        next();
    };
};

// Legacy Middleware (Default Export) - Keeps surveyRoutes working
const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) return res.status(401).json({ message: 'Access Denied' });

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;

            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        } catch (err) {
            res.status(400).json({ message: 'Invalid Token' });
        }
    };
};

export default authMiddleware;
