const Referral = require('../models/Referral');

// @desc    Create a new self-referral (public — no auth required)
// @route   POST /api/referrals
// @access  Public
const createReferral = async (req, res) => {
  try {
    const {
      title, givenNames, surname, gender, dateOfBirth,
      homePhone, mobilePhone, email, address,
      gpName, gpClinic, gpPhone, gpFax, gpAddress,
      countryOfBirth, languages, maritalStatus, isRefugee, atsi, medicareNumber,
      emergencyName, emergencyRelationship, emergencyPhone,
      referralSource, referralReason, referralNotes,
      irn, medicareExpiry, healthCareCard, healthCareExpiry,
      livingSituation, accommodationType, requestedServices,
      consent1, consent2, consent3, consent4, signature,
    } = req.body;
    const submittedEmail = (req.user?.email || req.body.submittedByEmail || email || 'anonymous')
      .toLowerCase()
      .trim();

    const referral = await Referral.create({
      title:        title        || '',
      givenNames:   givenNames   || '',
      surname:      surname      || '',
      gender:       gender       || '',
      dateOfBirth:  dateOfBirth  || '',
      homePhone:    homePhone    || '',
      mobilePhone:  mobilePhone  || '',
      email:        submittedEmail === 'anonymous' ? (email || '') : submittedEmail,
      address:      address      || '',
      gpName:       gpName       || '',
      gpClinic:     gpClinic     || '',
      gpPhone:      gpPhone      || '',
      gpFax:        gpFax        || '',
      gpAddress:    gpAddress    || '',
      countryOfBirth:   countryOfBirth   || '',
      languages:        languages        || '',
      maritalStatus:    maritalStatus    || '',
      isRefugee:        isRefugee        || '',
      atsi:             atsi             || '',
      medicareNumber:   medicareNumber   || '',
      irn:              irn              || '',
      medicareExpiry:   medicareExpiry   || '',
      healthCareCard:   healthCareCard   || '',
      healthCareExpiry: healthCareExpiry || '',
      livingSituation:   livingSituation   || '',
      accommodationType: accommodationType || '',
      emergencyName:         emergencyName         || '',
      emergencyRelationship: emergencyRelationship || '',
      emergencyPhone:        emergencyPhone        || '',
      requestedServices: requestedServices || '',
      referralSource:  referralSource  || 'SelfReferral',
      referralReason:  referralReason  || '',
      referralNotes:   referralNotes   || '',
      consent1: consent1 || '',
      consent2: consent2 || '',
      consent3: consent3 || '',
      consent4: consent4 || '',
      signature: signature || '',
      submittedByEmail: submittedEmail,
    });

    res.status(201).json({ success: true, referral });
  } catch (error) {
    console.error('Create Referral Error:', error);
    res.status(500).json({ success: false, message: 'Server error while creating referral', error: error.message });
  }
};

// @desc    Get all referrals (admin use)
// @route   GET /api/referrals
// @access  Private
const getUserReferrals = async (req, res) => {
  try {
    const userEmail = req.user.email.toLowerCase().trim();
    const referrals = await Referral.find({
      $or: [
        { submittedByEmail: userEmail },
        { email: userEmail },
      ],
    }).sort({ createdAt: -1 });
    res.json(referrals);
  } catch (error) {
    console.error('Get Referrals Error:', error);
    res.status(500).json({ message: 'Server error while retrieving referrals', error: error.message });
  }
};

module.exports = { createReferral, getUserReferrals };
