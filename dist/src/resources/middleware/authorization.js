"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _errors_1 = require("@errors");
const authorization = (...restrictTo) => {
    return (req, res, next) => {
        try {
            const { user } = req;
            const userRole = user.role;
            if (!restrictTo.includes(userRole)) {
                const errors = [
                    {
                        msg: 'You have not permission to access this resource',
                        param: user.role,
                    },
                ];
                throw new _errors_1.UnauthorException(errors);
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.default = authorization;
