import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            isOnboarded: false,
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(201).json({
            message: 'Signup successful',
            user: {
                id: newUser._id,
                username: newUser.username,
                isOnboarded: newUser.isOnboarded
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during signup', error: error.message });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        // 5. Send back the user details (Notice: no token in the JSON response)
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                isOnboarded: user.isOnboarded
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
}

const logOutController = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0) // Instantly expires the cookie
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

export {
    signupController,
    loginController,
    logOutController,
};