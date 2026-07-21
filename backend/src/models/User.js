import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // ==========================================
    // 1. SIGNUP PHASE
    // The bare minimum to create an account.
    // ==========================================
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6, // Store the hashed password here, never plain text
    },

    // ==========================================
    // 2. ONBOARDING PHASE
    // Language preferences and profile setup.
    // ==========================================
    isOnboarded: {
        type: Boolean,
        default: false
    },
    nativeLanguage: {
        type: String,
        // Optional enum if you want to restrict to specific languages:
        // enum: ['English', 'Spanish', 'French', 'Hindi', etc.]
    },
    targetLanguage: {
        type: String
    },
    proficiencyLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    bio: {
        type: String,
        maxLength: 300
    },

    // ==========================================
    // 3. SOCIAL DATA (Dashboard Prep)
    // Arrays of references to other User documents.
    // ==========================================
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friendRequestsReceived: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friendRequestsSent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

export default User;