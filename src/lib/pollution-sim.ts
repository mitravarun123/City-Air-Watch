export type SourceMix = {
  traffic: number;
  industrial: number;
  residential: number;
  natural: number;
};

export type Station = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  zoneType: "traffic" | "industrial" | "residential" | "mixed";
  baseline: number;
  sources: SourceMix;
};

export type Reading = { t: number; pm25: number };

export type IndiaCity = {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  zoom: number;
};

// Flat list of popular Indian cities (5 per state). Alphabetical by name.
// State is stored for reference only — the UI shows just the city name.
export const INDIA_CITIES: IndiaCity[] = [
  { id: "agartala", name: "Agartala", state: "Tripura", lat: 23.8315, lng: 91.2868, zoom: 12 },
  { id: "agra", name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081, zoom: 12 },
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, zoom: 11 },
  { id: "aizawl", name: "Aizawl", state: "Mizoram", lat: 23.7271, lng: 92.7176, zoom: 12 },
  { id: "ajmer", name: "Ajmer", state: "Rajasthan", lat: 26.4499, lng: 74.6399, zoom: 12 },
  { id: "amaravati", name: "Amaravati", state: "Andhra Pradesh", lat: 16.5062, lng: 80.6480, zoom: 12 },
  { id: "amritsar", name: "Amritsar", state: "Punjab", lat: 31.6340, lng: 74.8723, zoom: 12 },
  { id: "asansol", name: "Asansol", state: "West Bengal", lat: 23.6739, lng: 86.9524, zoom: 12 },
  { id: "aurangabad", name: "Aurangabad", state: "Maharashtra", lat: 19.8762, lng: 75.3433, zoom: 12 },
  { id: "bathinda", name: "Bathinda", state: "Punjab", lat: 30.2110, lng: 74.9455, zoom: 12 },
  { id: "belagavi", name: "Belagavi", state: "Karnataka", lat: 15.8497, lng: 74.4977, zoom: 12 },
  { id: "bengaluru", name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, zoom: 11 },
  { id: "bhavnagar", name: "Bhavnagar", state: "Gujarat", lat: 21.7645, lng: 72.1519, zoom: 12 },
  { id: "bhopal", name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, zoom: 11 },
  { id: "bhubaneswar", name: "Bhubaneswar", state: "Odisha", lat: 20.2961, lng: 85.8245, zoom: 12 },
  { id: "bilaspur", name: "Bilaspur", state: "Chhattisgarh", lat: 22.0797, lng: 82.1409, zoom: 12 },
  { id: "chandigarh", name: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794, zoom: 12 },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, zoom: 11 },
  { id: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558, zoom: 12 },
  { id: "cuttack", name: "Cuttack", state: "Odisha", lat: 20.4625, lng: 85.8828, zoom: 12 },
  { id: "davangere", name: "Davangere", state: "Karnataka", lat: 14.4644, lng: 75.9218, zoom: 12 },
  { id: "dehradun", name: "Dehradun", state: "Uttarakhand", lat: 30.3165, lng: 78.0322, zoom: 12 },
  { id: "delhi", name: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.2090, zoom: 11 },
  { id: "dhanbad", name: "Dhanbad", state: "Jharkhand", lat: 23.7957, lng: 86.4304, zoom: 12 },
  { id: "dimapur", name: "Dimapur", state: "Nagaland", lat: 25.9091, lng: 93.7266, zoom: 12 },
  { id: "dispur", name: "Dispur", state: "Assam", lat: 26.1433, lng: 91.7898, zoom: 12 },
  { id: "durgapur", name: "Durgapur", state: "West Bengal", lat: 23.5204, lng: 87.3119, zoom: 12 },
  { id: "faridabad", name: "Faridabad", state: "Haryana", lat: 28.4089, lng: 77.3178, zoom: 12 },
  { id: "gandhinagar", name: "Gandhinagar", state: "Gujarat", lat: 23.2156, lng: 72.6369, zoom: 12 },
  { id: "gangtok", name: "Gangtok", state: "Sikkim", lat: 27.3389, lng: 88.6065, zoom: 12 },
  { id: "ghaziabad", name: "Ghaziabad", state: "Uttar Pradesh", lat: 28.6692, lng: 77.4538, zoom: 12 },
  { id: "guntur", name: "Guntur", state: "Andhra Pradesh", lat: 16.3067, lng: 80.4365, zoom: 12 },
  { id: "gurugram", name: "Gurugram", state: "Haryana", lat: 28.4595, lng: 77.0266, zoom: 12 },
  { id: "guwahati", name: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, zoom: 12 },
  { id: "gwalior", name: "Gwalior", state: "Madhya Pradesh", lat: 26.2183, lng: 78.1828, zoom: 12 },
  { id: "haridwar", name: "Haridwar", state: "Uttarakhand", lat: 29.9457, lng: 78.1642, zoom: 12 },
  { id: "hisar", name: "Hisar", state: "Haryana", lat: 29.1492, lng: 75.7217, zoom: 12 },
  { id: "howrah", name: "Howrah", state: "West Bengal", lat: 22.5958, lng: 88.2636, zoom: 12 },
  { id: "hubballi", name: "Hubballi", state: "Karnataka", lat: 15.3647, lng: 75.1240, zoom: 12 },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867, zoom: 11 },
  { id: "imphal", name: "Imphal", state: "Manipur", lat: 24.8170, lng: 93.9368, zoom: 12 },
  { id: "indore", name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, zoom: 12 },
  { id: "itanagar", name: "Itanagar", state: "Arunachal Pradesh", lat: 27.0844, lng: 93.6053, zoom: 12 },
  { id: "jabalpur", name: "Jabalpur", state: "Madhya Pradesh", lat: 23.1815, lng: 79.9864, zoom: 12 },
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, zoom: 11 },
  { id: "jalandhar", name: "Jalandhar", state: "Punjab", lat: 31.3260, lng: 75.5762, zoom: 12 },
  { id: "jammu", name: "Jammu", state: "Jammu & Kashmir", lat: 32.7266, lng: 74.8570, zoom: 12 },
  { id: "jamshedpur", name: "Jamshedpur", state: "Jharkhand", lat: 22.8046, lng: 86.2029, zoom: 12 },
  { id: "jodhpur", name: "Jodhpur", state: "Rajasthan", lat: 26.2389, lng: 73.0243, zoom: 12 },
  { id: "kakinada", name: "Kakinada", state: "Andhra Pradesh", lat: 16.9891, lng: 82.2475, zoom: 12 },
  { id: "kanpur", name: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lng: 80.3319, zoom: 12 },
  { id: "karimnagar", name: "Karimnagar", state: "Telangana", lat: 18.4386, lng: 79.1288, zoom: 12 },
  { id: "khammam", name: "Khammam", state: "Telangana", lat: 17.2473, lng: 80.1514, zoom: 12 },
  { id: "kochi", name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, zoom: 12 },
  { id: "kohima", name: "Kohima", state: "Nagaland", lat: 25.6701, lng: 94.1077, zoom: 12 },
  { id: "kolkata", name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, zoom: 11 },
  { id: "kollam", name: "Kollam", state: "Kerala", lat: 8.8932, lng: 76.6141, zoom: 12 },
  { id: "kota", name: "Kota", state: "Rajasthan", lat: 25.2138, lng: 75.8648, zoom: 12 },
  { id: "kozhikode", name: "Kozhikode", state: "Kerala", lat: 11.2588, lng: 75.7804, zoom: 12 },
  { id: "lucknow", name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, zoom: 12 },
  { id: "ludhiana", name: "Ludhiana", state: "Punjab", lat: 30.9010, lng: 75.8573, zoom: 12 },
  { id: "madurai", name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198, zoom: 12 },
  { id: "mangaluru", name: "Mangaluru", state: "Karnataka", lat: 12.9141, lng: 74.8560, zoom: 12 },
  { id: "meerut", name: "Meerut", state: "Uttar Pradesh", lat: 28.9845, lng: 77.7064, zoom: 12 },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, zoom: 11 },
  { id: "mysuru", name: "Mysuru", state: "Karnataka", lat: 12.2958, lng: 76.6394, zoom: 12 },
  { id: "nagpur", name: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882, zoom: 12 },
  { id: "nashik", name: "Nashik", state: "Maharashtra", lat: 19.9975, lng: 73.7898, zoom: 12 },
  { id: "nellore", name: "Nellore", state: "Andhra Pradesh", lat: 14.4426, lng: 79.9865, zoom: 12 },
  { id: "nizamabad", name: "Nizamabad", state: "Telangana", lat: 18.6725, lng: 78.0941, zoom: 12 },
  { id: "noida", name: "Noida", state: "Uttar Pradesh", lat: 28.5355, lng: 77.3910, zoom: 12 },
  { id: "panaji", name: "Panaji", state: "Goa", lat: 15.4909, lng: 73.8278, zoom: 12 },
  { id: "patiala", name: "Patiala", state: "Punjab", lat: 30.3398, lng: 76.3869, zoom: 12 },
  { id: "patna", name: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, zoom: 12 },
  { id: "portblair", name: "Port Blair", state: "Andaman & Nicobar", lat: 11.6234, lng: 92.7265, zoom: 12 },
  { id: "prayagraj", name: "Prayagraj", state: "Uttar Pradesh", lat: 25.4358, lng: 81.8463, zoom: 12 },
  { id: "puducherry", name: "Puducherry", state: "Puducherry", lat: 11.9416, lng: 79.8083, zoom: 12 },
  { id: "pune", name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, zoom: 11 },
  { id: "raipur", name: "Raipur", state: "Chhattisgarh", lat: 21.2514, lng: 81.6296, zoom: 12 },
  { id: "rajkot", name: "Rajkot", state: "Gujarat", lat: 22.3039, lng: 70.8022, zoom: 12 },
  { id: "ranchi", name: "Ranchi", state: "Jharkhand", lat: 23.3441, lng: 85.3096, zoom: 12 },
  { id: "rourkela", name: "Rourkela", state: "Odisha", lat: 22.2604, lng: 84.8536, zoom: 12 },
  { id: "salem", name: "Salem", state: "Tamil Nadu", lat: 11.6643, lng: 78.1460, zoom: 12 },
  { id: "sambalpur", name: "Sambalpur", state: "Odisha", lat: 21.4669, lng: 83.9812, zoom: 12 },
  { id: "shillong", name: "Shillong", state: "Meghalaya", lat: 25.5788, lng: 91.8933, zoom: 12 },
  { id: "shimla", name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734, zoom: 12 },
  { id: "siliguri", name: "Siliguri", state: "West Bengal", lat: 26.7271, lng: 88.3953, zoom: 12 },
  { id: "silvassa", name: "Silvassa", state: "Dadra & Nagar Haveli", lat: 20.2738, lng: 73.0140, zoom: 12 },
  { id: "srinagar", name: "Srinagar", state: "Jammu & Kashmir", lat: 34.0837, lng: 74.7973, zoom: 12 },
  { id: "surat", name: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311, zoom: 12 },
  { id: "thane", name: "Thane", state: "Maharashtra", lat: 19.2183, lng: 72.9781, zoom: 12 },
  { id: "thiruvananthapuram", name: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366, zoom: 12 },
  { id: "thrissur", name: "Thrissur", state: "Kerala", lat: 10.5276, lng: 76.2144, zoom: 12 },
  { id: "tiruchirappalli", name: "Tiruchirappalli", state: "Tamil Nadu", lat: 10.7905, lng: 78.7047, zoom: 12 },
  { id: "tirunelveli", name: "Tirunelveli", state: "Tamil Nadu", lat: 8.7139, lng: 77.7567, zoom: 12 },
  { id: "tirupati", name: "Tirupati", state: "Andhra Pradesh", lat: 13.6288, lng: 79.4192, zoom: 12 },
  { id: "udaipur", name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, zoom: 12 },
  { id: "ujjain", name: "Ujjain", state: "Madhya Pradesh", lat: 23.1765, lng: 75.7885, zoom: 12 },
  { id: "vadodara", name: "Vadodara", state: "Gujarat", lat: 22.3072, lng: 73.1812, zoom: 12 },
  { id: "varanasi", name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, zoom: 12 },
  { id: "vijayawada", name: "Vijayawada", state: "Andhra Pradesh", lat: 16.5062, lng: 80.6480, zoom: 12 },
  { id: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185, zoom: 11 },
  { id: "warangal", name: "Warangal", state: "Telangana", lat: 17.9689, lng: 79.5941, zoom: 12 },
];

// Heuristic: infer source mix from station name keywords.
export function inferSources(name: string): { sources: SourceMix; zoneType: Station["zoneType"] } {
  const n = name.toLowerCase();
  if (/industrial|factory|refinery|airport|port|plant/.test(n)) {
    return {
      sources: { traffic: 22, industrial: 55, residential: 13, natural: 10 },
      zoneType: "industrial",
    };
  }
  if (/road|junction|chowk|highway|cross|signal|circle|square|station|terminus|metro/.test(n)) {
    return {
      sources: { traffic: 55, industrial: 15, residential: 20, natural: 10 },
      zoneType: "traffic",
    };
  }
  if (/park|garden|forest|lake|river|hill|reserve|sanctuary/.test(n)) {
    return {
      sources: { traffic: 18, industrial: 8, residential: 30, natural: 44 },
      zoneType: "residential",
    };
  }
  if (/colony|nagar|vihar|residential|sector|housing|society|enclave/.test(n)) {
    return {
      sources: { traffic: 28, industrial: 12, residential: 48, natural: 12 },
      zoneType: "residential",
    };
  }
  return {
    sources: { traffic: 35, industrial: 22, residential: 30, natural: 13 },
    zoneType: "mixed",
  };
}

// Daily curve used only as a fallback simulator (no live data).
function dailyFactor(hourOfDay: number): number {
  const morning = Math.exp(-Math.pow((hourOfDay - 8) / 2.2, 2));
  const evening = Math.exp(-Math.pow((hourOfDay - 19) / 2.6, 2));
  return 1 + 0.45 * (morning + evening);
}

export function generateHistory(station: Station, hours = 24, nowMs = Date.now()): Reading[] {
  const readings: Reading[] = [];
  let prev = station.baseline;
  for (let i = hours; i >= 0; i--) {
    const t = nowMs - i * 60 * 60 * 1000;
    const hod = new Date(t).getHours();
    const target = station.baseline * dailyFactor(hod);
    prev = prev + (target - prev) * 0.35 + (Math.random() - 0.5) * 12;
    prev = Math.max(8, Math.min(380, prev));
    readings.push({ t, pm25: Math.round(prev) });
  }
  return readings;
}

export function nextTick(prev: number, station: Station, nowMs = Date.now()): number {
  const hod = new Date(nowMs).getHours();
  const target = station.baseline * dailyFactor(hod);
  const next = prev + (target - prev) * 0.18 + (Math.random() - 0.5) * 8;
  return Math.max(8, Math.min(380, Math.round(next)));
}

export type AqiCategory = {
  label: string;
  color: string;
  tone: "good" | "moderate" | "unhealthy" | "very-unhealthy" | "hazardous";
};

export function pmToCategory(pm: number): AqiCategory {
  if (pm <= 30) return { label: "Good", color: "#22c55e", tone: "good" };
  if (pm <= 60) return { label: "Moderate", color: "#eab308", tone: "moderate" };
  if (pm <= 120) return { label: "Unhealthy", color: "#f97316", tone: "unhealthy" };
  if (pm <= 200) return { label: "Very Unhealthy", color: "#ef4444", tone: "very-unhealthy" };
  return { label: "Hazardous", color: "#7f1d1d", tone: "hazardous" };
}

export function pmToAqi(pm: number): number {
  const bp: [number, number, number, number][] = [
    [0, 12, 0, 50],
    [12.1, 35.4, 51, 100],
    [35.5, 55.4, 101, 150],
    [55.5, 150.4, 151, 200],
    [150.5, 250.4, 201, 300],
    [250.5, 500.4, 301, 500],
  ];
  for (const [cl, ch, il, ih] of bp) {
    if (pm >= cl && pm <= ch) return Math.round(((ih - il) / (ch - cl)) * (pm - cl) + il);
  }
  return 500;
}
