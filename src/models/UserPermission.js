import mongoose from "mongoose";

const userPermissionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    permissionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Permission', 
        required: true 
    },
    assignedAt: { type: Date, default: Date.now }
});

export default mongoose.model("UserPermission", userPermissionSchema);