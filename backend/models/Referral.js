const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
  // Personal details
  title:           { type: String, trim: true, default: '' },
  givenNames:      { type: String, trim: true, default: '' },
  surname:         { type: String, trim: true, default: '' },
  gender:          { type: String, trim: true, default: '' },
  dateOfBirth:     { type: String, trim: true, default: '' },
  homePhone:       { type: String, trim: true, default: '' },
  mobilePhone:     { type: String, trim: true, default: '' },
  email:           { type: String, trim: true, lowercase: true, default: '' },
  address:         { type: String, trim: true, default: '' },

  // GP details
  gpName:          { type: String, trim: true, default: '' },
  gpClinic:        { type: String, trim: true, default: '' },
  gpPhone:         { type: String, trim: true, default: '' },
  gpFax:           { type: String, trim: true, default: '' },
  gpAddress:       { type: String, trim: true, default: '' },

  // Consumer details
  countryOfBirth:  { type: String, trim: true, default: '' },
  languages:       { type: String, trim: true, default: '' },
  maritalStatus:   { type: String, trim: true, default: '' },
  isRefugee:       { type: String, trim: true, default: '' },
  atsi:            { type: String, trim: true, default: '' },
  medicareNumber:  { type: String, trim: true, default: '' },
  irn:             { type: String, trim: true, default: '' },
  medicareExpiry:  { type: String, trim: true, default: '' },
  healthCareCard:  { type: String, trim: true, default: '' },
  healthCareExpiry:{ type: String, trim: true, default: '' },
  livingSituation:   { type: String, trim: true, default: '' },
  accommodationType: { type: String, trim: true, default: '' },

  // Emergency contact
  emergencyName:        { type: String, trim: true, default: '' },
  emergencyRelationship:{ type: String, trim: true, default: '' },
  emergencyPhone:       { type: String, trim: true, default: '' },

  requestedServices: { type: String, trim: true, default: '' },

  // Referral details
  referralSource:  { type: String, trim: true, default: 'SelfReferral' },
  referralReason:  { type: String, trim: true, default: '' },
  referralNotes:   { type: String, trim: true, default: '' },

  // Meta
  submittedByEmail: { type: String, trim: true, lowercase: true, default: 'anonymous' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Referral', ReferralSchema);
