export interface NeuralNetworkData {
  layers: number[];
  activationFunctions: string[];
  trainingEpochs: number;
  accuracy: number;
  loss: number;
}

export interface PredictionData {
  date: Date;
  confidence: number;
  factors: string[];
  modelVersion: string;
  deathReason: string;
}

export const neuralNetworkConfig: NeuralNetworkData = {
  layers: [4, 6, 8, 6, 2],
  activationFunctions: ['ReLU', 'Sigmoid', 'Tanh', 'ReLU', 'Linear'],
  trainingEpochs: 1000,
  accuracy: 0.94,
  loss: 0.06
};

export const predictionFactors = [
  'Market volatility patterns',
  'Historical platinum performance',
  'Economic indicators',
  'Temporal seasonality',
  'Regulatory changes',
  'Supply chain disruptions',
  'Demand fluctuations',
  'Currency exchange rates'
];

export const deathReasons = [
    'Last employee finally fired for using Comic Sans in presentations',
    'CEO ate the last horse in the office',
    'GDPR fine exceeds market cap by 47,000%',
    'Security audit reveals admin password was "password123"',
    'Final PHP developer defected to a functional programming cult',
    'Customer data found for sale on Craigslist for £3.50',
    'Server room flooded with tears of former employees',
    'Regulatory compliance team consisted of one Magic 8-Ball',
    'Last functional code comment was from 2019',
    'HR department replaced by ChatGPT trained on toxic management practices',
    'PCI DSS auditor died of laughter during inspection',
    'Office rent paid in exposure and good vibes',
    'Critical system backup was stored on a USB stick labeled "NOT PORN"',
    'Last competent employee escaped through the air conditioning vents',
    'Company credit card declined at McDonald\'s',
    'Ed Sheeran personally sued them for £61.5 million',
    'Database corrupted by aggressive pigeon nesting in server rack',
    'Final investor meeting ended with "Have you tried turning it off and leaving it off?"',
    'Legacy codebase achieved sentience and filed for emancipation',
    'Customer support team outsourced to a magic fortune cookie factory',
    'SSL certificate expired in 2017, nobody noticed until now',
    'Company motto changed from "Innovation" to "Please send help"',
    'Last security update was a Windows XP service pack',
    'Office Wi-Fi password was company\'s banking details',
    'Emergency fund consisted of loose change from couch cushions'
  ];

export const processingSteps = [
  'Analyzing temporal patterns...',
  'Processing market indicators...',
  'Calculating probability distributions...',
  'Generating final prediction...',
  'Validating neural network outputs...',
  'Applying ensemble methods...',
  'Cross-validating results...',
  'Finalizing prediction model...'
];

export const generateRandomDate = (): Date => {
  const startDate = new Date('2025-10-01');
  const endDate = new Date('2026-03-31');
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  return new Date(randomTime);
};

export const generateConfidence = (): number => {
  return Math.random() * 20 + 80; // 80-100%
};

export const generateDeathReason = (): string => {
  return deathReasons[Math.floor(Math.random() * deathReasons.length)];
};

export const generatePredictionData = (): PredictionData => {
  return {
    date: generateRandomDate(),
    confidence: generateConfidence(),
    factors: predictionFactors.slice(0, Math.floor(Math.random() * 4) + 4), // 4-7 factors
    modelVersion: `v${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
    deathReason: generateDeathReason()
  };
}; 