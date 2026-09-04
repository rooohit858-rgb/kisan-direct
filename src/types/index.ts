export type UserRole = "farmer" | "consumer" | "inspector";

export type QualityGrade = "Grade A (Export/Premium)" | "Grade B (Standard Market)" | "Grade C (Processing/Industrial)";

export type CropCategory = "Fruits" | "Vegetables" | "Grains" | "Pulses" | "Spices" | "Organic";

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  kisanCardId: string;
  village: string;
  district: string;
  state: string;
  rating: number;
  totalSoldQuintals: number;
  joinedYear: number;
  avatar: string;
  isKisanCreditVerified: boolean;
  isJaivikBharatCertified: boolean;
  isGiTagged: boolean;
}

export interface CropListing {
  id: string;
  title: string;
  cropName: string;
  variety: string;
  category: CropCategory;
  description: string;
  image: string;
  farmer: FarmerProfile;
  harvestDate: string;
  shelfLifeDays: number;
  quantity: number;
  minOrderQuantity: number;
  unit: "kg" | "quintal" | "crate" | "dozen";
  directPricePerUnit: number;
  apmcBenchmarkPrice: number;
  retailSupermarketPrice: number;
  aiRecommendedPrice: number;
  qualityGrade: QualityGrade;
  moisturePercent: number;
  pesticideResidueSafe: boolean;
  coldStorageRequired: boolean;
  activeBidsCount: number;
  highestBid?: number;
  inEscrowOrdersCount: number;
  distanceKm: number;
  isOrganic: boolean;
  giTagTitle?: string;
  transparencyBreakdown: {
    farmerSharePercent: number;
    logisticsSharePercent: number;
    platformSharePercent: number;
    middlemenPercent: number;
  };
}

export interface BuyerBid {
  id: string;
  listingId: string;
  cropTitle: string;
  buyerName: string;
  buyerType: "Restaurant / Cloud Kitchen" | "Retail Chain / Supermarket" | "Institutional Bulk" | "Consumer Co-op";
  offeredPricePerUnit: number;
  requestedQuantity: number;
  unit: string;
  totalAmount: number;
  status: "pending" | "accepted" | "countered" | "declined";
  createdAt: string;
  paymentMode: "Full Escrow Locked" | "Bank Guarantee" | "UPI Instant";
  notes?: string;
}

export interface ColdStorageVehicle {
  id: string;
  name: string;
  model: string;
  capacityKg: number;
  tempRange: string;
  ratePerKm: number;
  rating: number;
  driverName: string;
  vehicleNumber: string;
  image: string;
  isAvailable: boolean;
  currentLocation: string;
}

export interface EscrowMilestone {
  step: number;
  title: string;
  description: string;
  completed: boolean;
  timestamp?: string;
  iconName: string;
}

export interface EscrowOrder {
  id: string;
  orderNumber: string;
  listingId: string;
  cropTitle: string;
  cropImage: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalAmount: number;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  farmerUpi: string;
  buyerName: string;
  buyerType: string;
  buyerPhone: string;
  buyerAddress: string;
  orderDate: string;
  currentStep: number;
  escrowStatus: "Funds Held in Escrow" | "Quality Inspected" | "In Cold Transit" | "Delivered & Released" | "Disputed";
  milestones: EscrowMilestone[];
  qualityAssay: {
    inspectorName: string;
    inspectorBadge: string;
    moisturePercent: number;
    gradeCertified: string;
    chemicalResiduePpm: number;
    passedDate: string;
  };
  logistics: {
    vehicleName: string;
    vehicleNo: string;
    driverPhone: string;
    currentTempCelsius: number;
    optimalTempCelsius: number;
    gpsCoordinates: string;
    estimatedArrival: string;
  };
  deliveryOtp: string;
  isFundsReleased: boolean;
  payoutTxnId?: string;
  transparencyScorecard: {
    farmerAmount: number;
    logisticsAmount: number;
    platformAmount: number;
    middlemanCost: number;
  };
}

export interface MandiRateBenchmark {
  id: string;
  commodity: string;
  variety: string;
  mandiName: string;
  district: string;
  state: string;
  apmcModalPrice: number;
  kisanDirectPrice: number;
  retailPrice: number;
  mspPrice: number;
  unit: string;
  priceTrend: "up" | "down" | "stable";
  trendPercent: number;
  lastUpdated: string;
}

export interface PriceForecastPoint {
  month: string;
  supermarketRetail: number;
  govtMsp: number;
  apmcMandi: number;
  kisanDirectFair: number;
}
