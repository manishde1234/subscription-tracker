import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    price:{
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be greater than 0'],   
        
    },
    currency:{
        type: String, 
        enum: ['USD', 'EUR', 'INR'],
        default: 'USD',
    },

    frequency:{
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        
    },
    category:{
        type: String,
        enum: ['entertainment', 'food', 'health', 'rent', 'utilities', 'other'],
        required: true,
    },
    paymentMethod:{
        type: String,
        required: true,
        trim: true,
        
    },
    status:{
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate:{
        type: Date,
        required: true,
        validate:{
            validator: (value) => value <= new Date(),
            message: 'Start date cannot be in the past',
        }
    },
    
    renewalDate:{
        type: Date,
        required: true,
        validate:{
            validator: function(value){ 
                return value > this.startDate;
            },
            message: 'renewal date must be greater than start',
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index:true,
    }
},{timestamps: true});

//auto calculate renewal date
subscriptionSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //auto update the status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }

    next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;