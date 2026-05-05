// Mock Data for EEPIP MVP Demo
const mockData = {
    // Current user (AI Engineer)
    currentUser: {
        id: 'AI001',
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+94 77 123 4567',
        rank: 'Silver',
        joinDate: '2024-01-15',
        status: 'active'
    },

    // Dashboard data
    dashboardData: {
        currentRank: 'Silver',
        totalTeamSize: 47,
        totalEarnings: 1250000,
        activePairs: 12,
        investment: {
            total: 1800000,
            monthlyInterest: 24000,
            studentStatus: 'BSc In Progress',
            programProgress: 'Year 2 - Semester 1'
        },
        recentCommissions: [
            {
                date: '2024-04-15',
                type: 'Direct Sponsor',
                description: 'New AI Engineer enrollment - Mary Johnson',
                amount: 36000
            },
            {
                date: '2024-04-14',
                type: 'Binary',
                description: 'Binary pairing - 3 pairs formed',
                amount: 90000
            },
            {
                date: '2024-04-13',
                type: 'Matching',
                description: 'Gen 1 matching bonus - Robert Lee',
                amount: 9000
            },
            {
                date: '2024-04-12',
                type: 'Leadership',
                description: 'Leadership pool share - Silver rank',
                amount: 27000
            },
            {
                date: '2024-04-10',
                type: 'Binary',
                description: 'Binary pairing - 2 pairs formed',
                amount: 60000
            }
        ],
        nextRank: {
            name: 'Gold',
            progress: 65,
            current: {
                directRecruits: 4,
                teamEnrollments: 32,
                leftBalance: 15,
                rightBalance: 17
            },
            required: {
                directRecruits: 6,
                teamEnrollments: 50,
                leftBalance: 20,
                rightBalance: 20
            }
        }
    },

    // Binary tree data
    binaryTreeData: {
        stats: {
            totalNodes: 47,
            activeNodes: 42,
            leftBV: 28,
            rightBV: 31,
            totalBV: 59
        },
        rootNode: {
            id: 'AI001',
            name: 'John Smith',
            rank: 'Silver',
            status: 'active',
            joinDate: '2024-01-15',
            teamSize: 47,
            totalEarnings: 1250000,
            student: {
                name: 'Sarah Smith',
                program: 'BSc Software Engineering',
                progress: 'Year 2 - Semester 1'
            },
            left: {
                id: 'AI002',
                name: 'Mary Johnson',
                rank: 'Bronze',
                status: 'active',
                joinDate: '2024-02-01',
                teamSize: 23,
                totalEarnings: 450000,
                student: {
                    name: 'Tom Johnson',
                    program: 'BSc Software Engineering',
                    progress: 'Year 1 - Semester 2'
                },
                left: {
                    id: 'AI005',
                    name: 'David Wilson',
                    rank: 'Starter',
                    status: 'active',
                    joinDate: '2024-03-01',
                    teamSize: 8,
                    totalEarnings: 120000
                },
                right: {
                    id: 'AI006',
                    name: 'Lisa Chen',
                    rank: 'Bronze',
                    status: 'active',
                    joinDate: '2024-03-05',
                    teamSize: 15,
                    totalEarnings: 380000
                }
            },
            right: {
                id: 'AI003',
                name: 'Robert Lee',
                rank: 'Silver',
                status: 'active',
                joinDate: '2024-02-10',
                teamSize: 24,
                totalEarnings: 980000,
                student: {
                    name: 'Emma Lee',
                    program: 'BSc Software Engineering',
                    progress: 'Year 2 - Semester 1'
                },
                left: {
                    id: 'AI007',
                    name: 'James Taylor',
                    rank: 'Starter',
                    status: 'pending',
                    joinDate: '2024-04-01',
                    teamSize: 0,
                    totalEarnings: 0
                },
                right: {
                    id: 'AI008',
                    name: 'Sophie Brown',
                    rank: 'Bronze',
                    status: 'active',
                    joinDate: '2024-03-15',
                    teamSize: 9,
                    totalEarnings: 180000
                }
            }
        }
    },

    // Commission data
    commissionData: {
        overview: {
            totalEarnings: 1250000,
            thisMonth: 222000,
            lastMonth: 185000,
            activePairs: 12,
            breakdown: [
                {
                    type: 'Direct Sponsor',
                    amount: 360000,
                    percentage: 28.8,
                    transactions: 10,
                    color: '#28a745'
                },
                {
                    type: 'Binary Pairing',
                    amount: 625000,
                    percentage: 50.0,
                    transactions: 45,
                    color: '#17a2b8'
                },
                {
                    type: 'Matching Bonus',
                    amount: 187500,
                    percentage: 15.0,
                    transactions: 23,
                    color: '#ffc107'
                },
                {
                    type: 'Leadership Pool',
                    amount: 77500,
                    percentage: 6.2,
                    transactions: 12,
                    color: '#dc3545'
                }
            ]
        },
        detailed: [
            {
                date: '2024-04-15',
                type: 'Direct Sponsor',
                description: 'New AI Engineer enrollment',
                fromMember: 'Mary Johnson',
                bv: '1',
                amount: 36000,
                status: 'Paid'
            },
            {
                date: '2024-04-14',
                type: 'Binary',
                description: 'Binary pairing commission',
                fromMember: 'System',
                bv: '3 pairs',
                amount: 90000,
                status: 'Paid'
            },
            {
                date: '2024-04-13',
                type: 'Matching',
                description: 'Generation 1 matching',
                fromMember: 'Robert Lee',
                bv: '2 pairs',
                amount: 9000,
                status: 'Paid'
            },
            {
                date: '2024-04-12',
                type: 'Leadership',
                description: 'Leadership pool share',
                fromMember: 'System',
                bv: 'Silver rank',
                amount: 27000,
                status: 'Paid'
            },
            {
                date: '2024-04-10',
                type: 'Binary',
                description: 'Binary pairing commission',
                fromMember: 'System',
                bv: '2 pairs',
                amount: 60000,
                status: 'Paid'
            }
        ],
        binary: {
            leftBV: 28,
            rightBV: 31,
            pairedBV: 28,
            carryForward: 3,
            pairingDetails: [
                {
                    date: '2024-04-14',
                    leftBV: 15,
                    rightBV: 18,
                    pairs: 3,
                    rate: 100,
                    amount: 90000
                },
                {
                    date: '2024-04-10',
                    leftBV: 13,
                    rightBV: 13,
                    pairs: 2,
                    rate: 100,
                    amount: 60000
                },
                {
                    date: '2024-04-07',
                    leftBV: 11,
                    rightBV: 9,
                    pairs: 1,
                    rate: 100,
                    amount: 30000
                }
            ],
            poolStatus: {
                monthlyPool: 4500000,
                totalClaims: 3240000,
                available: 1260000,
                utilization: 72
            }
        },
        matching: {
            totalMatching: 187500,
            gen1Count: 4,
            gen2Count: 12,
            gen3Count: 7,
            generations: [
                {
                    level: 1,
                    rate: 10,
                    earnings: 112500,
                    members: 4,
                    active: 4,
                    color: '#28a745'
                },
                {
                    level: 2,
                    rate: 5,
                    earnings: 56250,
                    members: 12,
                    active: 9,
                    color: '#ffc107'
                },
                {
                    level: 3,
                    rate: 3,
                    earnings: 18750,
                    members: 7,
                    active: 5,
                    color: '#dc3545'
                }
            ],
            details: [
                {
                    date: '2024-04-13',
                    generation: 1,
                    fromMember: 'Robert Lee',
                    memberRank: 'Silver',
                    binaryEarnings: 90000,
                    rate: 10,
                    amount: 9000
                },
                {
                    date: '2024-04-11',
                    generation: 2,
                    fromMember: 'Lisa Chen',
                    memberRank: 'Bronze',
                    binaryEarnings: 60000,
                    rate: 5,
                    amount: 3000
                },
                {
                    date: '2024-04-09',
                    generation: 3,
                    fromMember: 'David Wilson',
                    memberRank: 'Starter',
                    binaryEarnings: 30000,
                    rate: 3,
                    amount: 900
                }
            ]
        }
    },

    // Sample enrollment data
    enrollmentData: {
        availableSponsors: [
            { id: 'AI001', name: 'John Smith', rank: 'Silver' },
            { id: 'AI002', name: 'Mary Johnson', rank: 'Bronze' },
            { id: 'AI003', name: 'Robert Lee', rank: 'Silver' }
        ],
        educationLevels: [
            { value: 'alevel', label: 'GCE A/L' },
            { value: 'olvel', label: 'GCE O/L' },
            { value: 'diploma', label: 'Diploma' },
            { value: 'other', label: 'Other' }
        ],
        paymentMethods: [
            { value: 'bank_transfer', label: 'Bank Transfer' },
            { value: 'cheque', label: 'Cheque' },
            { value: 'cash', label: 'Cash Deposit' }
        ]
    },

    // Rank system data
    rankSystem: {
        ranks: [
            {
                name: 'Starter',
                directRecruits: 0,
                teamEnrollments: 1,
                leftBalance: 0,
                rightBalance: 0,
                leadershipShare: 0,
                reward: 0
            },
            {
                name: 'Bronze',
                directRecruits: 2,
                teamEnrollments: 6,
                leftBalance: 2,
                rightBalance: 2,
                leadershipShare: 0,
                reward: 10000
            },
            {
                name: 'Silver',
                directRecruits: 4,
                teamEnrollments: 20,
                leftBalance: 8,
                rightBalance: 8,
                leadershipShare: 0,
                reward: 25000
            },
            {
                name: 'Gold',
                directRecruits: 6,
                teamEnrollments: 50,
                leftBalance: 20,
                rightBalance: 20,
                leadershipShare: 1,
                reward: 75000
            },
            {
                name: 'Platinum',
                directRecruits: 8,
                teamEnrollments: 100,
                leftBalance: 40,
                rightBalance: 40,
                leadershipShare: 2,
                reward: 200000
            },
            {
                name: 'Diamond',
                directRecruits: 12,
                teamEnrollments: 250,
                leftBalance: 100,
                rightBalance: 100,
                leadershipShare: 5,
                reward: 500000
            }
        ]
    }
};
