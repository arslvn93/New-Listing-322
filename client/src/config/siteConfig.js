/**
 * Site Configuration
 * This file contains all configurable content for the website
 * Last updated: 2025-09-05T06:30:10.202Z
 */

// contactInfo configuration
export const contactInfo = {
    agent: {
      name: "Arslan Ahmed",
      photo: "https://app.salesgenius.co/api/user-images/6e5f208c-ba60-4fa0-8e9a-abaabd25ded0?v=49b5bb0651a74a8f76b17f07911294534cc1945bf9f041389da6a5f3660dda8d",
      phone: "(416) 655-4850",
      email: "arslan@salesgenius.co",
      company: "Executive Homes Realty Inc",
      license: "RECO #84397152",
      repo: "new-listing-795"
    },
    social: {
      instagram: "https://instagram.com/executivehomesrealtyinc",
      facebook: "https://facebook.com/executivehomesrealtyinc",
      twitter: "https://twitter.com/executivehomesrealtyinc",
      linkedin: "https://linkedin.com/company/executivehomesrealtyinc"
    }
  };

// galleryImages configuration
export const galleryImages = [
    {
      id: 1,
      src: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004589506-2912-80 John St-01.jpg",
      alt: "Open concept living room with floor-to-ceiling windows at 80 John St #2912",
      category: "interior"
    },
    {
      id: 2,
      src: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004602781-2912-80 John St-04.jpg",
      alt: "Living and dining area with southeast light at 80 John St #2912",
      category: "interior"
    },
    {
      id: 3,
      src: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004609515-2912-80 John St-14.jpg",
      alt: "Gourmet kitchen with enlarged island and built-in power at 80 John St #2912",
      category: "kitchen"
    },
    {
      id: 4,
      src: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004627198-2912-80 John St-20.jpg",
      alt: "Primary bedroom with skyline outlook at 80 John St #2912",
      category: "bedroom"
    },
    {
      id: 5,
      src: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004643105-2912-80 John St-11.jpg",
      alt: "Luxury bathroom with floor-to-ceiling tile and modern fixtures at 80 John St #2912",
      category: "bathroom"
    }
  ];

// heroVideo configuration
export const heroVideo = {
    url: "https://www.yudiz.com/codepen/studio-r/bg-video.mp4",
    type: "video/mp4",
    autoplay: true,
    loop: true,
    muted: true,
    playsInline: true
  };

// homeShowcaseSections configuration
export const homeShowcaseSections = [
    {
      id: "section1",
      title: "Glass-Framed Living",
      description: "An airy open-concept living and dining space wrapped in true floor-to-ceiling windows delivers dramatic light, clean sightlines, and effortless flow for everyday comfort and entertaining.",
      imageUrl: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004643105-2912-80 John St-11.jpg"
    },
    {
      id: "section2",
      title: "Culinary Haven",
      description: "Custom 2021 kitchen with enlarged island, storage on the seating side, and built-in outlet—perfect for prep, laptops, and hosting—finished with cohesive designer materials and fixtures.",
      imageUrl: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004602781-2912-80 John St-04.jpg",
      tags: "Custom Kitchen, Island Seating, Modern Fixtures"
    },
    {
      id: "section3",
      title: "Primary Retreat",
      description: "Quiet, well-proportioned bedroom offers serene rest with bright southeast light and easy access to a beautifully retiled bathroom featuring modern fixtures and floor-to-ceiling tile.",
      imageUrl: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004609515-2912-80 John St-14.jpg",
      tags: "Serene Bedroom, Natural Light, Modern Bathroom"
    },
    {
      id: "section4",
      title: "Productive Workspace",
      description: "A true den separates work from life—ideal for focused WFH, a guest nook, or reading lounge—without compromising the openness of the main living area.",
      imageUrl: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004643105-2912-80 John St-11.jpg",
      tags: "Home Office, Flexible Space, Private Den"
    }
  ];

// neighborhood configuration
export const neighborhood = {
    name: "Entertainment District",
    city: "Toronto",
    description: "Toronto's Entertainment District is the city's premier destination for culture, dining, and urban living, known for its vibrant atmosphere and world-class amenities.",
    highlights: [
      "Steps to theaters, dining, and entertainment venues",
      "Direct access to PATH underground walkway",
      "TTC subway and streetcar connections",
      "Walk to financial district and shopping",
      "Vibrant urban lifestyle with 95/100 walk score"
    ]
  };

// neighborhoodAmenities configuration
export const neighborhoodAmenities = [
    {
      id: 1,
      name: "Rabba Fine Foods King West",
      distance: "0.2 miles",
      category: "shopping",
      iconName: "ShoppingBag"
    },
    {
      id: 2,
      name: "David Pecaut Square",
      distance: "0.1 miles",
      category: "recreation",
      iconName: "Leaf"
    },
    {
      id: 3,
      name: "Ogden Junior Public School (TDSB)",
      distance: "0.6 miles",
      category: "education",
      iconName: "School"
    },
    {
      id: 4,
      name: "Byblos Toronto",
      distance: "0.2 miles",
      category: "dining",
      iconName: "Wine"
    },
    {
      id: 5,
      name: "Momofuku Noodle Bar",
      distance: "0.4 miles",
      category: "dining",
      iconName: "Utensils"
    },
    {
      id: 6,
      name: "St Andrew Station (Line 1)",
      distance: "0.4 miles",
      category: "transportation",
      iconName: "Train"
    },
    {
      id: 7,
      name: "The Adelaide Club",
      distance: "0.5 miles",
      category: "recreation",
      iconName: "Users"
    },
    {
      id: 8,
      name: "PATH Financial District",
      distance: "0.4 miles",
      category: "business",
      iconName: "Building"
    }
  ];

// neighborhoodStats configuration
export const neighborhoodStats = [
    {
      id: 1,
      title: "Walk Score",
      value: "95/100",
      caption: "Walker's Paradise",
      iconName: "BadgeCheck",
      color: "bg-green-500"
    },
    {
      id: 2,
      title: "Transit Score",
      value: "94/100",
      caption: "Excellent Transit",
      iconName: "Compass",
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "School Rating",
      value: "8/10",
      caption: "Great Schools",
      iconName: "School",
      color: "bg-indigo-500"
    },
    {
      id: 4,
      title: "Commute Time",
      value: "8 min",
      caption: "To Financial District",
      iconName: "Clock",
      color: "bg-amber-500"
    }
  ];

// openHouseBenefits configuration
export const openHouseBenefits = [
    {
      id: 1,
      title: "Detailed Floor Plans",
      description: "Complete architectural layouts showing the 2 bedroom, 2 bathroom + den configuration with precise measurements and optimal room flow.",
      iconName: "FileText"
    },
    {
      id: 2,
      title: "Recent Neighborhood Sales",
      description: "Comparative market analysis of recent Condo Apartment sales in the Entertainment District, showing strong demand for larger, renovated suites.",
      iconName: "BarChart2"
    },
    {
      id: 3,
      title: "School District Information",
      description: "Comprehensive overview of TDSB and TCDSB options nearby, including Ogden Junior Public School and local secondary programs with ratings and enrollment details.",
      iconName: "GraduationCap"
    },
    {
      id: 4,
      title: "Property Inspection Report",
      description: "Professional assessment of the unit's condition, highlighting recent upgrades and maintenance history for informed decision-making.",
      iconName: "CheckSquare"
    },
    {
      id: 5,
      title: "Financing Options Guide",
      description: "Current mortgage rates and financing programs available for condo purchases, including first-time buyer incentives and down payment assistance.",
      iconName: "DollarSign"
    },
    {
      id: 6,
      title: "Neighborhood Amenities Map",
      description: "Interactive guide to nearby restaurants, shopping, entertainment venues, and transportation options within walking distance.",
      iconName: "Map"
    }
  ];

// openHouseDetails configuration
export const openHouseDetails = {
    nextDate: "Saturday, September 6, 2025",
    time: "1:00 PM - 4:00 PM",
    host: "Arslan Ahmed",
    phone: "(416) 655-4850",
    email: "info@80john.com",
    ctaText: "RSVP for Open House",
    virtualTourAvailable: true,
    virtualTourUrl: "https://tours.openhousemedia.ca/sites/80-john-st-2912-toronto-on-m5v-3x4-15850296/branded"
  };

// packageItems configuration
export const packageItems = [
    {
      id: 1,
      title: "Detailed Floor Plans",
      description: "Complete architectural layouts showing the 2 bedroom, 2 bathroom + den configuration with precise measurements and optimal room flow.",
      iconName: "FileText"
    },
    {
      id: 2,
      title: "Recent Neighborhood Sales",
      description: "Comparative market analysis of recent Condo Apartment sales in the Entertainment District, showing strong demand for larger, renovated suites.",
      iconName: "BarChart2"
    },
    {
      id: 3,
      title: "School District Information",
      description: "Comprehensive overview of TDSB and TCDSB options nearby, including Ogden Junior Public School and local secondary programs with ratings and enrollment details.",
      iconName: "GraduationCap"
    },
    {
      id: 4,
      title: "Property Feature List",
      description: "Detailed inventory highlighting true floor-to-ceiling windows without bulkheads, cohesive $90K 2021 kitchen and bath renovation, and enlarged island with seating-side storage and built-in outlet.",
      iconName: "CheckSquare"
    },
    {
      id: 5,
      title: "Utility Cost Estimates",
      description: "Estimated monthly utility expenses averaging $180 based on 1,249 sq ft, LED lighting, and efficient in-suite HVAC with programmable thermostat.",
      iconName: "DollarSign"
    },
    {
      id: 6,
      title: "Local Amenities Guide",
      description: "Curated directory of shopping, dining, recreation, and entertainment within walking distance of 80 John St #2912, including insider recommendations.",
      iconName: "Map"
    },
    {
      id: 7,
      title: "Home Inspection Tips",
      description: "Professional guidance focusing on the 2021 custom kitchen and fully retiled bathrooms, plus key mechanical and building systems to evaluate in a condo tower.",
      iconName: "Search"
    },
    {
      id: 8,
      title: "Financing Resources",
      description: "Mortgage pre-approval resources, down payment strategies, and competitive financing options for the $1,495,000 purchase price range.",
      iconName: "CreditCard"
    }
  ];

// property configuration
export const property = {
    name: "80 John St",
    address: {
      street: "88 John St #2912",
      city: "Toronto",
      state: "ON",
      zip: "M5V 3X4",
      country: "Canada"
    },
    price: "$1,495,000",
    beds: 2,
    baths: 2,
    sqft: 1249,
    lotSize: "30 x 120 ft",
    yearBuilt: 2010,
    type: "Condo Apartment",
    status: "For Sale",
    description: "Sophisticated condo apartment offering turnkey urban luxury, dramatic floor-to-ceiling glazing without bulkheads, cohesive 2021 renovations, and walk-to-everything convenience in Toronto's Entertainment District.",
    shortDescription: "Turnkey luxury condo in Toronto’s Entertainment District with parking",
    longDescription: "Elevated downtown living in a rare Loren-style 2+Den, 2-bath suite (1,249 sf) with true floor-to-ceiling windows—no bulkheads—delivering uninterrupted light and views. A cohesive $90K 2021 renovation reimagines the kitchen and bathrooms with designer finishes, an enlarged island with power, and consistent materiality. Enjoy southeast exposure, a usable 143 sf balcony, parking, and an owned locker. Steps to theatres, dining, PATH, TTC, and the financial core.",
    mainFeatures: [],
    propertyType: "Condo Apartment",
    heroImage: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004589506-2912-80 John St-01.jpg",
    heroCaption: "Turnkey luxury condo in Toronto’s Entertainment District with parking"
  };

// propertyFeatures configuration
export const propertyFeatures = [
    "Custom-designed kitchen with enlarged island, seating-side cabinet storage, and integrated power outlet for seamless cooking, work, and entertaining",
    "Open-concept living and dining framed by true floor-to-ceiling glazing for maximum light, bigger views, and dramatic first impressions",
    "Primary bedroom with generous proportions and bright southeast outlook for calm, comfortable rest",
    "Designer-renovated bathrooms fully retiled floor-to-ceiling with new vanities, fixtures, and toilets for a luxe, cohesive look",
    "Functional den offering a quiet, dedicated workspace or guest nook without compromising main living areas",
    "Energy-efficient double-pane curtain-wall glazing and predominantly LED lighting for comfort and lower operating costs",
    "Individually controlled in-suite HVAC with programmable thermostat for year-round climate control",
    "Rare no-bulkhead design in principal rooms delivering uninterrupted glass and skyline wow factor",
    "Consistent, designer-level finish across kitchen and baths elevating the entire home’s feel",
    "143 sq ft balcony sized for real outdoor living—dining, lounging, and entertaining",
    "Parking and owned locker provide turnkey downtown convenience and storage",
    "Pre-wired for high-speed internet and smart-home ready for easy thermostat, lock, and lighting upgrades",
    "Southeast exposure balances natural light and privacy without harsh late-afternoon glare",
    "Cohesive 2021 renovation investment (~$90K) minimizing future maintenance and upgrade needs"
  ];

// siteBranding configuration
export const siteBranding = {
    logoUrl: "/logo.svg",
    logoAlt: "80 John St",
    favicon: "/favicon.ico",
    colors: {
      primary: "#D9A566",
      primaryDark: "#8B6839",
      primaryLight: "#E6C38C",
      dark: "#111111",
      light: "#FFFFFF"
    },
    heroImage: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004589506-2912-80 John St-01.jpg",
    footer: {
      copyrightText: "© 2024 80 John St. All rights reserved.",
      disclaimer: "This website is for informational purposes only. Details are subject to change."
    }
  };

// siteMetadata configuration
export const siteMetadata = {
    title: "80 John St #2912 | Turnkey Luxury Condo | Downtown Toronto",
    description: "Turnkey 2+Den condo with no-bulkhead floor-to-ceiling windows, $90K 2021 renovation, 143 sf balcony, and parking in the Entertainment District. Book a tour.",
    keywords: "condo apartment, Toronto real estate, Entertainment District, luxury condo, floor-to-ceiling windows, 2 bed plus den, parking included, virtual tour, $1,495,000",
    ogImage: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004589506-2912-80 John St-01.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    canonical: "https://80john.com"
  };

// testimonials configuration
export const testimonials = [
    {
      id: 1,
      name: "David Chen",
      role: "Recent Homebuyer",
      content: "Arslan Ahmed guided us to a suite that feels bigger than the square footage. The true floor-to-ceiling windows and cohesive renovation were exactly what we wanted—plus parking in the heart of the city.",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 2,
      name: "Jennifer Liu",
      role: "Interior Designer",
      content: "The rare no-bulkhead glazing and consistent materials across the kitchen and baths show thoughtful design. The enlarged island with built-in power is both elegant and incredibly functional. Arslan presented every detail clearly.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Mark Williams",
      role: "Neighborhood Resident",
      content: "Living in the Entertainment District, you appreciate walkability to theatres, TTC, and PATH. Suites like this, with real outdoor space and parking, are special. Arslan knows how to highlight what matters here.",
      avatar: "https://randomuser.me/api/portraits/men/35.jpg"
    }
  ];

