I'll fix the issue so that when users click "Buy Now", "Subscribe Now", "Apply Now", or "Buy Ticket", the page automatically scrolls down to the payment section. Here's the updated code:

```jsx
import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('ecocash');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [educationTab, setEducationTab] = useState('Primary Schools');
  const [fibreCountry, setFibreCountry] = useState('All');
  const [mobileCountry, setMobileCountry] = useState('All');
  const [govCategory, setGovCategory] = useState('All');
  const [selectedProductCategory, setSelectedProductCategory] = useState('All');
  const [selectedUtility, setSelectedUtility] = useState(null);
  const [selectedGovService, setSelectedGovService] = useState(null);
  const [showEmailReceipt, setShowEmailReceipt] = useState(false);
  const [receiptEmail, setReceiptEmail] = useState('');
  const [receiptRecipient, setReceiptRecipient] = useState('');
  const [receiptMessage, setReceiptMessage] = useState('');
  const [remindMe, setRemindMe] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [userBalance, setUserBalance] = useState(250.00);
  const [currency, setCurrency] = useState('USD');
  const [educationCountry, setEducationCountry] = useState('Zimbabwe');
  const [mobileForm, setMobileForm] = useState({ number: '', network: '' });
  const [fibreForm, setFibreForm] = useState({ address: '', contact: '' });
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [showFibreForm, setShowFibreForm] = useState(false);
  const [selectedMobilePackage, setSelectedMobilePackage] = useState(null);
  const [selectedFibrePackage, setSelectedFibrePackage] = useState(null);
  const [selectedUtilityPackage, setSelectedUtilityPackage] = useState(null);
  const [paymentSectionRef, setPaymentSectionRef] = useState(null);

  // Currency conversion rates
  const currencyRates = {
    USD: 1,
    ZWL: 361.9,
    ZAR: 18.45,
    KES: 132.5,
    NGN: 1530.5,
    GHS: 15.2,
    TZS: 2520.0
  };

  // Currency symbols
  const currencySymbols = {
    USD: '$',
    ZWL: 'ZWL$',
    ZAR: 'R',
    KES: 'KSh',
    NGN: '₦',
    GHS: '₵',
    TZS: 'TSh'
  };

  // Countries for education (removed Malawi)
  const educationCountries = [
    { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
    { code: 'ZM', name: 'Zambia', flag: '🇿🇲' }
  ];

  // Data
  const mobilePackages = [
    // Zimbabwe
    { id: 1, network: 'Econet', country: 'Zimbabwe', name: 'Daily 1GB', price: 2.50, validity: '24 hours', type: 'data', category: 'daily' },
    { id: 2, network: 'NetOne', country: 'Zimbabwe', name: 'Weekly 3GB', price: 8.00, validity: '7 days', type: 'data', category: 'weekly' },
    { id: 3, network: 'Telecel', country: 'Zimbabwe', name: 'Monthly 10GB', price: 25.00, validity: '30 days', type: 'data', category: 'monthly' },
    { id: 4, network: 'Econet', country: 'Zimbabwe', name: 'Airtime $5', price: 5.00, validity: 'Unlimited', type: 'airtime', category: 'airtime' },
    { id: 5, network: 'NetOne', country: 'Zimbabwe', name: 'Family Bundle 20GB', price: 45.00, validity: '30 days', type: 'data', category: 'family' },
    { id: 6, network: 'Cell C', country: 'Zimbabwe', name: 'Regional 5GB', price: 15.00, validity: '7 days', type: 'data', category: 'regional' },
    { id: 7, network: 'MTN', country: 'Zimbabwe', name: 'Regional 5GB', price: 12.00, validity: '7 days', type: 'data', category: 'regional' },
    { id: 8, network: 'Access Telecom', country: 'Zimbabwe', name: 'Internet Bundle 5GB', price: 30.00, validity: '30 days', type: 'data', category: 'internet' },
    { id: 9, network: 'Liquid Telecom', country: 'Zimbabwe', name: 'Internet Bundle 10GB', price: 50.00, validity: '30 days', type: 'data', category: 'internet' },
    
    // South Africa
    { id: 10, network: 'MTN SA', country: 'South Africa', name: 'Daily 1GB', price: 1.80, validity: '24 hours', type: 'data', category: 'daily' },
    { id: 11, network: 'Vodacom', country: 'South Africa', name: 'Weekly 5GB', price: 6.50, validity: '7 days', type: 'data', category: 'weekly' },
    { id: 12, network: 'Cell C', country: 'South Africa', name: 'Monthly 15GB', price: 18.00, validity: '30 days', type: 'data', category: 'monthly' },
    { id: 13, network: 'MTN SA', country: 'South Africa', name: 'Airtime R100', price: 6.50, validity: 'Unlimited', type: 'airtime', category: 'airtime' },
    
    // Zambia
    { id: 14, network: 'Airtel ZM', country: 'Zambia', name: 'Daily 750MB', price: 2.20, validity: '24 hours', type: 'data', category: 'daily' },
    { id: 15, network: 'MTN Zambia', country: 'Zambia', name: 'Weekly 3GB', price: 7.00, validity: '7 days', type: 'data', category: 'weekly' },
    { id: 16, network: 'Airtel ZM', country: 'Zambia', name: 'Monthly 12GB', price: 22.00, validity: '30 days', type: 'data', category: 'monthly' },
    { id: 17, network: 'MTN Zambia', country: 'Zambia', name: 'Airtime ZMW20', price: 1.80, validity: 'Unlimited', type: 'airtime', category: 'airtime' },
    
    // Kenya
    { id: 21, network: 'Safaricom', country: 'Kenya', name: 'Daily 1GB', price: 2.00, validity: '24 hours', type: 'data', category: 'daily' },
    { id: 22, network: 'Airtel KE', country: 'Kenya', name: 'Weekly 4GB', price: 7.50, validity: '7 days', type: 'data', category: 'weekly' },
    { id: 23, network: 'Safaricom', country: 'Kenya', name: 'Monthly 10GB', price: 20.00, validity: '30 days', type: 'data', category: 'monthly' },
    
    // Nigeria
    { id: 24, network: 'MTN NG', country: 'Nigeria', name: 'Daily 1.5GB', price: 1.80, validity: '24 hours', type: 'data', category: 'daily' },
    { id: 25, network: 'Airtel NG', country: 'Nigeria', name: 'Weekly 3.5GB', price: 6.20, validity: '7 days', type: 'data', category: 'weekly' },
    { id: 26, network: 'Glo', country: 'Nigeria', name: 'Monthly 12GB', price: 18.00, validity: '30 days', type: 'data', category: 'monthly' },
    
    // Ghana
    { id: 27, network: 'MTN GH', country: 'Ghana', name: 'Daily 1GB', price: 2.20, validity: '24 hours', type: 'data', category: 'daily' },
    { id: 28, network: 'AirtelTigo', country: 'Ghana', name: 'Weekly 3GB', price: 6.80, validity: '7 days', type: 'data', category: 'weekly' },
    
    // Tanzania
    { id: 29, network: 'Vodacom TZ', country: 'Tanzania', name: 'Daily 750MB', price: 1.90, validity: '24 hours', type: 'data', category: 'daily' },
    { id: 30, network: 'Airtel TZ', country: 'Tanzania', name: 'Weekly 2.5GB', price: 6.00, validity: '7 days', type: 'data', category: 'weekly' },
    
    // Uganda
    { id: 31, network: 'MTN UG', country: 'Uganda', name: 'Daily 1GB', price: 1.70, validity: '24 hours', type: 'data', category: 'daily' },
    { id: 32, network: 'Airtel UG', country: 'Uganda', name: 'Weekly 3GB', price: 5.50, validity: '7 days', type: 'data', category: 'weekly' },
    
    // Mozambique
    { id: 33, network: 'Vodacom MZ', country: 'Mozambique', name: 'Daily 500MB', price: 1.60, validity: '24 hours', type: 'data', category: 'daily' },
    { id: 34, network: 'Movicel', country: 'Mozambique', name: 'Weekly 2GB', price: 5.20, validity: '7 days', type: 'data', category: 'weekly' },
    
    // Botswana
    { id: 35, network: 'Mascom', country: 'Botswana', name: 'Daily 750MB', price: 2.00, validity: '24 hours', type: 'data', category: 'daily' },
    { id: 36, network: 'Orange BW', country: 'Botswana', name: 'Weekly 3GB', price: 6.80, validity: '7 days', type: 'data', category: 'weekly' },
    
    // Namibia
    { id: 37, network: 'MTC', country: 'Namibia', name: 'Daily 1GB', price: 2.10, validity: '24 hours', type: 'data', category: 'daily' },
    { id: 38, network: 'Telecom', country: 'Namibia', name: 'Weekly 4GB', price: 7.20, validity: '7 days', type: 'data', category: 'weekly' },
    
    // Angola
    { id: 39, network: 'Unitel', country: 'Angola', name: 'Daily 600MB', price: 1.90, validity: '24 hours', type: 'data', category: 'daily' },
    { id: 40, network: 'Movicel', country: 'Angola', name: 'Weekly 2.8GB', price: 5.80, validity: '7 days', type: 'data', category: 'weekly' },
    
    // Rwanda
    { id: 41, network: 'MTN RW', country: 'Rwanda', name: 'Daily 800MB', price: 2.10, validity: '24 hours', type: 'data', category: 'daily' },
    { id: 42, network: 'Airtel RW', country: 'Rwanda', name: 'Weekly 3.2GB', price: 6.20, validity: '7 days', type: 'data', category: 'weekly' },
  ];

  const fibreProviders = [
    // Zimbabwe
    { id: 1, name: 'ZOL Fibre', country: 'Zimbabwe', speed: '50Mbps', price: 120, location: 'Harare, Bulawayo, Mutare', contract: '12 months', installation: '$50' },
    { id: 2, name: 'Liquid Fibre', country: 'Zimbabwe', speed: '100Mbps', price: 180, location: 'Harare, Bulawayo', contract: 'No contract', installation: 'Free' },
    { id: 3, name: 'Access Telecom', country: 'Zimbabwe', speed: '30Mbps', price: 90, location: 'Major cities', contract: '6 months', installation: '$30' },
    { id: 4, name: 'SkyFibre', country: 'Zimbabwe', speed: '20Mbps', price: 75, location: 'Urban areas', contract: '12 months', installation: '$40' },
    { id: 5, name: 'Starlink Zimbabwe', country: 'Zimbabwe', speed: '50-150Mbps', price: 250, location: 'Nationwide', contract: 'Month-to-month', installation: '$400' },
    
    // South Africa
    { id: 6, name: 'Afrihost Fibre', country: 'South Africa', speed: '100Mbps', price: 45, location: 'Major cities', contract: '12 months', installation: 'Free' },
    { id: 7, name: 'Vodacom Fibre', country: 'South Africa', speed: '100Mbps', price: 50, location: 'Major cities', contract: '24 months', installation: '$50' },
    { id: 8, name: 'MTN Fibre', country: 'South Africa', speed: '100Mbps', price: 48, location: 'Major cities', contract: '12 months', installation: 'Free' },
    { id: 9, name: 'Starlink South Africa', country: 'South Africa', speed: '50-150Mbps', price: 280, location: 'Nationwide', contract: 'Month-to-month', installation: '$450' },
    
    // Kenya
    { id: 10, name: 'Zuku Fibre', country: 'Kenya', speed: '50Mbps', price: 40, location: 'Nairobi, Mombasa', contract: '12 months', installation: '$60' },
    { id: 11, name: 'Safaricom Fibre', country: 'Kenya', speed: '100Mbps', price: 55, location: 'Nairobi, Mombasa', contract: '12 months', installation: 'Free' },
    { id: 12, name: 'Starlink Kenya', country: 'Kenya', speed: '50-150Mbps', price: 260, location: 'Nationwide', contract: 'Month-to-month', installation: '$420' },
    
    // Nigeria
    { id: 13, name: 'Spectranet', country: 'Nigeria', speed: '40Mbps', price: 35, location: 'Lagos, Abuja', contract: '6 months', installation: '$70' },
    { id: 14, name: 'Smile Communications', country: 'Nigeria', speed: '30Mbps', price: 30, location: 'Lagos, Abuja', contract: '12 months', installation: '$50' },
    { id: 15, name: 'Starlink Nigeria', country: 'Nigeria', speed: '50-150Mbps', price: 300, location: 'Nationwide', contract: 'Month-to-month', installation: '$500' },
    
    // Ghana
    { id: 16, name: 'Surfline', country: 'Ghana', speed: '40Mbps', price: 42, location: 'Accra, Kumasi', contract: '12 months', installation: '$65' },
    { id: 17, name: 'Vodafone Ghana Fibre', country: 'Ghana', speed: '50Mbps', price: 48, location: 'Accra, Kumasi', contract: '12 months', installation: 'Free' },
    { id: 18, name: 'Starlink Ghana', country: 'Ghana', speed: '50-150Mbps', price: 270, location: 'Nationwide', contract: 'Month-to-month', installation: '$430' },
    
    // Uganda
    { id: 19, name: 'Roke Telkom', country: 'Uganda', speed: '40Mbps', price: 38, location: 'Kampala', contract: '12 months', installation: '$55' },
    { id: 20, name: 'Starlink Uganda', country: 'Uganda', speed: '50-150Mbps', price: 265, location: 'Nationwide', contract: 'Month-to-month', installation: '$425' },
    
    // Tanzania
    { id: 21, name: 'TCCIA Fibre', country: 'Tanzania', speed: '50Mbps', price: 45, location: 'Dar es Salaam', contract: '12 months', installation: '$60' },
    { id: 22, name: 'Starlink Tanzania', country: 'Tanzania', speed: '50-150Mbps', price: 275, location: 'Nationwide', contract: 'Month-to-month', installation: '$435' },
    
    // Zambia
    { id: 23, name: 'Zamtel Fibre', country: 'Zambia', speed: '40Mbps', price: 40, location: 'Lusaka, Ndola', contract: '12 months', installation: '$50' },
    { id: 24, name: 'Starlink Zambia', country: 'Zambia', speed: '50-150Mbps', price: 260, location: 'Nationwide', contract: 'Month-to-month', installation: '$420' },
    
    // Botswana
    { id: 27, name: 'Orange Botswana Fibre', country: 'Botswana', speed: '50Mbps', price: 50, location: 'Gaborone', contract: '12 months', installation: '$70' },
    { id: 28, name: 'Starlink Botswana', country: 'Botswana', speed: '50-150Mbps', price: 285, location: 'Nationwide', contract: 'Month-to-month', installation: '$445' },
    
    // Namibia
    { id: 29, name: 'MTC Fibre', country: 'Namibia', speed: '50Mbps', price: 55, location: 'Windhoek', contract: '12 months', installation: '$75' },
    { id: 30, name: 'Starlink Namibia', country: 'Namibia', speed: '50-150Mbps', price: 290, location: 'Nationwide', contract: 'Month-to-month', installation: '$450' },
    
    // Rwanda
    { id: 31, name: 'Rwandatel Fibre', country: 'Rwanda', speed: '40Mbps', price: 42, location: 'Kigali', contract: '12 months', installation: '$60' },
    { id: 32, name: 'Starlink Rwanda', country: 'Rwanda', speed: '50-150Mbps', price: 270, location: 'Nationwide', contract: 'Month-to-month', installation: '$430' },
  ];

  const utilities = [
    // ZESA Electricity
    { id: 1, name: 'ZESA Electricity', type: 'electricity', logo: '⚡', min: 10, max: 500 },
    { id: 2, name: 'ZESA Prepaid', type: 'electricity', logo: '⚡', min: 10, max: 500 },
    { id: 3, name: 'ZESA Commercial', type: 'electricity', logo: '⚡', min: 50, max: 1000 },
    
    // Water
    { id: 4, name: 'Harare Water', type: 'water', logo: '💧', min: 5, max: 200 },
    { id: 5, name: 'Bulawayo Water', type: 'water', logo: '💧', min: 5, max: 200 },
    { id: 6, name: 'Chitungwiza Water', type: 'water', logo: '💧', min: 5, max: 200 },
    { id: 7, name: 'Mutare Water', type: 'water', logo: '💧', min: 5, max: 200 },
    { id: 8, name: 'Kwekwe Water', type: 'water', logo: '💧', min: 5, max: 200 },
    { id: 9, name: 'Gweru Water', type: 'water', logo: '💧', min: 5, max: 200 },
    { id: 10, name: 'Masvingo Water', type: 'water', logo: '💧', min: 5, max: 200 },
    
    // Municipal Councils
    { id: 11, name: 'Harare City Council', type: 'rates', logo: '🏛️', min: 20, max: 1000 },
    { id: 12, name: 'Bulawayo City Council', type: 'rates', logo: '🏛️', min: 20, max: 1000 },
    { id: 13, name: 'Chitungwiza Municipality', type: 'rates', logo: '🏙️', min: 15, max: 800 },
    { id: 14, name: 'Epworth Municipality', type: 'rates', logo: '🏙️', min: 15, max: 800 },
    { id: 15, name: 'Mutare City Council', type: 'rates', logo: '🏛️', min: 20, max: 1000 },
    { id: 16, name: 'Kwekwe City Council', type: 'rates', logo: '🏛️', min: 20, max: 1000 },
    { id: 17, name: 'Gweru City Council', type: 'rates', logo: '🏛️', min: 20, max: 1000 },
    { id: 18, name: 'Masvingo City Council', type: 'rates', logo: '🏛️', min: 20, max: 1000 },
    { id: 19, name: 'Bindura Town Council', type: 'rates', logo: '🏛️', min: 15, max: 500 },
    { id: 20, name: 'Marondera Town Council', type: 'rates', logo: '🏛️', min: 15, max: 500 },
    { id: 21, name: 'Chinhoyi Town Council', type: 'rates', logo: '🏛️', min: 15, max: 500 },
    
    // Other Utilities
    { id: 22, name: 'TelOne Landline', type: 'telephone', logo: '📞', min: 20, max: 500 },
    { id: 23, name: 'TelOne Internet', type: 'internet', logo: '🌐', min: 50, max: 300 },
    { id: 24, name: 'ZOL Internet', type: 'internet', logo: '🌐', min: 75, max: 400 },
    { id: 25, name: 'Liquid Telecom', type: 'internet', logo: '🌐', min: 80, max: 450 },
    { id: 26, name: 'Access Telecom', type: 'internet', logo: '🌐', min: 70, max: 400 },
    { id: 27, name: 'DStv Subscription', type: 'tv', logo: '📺', min: 50, max: 200 },
    { id: 28, name: 'GOtv Subscription', type: 'tv', logo: '📺', min: 30, max: 150 },
    { id: 29, name: 'Total Play Subscription', type: 'tv', logo: '📺', min: 40, max: 180 },
    { id: 30, name: 'NetOne TV', type: 'tv', logo: '📺', min: 35, max: 160 },
  ];

  const allSchools = [
    // Zimbabwe Universities
    { id: 1, name: 'University of Zimbabwe', type: 'university', account: 'UZ001', country: 'Zimbabwe' },
    { id: 2, name: 'National University of Science and Technology', type: 'university', account: 'NUST001', country: 'Zimbabwe' },
    { id: 3, name: 'Africa University', type: 'university', account: 'AFU001', country: 'Zimbabwe' },
    { id: 4, name: 'Bindura University of Science Education', type: 'university', account: 'BUSE001', country: 'Zimbabwe' },
    { id: 5, name: 'Catholic University in Zimbabwe', type: 'university', account: 'CUZ001', country: 'Zimbabwe' },
    { id: 6, name: 'Chinhoyi University of Technology', type: 'university', account: 'CU001', country: 'Zimbabwe' },
    { id: 7, name: 'Great Zimbabwe University', type: 'university', account: 'GZU001', country: 'Zimbabwe' },
    { id: 8, name: 'Gwanda State University', type: 'university', account: 'GSU001', country: 'Zimbabwe' },
    { id: 9, name: 'Harare Institute of Technology', type: 'university', account: 'HIT001', country: 'Zimbabwe' },
    { id: 10, name: 'Lupane State University', type: 'university', account: 'LSU001', country: 'Zimbabwe' },
    { id: 11, name: 'Manicaland State University of Applied Sciences', type: 'university', account: 'MSUAS001', country: 'Zimbabwe' },
    { id: 12, name: 'Marondera University of Agricultural Science & Technology', type: 'university', account: 'MUAST001', country: 'Zimbabwe' },
    { id: 13, name: 'Midlands State University', type: 'university', account: 'MSU001', country: 'Zimbabwe' },
    { id: 14, name: 'Reformed Church University', type: 'university', account: 'RCU001', country: 'Zimbabwe' },
    { id: 15, name: 'Solusi University', type: 'university', account: 'SOL001', country: 'Zimbabwe' },
    { id: 16, name: 'University of Fort Hare Zimbabwe', type: 'university', account: 'UFH001', country: 'Zimbabwe' },
    { id: 17, name: 'Women\'s University in Africa', type: 'university', account: 'WUA001', country: 'Zimbabwe' },
    { id: 18, name: 'Zimbabwe Ezekiel Guti University', type: 'university', account: 'ZEGU001', country: 'Zimbabwe' },
    { id: 19, name: 'Zimbabwe Open University', type: 'university', account: 'ZOU001', country: 'Zimbabwe' },
    { id: 20, name: 'Arrupe Jesuit University', type: 'university', account: 'AJU001', country: 'Zimbabwe' },

    // South Africa Universities
    { id: 21, name: 'University of Cape Town', type: 'university', account: 'UCT001', country: 'South Africa' },
    { id: 22, name: 'University of the Witwatersrand', type: 'university', account: 'WITS001', country: 'South Africa' },
    { id: 23, name: 'Stellenbosch University', type: 'university', account: 'SU001', country: 'South Africa' },
    { id: 24, name: 'University of Pretoria', type: 'university', account: 'UP001', country: 'South Africa' },
    { id: 25, name: 'University of KwaZulu-Natal', type: 'university', account: 'UKZN001', country: 'South Africa' },
    { id: 26, name: 'University of Johannesburg', type: 'university', account: 'UJ001', country: 'South Africa' },
    { id: 27, name: 'North-West University', type: 'university', account: 'NWU001', country: 'South Africa' },
    { id: 28, name: 'University of the Free State', type: 'university', account: 'UFS001', country: 'South Africa' },
    { id: 29, name: 'Rhodes University', type: 'university', account: 'RU001', country: 'South Africa' },
    { id: 30, name: 'University of Venda', type: 'university', account: 'UNIVEN001', country: 'South Africa' },

    // Kenya Universities
    { id: 31, name: 'University of Nairobi', type: 'university', account: 'UON001', country: 'Kenya' },
    { id: 32, name: 'Kenyatta University', type: 'university', account: 'KU001', country: 'Kenya' },
    { id: 33, name: 'Moi University', type: 'university', account: 'MU001', country: 'Kenya' },
    { id: 34, name: 'Egerton University', type: 'university', account: 'EU001', country: 'Kenya' },
    { id: 35, name: 'Maseno University', type: 'university', account: 'MSEU001', country: 'Kenya' },
    { id: 36, name: 'Technical University of Kenya', type: 'university', account: 'TUK001', country: 'Kenya' },
    { id: 37, name: 'Kisii University', type: 'university', account: 'KIU001', country: 'Kenya' },
    { id: 38, name: 'Jomo Kenyatta University of Agriculture and Technology', type: 'university', account: 'JKUAT001', country: 'Kenya' },
    { id: 39, name: 'Masinde Muliro University of Science and Technology', type: 'university', account: 'MMUST001', country: 'Kenya' },
    { id: 40, name: 'South Eastern Kenya University', type: 'university', account: 'SEKU001', country: 'Kenya' },

    // Nigeria Universities
    { id: 41, name: 'University of Ibadan', type: 'university', account: 'UI001', country: 'Nigeria' },
    { id: 42, name: 'University of Lagos', type: 'university', account: 'UNILAG001', country: 'Nigeria' },
    { id: 43, name: 'University of Nigeria', type: 'university', account: 'UNN001', country: 'Nigeria' },
    { id: 44, name: 'Obafemi Awolowo University', type: 'university', account: 'OAU001', country: 'Nigeria' },
    { id: 45, name: 'Ahmadu Bello University', type: 'university', account: 'ABU001', country: 'Nigeria' },
    { id: 46, name: 'University of Benin', type: 'university', account: 'UNIBEN001', country: 'Nigeria' },
    { id: 47, name: 'University of Ilorin', type: 'university', account: 'UNILORIN001', country: 'Nigeria' },
    { id: 48, name: 'Nnamdi Azikiwe University', type: 'university', account: 'UNIZIK001', country: 'Nigeria' },
    { id: 49, name: 'University of Calabar', type: 'university', account: 'UNICAL001', country: 'Nigeria' },
    { id: 50, name: 'University of Jos', type: 'university', account: 'UNIJOS001', country: 'Nigeria' },

    // Ghana Universities
    { id: 51, name: 'University of Ghana', type: 'university', account: 'UG001', country: 'Ghana' },
    { id: 52, name: 'Kwame Nkrumah University of Science and Technology', type: 'university', account: 'KNUST001', country: 'Ghana' },
    { id: 53, name: 'University of Cape Coast', type: 'university', account: 'UCC001', country: 'Ghana' },
    { id: 54, name: 'University of Education, Winneba', type: 'university', account: 'UEW001', country: 'Ghana' },
    { id: 55, name: 'University for Development Studies', type: 'university', account: 'UDS001', country: 'Ghana' },
    { id: 56, name: 'University of Mines and Technology', type: 'university', account: 'UMaT001', country: 'Ghana' },
    { id: 57, name: 'University of Energy and Natural Resources', type: 'university', account: 'UENR001', country: 'Ghana' },
    { id: 58, name: 'University of Professional Studies', type: 'university', account: 'UPSA001', country: 'Ghana' },
    { id: 59, name: 'Ghana Institute of Management and Public Administration', type: 'university', account: 'GIMPA001', country: 'Ghana' },
    { id: 60, name: 'University of Health and Allied Sciences', type: 'university', account: 'UHAS001', country: 'Ghana' },

    // Tanzania Universities
    { id: 61, name: 'University of Dar es Salaam', type: 'university', account: 'UDSM001', country: 'Tanzania' },
    { id: 62, name: 'Sokoine University of Agriculture', type: 'university', account: 'SUA001', country: 'Tanzania' },
    { id: 63, name: 'Muhimbili University of Health and Allied Sciences', type: 'university', account: 'MUHAS001', country: 'Tanzania' },
    { id: 64, name: 'University of Dodoma', type: 'university', account: 'UDOM001', country: 'Tanzania' },
    { id: 65, name: 'Open University of Tanzania', type: 'university', account: 'OUT001', country: 'Tanzania' },
    { id: 66, name: 'Tanzania Public Service University', type: 'university', account: 'TPSU001', country: 'Tanzania' },
    { id: 67, name: 'State University of Zanzibar', type: 'university', account: 'SUZA001', country: 'Tanzania' },
    { id: 68, name: 'Kilimanjaro Christian Medical University College', type: 'university', account: 'KCMUCo001', country: 'Tanzania' },
    { id: 69, name: 'Mbeya University of Science and Technology', type: 'university', account: 'MUST001', country: 'Tanzania' },
    { id: 70, name: 'Mwalimu Nyerere University', type: 'university', account: 'MNU001', country: 'Tanzania' },

    // Uganda Universities
    { id: 71, name: 'Makerere University', type: 'university', account: 'MU001', country: 'Uganda' },
    { id: 72, name: 'Kyambogo University', type: 'university', account: 'KU001', country: 'Uganda' },
    { id: 73, name: 'Mbarara University of Science and Technology', type: 'university', account: 'MUST001', country: 'Uganda' },
    { id: 74, name: 'Gulu University', type: 'university', account: 'GU001', country: 'Uganda' },
    { id: 75, name: 'Busitema University', type: 'university', account: 'BU001', country: 'Uganda' },
    { id: 76, name: 'Kampala International University', type: 'university', account: 'KIU001', country: 'Uganda' },
    { id: 77, name: 'Islamic University in Uganda', type: 'university', account: 'IUIU001', country: 'Uganda' },
    { id: 78, name: 'Uganda Martyrs University', type: 'university', account: 'UMU001', country: 'Uganda' },
    { id: 79, name: 'Kabale University', type: 'university', account: 'KABU001', country: 'Uganda' },
    { id: 80, name: 'Muni University', type: 'university', account: 'MUNI001', country: 'Uganda' },

    // Zambia Universities
    { id: 81, name: 'University of Zambia', type: 'university', account: 'UNZA001', country: 'Zambia' },
    { id: 82, name: 'Copperbelt University', type: 'university', account: 'CBU001', country: 'Zambia' },
    { id: 83, name: 'Mulungushi University', type: 'university', account: 'MU001', country: 'Zambia' },
    { id: 84, name: 'University of Lusaka', type: 'university', account: 'UNILUS001', country: 'Zambia' },
    { id: 85, name: 'Cavendish University Zambia', type: 'university', account: 'CUZ001', country: 'Zambia' },
    { id: 86, name: 'Zambia Open University', type: 'university', account: 'ZOU001', country: 'Zambia' },
    { id: 87, name: 'Evelyn Hone College', type: 'university', account: 'EHC001', country: 'Zambia' },
    { id: 88, name: 'Northrise University', type: 'university', account: 'NU001', country: 'Zambia' },
    { id: 89, name: 'Kwame Nkrumah University', type: 'university', account: 'KNU001', country: 'Zambia' },
    { id: 90, name: 'Texila American University', type: 'university', account: 'TAU001', country: 'Zambia' },

    // Polytechnic Colleges from https://mhtestd.gov.zw/polytechnic-colleges/
    { id: 101, name: 'Harare Polytechnic', type: 'tertiary', account: 'HP001', country: 'Zimbabwe' },
    { id: 102, name: 'Bulawayo Polytechnic', type: 'tertiary', account: 'BP001', country: 'Zimbabwe' },
    { id: 103, name: 'Mutare Polytechnic', type: 'tertiary', account: 'MP001', country: 'Zimbabwe' },
    { id: 104, name: 'Gweru Polytechnic', type: 'tertiary', account: 'GP001', country: 'Zimbabwe' },
    { id: 105, name: 'Kwekwe Polytechnic', type: 'tertiary', account: 'KWP001', country: 'Zimbabwe' },
    { id: 106, name: 'Masvingo Polytechnic', type: 'tertiary', account: 'MSP001', country: 'Zimbabwe' },
    { id: 107, name: 'Kushinga Phikelela Polytechnic', type: 'tertiary', account: 'KPP001', country: 'Zimbabwe' },
    { id: 108, name: 'Joshua Mqabuko Nkomo Polytechnic', type: 'tertiary', account: 'JMN001', country: 'Zimbabwe' },
    { id: 109, name: 'School of Hospitality & Tourism', type: 'tertiary', account: 'SHT001', country: 'Zimbabwe' },

    // Secondary Schools from https://en.wikipedia.org/wiki/List_of_schools_in_Zimbabwe
    { id: 110, name: 'Prince Edward School', type: 'secondary', account: 'PES001', country: 'Zimbabwe' },
    { id: 111, name: 'St. John\'s College', type: 'secondary', account: 'SJC001', country: 'Zimbabwe' },
    { id: 112, name: 'Dominican Convent', type: 'secondary', account: 'DC001', country: 'Zimbabwe' },
    { id: 113, name: 'Girls\' College', type: 'secondary', account: 'GC001', country: 'Zimbabwe' },
    { id: 114, name: 'St. George\'s College', type: 'secondary', account: 'SGC001', country: 'Zimbabwe' },
    { id: 115, name: 'Christian Brothers College', type: 'secondary', account: 'CBC001', country: 'Zimbabwe' },
    { id: 116, name: 'St. Ignatius College', type: 'secondary', account: 'SIC001', country: 'Zimbabwe' },
    { id: 117, name: 'Arundel School', type: 'secondary', account: 'AS001', country: 'Zimbabwe' },
    { id: 118, name: 'St. Mary\'s High School', type: 'secondary', account: 'SMH001', country: 'Zimbabwe' },
    { id: 119, name: 'Hillside High School', type: 'secondary', account: 'HHS001', country: 'Zimbabwe' },
    { id: 120, name: 'Lomagundi College', type: 'secondary', account: 'LC001', country: 'Zimbabwe' },
    { id: 121, name: 'St. Faith\'s High School', type: 'secondary', account: 'SFH001', country: 'Zimbabwe' },
    { id: 122, name: 'St. Paul\'s High School', type: 'secondary', account: 'SPH001', country: 'Zimbabwe' },
    { id: 123, name: 'Roosevelt Girls High School', type: 'secondary', account: 'RGHS001', country: 'Zimbabwe' },
    { id: 124, name: 'St. John\'s High School', type: 'secondary', account: 'SJHS001', country: 'Zimbabwe' },
    { id: 125, name: 'Mutare Girls High School', type: 'secondary', account: 'MGHS001', country: 'Zimbabwe' },
    { id: 126, name: 'Gweru High School', type: 'secondary', account: 'GHS001', country: 'Zimbabwe' },
    { id: 127, name: 'Masvingo High School', type: 'secondary', account: 'MHS001', country: 'Zimbabwe' },
    { id: 128, name: 'Kwekwe High School', type: 'secondary', account: 'KHS001', country: 'Zimbabwe' },
    { id: 129, name: 'Bindura High School', type: 'secondary', account: 'BHS001', country: 'Zimbabwe' },
    { id: 130, name: 'Marondera High School', type: 'secondary', account: 'MHS002', country: 'Zimbabwe' },
    { id: 131, name: 'Chinhoyi High School', type: 'secondary', account: 'CHS001', country: 'Zimbabwe' },
    { id: 132, name: 'Bulawayo High School', type: 'secondary', account: 'BHS002', country: 'Zimbabwe' },
    { id: 133, name: 'Harare Girls High School', type: 'secondary', account: 'HGHS001', country: 'Zimbabwe' },
    { id: 134, name: 'Glen View High School', type: 'secondary', account: 'GVHS001', country: 'Zimbabwe' },
    { id: 135, name: 'Chitungwiza High School', type: 'secondary', account: 'CHS002', country: 'Zimbabwe' },
    { id: 136, name: 'Mbare High School', type: 'secondary', account: 'MHS003', country: 'Zimbabwe' },
    { id: 137, name: 'Chikwanha High School', type: 'secondary', account: 'CHS003', country: 'Zimbabwe' },
    { id: 138, name: 'Dzivaresekwa High School', type: 'secondary', account: 'DHS001', country: 'Zimbabwe' },
    { id: 139, name: 'St. Dominic\'s High School', type: 'secondary', account: 'SDHS001', country: 'Zimbabwe' },
    { id: 140, name: 'St. Francis High School', type: 'secondary', account: 'SFHS001', country: 'Zimbabwe' },
    { id: 141, name: 'St. Theresa\'s High School', type: 'secondary', account: 'STHS001', country: 'Zimbabwe' },
    { id: 142, name: 'St. Michael\'s High School', type: 'secondary', account: 'SMHS001', country: 'Zimbabwe' },
    { id: 143, name: 'St. Joseph\'s High School', type: 'secondary', account: 'SJHS002', country: 'Zimbabwe' },
    { id: 144, name: 'St. Anthony\'s High School', type: 'secondary', account: 'SAHS001', country: 'Zimbabwe' },
    { id: 145, name: 'St. Patrick\'s High School', type: 'secondary', account: 'SPHS001', country: 'Zimbabwe' },
    { id: 146, name: 'St. Barnabas High School', type: 'secondary', account: 'SBHS001', country: 'Zimbabwe' },
    { id: 147, name: 'St. Peter\'s High School', type: 'secondary', account: 'SPHS002', country: 'Zimbabwe' },
    { id: 148, name: 'St. Andrew\'s High School', type: 'secondary', account: 'SAHS002', country: 'Zimbabwe' },
    { id: 149, name: 'St. Catherine\'s High School', type: 'secondary', account: 'SCHS001', country: 'Zimbabwe' },
    { id: 150, name: 'Cherutombo Secondary School', type: 'secondary', account: 'CSS001', country: 'Zimbabwe' },
    { id: 151, name: 'Chitepo Secondary School', type: 'secondary', account: 'CSP001', country: 'Zimbabwe' },
    { id: 152, name: 'Dombodzvuku Secondary School', type: 'secondary', account: 'DSP001', country: 'Zimbabwe' },
    { id: 153, name: 'Rakodzi High School', type: 'secondary', account: 'RHS001', country: 'Zimbabwe' },
    { id: 154, name: 'Waddilove High School', type: 'secondary', account: 'WHS001', country: 'Zimbabwe' },
    { id: 155, name: 'Watershed College', type: 'secondary', account: 'WC001', country: 'Zimbabwe' },
    { id: 156, name: 'Wise Owl Secondary School', type: 'secondary', account: 'WOS001', country: 'Zimbabwe' },
    { id: 157, name: 'Dampa Secondary School', type: 'secondary', account: 'DSS001', country: 'Zimbabwe' },
    { id: 158, name: 'Gloag High School', type: 'secondary', account: 'GHS001', country: 'Zimbabwe' },
    { id: 159, name: 'Gogo High School', type: 'secondary', account: 'GHS002', country: 'Zimbabwe' },
    { id: 160, name: 'Hlangabeza High School', type: 'secondary', account: 'HHS002', country: 'Zimbabwe' },
    { id: 161, name: 'Inyathi High School', type: 'secondary', account: 'IHS001', country: 'Zimbabwe' },
    { id: 162, name: 'Nemane Adventist High School', type: 'secondary', account: 'NAHS001', country: 'Zimbabwe' },
    { id: 163, name: 'Nkayi Secondary School', type: 'secondary', account: 'NSS001', country: 'Zimbabwe' },
    { id: 164, name: 'Regina Mundi Secondary School', type: 'secondary', account: 'RMSS001', country: 'Zimbabwe' },
    { id: 165, name: 'St. James High School', type: 'secondary', account: 'SJHS003', country: 'Zimbabwe' },
    { id: 166, name: 'Tshabanda Adventist High School', type: 'secondary', account: 'TAHS001', country: 'Zimbabwe' },
    { id: 167, name: 'Tsholotsho High School', type: 'secondary', account: 'THS001', country: 'Zimbabwe' },
    { id: 168, name: 'Alpha Secondary School', type: 'secondary', account: 'ASS001', country: 'Zimbabwe' },
    { id: 169, name: 'JZ Moyo High School', type: 'secondary', account: 'JZHS001', country: 'Zimbabwe' },
    { id: 170, name: 'Manama High School', type: 'secondary', account: 'MHS004', country: 'Zimbabwe' },
    { id: 171, name: 'Mzingwane High School', type: 'secondary', account: 'MHS005', country: 'Zimbabwe' },
    { id: 172, name: 'Thekwane High School', type: 'secondary', account: 'THS002', country: 'Zimbabwe' },
    { id: 173, name: 'Solusi Adventist High School', type: 'secondary', account: 'SAHS002', country: 'Zimbabwe' },
    { id: 174, name: 'Bulu High School', type: 'secondary', account: 'BHS003', country: 'Zimbabwe' },
    { id: 175, name: 'Embakwe High School', type: 'secondary', account: 'EHS001', country: 'Zimbabwe' },
    { id: 176, name: 'Thornhill High School', type: 'secondary', account: 'THS003', country: 'Zimbabwe' },
    { id: 177, name: 'Mkoba 3 Secondary School', type: 'secondary', account: 'MSS001', country: 'Zimbabwe' },
    { id: 178, name: 'Mnene High School', type: 'secondary', account: 'MHS006', country: 'Zimbabwe' },
    { id: 179, name: 'Mposi Secondary School', type: 'secondary', account: 'MSS002', country: 'Zimbabwe' },
    { id: 180, name: 'Murerezi Secondary School', type: 'secondary', account: 'MSS003', country: 'Zimbabwe' },
    { id: 181, name: 'Musume Secondary School', type: 'secondary', account: 'MSS004', country: 'Zimbabwe' },
    { id: 182, name: 'Nashville Secondary School', type: 'secondary', account: 'NSS002', country: 'Zimbabwe' },
    { id: 183, name: 'Nkululeko Secondary School', type: 'secondary', account: 'NSS003', country: 'Zimbabwe' },
    { id: 184, name: 'Ntabamhlope Secondary School', type: 'secondary', account: 'NSS004', country: 'Zimbabwe' },
    { id: 185, name: 'Regina Mundi High School', type: 'secondary', account: 'RMHS001', country: 'Zimbabwe' },
    { id: 186, name: 'Riverside School', type: 'secondary', account: 'RS001', country: 'Zimbabwe' },
    { id: 187, name: 'St. Patrick\'s Secondary School', type: 'secondary', account: 'SPSS001', country: 'Zimbabwe' },
    { id: 188, name: 'Sibomvu Secondary School', type: 'secondary', account: 'SSS001', country: 'Zimbabwe' },
    { id: 189, name: 'Svita Secondary School', type: 'secondary', account: 'SSS002', country: 'Zimbabwe' },
    { id: 190, name: 'Tongogara High School', type: 'secondary', account: 'THS004', country: 'Zimbabwe' },
    { id: 191, name: 'Bee Mine Secondary School', type: 'secondary', account: 'BMSS001', country: 'Zimbabwe' },
    { id: 192, name: 'Nyaradzo Secondary School', type: 'secondary', account: 'NSS005', country: 'Zimbabwe' },
    { id: 193, name: 'Rio Tinto Zhombe High School', type: 'secondary', account: 'RTZHS001', country: 'Zimbabwe' },
    { id: 194, name: 'Samambwa Secondary School', type: 'secondary', account: 'SSS003', country: 'Zimbabwe' },
    { id: 195, name: 'Sidakeni Secondary School', type: 'secondary', account: 'SSS004', country: 'Zimbabwe' },
    { id: 196, name: 'Totororo Secondary School', type: 'secondary', account: 'TSS001', country: 'Zimbabwe' },

    // Primary Schools from https://www.scribd.com/document/777691696/List-of-Primary-Schools
    { id: 197, name: 'St. Mary\'s Primary School', type: 'primary', account: 'SMP001', country: 'Zimbabwe' },
    { id: 198, name: 'St. Peter\'s Primary School', type: 'primary', account: 'SPP001', country: 'Zimbabwe' },
    { id: 199, name: 'St. Andrew\'s Primary School', type: 'primary', account: 'SAP001', country: 'Zimbabwe' },
    { id: 200, name: 'St. Catherine\'s Primary School', type: 'primary', account: 'SCP001', country: 'Zimbabwe' },
    { id: 201, name: 'St. Paul\'s Primary School', type: 'primary', account: 'SPP002', country: 'Zimbabwe' },
    { id: 202, name: 'St. John\'s Primary School', type: 'primary', account: 'SJP001', country: 'Zimbabwe' },
    { id: 203, name: 'St. George\'s Primary School', type: 'primary', account: 'SGP001', country: 'Zimbabwe' },
    { id: 204, name: 'St. Dominic\'s Primary School', type: 'primary', account: 'SDP001', country: 'Zimbabwe' },
    { id: 205, name: 'St. Francis Primary School', type: 'primary', account: 'SFP001', country: 'Zimbabwe' },
    { id: 206, name: 'St. Theresa\'s Primary School', type: 'primary', account: 'STP001', country: 'Zimbabwe' },
    { id: 207, name: 'St. Michael\'s Primary School', type: 'primary', account: 'SMP002', country: 'Zimbabwe' },
    { id: 208, name: 'St. Joseph\'s Primary School', type: 'primary', account: 'SJP002', country: 'Zimbabwe' },
    { id: 209, name: 'St. Anthony\'s Primary School', type: 'primary', account: 'SAP002', country: 'Zimbabwe' },
    { id: 210, name: 'St. Patrick\'s Primary School', type: 'primary', account: 'SPP003', country: 'Zimbabwe' },
    { id: 211, name: 'St. Barnabas Primary School', type: 'primary', account: 'SBP001', country: 'Zimbabwe' },
    { id: 212, name: 'Mutare Primary School', type: 'primary', account: 'MPS001', country: 'Zimbabwe' },
    { id: 213, name: 'Gweru Primary School', type: 'primary', account: 'GPS001', country: 'Zimbabwe' },
    { id: 214, name: 'Masvingo Primary School', type: 'primary', account: 'MPS002', country: 'Zimbabwe' },
    { id: 215, name: 'Kwekwe Primary School', type: 'primary', account: 'KPS001', country: 'Zimbabwe' },
    { id: 216, name: 'Bindura Primary School', type: 'primary', account: 'BPS001', country: 'Zimbabwe' },
    { id: 217, name: 'Marondera Primary School', type: 'primary', account: 'MPS003', country: 'Zimbabwe' },
    { id: 218, name: 'Chinhoyi Primary School', type: 'primary', account: 'CPS001', country: 'Zimbabwe' },
    { id: 219, name: 'Bulawayo Primary School', type: 'primary', account: 'BPS002', country: 'Zimbabwe' },
    { id: 220, name: 'Harare Primary School', type: 'primary', account: 'HPS001', country: 'Zimbabwe' },
    { id: 221, name: 'Chitungwiza Primary School', type: 'primary', account: 'CPS002', country: 'Zimbabwe' },
    { id: 222, name: 'Mbare Primary School', type: 'primary', account: 'MPS004', country: 'Zimbabwe' },
    { id: 223, name: 'Dzivaresekwa Primary School', type: 'primary', account: 'DPS001', country: 'Zimbabwe' },
    { id: 224, name: 'Glen View Primary School', type: 'primary', account: 'GVPS001', country: 'Zimbabwe' },
    { id: 225, name: 'Chikwanha Primary School', type: 'primary', account: 'CHPS001', country: 'Zimbabwe' },
    { id: 226, name: 'Ashmil Infant & Nursery School (Eastlea Branch)', type: 'primary', account: 'AINSE001', country: 'Zimbabwe' },
    { id: 227, name: 'Windview Primary School', type: 'primary', account: 'WPS001', country: 'Zimbabwe' },
    { id: 228, name: 'Herentals College', type: 'primary', account: 'HC001', country: 'Zimbabwe' },
    { id: 229, name: 'Grange Christian School', type: 'primary', account: 'GCS001', country: 'Zimbabwe' },
    { id: 230, name: 'Chiparawe Primary School', type: 'primary', account: 'CPS003', country: 'Zimbabwe' },
    { id: 231, name: 'Diggleford Primary School', type: 'primary', account: 'DPS002', country: 'Zimbabwe' },
    { id: 232, name: 'Lendy Park School', type: 'primary', account: 'LPS001', country: 'Zimbabwe' },
    { id: 233, name: 'Ashmil Infant and Nursery School Blakeway Dr', type: 'primary', account: 'AINSB001', country: 'Zimbabwe' },
    { id: 234, name: 'Glen View 1 Primary School', type: 'primary', account: 'GVPS002', country: 'Zimbabwe' },
    { id: 235, name: 'Glen View 2 Primary School', type: 'primary', account: 'GVPS003', country: 'Zimbabwe' },
    { id: 236, name: 'Glen View 3 Primary School', type: 'primary', account: 'GVPS004', country: 'Zimbabwe' },
    { id: 237, name: 'Glen View 4 Primary School', type: 'primary', account: 'GVPS005', country: 'Zimbabwe' },
    { id: 238, name: 'Glen View 5 Primary School', type: 'primary', account: 'GVPS006', country: 'Zimbabwe' },
    { id: 239, name: 'Glen View 6 Primary School', type: 'primary', account: 'GVPS007', country: 'Zimbabwe' },
    { id: 240, name: 'Glen View 7 Primary School', type: 'primary', account: 'GVPS008', country: 'Zimbabwe' },
    { id: 241, name: 'Glen View 8 Primary School', type: 'primary', account: 'GVPS009', country: 'Zimbabwe' },
    { id: 242, name: 'Glen View 9 Primary School', type: 'primary', account: 'GVPS010', country: 'Zimbabwe' },
    { id: 243, name: 'Victoria Falls Primary School', type: 'primary', account: 'VFPS001', country: 'Zimbabwe' },
    { id: 244, name: 'David Livingstone Primary School', type: 'primary', account: 'DLPS001', country: 'Zimbabwe' },
    { id: 245, name: 'Nechibondo Primary School', type: 'primary', account: 'NPS001', country: 'Zimbabwe' },
    { id: 246, name: 'Kwesengulube Primary School', type: 'primary', account: 'KPS002', country: 'Zimbabwe' },
    { id: 247, name: 'Nkankezi Primary School', type: 'primary', account: 'NPS002', country: 'Zimbabwe' },
    { id: 248, name: 'Sukadsihambe Primary School', type: 'primary', account: 'SPS001', country: 'Zimbabwe' },
    { id: 249, name: 'Bee Mine Primary School', type: 'primary', account: 'BMPS001', country: 'Zimbabwe' },
    { id: 250, name: 'Bhamala Primary School', type: 'primary', account: 'BPS003', country: 'Zimbabwe' },
    { id: 251, name: 'St Faith Primary School', type: 'primary', account: 'SFPS001', country: 'Zimbabwe' },
    { id: 252, name: 'Samambwa Primary School', type: 'primary', account: 'SAPS001', country: 'Zimbabwe' },
    { id: 253, name: 'Sidakeni Primary School', type: 'primary', account: 'SIPS001', country: 'Zimbabwe' },
    { id: 254, name: 'Totororo Primary School', type: 'primary', account: 'TPS001', country: 'Zimbabwe' },
  ];

  const groceryStores = [
    { id: 1, name: 'OK Zimbabwe', logo: '🛒', locations: 'Nationwide', website: 'ok.co.zw', special: 'Weekly Specials', delivery: 'In-store pickup', rating: 4.8 },
    { id: 2, name: 'Pick n Pay', logo: '🛍️', locations: 'Major cities', website: 'pnp.co.zw', special: 'Buy 1 Get 1 Free', delivery: 'Online ordering', rating: 4.7 },
    { id: 3, name: 'Spar', logo: '🏪', locations: 'Nationwide', website: 'spar.co.zw', special: 'Member Discounts', delivery: 'Home delivery', rating: 4.6 },
    { id: 4, name: 'TM Supermarket', logo: '🏪', locations: 'Major cities', website: 'tm.co.zw', special: 'Organic Produce', delivery: 'Same-day pickup', rating: 4.5 },
    { id: 5, name: 'Bon Marche', logo: '🏪', locations: 'Harare, Bulawayo', website: 'bonmarche.co.zw', special: 'Premium Quality', delivery: 'Express pickup', rating: 4.4 },
    { id: 6, name: 'Choppies', logo: '🏪', locations: 'Nationwide', website: 'choppies.com', special: 'Value Pricing', delivery: 'In-store pickup', rating: 4.3 },
    { id: 7, name: 'Pick n Save', logo: '🏪', locations: 'Major cities', website: 'pns.co.zw', special: 'Budget Friendly', delivery: 'In-store pickup', rating: 4.2 },
    { id: 8, name: 'RiteWay', logo: '🏪', locations: 'Harare, Bulawayo', website: 'riteway.co.zw', special: 'Quality Assured', delivery: 'Fast pickup', rating: 4.1 },
    { id: 9, name: 'Fresh Stop', logo: '🏪', locations: 'Major cities', website: 'freshstop.co.zw', special: 'Fresh Produce', delivery: 'Quick pickup', rating: 4.0 },
    { id: 10, name: 'Cash & Carry', logo: '🏪', locations: 'Nationwide', website: 'cashandcarry.co.zw', special: 'Bulk Discounts', delivery: 'Wholesale pickup', rating: 3.9 },
  ];

  const groceryProducts = [
    // OK Zimbabwe
    { id: 1, name: '2kg Mealie Meal', price: 4.50, store: 'OK Zimbabwe', category: 'staples', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Mealie+Meal', brand: 'OK', weight: '2kg', rating: 4.5, inStock: true, discount: 0 },
    { id: 2, name: '1kg Sugar', price: 3.20, store: 'OK Zimbabwe', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Sugar', brand: 'OK', weight: '1kg', rating: 4.3, inStock: true, discount: 0 },
    { id: 3, name: '1L Cooking Oil', price: 8.00, store: 'OK Zimbabwe', category: 'staples', image: 'https://placehold.co/200x200/FFD700/000000?text=Cooking+Oil', brand: 'OK', volume: '1L', rating: 4.4, inStock: true, discount: 0 },
    { id: 4, name: '6 Eggs', price: 2.80, store: 'OK Zimbabwe', category: 'dairy', image: 'https://placehold.co/200x200/F8F8FF/000000?text=Eggs', brand: 'Fresh', quantity: '6', rating: 4.6, inStock: true, discount: 0 },
    { id: 5, name: '1kg Bread', price: 2.50, store: 'OK Zimbabwe', category: 'bakery', image: 'https://placehold.co/200x200/DEB887/000000?text=Bread', brand: 'OK', weight: '1kg', rating: 4.2, inStock: true, discount: 0 },
    { id: 6, name: '1kg Chicken', price: 12.00, store: 'OK Zimbabwe', category: 'meat', image: 'https://placehold.co/200x200/CD853F/FFFFFF?text=Chicken', brand: 'Fresh', weight: '1kg', rating: 4.7, inStock: true, discount: 0 },
    { id: 7, name: '1kg Beef', price: 15.00, store: 'OK Zimbabwe', category: 'meat', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Beef', brand: 'Fresh', weight: '1kg', rating: 4.8, inStock: true, discount: 0 },
    { id: 8, name: '1kg Tomatoes', price: 3.50, store: 'OK Zimbabwe', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Tomatoes', brand: 'Fresh', weight: '1kg', rating: 4.5, inStock: true, discount: 0 },
    { id: 9, name: '1kg Onions', price: 3.00, store: 'OK Zimbabwe', category: 'produce', image: 'https://placehold.co/200x200/D2B48C/000000?text=Onions', brand: 'Fresh', weight: '1kg', rating: 4.4, inStock: true, discount: 0 },
    { id: 10, name: '1kg Potatoes', price: 2.80, store: 'OK Zimbabwe', category: 'produce', image: 'https://placehold.co/200x200/DEB887/000000?text=Potatoes', brand: 'Fresh', weight: '1kg', rating: 4.3, inStock: true, discount: 0 },
    { id: 11, name: '1L Milk', price: 4.20, store: 'OK Zimbabwe', category: 'dairy', image: 'https://placehold.co/200x200/87CEEB/000000?text=Milk', brand: 'OK', volume: '1L', rating: 4.6, inStock: true, discount: 0 },
    { id: 12, name: '1kg Rice', price: 5.80, store: 'OK Zimbabwe', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Rice', brand: 'OK', weight: '1kg', rating: 4.4, inStock: true, discount: 0 },
    { id: 13, name: '1kg Pasta', price: 3.90, store: 'OK Zimbabwe', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Pasta', brand: 'OK', weight: '1kg', rating: 4.2, inStock: true, discount: 0 },
    { id: 14, name: '1 Can Tuna', price: 6.50, store: 'OK Zimbabwe', category: 'canned', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Tuna', brand: 'OK', weight: '165g', rating: 4.5, inStock: true, discount: 0 },
    { id: 15, name: '1kg Apples', price: 5.20, store: 'OK Zimbabwe', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Apples', brand: 'Fresh', weight: '1kg', rating: 4.7, inStock: true, discount: 0 },
    
    // Pick n Pay
    { id: 16, name: '2kg White Rice', price: 6.50, store: 'Pick n Pay', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=White+Rice', brand: 'PnP', weight: '2kg', rating: 4.6, inStock: true, discount: 10 },
    { id: 17, name: '1kg Brown Sugar', price: 3.80, store: 'Pick n Pay', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Brown+Sugar', brand: 'PnP', weight: '1kg', rating: 4.4, inStock: true, discount: 15 },
    { id: 18, name: '1L Sunflower Oil', price: 9.50, store: 'Pick n Pay', category: 'staples', image: 'https://placehold.co/200x200/FFD700/000000?text=Sunflower+Oil', brand: 'PnP', volume: '1L', rating: 4.5, inStock: true, discount: 0 },
    { id: 19, name: '12 Eggs', price: 5.20, store: 'Pick n Pay', category: 'dairy', image: 'https://placehold.co/200x200/F8F8FF/000000?text=Eggs', brand: 'Fresh', quantity: '12', rating: 4.7, inStock: true, discount: 20 },
    { id: 20, name: 'White Bread Loaf', price: 3.00, store: 'Pick n Pay', category: 'bakery', image: 'https://placehold.co/200x200/DEB887/000000?text=Bread', brand: 'PnP', weight: '800g', rating: 4.3, inStock: true, discount: 0 },
    { id: 21, name: '1kg Minced Beef', price: 18.00, store: 'Pick n Pay', category: 'meat', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Minced+Beef', brand: 'Fresh', weight: '1kg', rating: 4.8, inStock: true, discount: 0 },
    { id: 22, name: '1kg Pork', price: 14.00, store: 'Pick n Pay', category: 'meat', image: 'https://placehold.co/200x200/CD853F/FFFFFF?text=Pork', brand: 'Fresh', weight: '1kg', rating: 4.6, inStock: true, discount: 0 },
    { id: 23, name: 'Mixed Vegetables 1kg', price: 4.50, store: 'Pick n Pay', category: 'produce', image: 'https://placehold.co/200x200/9ACD32/000000?text=Mixed+Veg', brand: 'Fresh', weight: '1kg', rating: 4.5, inStock: true, discount: 0 },
    { id: 24, name: 'Fresh Apples 1kg', price: 6.00, store: 'Pick n Pay', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Apples', brand: 'Fresh', weight: '1kg', rating: 4.7, inStock: true, discount: 0 },
    { id: 25, name: 'Oranges 1kg', price: 5.50, store: 'Pick n Pay', category: 'produce', image: 'https://placehold.co/200x200/FFA500/000000?text=Oranges', brand: 'Fresh', weight: '1kg', rating: 4.6, inStock: true, discount: 0 },
    { id: 26, name: '1L Full Cream Milk', price: 4.80, store: 'Pick n Pay', category: 'dairy', image: 'https://placehold.co/200x200/87CEEB/000000?text=Milk', brand: 'PnP', volume: '1L', rating: 4.6, inStock: true, discount: 0 },
    { id: 27, name: '1kg Spaghetti', price: 4.20, store: 'Pick n Pay', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Spaghetti', brand: 'PnP', weight: '1kg', rating: 4.4, inStock: true, discount: 0 },
    { id: 28, name: '1 Can Salmon', price: 8.90, store: 'Pick n Pay', category: 'canned', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Salmon', brand: 'PnP', weight: '200g', rating: 4.7, inStock: true, discount: 0 },
    { id: 29, name: '1kg Bananas', price: 3.20, store: 'Pick n Pay', category: 'produce', image: 'https://placehold.co/200x200/FFD700/000000?text=Bananas', brand: 'Fresh', weight: '1kg', rating: 4.5, inStock: true, discount: 0 },
    { id: 30, name: '1kg Cheese', price: 12.50, store: 'Pick n Pay', category: 'dairy', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Cheese', brand: 'PnP', weight: '1kg', rating: 4.8, inStock: true, discount: 0 },
    
    // Spar
    { id: 31, name: '2kg Maize Meal', price: 4.20, store: 'Spar', category: 'staples', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Maize+Meal', brand: 'Spar', weight: '2kg', rating: 4.4, inStock: true, discount: 0 },
    { id: 32, name: '1kg Rock Sugar', price: 3.00, store: 'Spar', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Rock+Sugar', brand: 'Spar', weight: '1kg', rating: 4.3, inStock: true, discount: 0 },
    { id: 33, name: '1L Vegetable Oil', price: 7.80, store: 'Spar', category: 'staples', image: 'https://placehold.co/200x200/FFD700/000000?text=Vegetable+Oil', brand: 'Spar', volume: '1L', rating: 4.5, inStock: true, discount: 0 },
    { id: 34, name: '6 Free Range Eggs', price: 3.50, store: 'Spar', category: 'dairy', image: 'https://placehold.co/200x200/F8F8FF/000000?text=Eggs', brand: 'Spar', quantity: '6', rating: 4.7, inStock: true, discount: 0 },
    { id: 35, name: 'Whole Wheat Bread', price: 3.20, store: 'Spar', category: 'bakery', image: 'https://placehold.co/200x200/DEB887/000000?text=Bread', brand: 'Spar', weight: '800g', rating: 4.4, inStock: true, discount: 0 },
    { id: 36, name: '1kg Chicken Breast', price: 16.00, store: 'Spar', category: 'meat', image: 'https://placehold.co/200x200/CD853F/FFFFFF?text=Chicken+Breast', brand: 'Spar', weight: '1kg', rating: 4.8, inStock: true, discount: 0 },
    { id: 37, name: '1kg Lamb', price: 20.00, store: 'Spar', category: 'meat', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Lamb', brand: 'Spar', weight: '1kg', rating: 4.9, inStock: true, discount: 0 },
    { id: 38, name: 'Fresh Carrots 1kg', price: 3.20, store: 'Spar', category: 'produce', image: 'https://placehold.co/200x200/FFA500/000000?text=Carrots', brand: 'Spar', weight: '1kg', rating: 4.5, inStock: true, discount: 0 },
    { id: 39, name: 'Cabbage 1kg', price: 2.80, store: 'Spar', category: 'produce', image: 'https://placehold.co/200x200/9ACD32/000000?text=Cabbage', brand: 'Spar', weight: '1kg', rating: 4.3, inStock: true, discount: 0 },
    { id: 40, name: 'Green Beans 500g', price: 4.00, store: 'Spar', category: 'produce', image: 'https://placehold.co/200x200/9ACD32/000000?text=Green+Beans', brand: 'Spar', weight: '500g', rating: 4.4, inStock: true, discount: 0 },
    { id: 41, name: '1L Skim Milk', price: 3.90, store: 'Spar', category: 'dairy', image: 'https://placehold.co/200x200/87CEEB/000000?text=Skim+Milk', brand: 'Spar', volume: '1L', rating: 4.5, inStock: true, discount: 0 },
    { id: 42, name: '1kg Brown Rice', price: 6.20, store: 'Spar', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Brown+Rice', brand: 'Spar', weight: '1kg', rating: 4.6, inStock: true, discount: 0 },
    { id: 43, name: '1kg Pasta', price: 4.10, store: 'Spar', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Pasta', brand: 'Spar', weight: '1kg', rating: 4.4, inStock: true, discount: 0 },
    { id: 44, name: '1 Can Sardines', price: 5.80, store: 'Spar', category: 'canned', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Sardines', brand: 'Spar', weight: '155g', rating: 4.5, inStock: true, discount: 0 },
    { id: 45, name: '1kg Pears', price: 5.60, store: 'Spar', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Pears', brand: 'Spar', weight: '1kg', rating: 4.6, inStock: true, discount: 0 },
    
    // TM Supermarket
    { id: 46, name: 'Organic Rice 1kg', price: 8.50, store: 'TM Supermarket', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Organic+Rice', brand: 'TM', weight: '1kg', rating: 4.8, inStock: true, discount: 0 },
    { id: 47, name: 'Organic Sugar 1kg', price: 5.80, store: 'TM Supermarket', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Organic+Sugar', brand: 'TM', weight: '1kg', rating: 4.7, inStock: true, discount: 0 },
    { id: 48, name: 'Olive Oil 1L', price: 15.00, store: 'TM Supermarket', category: 'staples', image: 'https://placehold.co/200x200/FFD700/000000?text=Olive+Oil', brand: 'TM', volume: '1L', rating: 4.9, inStock: true, discount: 0 },
    { id: 49, name: 'Organic Eggs 6', price: 6.50, store: 'TM Supermarket', category: 'dairy', image: 'https://placehold.co/200x200/F8F8FF/000000?text=Organic+Eggs', brand: 'TM', quantity: '6', rating: 4.8, inStock: true, discount: 0 },
    { id: 50, name: 'Sourdough Bread', price: 5.00, store: 'TM Supermarket', category: 'bakery', image: 'https://placehold.co/200x200/DEB887/000000?text=Sourdough+Bread', brand: 'TM', weight: '750g', rating: 4.7, inStock: true, discount: 0 },
    { id: 51, name: 'Organic Chicken 1kg', price: 22.00, store: 'TM Supermarket', category: 'meat', image: 'https://placehold.co/200x200/CD853F/FFFFFF?text=Organic+Chicken', brand: 'TM', weight: '1kg', rating: 4.9, inStock: true, discount: 0 },
    { id: 52, name: 'Grass Fed Beef 1kg', price: 28.00, store: 'TM Supermarket', category: 'meat', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Grass+Fed+Beef', brand: 'TM', weight: '1kg', rating: 4.9, inStock: true, discount: 0 },
    { id: 53, name: 'Organic Tomatoes 1kg', price: 8.00, store: 'TM Supermarket', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Organic+Tomatoes', brand: 'TM', weight: '1kg', rating: 4.8, inStock: true, discount: 0 },
    { id: 54, name: 'Organic Onions 1kg', price: 6.50, store: 'TM Supermarket', category: 'produce', image: 'https://placehold.co/200x200/D2B48C/000000?text=Organic+Onions', brand: 'TM', weight: '1kg', rating: 4.7, inStock: true, discount: 0 },
    { id: 55, name: 'Organic Potatoes 1kg', price: 7.00, store: 'TM Supermarket', category: 'produce', image: 'https://placehold.co/200x200/DEB887/000000?text=Organic+Potatoes', brand: 'TM', weight: '1kg', rating: 4.8, inStock: true, discount: 0 },
    { id: 56, name: 'Organic Milk 1L', price: 6.80, store: 'TM Supermarket', category: 'dairy', image: 'https://placehold.co/200x200/87CEEB/000000?text=Organic+Milk', brand: 'TM', volume: '1L', rating: 4.9, inStock: true, discount: 0 },
    { id: 57, name: 'Organic Rice 2kg', price: 16.00, store: 'TM Supermarket', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Organic+Rice', brand: 'TM', weight: '2kg', rating: 4.9, inStock: true, discount: 0 },
    { id: 58, name: 'Organic Pasta 1kg', price: 7.20, store: 'TM Supermarket', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Organic+Pasta', brand: 'TM', weight: '1kg', rating: 4.8, inStock: true, discount: 0 },
    { id: 59, name: 'Organic Tuna 1 Can', price: 9.50, store: 'TM Supermarket', category: 'canned', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Organic+Tuna', brand: 'TM', weight: '155g', rating: 4.7, inStock: true, discount: 0 },
    { id: 60, name: 'Organic Apples 1kg', price: 10.00, store: 'TM Supermarket', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Organic+Apples', brand: 'TM', weight: '1kg', rating: 4.9, inStock: true, discount: 0 },
    
    // Bon Marche
    { id: 61, name: '2kg Premium Mealie Meal', price: 5.80, store: 'Bon Marche', category: 'staples', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Premium+Mealie+Meal', brand: 'Bon', weight: '2kg', rating: 4.7, inStock: true, discount: 0 },
    { id: 62, name: '1kg Premium Sugar', price: 4.50, store: 'Bon Marche', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Premium+Sugar', brand: 'Bon', weight: '1kg', rating: 4.6, inStock: true, discount: 0 },
    { id: 63, name: '1L Premium Oil', price: 11.00, store: 'Bon Marche', category: 'staples', image: 'https://placehold.co/200x200/FFD700/000000?text=Premium+Oil', brand: 'Bon', volume: '1L', rating: 4.8, inStock: true, discount: 0 },
    { id: 64, name: '12 Free Range Eggs', price: 7.50, store: 'Bon Marche', category: 'dairy', image: 'https://placehold.co/200x200/F8F8FF/000000?text=Free+Range+Eggs', brand: 'Bon', quantity: '12', rating: 4.8, inStock: true, discount: 0 },
    { id: 65, name: 'Artisan Bread Loaf', price: 4.80, store: 'Bon Marche', category: 'bakery', image: 'https://placehold.co/200x200/DEB887/000000?text=Artisan+Bread', brand: 'Bon', weight: '750g', rating: 4.7, inStock: true, discount: 0 },
    { id: 66, name: '1kg Free Range Chicken', price: 25.00, store: 'Bon Marche', category: 'meat', image: 'https://placehold.co/200x200/CD853F/FFFFFF?text=Free+Range+Chicken', brand: 'Bon', weight: '1kg', rating: 4.9, inStock: true, discount: 0 },
    { id: 67, name: '1kg Grass Fed Beef', price: 32.00, store: 'Bon Marche', category: 'meat', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Grass+Fed+Beef', brand: 'Bon', weight: '1kg', rating: 4.9, inStock: true, discount: 0 },
    { id: 68, name: 'Mixed Organic Vegetables 1kg', price: 8.50, store: 'Bon Marche', category: 'produce', image: 'https://placehold.co/200x200/9ACD32/000000?text=Mixed+Organic+Veg', brand: 'Bon', weight: '1kg', rating: 4.8, inStock: true, discount: 0 },
    { id: 69, name: 'Organic Apples 1kg', price: 9.80, store: 'Bon Marche', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Organic+Apples', brand: 'Bon', weight: '1kg', rating: 4.9, inStock: true, discount: 0 },
    { id: 70, name: 'Organic Oranges 1kg', price: 8.20, store: 'Bon Marche', category: 'produce', image: 'https://placehold.co/200x200/FFA500/000000?text=Organic+Oranges', brand: 'Bon', weight: '1kg', rating: 4.8, inStock: true, discount: 0 },
    { id: 71, name: '1L Organic Milk', price: 6.50, store: 'Bon Marche', category: 'dairy', image: 'https://placehold.co/200x200/87CEEB/000000?text=Organic+Milk', brand: 'Bon', volume: '1L', rating: 4.8, inStock: true, discount: 0 },
    { id: 72, name: '1kg Organic Rice', price: 8.80, store: 'Bon Marche', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Organic+Rice', brand: 'Bon', weight: '1kg', rating: 4.9, inStock: true, discount: 0 },
    { id: 73, name: '1kg Organic Pasta', price: 6.20, store: 'Bon Marche', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Organic+Pasta', brand: 'Bon', weight: '1kg', rating: 4.7, inStock: true, discount: 0 },
    { id: 74, name: '1 Can Organic Tuna', price: 8.50, store: 'Bon Marche', category: 'canned', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Organic+Tuna', brand: 'Bon', weight: '155g', rating: 4.8, inStock: true, discount: 0 },
    { id: 75, name: '1kg Organic Pears', price: 9.20, store: 'Bon Marche', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Organic+Pears', brand: 'Bon', weight: '1kg', rating: 4.8, inStock: true, discount: 0 },
    
    // Choppies
    { id: 76, name: '2kg Standard Mealie Meal', price: 4.00, store: 'Choppies', category: 'staples', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Standard+Mealie+Meal', brand: 'Choppies', weight: '2kg', rating: 4.3, inStock: true, discount: 0 },
    { id: 77, name: '1kg Standard Sugar', price: 3.00, store: 'Choppies', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Standard+Sugar', brand: 'Choppies', weight: '1kg', rating: 4.2, inStock: true, discount: 0 },
    { id: 78, name: '1L Standard Oil', price: 7.50, store: 'Choppies', category: 'staples', image: 'https://placehold.co/200x200/FFD700/000000?text=Standard+Oil', brand: 'Choppies', volume: '1L', rating: 4.3, inStock: true, discount: 0 },
    { id: 79, name: '6 Standard Eggs', price: 2.50, store: 'Choppies', category: 'dairy', image: 'https://placehold.co/200x200/F8F8FF/000000?text=Standard+Eggs', brand: 'Choppies', quantity: '6', rating: 4.1, inStock: true, discount: 0 },
    { id: 80, name: 'Standard Bread Loaf', price: 2.20, store: 'Choppies', category: 'bakery', image: 'https://placehold.co/200x200/DEB887/000000?text=Standard+Bread', brand: 'Choppies', weight: '800g', rating: 4.0, inStock: true, discount: 0 },
    { id: 81, name: '1kg Standard Chicken', price: 11.00, store: 'Choppies', category: 'meat', image: 'https://placehold.co/200x200/CD853F/FFFFFF?text=Standard+Chicken', brand: 'Choppies', weight: '1kg', rating: 4.2, inStock: true, discount: 0 },
    { id: 82, name: '1kg Standard Beef', price: 14.00, store: 'Choppies', category: 'meat', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Standard+Beef', brand: 'Choppies', weight: '1kg', rating: 4.3, inStock: true, discount: 0 },
    { id: 83, name: 'Mixed Vegetables 1kg', price: 3.80, store: 'Choppies', category: 'produce', image: 'https://placehold.co/200x200/9ACD32/000000?text=Mixed+Veg', brand: 'Choppies', weight: '1kg', rating: 4.2, inStock: true, discount: 0 },
    { id: 84, name: 'Apples 1kg', price: 4.80, store: 'Choppies', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Apples', brand: 'Choppies', weight: '1kg', rating: 4.3, inStock: true, discount: 0 },
    { id: 85, name: 'Oranges 1kg', price: 4.20, store: 'Choppies', category: 'produce', image: 'https://placehold.co/200x200/FFA500/000000?text=Oranges', brand: 'Choppies', weight: '1kg', rating: 4.1, inStock: true, discount: 0 },
    { id: 86, name: '1L Standard Milk', price: 3.80, store: 'Choppies', category: 'dairy', image: 'https://placehold.co/200x200/87CEEB/000000?text=Standard+Milk', brand: 'Choppies', volume: '1L', rating: 4.2, inStock: true, discount: 0 },
    { id: 87, name: '1kg Standard Rice', price: 5.20, store: 'Choppies', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Standard+Rice', brand: 'Choppies', weight: '1kg', rating: 4.3, inStock: true, discount: 0 },
    { id: 88, name: '1kg Standard Pasta', price: 3.60, store: 'Choppies', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Standard+Pasta', brand: 'Choppies', weight: '1kg', rating: 4.1, inStock: true, discount: 0 },
    { id: 89, name: '1 Can Standard Tuna', price: 5.80, store: 'Choppies', category: 'canned', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Standard+Tuna', brand: 'Choppies', weight: '155g', rating: 4.2, inStock: true, discount: 0 },
    { id: 90, name: '1kg Standard Pears', price: 4.60, store: 'Choppies', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Standard+Pears', brand: 'Choppies', weight: '1kg', rating: 4.3, inStock: true, discount: 0 },
    
    // Pick n Save
    { id: 91, name: '2kg Value Mealie Meal', price: 3.80, store: 'Pick n Save', category: 'staples', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Value+Mealie+Meal', brand: 'PnS', weight: '2kg', rating: 4.2, inStock: true, discount: 0 },
    { id: 92, name: '1kg Value Sugar', price: 2.80, store: 'Pick n Save', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Value+Sugar', brand: 'PnS', weight: '1kg', rating: 4.1, inStock: true, discount: 0 },
    { id: 93, name: '1L Value Oil', price: 7.00, store: 'Pick n Save', category: 'staples', image: 'https://placehold.co/200x200/FFD700/000000?text=Value+Oil', brand: 'PnS', volume: '1L', rating: 4.2, inStock: true, discount: 0 },
    { id: 94, name: '6 Value Eggs', price: 2.30, store: 'Pick n Save', category: 'dairy', image: 'https://placehold.co/200x200/F8F8FF/000000?text=Value+Eggs', brand: 'PnS', quantity: '6', rating: 4.0, inStock: true, discount: 0 },
    { id: 95, name: 'Value Bread Loaf', price: 2.00, store: 'Pick n Save', category: 'bakery', image: 'https://placehold.co/200x200/DEB887/000000?text=Value+Bread', brand: 'PnS', weight: '800g', rating: 4.1, inStock: true, discount: 0 },
    { id: 96, name: '1kg Value Chicken', price: 10.50, store: 'Pick n Save', category: 'meat', image: 'https://placehold.co/200x200/CD853F/FFFFFF?text=Value+Chicken', brand: 'PnS', weight: '1kg', rating: 4.2, inStock: true, discount: 0 },
    { id: 97, name: '1kg Value Beef', price: 13.50, store: 'Pick n Save', category: 'meat', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Value+Beef', brand: 'PnS', weight: '1kg', rating: 4.3, inStock: true, discount: 0 },
    { id: 98, name: 'Mixed Vegetables 1kg', price: 3.50, store: 'Pick n Save', category: 'produce', image: 'https://placehold.co/200x200/9ACD32/000000?text=Mixed+Veg', brand: 'PnS', weight: '1kg', rating: 4.1, inStock: true, discount: 0 },
    { id: 99, name: 'Apples 1kg', price: 4.50, store: 'Pick n Save', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Apples', brand: 'PnS', weight: '1kg', rating: 4.2, inStock: true, discount: 0 },
    { id: 100, name: 'Oranges 1kg', price: 4.00, store: 'Pick n Save', category: 'produce', image: 'https://placehold.co/200x200/FFA500/000000?text=Oranges', brand: 'PnS', weight: '1kg', rating: 4.1, inStock: true, discount: 0 },
    { id: 101, name: '1L Value Milk', price: 3.50, store: 'Pick n Save', category: 'dairy', image: 'https://placehold.co/200x200/87CEEB/000000?text=Value+Milk', brand: 'PnS', volume: '1L', rating: 4.2, inStock: true, discount: 0 },
    { id: 102, name: '1kg Value Rice', price: 4.80, store: 'Pick n Save', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Value+Rice', brand: 'PnS', weight: '1kg', rating: 4.3, inStock: true, discount: 0 },
    { id: 103, name: '1kg Value Pasta', price: 3.40, store: 'Pick n Save', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Value+Pasta', brand: 'PnS', weight: '1kg', rating: 4.1, inStock: true, discount: 0 },
    { id: 104, name: '1 Can Value Tuna', price: 5.20, store: 'Pick n Save', category: 'canned', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Value+Tuna', brand: 'PnS', weight: '155g', rating: 4.2, inStock: true, discount: 0 },
    { id: 105, name: '1kg Value Pears', price: 4.20, store: 'Pick n Save', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Value+Pears', brand: 'PnS', weight: '1kg', rating: 4.3, inStock: true, discount: 0 },
    
    // RiteWay
    { id: 106, name: '2kg Standard Mealie Meal', price: 4.20, store: 'RiteWay', category: 'staples', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Standard+Mealie+Meal', brand: 'RiteWay', weight: '2kg', rating: 4.3, inStock: true, discount: 0 },
    { id: 107, name: '1kg Standard Sugar', price: 3.10, store: 'RiteWay', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Standard+Sugar', brand: 'RiteWay', weight: '1kg', rating: 4.2, inStock: true, discount: 0 },
    { id: 108, name: '1L Standard Oil', price: 7.80, store: 'RiteWay', category: 'staples', image: 'https://placehold.co/200x200/FFD700/000000?text=Standard+Oil', brand: 'RiteWay', volume: '1L', rating: 4.3, inStock: true, discount: 0 },
    { id: 109, name: '6 Standard Eggs', price: 2.60, store: 'RiteWay', category: 'dairy', image: 'https://placehold.co/200x200/F8F8FF/000000?text=Standard+Eggs', brand: 'RiteWay', quantity: '6', rating: 4.1, inStock: true, discount: 0 },
    { id: 110, name: 'Standard Bread Loaf', price: 2.30, store: 'RiteWay', category: 'bakery', image: 'https://placehold.co/200x200/DEB887/000000?text=Standard+Bread', brand: 'RiteWay', weight: '800g', rating: 4.2, inStock: true, discount: 0 },
    { id: 111, name: '1kg Standard Chicken', price: 11.20, store: 'RiteWay', category: 'meat', image: 'https://placehold.co/200x200/CD853F/FFFFFF?text=Standard+Chicken', brand: 'RiteWay', weight: '1kg', rating: 4.3, inStock: true, discount: 0 },
    { id: 112, name: '1kg Standard Beef', price: 14.20, store: 'RiteWay', category: 'meat', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Standard+Beef', brand: 'RiteWay', weight: '1kg', rating: 4.4, inStock: true, discount: 0 },
    { id: 113, name: 'Mixed Vegetables 1kg', price: 3.90, store: 'RiteWay', category: 'produce', image: 'https://placehold.co/200x200/9ACD32/000000?text=Mixed+Veg', brand: 'RiteWay', weight: '1kg', rating: 4.2, inStock: true, discount: 0 },
    { id: 114, name: 'Apples 1kg', price: 4.90, store: 'RiteWay', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Apples', brand: 'RiteWay', weight: '1kg', rating: 4.3, inStock: true, discount: 0 },
    { id: 115, name: 'Oranges 1kg', price: 4.30, store: 'RiteWay', category: 'produce', image: 'https://placehold.co/200x200/FFA500/000000?text=Oranges', brand: 'RiteWay', weight: '1kg', rating: 4.2, inStock: true, discount: 0 },
    { id: 116, name: '1L Standard Milk', price: 3.90, store: 'RiteWay', category: 'dairy', image: 'https://placehold.co/200x200/87CEEB/000000?text=Standard+Milk', brand: 'RiteWay', volume: '1L', rating: 4.3, inStock: true, discount: 0 },
    { id: 117, name: '1kg Standard Rice', price: 5.40, store: 'RiteWay', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Standard+Rice', brand: 'RiteWay', weight: '1kg', rating: 4.4, inStock: true, discount: 0 },
    { id: 118, name: '1kg Standard Pasta', price: 3.70, store: 'RiteWay', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Standard+Pasta', brand: 'RiteWay', weight: '1kg', rating: 4.2, inStock: true, discount: 0 },
    { id: 119, name: '1 Can Standard Tuna', price: 6.00, store: 'RiteWay', category: 'canned', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Standard+Tuna', brand: 'RiteWay', weight: '155g', rating: 4.3, inStock: true, discount: 0 },
    { id: 120, name: '1kg Standard Pears', price: 4.70, store: 'RiteWay', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Standard+Pears', brand: 'RiteWay', weight: '1kg', rating: 4.4, inStock: true, discount: 0 },
    
    // Fresh Stop
    { id: 121, name: '2kg Fresh Mealie Meal', price: 4.30, store: 'Fresh Stop', category: 'staples', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Fresh+Mealie+Meal', brand: 'Fresh', weight: '2kg', rating: 4.4, inStock: true, discount: 0 },
    { id: 122, name: '1kg Fresh Sugar', price: 3.10, store: 'Fresh Stop', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Fresh+Sugar', brand: 'Fresh', weight: '1kg', rating: 4.3, inStock: true, discount: 0 },
    { id: 123, name: '1L Fresh Oil', price: 7.90, store: 'Fresh Stop', category: 'staples', image: 'https://placehold.co/200x200/FFD700/000000?text=Fresh+Oil', brand: 'Fresh', volume: '1L', rating: 4.4, inStock: true, discount: 0 },
    { id: 124, name: '6 Fresh Eggs', price: 2.70, store: 'Fresh Stop', category: 'dairy', image: 'https://placehold.co/200x200/F8F8FF/000000?text=Fresh+Eggs', brand: 'Fresh', quantity: '6', rating: 4.5, inStock: true, discount: 0 },
    { id: 125, name: 'Fresh Bread Loaf', price: 2.40, store: 'Fresh Stop', category: 'bakery', image: 'https://placehold.co/200x200/DEB887/000000?text=Fresh+Bread', brand: 'Fresh', weight: '800g', rating: 4.3, inStock: true, discount: 0 },
    { id: 126, name: '1kg Fresh Chicken', price: 11.50, store: 'Fresh Stop', category: 'meat', image: 'https://placehold.co/200x200/CD853F/FFFFFF?text=Fresh+Chicken', brand: 'Fresh', weight: '1kg', rating: 4.6, inStock: true, discount: 0 },
    { id: 127, name: '1kg Fresh Beef', price: 14.50, store: 'Fresh Stop', category: 'meat', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Fresh+Beef', brand: 'Fresh', weight: '1kg', rating: 4.7, inStock: true, discount: 0 },
    { id: 128, name: 'Mixed Fresh Vegetables 1kg', price: 4.00, store: 'Fresh Stop', category: 'produce', image: 'https://placehold.co/200x200/9ACD32/000000?text=Mixed+Fresh+Veg', brand: 'Fresh', weight: '1kg', rating: 4.6, inStock: true, discount: 0 },
    { id: 129, name: 'Fresh Apples 1kg', price: 5.00, store: 'Fresh Stop', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Fresh+Apples', brand: 'Fresh', weight: '1kg', rating: 4.7, inStock: true, discount: 0 },
    { id: 130, name: 'Fresh Oranges 1kg', price: 4.40, store: 'Fresh Stop', category: 'produce', image: 'https://placehold.co/200x200/FFA500/000000?text=Fresh+Oranges', brand: 'Fresh', weight: '1kg', rating: 4.5, inStock: true, discount: 0 },
    { id: 131, name: '1L Fresh Milk', price: 4.00, store: 'Fresh Stop', category: 'dairy', image: 'https://placehold.co/200x200/87CEEB/000000?text=Fresh+Milk', brand: 'Fresh', volume: '1L', rating: 4.6, inStock: true, discount: 0 },
    { id: 132, name: '1kg Fresh Rice', price: 5.50, store: 'Fresh Stop', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Fresh+Rice', brand: 'Fresh', weight: '1kg', rating: 4.7, inStock: true, discount: 0 },
    { id: 133, name: '1kg Fresh Pasta', price: 3.80, store: 'Fresh Stop', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Fresh+Pasta', brand: 'Fresh', weight: '1kg', rating: 4.5, inStock: true, discount: 0 },
    { id: 134, name: '1 Can Fresh Tuna', price: 6.20, store: 'Fresh Stop', category: 'canned', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Fresh+Tuna', brand: 'Fresh', weight: '155g', rating: 4.6, inStock: true, discount: 0 },
    { id: 135, name: '1kg Fresh Pears', price: 4.80, store: 'Fresh Stop', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Fresh+Pears', brand: 'Fresh', weight: '1kg', rating: 4.7, inStock: true, discount: 0 },
    
    // Cash & Carry
    { id: 136, name: '2kg Bulk Mealie Meal', price: 3.60, store: 'Cash & Carry', category: 'staples', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Bulk+Mealie+Meal', brand: 'CAC', weight: '2kg', rating: 4.1, inStock: true, discount: 0 },
    { id: 137, name: '1kg Bulk Sugar', price: 2.60, store: 'Cash & Carry', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Bulk+Sugar', brand: 'CAC', weight: '1kg', rating: 4.0, inStock: true, discount: 0 },
    { id: 138, name: '1L Bulk Oil', price: 6.80, store: 'Cash & Carry', category: 'staples', image: 'https://placehold.co/200x200/FFD700/000000?text=Bulk+Oil', brand: 'CAC', volume: '1L', rating: 4.1, inStock: true, discount: 0 },
    { id: 139, name: '6 Bulk Eggs', price: 2.10, store: 'Cash & Carry', category: 'dairy', image: 'https://placehold.co/200x200/F8F8FF/000000?text=Bulk+Eggs', brand: 'CAC', quantity: '6', rating: 4.0, inStock: true, discount: 0 },
    { id: 140, name: 'Bulk Bread Loaf', price: 1.80, store: 'Cash & Carry', category: 'bakery', image: 'https://placehold.co/200x200/DEB887/000000?text=Bulk+Bread', brand: 'CAC', weight: '800g', rating: 3.9, inStock: true, discount: 0 },
    { id: 141, name: '1kg Bulk Chicken', price: 9.80, store: 'Cash & Carry', category: 'meat', image: 'https://placehold.co/200x200/CD853F/FFFFFF?text=Bulk+Chicken', brand: 'CAC', weight: '1kg', rating: 4.1, inStock: true, discount: 0 },
    { id: 142, name: '1kg Bulk Beef', price: 12.80, store: 'Cash & Carry', category: 'meat', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Bulk+Beef', brand: 'CAC', weight: '1kg', rating: 4.2, inStock: true, discount: 0 },
    { id: 143, name: 'Mixed Bulk Vegetables 1kg', price: 3.20, store: 'Cash & Carry', category: 'produce', image: 'https://placehold.co/200x200/9ACD32/000000?text=Mixed+Bulk+Veg', brand: 'CAC', weight: '1kg', rating: 4.0, inStock: true, discount: 0 },
    { id: 144, name: 'Bulk Apples 1kg', price: 4.20, store: 'Cash & Carry', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Bulk+Apples', brand: 'CAC', weight: '1kg', rating: 4.1, inStock: true, discount: 0 },
    { id: 145, name: 'Bulk Oranges 1kg', price: 3.80, store: 'Cash & Carry', category: 'produce', image: 'https://placehold.co/200x200/FFA500/000000?text=Bulk+Oranges', brand: 'CAC', weight: '1kg', rating: 4.0, inStock: true, discount: 0 },
    { id: 146, name: '1L Bulk Milk', price: 3.20, store: 'Cash & Carry', category: 'dairy', image: 'https://placehold.co/200x200/87CEEB/000000?text=Bulk+Milk', brand: 'CAC', volume: '1L', rating: 4.1, inStock: true, discount: 0 },
    { id: 147, name: '1kg Bulk Rice', price: 4.50, store: 'Cash & Carry', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Bulk+Rice', brand: 'CAC', weight: '1kg', rating: 4.2, inStock: true, discount: 0 },
    { id: 148, name: '1kg Bulk Pasta', price: 3.20, store: 'Cash & Carry', category: 'staples', image: 'https://placehold.co/200x200/F5F5DC/000000?text=Bulk+Pasta', brand: 'CAC', weight: '1kg', rating: 4.0, inStock: true, discount: 0 },
    { id: 149, name: '1 Can Bulk Tuna', price: 4.80, store: 'Cash & Carry', category: 'canned', image: 'https://placehold.co/200x200/8B4513/FFFFFF?text=Bulk+Tuna', brand: 'CAC', weight: '155g', rating: 4.1, inStock: true, discount: 0 },
    { id: 150, name: '1kg Bulk Pears', price: 4.00, store: 'Cash & Carry', category: 'produce', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=Bulk+Pears', brand: 'CAC', weight: '1kg', rating: 4.1, inStock: true, discount: 0 },
  ];

  const events = [
    { id: 1, title: 'Oliver Mtukudzi Tribute Concert', type: 'music', date: '2025-01-15', time: '19:00', venue: 'Harare International Conference Centre', city: 'Harare', price: 25.00, category: 'concert', image: 'https://picsum.photos/seed/event1/400/300', description: 'Celebrating the life and music of the legendary Oliver Mtukudzi with performances by his band and guest artists.', availableTickets: 8000, organizer: 'Zimbabwe Music Foundation' },
    { id: 2, title: 'Zimbabwe Premier League Final', type: 'sports', date: '2025-02-10', time: '15:00', venue: 'National Sports Stadium', city: 'Harare', price: 20.00, category: 'football', image: 'https://picsum.photos/seed/event2/400/300', description: 'Championship match of the Zimbabwe Premier League featuring the top two teams of the season.', availableTickets: 6000, organizer: 'ZIFA' },
    { id: 3, title: 'Harare International Film Festival', type: 'entertainment', date: '2025-02-20', time: '17:00', venue: 'Book Café', city: 'Harare', price: 15.00, category: 'festival', image: 'https://picsum.photos/seed/event3/400/300', description: 'Showcasing African and international cinema with screenings, workshops, and panel discussions.', availableTickets: 5000, organizer: 'HIFF' },
    { id: 4, title: 'Zimbabwe Mining League Final', type: 'sports', date: '2025-02-25', time: '15:00', venue: 'National Sports Stadium', city: 'Harare', price: 25.00, category: 'football', image: 'https://picsum.photos/seed/event4/400/300', description: 'Premier Soccer League match between two of Zimbabwe\'s top mining club teams.', availableTickets: 8000, organizer: 'ZIFA' },
    { id: 5, title: 'Afrobeats Night with Burna Boy', type: 'music', date: '2025-03-05', time: '20:00', venue: 'HICC Arena', city: 'Harare', price: 50.00, category: 'concert', image: 'https://picsum.photos/seed/event5/400/300', description: 'International superstar Burna Boy brings his African Giant tour to Zimbabwe for one night only.', availableTickets: 8000, organizer: 'Global Concerts Zimbabwe' },
    { id: 6, title: 'Zimbabwe Agricultural Show', type: 'exhibition', date: '2025-03-10', time: '09:00', venue: 'Harare Showgrounds', city: 'Harare', price: 10.00, category: 'exhibition', image: 'https://picsum.photos/seed/event6/400/300', description: 'Annual agricultural exhibition and trade fair showcasing the latest in farming technology and produce.', availableTickets: 10000, organizer: 'ZNAE' },
    { id: 7, title: 'Trevor Noah Live in Harare', type: 'comedy', date: '2025-03-15', time: '20:00', venue: 'HICC Arena', city: 'Harare', price: 45.00, category: 'comedy', image: 'https://picsum.photos/seed/event7/400/300', description: 'International comedy sensation Trevor Noah returns to his roots for a special stand-up performance.', availableTickets: 6000, organizer: 'Comedy Central Africa' },
    { id: 8, title: 'Harare International Jazz Festival', type: 'music', date: '2025-03-20', time: '18:00', venue: 'HICC', city: 'Harare', price: 35.00, category: 'festival', image: 'https://picsum.photos/seed/event8/400/300', description: 'A week-long celebration of jazz music featuring local and international jazz artists.', availableTickets: 12000, organizer: 'Zimbabwe Jazz Foundation' },
    { id: 9, title: 'ZIFA Cup Final', type: 'sports', date: '2025-04-15', time: '16:00', venue: 'National Sports Stadium', city: 'Harare', price: 20.00, category: 'football', image: 'https://picsum.photos/seed/event9/400/300', description: 'The grand finale of Zimbabwe\'s premier knockout football competition with the winner qualifying for continental football.', availableTickets: 25000, organizer: 'ZIFA' },
    { id: 10, title: 'Comedy Night with Trevor Noah', type: 'entertainment', date: '2025-02-28', time: '19:30', venue: 'Harare Gardens', city: 'Harare', price: 40.00, category: 'comedy', image: 'https://picsum.photos/seed/event10/400/300', description: 'The international comedy superstar brings his latest show to Harare for a special performance.', availableTickets: 10000, organizer: 'Global Comedy Tours' },
    { id: 11, title: 'Zimbabwe International Trade Fair', type: 'exhibition', date: '2025-05-05', time: '09:00', venue: 'Harare Exhibition Grounds', city: 'Harare', price: 15.00, category: 'exhibition', image: 'https://picsum.photos/seed/event11/400/300', description: 'The largest trade exhibition in Zimbabwe showcasing products and services from local and international businesses.', availableTickets: 15000, organizer: 'ZITF' },
    { id: 12, title: 'Harare Fashion Week', type: 'entertainment', date: '2025-04-20', time: '18:00', venue: 'HICC Arena', city: 'Harare', price: 30.00, category: 'fashion', image: 'https://picsum.photos/seed/event12/400/300', description: 'Showcasing the latest collections from Zimbabwe\'s top fashion designers and emerging talent.', availableTickets: 5000, organizer: 'Zimbabwe Fashion Council' }
  ];

  const governmentServices = [
    { id: 1, name: 'Vehicle License Renewal', category: 'transport', fee: 45, description: 'Renew your vehicle license for 12 months', required: 'Vehicle Registration Number, ID Number' },
    { id: 2, name: 'Vehicle Registration', category: 'transport', fee: 120, description: 'Register a new vehicle', required: 'Proof of Ownership, ID Number, Vehicle Inspection Certificate' },
    { id: 3, name: 'Driver\'s License Renewal', category: 'transport', fee: 35, description: 'Renew your driver\'s license', required: 'Current License Number, ID Number, Medical Certificate' },
    { id: 4, name: 'Driver\'s License Application', category: 'transport', fee: 85, description: 'Apply for a new driver\'s license', required: 'ID Number, Medical Certificate, Learner\'s Permit' },
    { id: 5, name: 'National ID Application', category: 'identity', fee: 30, description: 'Apply for a national identification card', required: 'Birth Certificate, Proof of Residence, Passport Photo' },
    { id: 6, name: 'National ID Replacement', category: 'identity', fee: 40, description: 'Replace a lost or damaged national ID', required: 'Police Report, Old ID (if available), Proof of Residence' },
    { id: 7, name: 'Passport Application', category: 'immigration', fee: 120, description: 'Apply for a new passport', required: 'National ID, Birth Certificate, Passport Photos, Application Form' },
    { id: 8, name: 'Passport Renewal', category: 'immigration', fee: 100, description: 'Renew your expiring passport', required: 'Current Passport, National ID, Passport Photos' },
    { id: 9, name: 'Birth Certificate', category: 'civil', fee: 25, description: 'Obtain a birth certificate for a newborn', required: 'Hospital Birth Report, Parents\' IDs, Marriage Certificate (if applicable)' },
    { id: 10, name: 'Marriage Certificate', category: 'civil', fee: 50, description: 'Register your marriage and obtain certificate', required: 'Both Parties\' IDs, Single Status Affidavit, Marriage Officer Certificate' },
    { id: 11, name: 'Death Certificate', category: 'civil', fee: 30, description: 'Register a death and obtain certificate', required: 'Medical Death Report, Deceased\'s ID, Next of Kin ID' },
    { id: 12, name: 'Business Registration', category: 'business', fee: 200, description: 'Register your business with the Registrar of Companies', required: 'ID of Directors, Business Name Reservation, Address Proof' },
    { id: 13, name: 'Business License', category: 'business', fee: 150, description: 'Obtain a business operating license', required: 'Business Registration Certificate, ID, Premises Lease Agreement' },
    { id: 14, name: 'Tax Registration', category: 'business', fee: 50, description: 'Register for tax purposes with ZIMRA', required: 'Business Registration, Director\'s IDs, Business Address' },
    { id: 15, name: 'Harare City Council Rates', category: 'municipal', fee: 200, description: 'Pay your municipal rates for Harare City', required: 'Property Address, ID Number, Previous Receipt (if available)' },
    { id: 16, name: 'Bulawayo City Council Rates', category: 'municipal', fee: 180, description: 'Pay your municipal rates for Bulawayo City', required: 'Property Address, ID Number, Previous Receipt (if available)' },
    { id: 17, name: 'Chitungwiza Municipality Rates', category: 'municipal', fee: 160, description: 'Pay your municipal rates for Chitungwiza', required: 'Property Address, ID Number, Previous Receipt (if available)' },
    { id: 18, name: 'Building Permit', category: 'municipal', fee: 300, description: 'Apply for a building permit for construction', required: 'Architectural Plans, Land Title Deed, ID, Site Location Map' },
    { id: 19, name: 'Fire Safety Certificate', category: 'municipal', fee: 200, description: 'Obtain fire safety compliance certificate', required: 'Fire Extinguishers, Emergency Exits, Fire Alarm System' },
    { id: 20, name: 'Health Certificate', category: 'municipal', fee: 150, description: 'Obtain health certificate for food businesses', required: 'Premises Inspection, Staff Medicals, Sanitation Facilities' },
  ];

  const paymentMethods = [
    { id: 'ecocash', name: 'Ecocash', icon: '📱', description: 'Pay with your mobile money account' },
    { id: 'onemoney', name: 'OneMoney', icon: '💳', description: 'Use your digital wallet' },
    { id: 'zimswitch', name: 'ZimSwitch', icon: '🏧', description: 'Direct bank transfer' },
    { id: 'visa', name: 'Visa', icon: '💳', description: 'Credit/Debit card payment' },
    { id: 'mastercard', name: 'Mastercard', icon: '💳', description: 'Credit/Debit card payment' },
    { id: 'amex', name: 'American Express', icon: '💳', description: 'Premium card payment' },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: '🏦', description: 'Direct bank to bank transfer' },
    { id: 'cash', name: 'Cash Payment', icon: '💵', description: 'Pay cash at designated agents' }
  ];

  // Methods
  const addToCart = (item, category) => {
    const newItem = {
      ...item,
      category,
      quantity: 1,
      reference: `REF${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setCart([...cart, newItem]);
    addNotification(`Added ${item.name || item.title} to cart`, 'success');
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    addNotification('Item removed from cart', 'info');
  };

  const processPayment = () => {
    if (cart.length === 0) {
      addNotification('Your cart is empty', 'error');
      return;
    }
    
    if (user && userBalance < cart.reduce((sum, item) => sum + item.price, 0)) {
      addNotification('Insufficient balance', 'error');
      return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
    const transactionId = `TXN${Date.now()}`;
    
    // Update user balance if logged in
    if (user) {
      setUserBalance(userBalance - total);
    }
    
    // Add to transaction history
    const transaction = {
      id: transactionId,
      items: [...cart],
      total,
      paymentMethod,
      currency,
      date: new Date().toISOString(),
      status: 'completed',
      emailReceipt: showEmailReceipt,
      receiptEmail: showEmailReceipt ? receiptEmail : '',
      remindMe: remindMe
    };
    
    addNotification(`Payment successful! Transaction: ${transactionId}`, 'success');
    
    // Clear cart
    setCart([]);
    setShowCart(false);
    setShowEmailReceipt(false);
    setReceiptEmail('');
    setRemindMe(false);
  };

  const paySchoolFees = (university) => {
    const studentName = prompt('Enter student full name:');
    if (studentName) {
      addToCart({
        name: `School Fees - ${university.name}`,
        price: 200,
        student: studentName,
        institution: university.name,
        country: university.country,
        type: 'education'
      }, 'education');
    }
  };

  const processEducationPayment = () => {
    const studentName = "John Doe";
    const amount = 200;
    
    addToCart({
      name: `School Fees - ${studentName}`,
      price: amount,
      student: studentName,
      country: educationCountry,
      type: 'education'
    }, 'education');
  };

  const processUtilityPayment = () => {
    const accountNumber = document.querySelector('input[placeholder="Enter account number"]')?.value;
    const amount = document.querySelector('input[placeholder="Enter amount"]')?.value;
    
    if (accountNumber && amount) {
      addToCart({
        name: `${selectedUtility.name} Payment`,
        price: parseFloat(amount),
        account: accountNumber,
        type: 'utility'
      }, 'utility');
      
      setSelectedUtility(null);
    }
  };

  const processGovService = () => {
    const fullName = document.querySelector('input[placeholder="Enter your full name"]')?.value;
    const idNumber = document.querySelector('input[placeholder="Enter ID number"]')?.value;
    
    if (fullName && idNumber) {
      addToCart({
        name: `${selectedGovService.name} Application`,
        price: selectedGovService.fee,
        fullName: fullName,
        idNumber: idNumber,
        type: 'government'
      }, 'government');
      
      setSelectedGovService(null);
    }
  };

  const addNotification = (message, type) => {
    const notification = {
      id: Date.now(),
      message,
      type,
      visible: true
    };
    setNotifications([...notifications, notification]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setNotifications(notifications.filter(n => n.id !== notification.id));
    }, 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      setUser({ email: loginForm.email });
      setLoginForm({ email: '', password: '' });
      setShowLoginModal(false);
      addNotification('Logged in successfully', 'success');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      addNotification('Passwords do not match', 'error');
      return;
    }
    if (registerForm.name && registerForm.email && registerForm.password) {
      setUser({ name: registerForm.name, email: registerForm.email });
      setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
      setShowRegisterModal(false);
      addNotification('Account created successfully', 'success');
    }
  };

  const logout = () => {
    setUser(null);
    addNotification('Logged out successfully', 'info');
  };

  // Utility service methods
  const handleUtilityBuyNow = (utility) => {
    setSelectedUtility(utility);
    
    // Scroll to payment section
    setTimeout(() => {
      if (paymentSectionRef) {
        paymentSectionRef.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Grocery service methods
  const handleGroceryBuyNow = (product) => {
    addToCart(product, 'groceries');
    
    // Scroll to cart/payment section
    setTimeout(() => {
      if (paymentSectionRef) {
        paymentSectionRef.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Event service methods
  const handleEventBuyNow = (event) => {
    addToCart(event, 'events');
    
    // Scroll to cart/payment section
    setTimeout(() => {
      if (paymentSectionRef) {
        paymentSectionRef.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Mobile service methods
  const handleMobileBuyNow = (pkg) => {
    setSelectedMobilePackage(pkg);
    setMobileForm({ number: '', network: pkg.network });
    setShowMobileForm(true);
    
    // Scroll to payment section
    setTimeout(() => {
      if (paymentSectionRef) {
        paymentSectionRef.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const processMobilePayment = () => {
    const { number, network } = mobileForm;
    if (!number || !network) {
      addNotification('Please enter your mobile number', 'error');
      return;
    }
    
    // Add to cart
    addToCart({
      name: `${selectedMobilePackage.name} for ${number}`,
      price: selectedMobilePackage.price,
      phoneNumber: number,
      network: network,
      validity: selectedMobilePackage.validity,
      type: 'mobile'
    }, 'mobile');
    
    // Reset form
    setShowMobileForm(false);
    setSelectedMobilePackage(null);
    setMobileForm({ number: '', network: '' });
  };

  // Fibre service methods
  const handleFibreSubscribe = (provider) => {
    setSelectedFibrePackage(provider);
    setFibreForm({ address: '', contact: '' });
    setShowFibreForm(true);
    
    // Scroll to payment section
    setTimeout(() => {
      if (paymentSectionRef) {
        paymentSectionRef.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const processFibrePayment = () => {
    const { address, contact } = fibreForm;
    if (!address || !contact) {
      addNotification('Please fill in all required fields', 'error');
      return;
    }
    
    // Add to cart
    addToCart({
      name: `${selectedFibrePackage.name} Subscription`,
      price: selectedFibrePackage.price,
      address: address,
      contact: contact,
      speed: selectedFibrePackage.speed,
      location: selectedFibrePackage.location,
      contract: selectedFibrePackage.contract,
      type: 'fibre'
    }, 'fibre');
    
    // Reset form
    setShowFibreForm(false);
    setSelectedFibrePackage(null);
    setFibreForm({ address: '', contact: '' });
  };

  // Animation effects
  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.querySelector('.services-section');
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setServicesVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Trigger animation only once on page load
    if (activeTab === 'home' && !animationTriggered) {
      setAnimationTriggered(true);
    }
  }, [activeTab]);

  // Render methods for each tab
  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-bounce-once">
                All Your Services
                <span className="text-yellow-400"> in One Place</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100 animate-bounce-once">
                Pay bills, buy data, pay school fees, and shop groceries — all from one secure platform designed for Africans.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-all shadow-lg">
                  Get Started
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: '📱', label: 'Mobile Data', count: '50k+' },
                    { icon: '📡', label: 'Fibre Internet', count: '15k+' },
                    { icon: '📚', label: 'Education', count: '8k+' },
                    { icon: '🛒', label: 'Groceries', count: '25k+' },
                    { icon: '🎟️', label: 'Event Tickets', count: '5k+' },
                    { icon: '💡', label: 'Utilities', count: 'Active' }
                  ].map((item, index) => (
                    <div key={index} className="service-card" onClick={() => setActiveTab(item.label.toLowerCase().split(' ')[0] === 'education' ? 'education' : item.label.toLowerCase().split(' ')[0] === 'event' ? 'events' : item.label.toLowerCase().split(' ')[0])}>
                      <div className="text-4xl mb-2">{item.icon}</div>
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-sm text-blue-100">{item.count} transactions</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: '100+', label: 'Service Providers' },
                { value: '500k+', label: 'Happy Customers' },
                { value: '99.9%', label: 'Uptime' },
                { value: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 services-section ${servicesVisible ? 'animate-shake' : ''}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Everything you need, all in one platform</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: '📱', title: 'Mobile Services', desc: 'Data bundles, airtime, and roaming for all networks', color: 'from-blue-500 to-blue-600', tab: 'mobile' },
            { icon: '📡', title: 'Fibre Internet', desc: 'High-speed broadband from leading providers', color: 'from-green-500 to-green-600', tab: 'fibre' },
            { icon: '💧', title: 'Water Payments', desc: 'Pay water bills for all cities in Zimbabwe', color: 'from-blue-500 to-blue-600', tab: 'utilities' },
            { icon: '💡', title: 'Electricity', desc: 'Pay ZESA electricity bills nationwide', color: 'from-yellow-500 to-yellow-600', tab: 'utilities' },
            { icon: '📚', title: 'Education', desc: 'School and university fee payments', color: 'from-purple-500 to-purple-600', tab: 'education' },
            { icon: '🛒', title: 'Groceries', desc: 'Shop from major retailers with pickup options', color: 'from-red-500 to-red-600', tab: 'groceries' },
            { icon: '🎟️', title: 'Event Tickets', desc: 'Concerts, sports, and entertainment events', color: 'from-pink-500 to-pink-600', tab: 'events' },
            { icon: '🏛️', title: 'Gov Services', desc: 'Vehicle licenses, IDs, passports and more', color: 'from-teal-500 to-teal-600', tab: 'government' }
          ].map((service, index) => (
            <div key={index} className="service-card" onClick={() => setActiveTab(service.tab)}>
              <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center text-white text-xl mb-3 mx-auto`}>
                <span>{service.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">{service.title}</h3>
              <p className="text-sm text-gray-600 text-center">{service.desc}</p>
              <div className="mt-3 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab(service.tab);
                  }}
                  className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-3 py-1 rounded text-xs hover:from-blue-700 hover:to-indigo-800 transition-all"
                >
                  {['Education', 'Event Tickets', 'Job Board', 'Gov Services'].includes(service.title) ? 'View' : 'Pay Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Universities Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Institutions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {allSchools.slice(0, 3).map((university) => (
              <div key={university.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{university.name}</h3>
                <p className="text-gray-600 mb-4">Account Number: {university.account}</p>
                <button
                  onClick={() => paySchoolFees(university)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all"
                >
                  Pay School Fees
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white rounded-xl p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-blue-100">Trusted by thousands of Africans</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', role: 'Teacher', text: 'Afripay has made paying school fees so much easier. No more long queues at the bank!' },
              { name: 'Tendai K.', role: 'Student', text: 'I love being able to buy data and groceries in one place. The reference system works perfectly.' },
              { name: 'Mr. Chikwava', role: 'Business Owner', text: 'As a small business owner, the utility payment feature saves me hours every month.' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-2xl mb-2">"</div>
                <p className="mb-3 text-blue-100 text-sm">{testimonial.text}</p>
                <div className="font-semibold text-sm">{testimonial.name}</div>
                <div className="text-blue-200 text-xs">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMobile = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Mobile Services</h1>
          <p className="text-lg text-gray-600">Data bundles and airtime for networks across Africa</p>
        </div>

        {/* Country Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['All', 'Zimbabwe', 'South Africa', 'Zambia', 'Malawi', 'Kenya', 'Nigeria', 'Ghana', 'Tanzania', 'Uganda', 'Mozambique', 'Botswana', 'Namibia', 'Angola', 'Rwanda'].map(country => (
            <button
              key={country}
              onClick={() => setMobileCountry(country)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                mobileCountry === country
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {mobilePackages.filter(pkg => mobileCountry === 'All' || pkg.country === mobileCountry).map(pkg => (
            <div key={pkg.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-2">
                <div 
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    pkg.network.includes('Econet') ? 'bg-green-50 text-green-800' :
                    pkg.network.includes('NetOne') ? 'bg-blue-50 text-blue-800' :
                    pkg.network.includes('MTN') ? 'bg-orange-50 text-orange-800' :
                    pkg.network.includes('Vodacom') ? 'bg-red-50 text-red-800' :
                    pkg.network.includes('Airtel') ? 'bg-purple-50 text-purple-800' :
                    pkg.network.includes('Cell C') ? 'bg-pink-50 text-pink-800' :
                    pkg.network.includes('TNM') ? 'bg-teal-50 text-teal-800' :
                    pkg.network.includes('Movicel') ? 'bg-indigo-50 text-indigo-800' :
                    pkg.network.includes('Mascom') ? 'bg-yellow-50 text-yellow-800' :
                    pkg.network.includes('MTC') ? 'bg-gray-50 text-gray-800' :
                    'bg-gray-50 text-gray-800'
                  }`}
                >
                  {pkg.network}
                </div>
                <span className="text-xs text-gray-500">{pkg.country}</span>
              </div>
              
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{pkg.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{pkg.validity} validity</p>
              
              <div className="flex justify-between items-center mb-3">
                <div className="text-lg font-bold text-gray-900">{currencySymbols[currency]}{(pkg.price * currencyRates[currency]).toFixed(2)}</div>
                <div 
                  className={`px-1 py-0.5 rounded text-xs font-semibold ${
                    pkg.type === 'data' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}
                >
                  {pkg.type}
                </div>
              </div>
              
              <button
                onClick={() => handleMobileBuyNow(pkg)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded text-sm font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>

        {/* Mobile Payment Form */}
        {showMobileForm && selectedMobilePackage && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8" ref={el => setPaymentSectionRef(el)}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Purchase {selectedMobilePackage.name}</h2>
              <button onClick={() => setShowMobileForm(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Network</label>
                <select
                  value={mobileForm.network}
                  onChange={(e) => setMobileForm({...mobileForm, network: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {mobilePackages.filter(pkg => pkg.country === selectedMobilePackage.country).map(pkg => (
                    <option key={pkg.network} value={pkg.network}>{pkg.network}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  value={mobileForm.number}
                  onChange={(e) => setMobileForm({...mobileForm, number: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Package:</span>
                <span className="text-gray-900">{selectedMobilePackage.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Validity:</span>
                <span className="text-gray-900">{selectedMobilePackage.validity}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Network:</span>
                <span className="text-gray-900">{mobileForm.network}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span>{currencySymbols[currency]}{(selectedMobilePackage.price * currencyRates[currency]).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={processMobilePayment}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
              >
                Process Payment
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to Use</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Select Country', desc: 'Choose the African country and network you need' },
              { title: 'Enter Number', desc: 'Input the mobile number to receive data' },
              { title: 'Confirm Payment', desc: 'Complete payment and get instant delivery' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mx-auto mb-2 text-xs">{index + 1}</div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-xs text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFibre = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Fibre Internet</h1>
          <p className="text-lg text-gray-600">High-speed broadband from leading providers across Africa</p>
        </div>

        {/* Country Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['All', 'Zimbabwe', 'South Africa', 'Kenya', 'Nigeria', 'Ghana', 'Uganda', 'Tanzania', 'Zambia', 'Botswana', 'Namibia', 'Rwanda'].map(country => (
            <button
              key={country}
              onClick={() => setFibreCountry(country)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                fibreCountry === country
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {fibreProviders.filter(p => fibreCountry === 'All' || p.country === fibreCountry).map(provider => (
            <div key={provider.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{provider.name}</h3>
                  <p className="text-sm text-gray-600">{provider.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">{currencySymbols[currency]}{(provider.price * currencyRates[currency]).toFixed(2)}</div>
                  <div className="text-xs text-gray-600">per month</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">{provider.speed} Speed</span>
                </div>
                <div className="flex items-center mb-1">
                  <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">Unlimited Data</span>
                </div>
                <div className="flex items-center mb-1">
                  <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">Contract: {provider.contract}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">Installation: {provider.installation}</span>
                </div>
              </div>
              
              <button
                onClick={() => handleFibreSubscribe(provider)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded text-sm font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>

        {/* Fibre Payment Form */}
        {showFibreForm && selectedFibrePackage && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8" ref={el => setPaymentSectionRef(el)}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Subscribe to {selectedFibrePackage.name}</h2>
              <button onClick={() => setShowFibreForm(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                <input
                  type="text"
                  value={fibreForm.address}
                  onChange={(e) => setFibreForm({...fibreForm, address: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  value={fibreForm.contact}
                  onChange={(e) => setFibreForm({...fibreForm, contact: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your contact number"
                />
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Service:</span>
                <span className="text-gray-900">{selectedFibrePackage.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Speed:</span>
                <span className="text-gray-900">{selectedFibrePackage.speed}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Contract:</span>
                <span className="text-gray-900">{selectedFibrePackage.contract}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span>{currencySymbols[currency]}{(selectedFibrePackage.price * currencyRates[currency]).toFixed(2)}/month</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={processFibrePayment}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
              >
                Process Payment
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Installation Process</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Check Availability', desc: 'Verify if service is available in your area' },
              { title: 'Schedule Visit', desc: 'Book a technician for installation' },
              { title: 'Install Equipment', desc: 'Professional setup of modem and cabling' },
              { title: 'Start Browsing', desc: 'Enjoy high-speed internet immediately' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mx-auto mb-2 text-xs">{index + 1}</div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-xs text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUtilities = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Utility Payments</h1>
          <p className="text-lg text-gray-600">Pay your essential bills in one place</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {utilities.map(utility => (
            <div key={utility.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all text-center">
              <div className="text-5xl mb-4">{utility.logo}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{utility.name}</h3>
              <div className="mb-4 text-sm text-gray-600">
                <span>Min: {currencySymbols[currency]}{(utility.min * currencyRates[currency]).toFixed(2)}</span> | 
                <span> Max: {currencySymbols[currency]}{(utility.max * currencyRates[currency]).toFixed(2)}</span>
              </div>
              <button
                onClick={() => handleUtilityBuyNow(utility)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded text-sm font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
              >
                Pay Now
              </button>
            </div>
          ))}
        </div>

        {/* Payment Form */}
        {selectedUtility && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8" ref={el => setPaymentSectionRef(el)}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedUtility.name}</h2>
              <button onClick={() => setSelectedUtility(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter account number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Pay ({currencySymbols[currency]})</label>
                <input type="number" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter amount" />
              </div>
            </div>
            
            {/* Email Receipt Option */}
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id="emailReceipt"
                  checked={showEmailReceipt}
                  onChange={(e) => setShowEmailReceipt(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="emailReceipt" className="ml-2 text-sm font-medium text-gray-700">
                  Email me a copy of my payment
                </label>
              </div>
              
              {showEmailReceipt && (
                <div className="ml-6 space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                    <input
                      type="email"
                      value={receiptEmail}
                      onChange={(e) => setReceiptEmail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remindMe"
                      checked={remindMe}
                      onChange={(e) => setRemindMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="remindMe" className="ml-2 text-sm font-medium text-gray-700">
                      Remind me again after 30 days
                    </label>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <button
                onClick={processUtilityPayment}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
              >
                Process Payment
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Benefits</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'No Queues', desc: 'Avoid long lines at payment centers' },
              { title: '24/7 Access', desc: 'Pay anytime, anywhere' },
              { title: 'Instant Receipts', desc: 'Get digital proof of payment immediately' }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-4 border rounded">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold mx-auto mb-2 text-xs">✓</div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                <p className="text-xs text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">School Fees Payment</h1>
          <p className="text-lg text-gray-600">Secure payments for educational institutions across Africa</p>
        </div>

        {/* Country Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {educationCountries.map(country => (
            <button
              key={country.code}
              onClick={() => setEducationCountry(country.name)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                educationCountry === country.name
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
              }`}
            >
              <span>{country.flag}</span>
              <span>{country.name}</span>
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['Primary Schools', 'Secondary Schools', 'Universities & Tertiary Institutions'].map(tab => (
            <button
              key={tab}
              onClick={() => setEducationTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                educationTab === tab
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Form</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Institution</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Select a school/university</option>
                {allSchools.filter(school => 
                  (educationTab === 'Primary Schools' && school.type === 'primary' && school.country === educationCountry) ||
                  (educationTab === 'Secondary Schools' && school.type === 'secondary' && school.country === educationCountry) ||
                  (educationTab === 'Universities & Tertiary Institutions' && (school.type === 'university' || school.type === 'tertiary') && school.country === educationCountry)
                ).map(school => (
                  <option key={school.id} value={school.id}>{school.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter student full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student ID/Registration Number</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter student ID" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Pay ({currencySymbols[currency]})</label>
              <input type="number" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter amount" />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={processEducationPayment}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
            >
              Process Payment
            </button>
          </div>
        </div>

        {/* Institutions List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Supported Institutions</h2>
          
          {educationTab === 'Primary Schools' && (
            <div>
              <h3 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-4">Primary Schools in {educationCountry}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allSchools.filter(school => school.type === 'primary' && school.country === educationCountry).map(school => (
                  <div key={school.id} className="p-3 border rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{school.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {educationTab === 'Secondary Schools' && (
            <div>
              <h3 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-4">Secondary Schools in {educationCountry}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allSchools.filter(school => school.type === 'secondary' && school.country === educationCountry).map(school => (
                  <div key={school.id} className="p-3 border rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{school.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {educationTab === 'Universities & Tertiary Institutions' && (
            <div>
              <h3 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-4">Universities & Tertiary Institutions in {educationCountry}</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-blue-700 mb-3">Universities</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allSchools.filter(school => school.type === 'university' && school.country === educationCountry).map(school => (
                    <div key={school.id} className="p-3 border rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{school.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-700 mb-3">Tertiary Institutions</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allSchools.filter(school => school.type === 'tertiary' && school.country === educationCountry).map(school => (
                    <div key={school.id} className="p-3 border rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{school.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Tickets</h1>
          <p className="text-lg text-gray-600">Concerts, sports, and entertainment events</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <img src={event.image} alt={event.title} className="w-full h-32 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-semibold text-gray-900">{event.title}</h3>
                  <div 
                    className={`px-1 py-0.5 rounded text-xs font-semibold ${
                      event.type === 'music' ? 'bg-purple-100 text-purple-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {event.type}
                  </div>
                </div>
                
                <div className="space-y-1 mb-2 text-xs text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.venue}, {event.city}</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-900">{currencySymbols[currency]}{(event.price * currencyRates[currency]).toFixed(2)}</div>
                  <button
                    onClick={() => handleEventBuyNow(event)}
                    className="bg-gradient-to-r from-purple-600 to-pink-700 text-white px-2 py-1 rounded text-xs font-medium hover:from-purple-700 hover:to-pink-800 transition-all"
                  >
                    Buy Ticket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Event Purchase Information</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Secure Tickets', desc: 'Digital tickets delivered instantly to your email and app' },
              { title: 'Multiple Venues', desc: 'Events across Harare, Bulawayo, and major cities' },
              { title: 'Easy Access', desc: 'Scan QR code at venue entrance for quick access' }
            ].map((info, index) => (
              <div key={index} className="text-center p-4 border rounded">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mx-auto mb-2 text-xs">{index + 1}</div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{info.title}</h3>
                <p className="text-xs text-gray-600">{info.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGovernment = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Government Services</h1>
          <p className="text-lg text-gray-600">Apply for official documents and licenses online</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['All', 'transport', 'identity', 'civil', 'business', 'immigration', 'municipal'].map(category => (
            <button
              key={category}
              onClick={() => setGovCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                govCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
              }`}
            >
              {category === 'All' ? 'All Services' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {governmentServices.filter(s => govCategory === 'All' || s.category === govCategory).map(service => (
            <div key={service.id} className="gov-service">
              <div className="flex justify-between items-start mb-1">
                <div 
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    service.category === 'transport' ? 'bg-blue-100 text-blue-800' :
                    service.category === 'identity' ? 'bg-green-100 text-green-800' :
                    service.category === 'civil' ? 'bg-purple-100 text-purple-800' :
                    service.category === 'business' ? 'bg-orange-100 text-orange-800' :
                    service.category === 'immigration' ? 'bg-red-100 text-red-800' :
                    'bg-teal-100 text-teal-800'
                  }`}
                >
                  {service.category}
                </div>
                <div className="text-xs text-gray-500">{currencySymbols[currency]}{(service.fee * currencyRates[currency]).toFixed(2)}</div>
              </div>
              
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{service.name}</h3>
              <p className="text-xs text-gray-600 mb-3">{service.description}</p>
              
              <button
                onClick={() => setSelectedGovService(service)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded text-sm font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* Service Application Form */}
        {selectedGovService && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8" ref={el => setPaymentSectionRef(el)}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedGovService.name}</h2>
              <button onClick={() => setSelectedGovService(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2"><strong>Fee:</strong> {currencySymbols[currency]}{(selectedGovService.fee * currencyRates[currency]).toFixed(2)}</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Required Documents:</strong></p>
              <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                {selectedGovService.required.split(',').map(doc => (
                  <li key={doc.trim()}>{doc.trim()}</li>
                ))}
              </ul>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID Number</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter ID number" />
              </div>
            </div>
            
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id="emailReceipt"
                  checked={showEmailReceipt}
                  onChange={(e) => setShowEmailReceipt(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="emailReceipt" className="ml-2 text-sm font-medium text-gray-700">
                  Email me a copy of my application
                </label>
              </div>
              
              {showEmailReceipt && (
                <div className="ml-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    value={receiptEmail}
                    onChange={(e) => setReceiptEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <button
                onClick={processGovService}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
              >
                Apply Now
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Application Process</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Select Service', desc: 'Choose the government service you need' },
              { title: 'Provide Details', desc: 'Fill in required information and upload documents' },
              { title: 'Pay Fee', desc: 'Securely pay the application fee' },
              { title: 'Receive Document', desc: 'Get your document via email or pickup' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mx-auto mb-2 text-xs">{index + 1}</div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-xs text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGroceries = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Grocery Shopping</h1>
          <p className="text-lg text-gray-600">Shop from major retailers and collect at your convenience</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {groceryStores.map(store => (
            <div key={store.id} className="grocery-store" onClick={() => setSelectedStore(store)}>
              <div className="text-5xl mb-2">{store.logo}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{store.name}</h3>
              <p className="text-sm text-gray-600">{store.locations}</p>
              <div className="flex items-center justify-center mb-2">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-600 ml-1">{store.rating}</span>
              </div>
              <div className="text-xs text-green-600 mb-2">{store.special}</div>
              <div className="text-xs text-blue-600 mb-2">{store.delivery}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStore(store);
                }}
                className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
              >
                Buy Grocery
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStoreProducts = () => {
    // Filter and sort products
    const filteredProducts = groceryProducts
      .filter(p => p.store === selectedStore.name)
      .filter(p => selectedProductCategory === 'All' || p.category === selectedProductCategory)
      .sort((a, b) => a.name.localeCompare(b.name));

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="text-6xl">{selectedStore.logo}</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{selectedStore.name}</h1>
                <p className="text-gray-600">Official online store| {selectedStore.locations}</p>
                <div className="flex items-center mt-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-gray-600 ml-1">{selectedStore.rating} • {selectedStore.special} • {selectedStore.delivery}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedStore(null)}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Stores
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={''}
                    onChange={(e) => {}}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <select
                  value={selectedProductCategory}
                  onChange={(e) => setSelectedProductCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {['All', 'staples', 'dairy', 'bakery', 'meat', 'produce', 'canned', 'pantry'].map(category => (
                    <option key={category} value={category}>
                      {category === 'All' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  {product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {product.discount}% OFF
                    </div>
                  )}
                  {product.inStock === false && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold">OUT OF STOCK</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{product.brand}</div>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    <span className="text-sm text-gray-500 ml-2">({Math.floor(Math.random() * 100) + 10} reviews)</span>
                  </div>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    {product.weight && <div>Weight: {product.weight}</div>}
                    {product.volume && <div>Volume: {product.volume}</div>}
                    {product.quantity && <div>Quantity: {product.quantity}</div>}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="text-2xl font-bold text-gray-900">{currencySymbols[currency]}{(product.price * currencyRates[currency]).toFixed(2)}</div>
                      {product.discount > 0 && (
                        <div className="text-sm text-gray-500 line-through ml-2">{currencySymbols[currency]}{((product.price * (1 + product.discount/100)) * currencyRates[currency]).toFixed(2)}</div>
                      )}
                    </div>
                    {['Pick n Pay', 'TM Supermarket', 'Spar'].includes(selectedStore.name) ? (
                      <a
                        href={selectedStore.name === 'Spar' ? 'https://www.spar.co.zw/' : 'https://tmpnponline.co.zw/shop'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all text-sm"
                      >
                        Purchase Now
                      </a>
                    ) : (
                      <button
                        onClick={() => handleGroceryBuyNow(product)}
                        disabled={!product.inStock}
                        className={`bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all text-sm ${
                          !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Store Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About {selectedStore.name}</h3>
                <p className="text-gray-600 mb-6">
                  {selectedStore.name} is one of Zimbabwe's leading supermarket chains, providing quality products at competitive prices.
                  With locations across the country, we're committed to serving our customers with the freshest produce and 
                  essential goods.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Fresh produce daily</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Competitive pricing</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Quality assurance</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Visit Our Website</h3>
                <p className="text-gray-600 mb-6">
                  For more information about our products, promotions, and store locations, visit our official website:
                </p>
                {['Pick n Pay', 'TM Supermarket'].includes(selectedStore.name) ? (
                  <a
                    href="https://tmpnponline.co.zw/shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Visit Pick n Pay / TM Online Shop
                  </a>
                ) : selectedStore.name === 'Spar' ? (
                  <a
                    href="https://www.spar.co.zw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Visit Spar Zimbabwe
                  </a>
                ) : (
                  <a
                    href={`https://${selectedStore.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Visit {selectedStore.website}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLoginModal = () => (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={() => setShowLoginModal(false)}>
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Login to Afripay</h3>
              <button onClick={() => setShowLoginModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowLoginModal(false); setShowRegisterModal(true); }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Create an account
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRegisterModal = () => (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={() => setShowRegisterModal(false)}>
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create an Account</h3>
              <button onClick={() => setShowRegisterModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create a password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                />
              </div>
              <div className="text-sm text-gray-600">
                By creating an account, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
              >
                Create Account
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={() => { setShowRegisterModal(false); setShowLoginModal(true); }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-blue-900 text-2xl">
                <svg className="w-8 h-8 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Afripay</h1>
                <p className="text-sm text-blue-200">One Platform. Every Service.</p>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'mobile', 'fibre', 'utilities', 'education', 'groceries', 'events', 'government'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize py-2 px-3 rounded-md transition-colors duration-200 ${
                    activeTab === tab 
                      ? 'bg-white text-blue-900 font-semibold shadow-lg' 
                      : 'hover:bg-blue-700 hover:text-yellow-300'
                  }`}
                >
                  {tab === 'government' ? 'Gov Services' : tab === 'events' ? 'Event Tickets' : tab}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold">Welcome</p>
                    <p className="text-xs text-blue-200">Balance: {currencySymbols[currency]}{(userBalance * currencyRates[currency]).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => setShowCart(!showCart)}
                    className="relative p-2 bg-blue-700 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L8 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                    </svg>
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={logout}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-800 hover:to-indigo-800 transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden bg-blue-800 rounded-lg mt-2 p-4">
              <div className="flex flex-col space-y-4">
                {['home', 'mobile', 'fibre', 'utilities', 'education', 'groceries', 'events', 'government'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setShowMobileMenu(false);
                    }}
                    className={`capitalize py-2 px-3 rounded-md transition-colors duration-200 text-left ${
                      activeTab === tab 
                        ? 'bg-white text-blue-900 font-semibold shadow-lg' 
                        : 'hover:bg-blue-700 hover:text-yellow-300'
                    }`}
                  >
                    {tab === 'government' ? 'Gov Services' : tab === 'events' ? 'Event Tickets' : tab}
                  </button>
                ))}
                <div className="pt-2 border-t border-blue-700">
                  {user ? (
                    <div className="flex flex-col space-y-2">
                      <div className="text-sm text-blue-200">Balance: {currencySymbols[currency]}{(userBalance * currencyRates[currency]).toFixed(2)}</div>
                      <button
                        onClick={() => {
                          setShowCart(true);
                          setShowMobileMenu(false);
                        }}
                        className="bg-blue-700 text-white px-3 py-2 rounded text-left hover:bg-blue-600"
                      >
                        Cart ({cart.length})
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setShowMobileMenu(false);
                        }}
                        className="bg-red-600 text-white px-3 py-2 rounded text-left hover:bg-red-700"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => {
                          setShowLoginModal(true);
                          setShowMobileMenu(false);
                        }}
                        className="bg-blue-700 text-white px-3 py-2 rounded text-left hover:bg-blue-600"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          setShowRegisterModal(true);
                          setShowMobileMenu(false);
                        }}
                        className="bg-green-600 text-white px-3 py-2 rounded text-left hover:bg-green-700"
                      >
                        Register
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Currency Selector */}
      <div className="bg-yellow-100 border-b border-yellow-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-end">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Currency:</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.keys(currencyRates).map(curr => (
                <option key={curr} value={curr}>
                  {currencySymbols[curr]} {curr}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-20">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'mobile' && renderMobile()}
        {activeTab === 'fibre' && renderFibre()}
        {activeTab === 'utilities' && renderUtilities()}
        {activeTab === 'education' && renderEducation()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'government' && renderGovernment()}
        {activeTab === 'groceries' && renderGroceries()}
        {selectedStore && renderStoreProducts()}
      </main>

      {/* Login Modal */}
      {showLoginModal && renderLoginModal()}

      {/* Register Modal */}
      {showRegisterModal && renderRegisterModal()}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowCart(false)}>
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Your Cart</h3>
                  <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border-b">
                        <div>
                          <p className="font-medium">{item.name || item.title}</p>
                          <p className="text-sm text-gray-500">{currencySymbols[currency]}{(item.price * currencyRates[currency]).toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                        <select 
                          value={paymentMethod} 
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                          {paymentMethods.map(method => (
                            <option key={method.id} value={method.id}>{method.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span>{currencySymbols[currency]}{(cart.reduce((sum, item) => sum + (item.price || 0), 0) * currencyRates[currency]).toFixed(2)}</span>
                      </div>
                      
                      {/* Email Receipt Option */}
                      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                        <div className="flex items-center mb-3">
                          <input
                            type="checkbox"
                            id="emailReceipt"
                            checked={showEmailReceipt}
                            onChange={(e) => setShowEmailReceipt(e.target.checked)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <label htmlFor="emailReceipt" className="ml-2 text-sm font-medium text-gray-700">
                            Email me a copy of my payment
                          </label>
                        </div>
                        
                        {showEmailReceipt && (
                          <div className="ml-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                            <input
                              type="email"
                              value={receiptEmail}
                              onChange={(e) => setReceiptEmail(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter your email address"
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Remind Me Option */}
                      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="remindMe"
                            checked={remindMe}
                            onChange={(e) => setRemindMe(e.target.checked)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <label htmlFor="remindMe" className="ml-2 text-sm font-medium text-gray-700">
                            Remind me again after 30 days
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={processPayment}
                  disabled={cart.length === 0}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
                    cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Process Payment
                </button>
                <button
                  onClick={() => setShowCart(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl">
                  <svg className="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Afripay</h3>
                  <p className="text-gray-400">One Platform. Every Service.</p>
                </div>
              </div>
              <p className="text-gray-400">Serving Africa with digital convenience.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Available In</h4>
              <ul className="space-y-2 text-gray-400">
                <li>🇿🇼 Zimbabwe</li>
                <li>🇿🇦 South Africa</li>
                <li>🇿🇲 Zambia</li>
                <li>🇰🇪 Kenya</li>
                <li>🇳🇬 Nigeria</li>
                <li>🇬🇭 Ghana</li>
                <li>🇹🇿 Tanzania</li>
                <li>🇺🇬 Uganda</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Mobile Data & Airtime</li>
                <li>Fibre Internet</li>
                <li>Utility Payments</li>
                <li>School Fees</li>
                <li>Grocery Shopping</li>
                <li>Event Tickets</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +263 77 123 4567</li>
                <li>📧 support@afripay.co.zw</li>
                <li>📍 Harare, Zimbabwe</li>
                <li>🕒 24/7 Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Afripay. All rights reserved.| Secure & Verified Payments</p>
            <div className="mt-2 text-sm text-gray-500">
              <p>Keywords: Zimbabwe utility payments, school fees, mobile data, fibre internet, government services, event tickets, grocery shopping, online bill payment, Ecocash, OneMoney, ZIMRA, ZESA, TelOne, water bills, electricity bills, school fees payment, university fees, government services Zimbabwe, vehicle license, national ID, passport application, online shopping Zimbabwe, OK Zimbabwe, Pick n Pay, Spar, TM Supermarket, grocery delivery, event tickets Harare, concert tickets Zimbabwe, sports tickets, fibre internet Zimbabwe, Liquid Fibre, ZOL Fibre, Starlink Zimbabwe, mobile data Zimbabwe, Econet, NetOne, Telecel, airtime Zimbabwe, data bundles Zimbabwe</p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes bounce-once {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-15px); }
          60% { transform: translateY(-10px); }
        }
        
        .animate-bounce-once {
          animation: bounce-once 2s ease-in-out;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .service-card {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .event-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .event-card:hover {
          transform: translateY(-5px);
        }
        
        .gov-service {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .gov-service:hover {
          transform: translateY(-5px);
        }
        
        .grocery-store {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .grocery-store:hover {
          transform: translateY(-5px);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default App;
```