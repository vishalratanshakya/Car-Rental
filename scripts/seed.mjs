import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhNz3cG4cq-kqwpEPSicaSkO9paG1DmKo",
  authDomain: "car-rental-beced.firebaseapp.com",
  projectId: "car-rental-beced",
  storageBucket: "car-rental-beced.firebasestorage.app",
  messagingSenderId: "843606573322",
  appId: "1:843606573322:web:0ee8a94b3db562f7273af3",
  measurementId: "G-2ZJLHD701Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const categories = [
  {
    name: 'economy',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=500&h=300&fit=crop',
    ],
    models: ['Toyota Corolla', 'Honda Civic', 'Hyundai Elantra', 'Kia Forte', 'Nissan Sentra', 'Mazda 3', 'Volkswagen Jetta', 'Subaru Impreza', 'Chevrolet Cruze', 'Ford Focus'],
    priceRange: [30, 50],
  },
  {
    name: 'comfort',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&h=300&fit=crop',
    ],
    models: ['Honda Accord', 'Toyota Camry', 'Nissan Altima', 'Hyundai Sonata', 'Kia K5', 'Subaru Legacy', 'Volkswagen Passat', 'Mazda 6', 'Chevrolet Malibu', 'Ford Fusion'],
    priceRange: [50, 80],
  },
  {
    name: 'premium',
    images: [
      'https://images.unsplash.com/photo-1609708536965-e0b9ad0ffd6d?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560958089-b8a63fbf7368?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=500&h=300&fit=crop',
    ],
    models: ['BMW 3 Series', 'Mercedes-Benz C-Class', 'Audi A4', 'Lexus IS', 'Volvo S60', 'Tesla Model 3', 'Genesis G70', 'Alfa Romeo Giulia', 'Acura TLX', 'Infiniti Q50'],
    priceRange: [80, 130],
  },
  {
    name: 'luxury',
    images: [
      'https://images.unsplash.com/photo-1553882900-d5160ca3fe10?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1503376712351-181515b61cd7?w=500&h=300&fit=crop',
    ],
    models: ['Mercedes-Benz S-Class', 'BMW 7 Series', 'Audi A8', 'Porsche Panamera', 'Lexus LS', 'Tesla Model S', 'Maserati Quattroporte', 'Lucid Air', 'Genesis G90', 'Jaguar XJ'],
    priceRange: [150, 300],
  },
  {
    name: 'suv',
    images: [
      'https://images.unsplash.com/photo-1606611013016-969c19d4a42f?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&h=300&fit=crop',
    ],
    models: ['Toyota Highlander', 'Ford Explorer', 'Honda Pilot', 'Kia Telluride', 'Hyundai Palisade', 'Chevrolet Tahoe', 'Jeep Grand Cherokee', 'Subaru Ascent', 'Nissan Pathfinder', 'Volkswagen Atlas'],
    priceRange: [90, 150],
  },
  {
    name: 'bike',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1552084795-9ff0f438a2e5?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1625298912440-664bebf317c9?w=500&h=300&fit=crop',
    ],
    models: ['Royal Enfield Classic 350', 'KTM Duke 390', 'Yamaha R15 V4', 'Honda Activa 6G', 'TVS Apache RTR 160', 'Bajaj Pulsar NS200', 'Suzuki Gixxer SF', 'Kawasaki Ninja 300', 'Husqvarna Svartpilen 250', 'Ather 450X'],
    priceRange: [10, 30],
  }
];

const allVehicles = [];
let idCounter = 1;

for (const cat of categories) {
  for (let i = 0; i < 10; i++) {
    const isElectric = cat.models[i].includes('Tesla') || cat.models[i].includes('Ather') || cat.models[i].includes('Lucid');
    const isHybrid = cat.models[i].includes('Prius');
    const fuelType = isElectric ? 'electric' : (isHybrid ? 'hybrid' : (cat.name === 'bike' ? 'petrol' : 'petrol'));
    
    const v = {
      id: idCounter.toString(),
      name: cat.models[i],
      category: cat.name,
      price: Math.floor(Math.random() * (cat.priceRange[1] - cat.priceRange[0]) + cat.priceRange[0]),
      image: cat.images[i % cat.images.length],
      year: 2022 + Math.floor(Math.random() * 3), // 2022-2024
      transmission: cat.name === 'bike' && !cat.models[i].includes('Activa') && !cat.models[i].includes('Ather') ? 'manual' : 'automatic',
      fuelType: fuelType,
      capacity: cat.name === 'bike' ? 2 : (cat.name === 'suv' ? 7 : 5),
      luggage: cat.name === 'bike' ? 0 : (cat.name === 'suv' ? 6 : (cat.name === 'economy' ? 3 : 4)),
      rating: parseFloat((4 + Math.random()).toFixed(1)),
      reviews: Math.floor(Math.random() * 500) + 10,
      description: `Experience the thrill and comfort of the ${cat.models[i]}. Perfect for your next adventure or city commute.`,
      features: cat.name === 'bike' 
        ? ['ABS', 'Disc Brakes', 'Electric Start', 'Alloy Wheels']
        : ['Air Conditioning', 'Power Steering', 'Bluetooth', 'Backup Camera', 'Cruise Control'],
      available: Math.random() > 0.1, // 90% available
    };
    allVehicles.push(v);
    idCounter++;
  }
}

async function seed() {
  console.log(`Authenticating as seed user...`);
  try {
    await signInWithEmailAndPassword(auth, "seed@vehiclehub.com", "password123");
    console.log("Logged in successfully!");
  } catch (error) {
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      try {
        await createUserWithEmailAndPassword(auth, "seed@vehiclehub.com", "password123");
        console.log("Created and logged into new seed account!");
      } catch (signupError) {
        console.error("Auth failed:", signupError.message);
        process.exit(1);
      }
    } else {
      console.error("Auth failed:", error.message);
      process.exit(1);
    }
  }

  console.log(`Seeding ${allVehicles.length} vehicles to Firestore...`);
  let successCount = 0;
  for (const vehicle of allVehicles) {
    try {
      await setDoc(doc(db, "vehicles", vehicle.id), vehicle);
      successCount++;
    } catch (e) {
      console.error(`Error adding ${vehicle.name}: `, e.message);
    }
  }
  console.log(`Seeding complete! Successfully added ${successCount}/${allVehicles.length} vehicles.`);
  process.exit(0);
}

seed();
