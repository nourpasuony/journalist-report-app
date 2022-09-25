const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const reporterSchema = new mongoose.Schema({


        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: (val) => {
                if (!validator.isEmail(val)) {
                    throw new Error('Email Must be Unique')
                }
            }

        },
        phone: {
            type: String,
            required: true,
            unique: true,
            validate: (val) => {
                if (!validator.isMobilePhone(val, 'ar-EG')) {
                    throw new Error('UnValid Phone Number')
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
            validate(value){
                if(!value.match('/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/')){
                    throw new Error('you must have strong password')
                }
            }
        },
        tokens: [{
            type: String,
        }],
        image: {
            type: Buffer,
        }


    }, {
        timestamps: { currentTime: () => Date.now() }
    }

)

reporterSchema.statics.login = async(email, password) => {


    const reporter = await Reporter.findOne({ email })
    if (!reporter) {
        throw new Error('Email Not True')
    }

    const isAttempt = await bcrypt.compare(password, reporter.password);

    if (!isAttempt) {
        throw new Error('Password Is Not True')
    }

    return reporter;

}
reporterSchema.pre('save', async function(next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

reporterSchema.methods.generateToken = async function() {

    const reporter = this;
    const token = jwt.sign({ _id: reporter._id }, process.env.JWT_SECRET);

    reporter.tokens = reporter.tokens.concat(token)

    await reporter.save();

    return token;


}

reporterSchema.methods.logout = async function() {

    // const reporter = this;


    // await reporter.save();

    return 'good';


}


reporterSchema.methods.test = function() {

    return 'good'
}
reporterSchema.methods.toJSON = function() {

    const reporterObj = this.toObject()
    delete reporterObj.password;
    delete reporterObj.tokens;

    return reporterObj;
}

const Reporter = mongoose.model('Reporter', reporterSchema);


module.exports = Reporter;