import bcrypt from 'bcryptjs';
import { PREDEFINED_FACTORS } from './predefinedFactors.js';

const salt = bcrypt.genSaltSync(10);
const hashedStudentPassword = bcrypt.hashSync('ecotrack123', salt);
const hashedAdminPassword = bcrypt.hashSync('admin123', salt);
const hashedCollegePassword = bcrypt.hashSync('college123', salt);

export const initialStore = {
  users: [
    {
      id: 'usr_student_1',
      name: 'Aarav Sharma',
      email: 'student@ecotrack.org',
      password: hashedStudentPassword,
      role: 'student',
      collegeOrOrg: 'Greenfield Institute of Technology',
      department: 'Computer Science & Eng.',
      streakDays: 14,
      lastActiveDate: new Date().toISOString(),
      collegeActivityPoints: 18,
      badges: ['badge_1', 'badge_2', 'badge_4'],
      createdAt: '2024-01-10T09:00:00.000Z'
    },
    {
      id: 'usr_student_2',
      name: 'Priya Patel',
      email: 'priya@ecotrack.org',
      password: hashedStudentPassword,
      role: 'student',
      collegeOrOrg: 'Greenfield Institute of Technology',
      department: 'Environmental Sciences',
      streakDays: 21,
      lastActiveDate: new Date().toISOString(),
      collegeActivityPoints: 24,
      badges: ['badge_1', 'badge_3', 'badge_5'],
      createdAt: '2024-01-12T10:30:00.000Z'
    },
    {
      id: 'usr_admin_1',
      name: 'Dr. Sarah Jenkins',
      email: 'admin@ecotrack.org',
      password: hashedAdminPassword,
      role: 'admin',
      collegeOrOrg: 'EcoTrack Global Consortium',
      department: 'Sustainability Affairs',
      streakDays: 45,
      lastActiveDate: new Date().toISOString(),
      collegeActivityPoints: 50,
      badges: ['badge_1', 'badge_2', 'badge_3', 'badge_4', 'badge_5', 'badge_6'],
      createdAt: '2023-11-01T08:00:00.000Z'
    },
    {
      id: 'usr_college_1',
      name: 'Prof. Rajesh Kulkarni',
      email: 'college@ecotrack.org',
      password: hashedCollegePassword,
      role: 'college_admin',
      collegeOrOrg: 'Greenfield Institute of Technology',
      department: 'Dean of Student Welfare & NSS Head',
      streakDays: 30,
      lastActiveDate: new Date().toISOString(),
      collegeActivityPoints: 35,
      badges: ['badge_1', 'badge_5'],
      createdAt: '2023-12-05T08:00:00.000Z'
    }
  ],

  activities: [
    {
      id: 'act_101',
      userId: 'usr_student_1',
      userName: 'Aarav Sharma',
      activityType: 'cycling_commute',
      title: 'Cycling Commute',
      category: 'Transportation',
      quantity: 12,
      unit: 'km',
      estimatedImpact: {
        co2eAvoidedKg: 2.05,
        waterSavedLiters: 0,
        energySavedKwh: 3.0,
        isEstimateOnly: true
      },
      factorSnapshot: {
        factorSource: 'UK DEFRA / EPA Passenger Car Displacement Model',
        year: 2024,
        region: 'Urban / Sub-urban Average',
        assumptions: 'Displaces average petrol car 171g CO2e/km.'
      },
      verificationStatus: 'verified',
      collegePointsEligible: true,
      collegePointsAwarded: 2,
      notes: 'Campus commute from hostel gate to engineering lab.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
    },
    {
      id: 'act_102',
      userId: 'usr_student_1',
      userName: 'Aarav Sharma',
      activityType: 'plastic_recycling',
      title: 'Plastic Bottle Recycling',
      category: 'Waste & Recycling',
      quantity: 3.5,
      unit: 'kg',
      estimatedImpact: {
        co2eAvoidedKg: 5.42,
        waterSavedLiters: 87.5,
        energySavedKwh: 20.3,
        isEstimateOnly: true
      },
      factorSnapshot: {
        factorSource: 'Association of Plastic Recyclers (APR) & EPA WARM',
        year: 2023,
        region: 'Global Industrial Average',
        assumptions: 'Closed-loop PET sorting at North cafeteria collection point.'
      },
      verificationStatus: 'verified',
      collegePointsEligible: true,
      collegePointsAwarded: 3,
      notes: 'Collected discarded bottles after annual tech symposium.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString()
    },
    {
      id: 'act_103',
      userId: 'usr_student_1',
      userName: 'Aarav Sharma',
      activityType: 'tree_planting',
      title: 'Tree Planting & Sapling Care',
      category: 'Restoration & Community',
      quantity: 2,
      unit: 'saplings',
      estimatedImpact: {
        co2eAvoidedKg: 43.4,
        waterSavedLiters: 0,
        energySavedKwh: 0,
        isEstimateOnly: true
      },
      factorSnapshot: {
        factorSource: 'US Forest Service & Arbor Day Foundation',
        year: 2023,
        region: 'Temperate / Subtropical Mature Trees',
        assumptions: 'Annualized projected carbon sequestration across 20-yr tree lifetime.'
      },
      verificationStatus: 'verified',
      collegePointsEligible: true,
      collegePointsAwarded: 5,
      notes: 'Planted native Neem saplings along campus perimeter wall.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
    },
    {
      id: 'act_104',
      userId: 'usr_student_2',
      userName: 'Priya Patel',
      activityType: 'saving_electricity',
      title: 'Electricity Conservation',
      category: 'Energy & Water',
      quantity: 15,
      unit: 'kWh',
      estimatedImpact: {
        co2eAvoidedKg: 6.3,
        waterSavedLiters: 27.0,
        energySavedKwh: 15.0,
        isEstimateOnly: true
      },
      factorSnapshot: {
        factorSource: 'IEA Sub-grid Emission Factor 2023',
        year: 2023,
        region: 'Grid Average Mix',
        assumptions: 'Lab power-down initiative during off-peak weekend hours.'
      },
      verificationStatus: 'verified',
      collegePointsEligible: false,
      collegePointsAwarded: 0,
      notes: 'Switched off workstation cluster sleep-mode draw.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
    },
    {
      id: 'act_105',
      userId: 'usr_student_1',
      userName: 'Aarav Sharma',
      activityType: 'campus_cleanup',
      title: 'Campus Cleanup Drive',
      category: 'Restoration & Community',
      quantity: 3,
      unit: 'hours',
      estimatedImpact: {
        co2eAvoidedKg: 2.55,
        waterSavedLiters: 45.0,
        energySavedKwh: 1.5,
        isEstimateOnly: true
      },
      factorSnapshot: {
        factorSource: 'Ocean Conservancy & Campus Green Audit Protocols',
        year: 2024,
        region: 'Campus Grounds',
        assumptions: 'Segregated waste recovery during weekend drive.'
      },
      verificationStatus: 'verified',
      collegePointsEligible: true,
      collegePointsAwarded: 4,
      notes: 'Cleaned lakefront pathway and collected dry plastic waste.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
    }
  ],

  issueReports: [
    {
      id: 'rep_201',
      reporterId: 'usr_student_1',
      reporterName: 'Aarav Sharma',
      reporterEmail: 'student@ecotrack.org',
      issueType: 'Overflowing Bins',
      title: 'Overflowing Bins outside South Canteen',
      description: 'Secondary compost bin is overflowing onto walkway with feral animal disturbance. Needs immediate municipal sorting clearance.',
      location: 'South Canteen, Annex C Block, Ground Level',
      severity: 'High',
      status: 'Action Taken',
      imageUrl: '/assets/issue-sample-1.jpg',
      adminNotes: 'Sanitation team notified; heavy duty replacement bins scheduled for delivery.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    },
    {
      id: 'rep_202',
      reporterId: 'usr_student_2',
      reporterName: 'Priya Patel',
      reporterEmail: 'priya@ecotrack.org',
      issueType: 'Water Pollution',
      title: 'Irrigation Pipe Burst causing runoff flooding',
      description: 'Continuous fresh water runoff leaking across lawn near Biotech greenhouse. Hundreds of liters wasted every hour.',
      location: 'Biotech Quadrangle Greenhouse No. 2',
      severity: 'Critical',
      status: 'Under Review',
      imageUrl: '/assets/issue-sample-2.jpg',
      adminNotes: 'Assigned to Campus Facilities plumbing supervisor.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
    },
    {
      id: 'rep_203',
      reporterId: 'usr_student_1',
      reporterName: 'Aarav Sharma',
      reporterEmail: 'student@ecotrack.org',
      issueType: 'Garbage Dumping',
      title: 'Construction Debris dumped behind sports complex',
      description: 'Plastic bags, dry cement packaging and broken tiles left unattended on open soil.',
      location: 'Sports Complex West Pavilion Boundary',
      severity: 'Medium',
      status: 'Pending',
      imageUrl: '/assets/issue-sample-3.jpg',
      adminNotes: 'Awaiting site inspection from estate manager.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
    },
    {
      id: 'rep_204',
      reporterId: 'usr_student_2',
      reporterName: 'Priya Patel',
      reporterEmail: 'priya@ecotrack.org',
      issueType: 'Damaged Trees',
      title: 'Branch split on ancient Gulmohar tree after storm',
      description: 'Large limb is suspended by bark over the pedestrian walkway, poses safety hazard to students.',
      location: 'Central Library Avenue Walkway',
      severity: 'High',
      status: 'Resolved',
      imageUrl: '/assets/issue-sample-4.jpg',
      adminNotes: 'Horticulture team safely pruned branch and treated bark seal. Walkway restored.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
      resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString()
    }
  ],

  campaigns: [
    {
      id: 'cmp_301',
      title: 'Plastic-Free Campus Challenge 2026',
      tagline: 'Eliminate single-use plastics across student eateries and study zones.',
      description: 'A 2-week campus-wide sprint where participants pledge zero disposable cutlery, carry reusable hydration flasks, and record daily waste-avoidance milestones.',
      category: 'Zero Waste',
      startDate: '2026-10-01T00:00:00.000Z',
      endDate: '2026-10-15T23:59:59.000Z',
      targetGoal: {
        targetMetric: 'kg plastic diverted',
        targetValue: 500,
        currentValue: 312
      },
      participantsCount: 428,
      status: 'Active',
      badgeReward: 'Zero Waste Vanguard',
      isJoined: true
    },
    {
      id: 'cmp_302',
      title: 'Pedal & Stride: Zero Emission Commute Month',
      tagline: 'Trade motor vehicle transit for cycle or foot transit.',
      description: 'Track cycle trips and walking commutes across campus grounds. Top departments earn institutional sustainability honors.',
      category: 'Eco Commute',
      startDate: '2026-10-01T00:00:00.000Z',
      endDate: '2026-10-31T23:59:59.000Z',
      targetGoal: {
        targetMetric: 'km low-carbon transit',
        targetValue: 5000,
        currentValue: 3840
      },
      participantsCount: 890,
      status: 'Active',
      badgeReward: 'Commute Hero',
      isJoined: true
    },
    {
      id: 'cmp_303',
      title: '1,000 Native Saplings Afforestation Drive',
      tagline: 'Restoring green buffer zones along academic borders.',
      description: 'Hands-on weekend planting sessions guided by the horticulture faculty. Plant, geo-tag and nurture indigenous trees.',
      category: 'Afforestation',
      startDate: '2026-10-10T00:00:00.000Z',
      endDate: '2026-11-10T23:59:59.000Z',
      targetGoal: {
        targetMetric: 'saplings planted',
        targetValue: 1000,
        currentValue: 460
      },
      participantsCount: 275,
      status: 'Active',
      badgeReward: 'Root & Canopy',
      isJoined: false
    }
  ],

  groups: [
    {
      id: 'grp_401',
      name: 'Computer Science Eco Club',
      type: 'Department',
      description: 'Advancing paperless labs, smart power management, and campus green audits.',
      membersCount: 164,
      collectiveImpact: {
        totalCo2eAvoidedKg: 1240.5,
        totalActivities: 780,
        treesPlanted: 54
      }
    },
    {
      id: 'grp_402',
      name: 'Civil & Environmental Engineering Guild',
      type: 'Department',
      description: 'Specialists in stormwater management, solid waste segregation, and life-cycle auditing.',
      membersCount: 118,
      collectiveImpact: {
        totalCo2eAvoidedKg: 2150.8,
        totalActivities: 940,
        treesPlanted: 120
      }
    },
    {
      id: 'grp_403',
      name: 'Campus Hostel Block B Green Alliance',
      type: 'Organization',
      description: 'Hostel resident team championing food-waste minimization and zero-litter courtyards.',
      membersCount: 220,
      collectiveImpact: {
        totalCo2eAvoidedKg: 1890.0,
        totalActivities: 1120,
        treesPlanted: 35
      }
    }
  ],

  badges: [
    {
      id: 'badge_1',
      title: 'Green Pioneer',
      description: 'Logged first 5 environmental activities with verified impact.',
      icon: 'Award',
      category: 'Community',
      criteria: 'Record 5 verified actions.'
    },
    {
      id: 'badge_2',
      title: 'Zero Waste Warrior',
      description: 'Diverted over 10kg of recyclable plastic and packaging from landfills.',
      icon: 'Recycle',
      category: 'Zero Waste',
      criteria: '10kg+ recyclable plastics logged.'
    },
    {
      id: 'badge_3',
      title: 'Commute Hero',
      description: 'Completed 50km of emission-free cycling and walking commutes.',
      icon: 'Bike',
      category: 'Transportation',
      criteria: '50km+ human-powered transit.'
    },
    {
      id: 'badge_4',
      title: 'Eagle Eye Spotter',
      description: 'Reported campus environmental hazards that resulted in verified action.',
      icon: 'AlertTriangle',
      category: 'Issue Solver',
      criteria: 'Report 3 verified environmental issues.'
    },
    {
      id: 'badge_5',
      title: 'Streak Master (14-Day)',
      description: 'Maintained 14 consecutive days of sustainable daily actions.',
      icon: 'Flame',
      category: 'Streak',
      criteria: '14 consecutive active days.'
    },
    {
      id: 'badge_6',
      title: 'Campus Canopy Guardian',
      description: 'Planted and nurtured verified saplings on college grounds.',
      icon: 'TreePine',
      category: 'Special',
      criteria: 'Participate in verified tree planting.'
    }
  ],

  collegePointRules: [
    {
      id: 'cpr_501',
      title: 'Native Tree Planting & Maintenance',
      activityType: 'tree_planting',
      collegeOrOrg: 'Greenfield Institute of Technology',
      pointsValue: 5,
      minimumQuantity: 1,
      requiresEvidence: true,
      officialVerificationRule: 'Verified via photo upload with geo-stamp and faculty coordinator signature.',
      regulatoryDisclaimer: 'Official accreditation subject to Head of NSS / Dean of Student Welfare verification.',
      isActive: true
    },
    {
      id: 'cpr_502',
      title: 'Supervised Campus Cleanliness Drive (NSS/NCC)',
      activityType: 'campus_cleanup',
      collegeOrOrg: 'Greenfield Institute of Technology',
      pointsValue: 3,
      minimumQuantity: 2,
      requiresEvidence: true,
      officialVerificationRule: 'Attendance roster confirmed by student activity coordinator.',
      regulatoryDisclaimer: 'Points map towards Mandatory Extracurricular Activity Requirement (AICTE/VTU).',
      isActive: true
    },
    {
      id: 'cpr_503',
      title: 'Plastic Segregation & Recycling Champion',
      activityType: 'plastic_recycling',
      collegeOrOrg: 'Greenfield Institute of Technology',
      pointsValue: 2,
      minimumQuantity: 3,
      requiresEvidence: true,
      officialVerificationRule: 'Campus green audit log receipt confirmation.',
      regulatoryDisclaimer: 'Credited towards Student Social Responsibility (SSR) criteria.',
      isActive: true
    },
    {
      id: 'cpr_504',
      title: 'Active Participation in Sustainability Sprint',
      activityType: 'campaign_participation',
      collegeOrOrg: 'Greenfield Institute of Technology',
      pointsValue: 2,
      minimumQuantity: 1,
      requiresEvidence: false,
      officialVerificationRule: 'Automated platform campaign completion record.',
      regulatoryDisclaimer: 'Institutional recognition certificate issued annually.',
      isActive: true
    }
  ]
};

// Thread-safe copy in memory
export const store = JSON.parse(JSON.stringify(initialStore));
