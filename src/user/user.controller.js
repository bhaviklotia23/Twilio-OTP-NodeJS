//define controller here

const dotenv = require('dotenv');

dotenv.config();
/**
 * send OTP
 * @param {*} req
 * @param {*} res
 */

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

exports.sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const service = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({
        to: phoneNumber,
        channel: 'sms',
      });

    res.send({
      success: true,
      data: service,
      message: 'OTP sent successfully',
    });
  } catch (error) {
    res
      .status(error.status || 400)
      .send(error?.message || 'something went wrong');
  }
};

exports.verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;
  try {
    const verifyOtp = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: phoneNumber,
        code: otp,
      });

    res.send({
      success: true,
      data: verifyOtp,
      message: 'OTP sent successfully',
    });
  } catch (error) {
    res
      .status(error.status || 400)
      .send(error?.message || 'something went wrong');
  }
};
