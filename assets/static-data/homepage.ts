const data = {
  homeBanner: {
    imageUrl: "/images/ride-banner.png",
  },
  whyNavigo: {
    images: [
      "images/carsafety.png",
      "images/support.png",
      "images/bussiness ride.png",
    ],
    features: [
      {
        title: "Safety",
        description:
          "With each ride, we commit to provide a secure environment for our passengers.",
      },
      {
        title: "Support",
        description:
          "Our support team is accessible 24/7. In case of queries, feel free to contact our support team at any time.",
      },
      {
        title: "Business ride",
        description:
          "We offer secure, reliable, and economical options for your team's business travel. You can book a ride and transport your staff to the office, client meetings, or the airport.",
      },
    ],
  },
  homeVehicles: [
    {
      name: "Standard",
      image: "images/taxi.png",
      id: "taxi",
      passengers: 4,
      description: [
        "Standard Mini:  Accommodates up to 4 passengers and 1 medium suitcase(s).",
        "Standard Go: Accommodates up to 4 passengers and 2 medium suitcase(s).",
        "Standard Max: Accommodates up To 4 passengers and 3 medium suitcase(s).",
      ],
    },
    {
      name: "Executive",
      image: "images/exceutive.png",
      id: "executive",
      passengers: 3,
      description: [
        "Accommodates Up to 4 passengers and 2 medium suitcase(s).",
      ],
    },
    {
      name: "MPV",
      image: "images/mpv.png",
      id: "mpv",
      passengers: 6,
      description: [
        "MPV Go: Accommodates up to 6 passengers and 3 medium suitcase(s).",
        "MPV Max: Accommodates up to 4 passengers and 6 medium suitcase(s).",
      ],
    },
    {
      name: "Multi Seater",
      image: "images/multiseater.png",
      id: "multiseater",
      passengers: 8,
      description: [
        "Multi Seater Go: Accommodates up to 8 passengers and 6 medium suitcase(s).",
        "Multi Seater Max: Accommodates up to 6 passengers and 8 medium suitcase(s).",
      ],
    },
    {
      name: "Corporate Travel",
      image: "images/corporate travel.png",
      id: "corporate",
    },
    {
      name: "Airport Transfers",
      image: "images/airport_travel.png",
      id: "airport",
    },
  ],
  homeFaqs: [
    {
      key: "1",
      title: "How do I create an account?",
      description:
        "You need a working email address and mobile number in order to create an account. Install the app on your iOS or Android smartphone, and register with your mobile number. To receive SMS, you must use an active phone number. We'll send you a verification code by SMS, which you must provide upon signup, in order to maintain security. You can call for a call request from the same screen if the SMS containing the code is delayed. You can start using Navigo Taxis as soon as your number has been validated! You must enter your email address when signing up. If you forget your password and require instructions on how to reset it, we will support you via email. We also email you complete ride receipts.",
    },
    {
      key: "2",
      title: "How do I make a trip request?",
      description:
        "Open the app when you are prepared to leave, and choose your pick up location (it is preferred to enter your location with your phone location on). Tap 'Confirm pick-up' to confirm your ride.Then enter your destination and tap on “Confirm Drop-off’. Select one of the vehicle options that match your requirements. Tap 'Confirm pick-up' to confirm your ride.",
    },
    {
      key: "3",
      title: "How can I track my ride?",
      description:
        "Once your booking has been confirmed, you may track your ride on the map, you can see where your ride is and how long it will take the driver to reach your location.",
    },
    {
      key: "4",
      title: "How can I check the fare for my ride?",
      description:
        "To see the estimated total cost of your ride, enter the dropoff location and select the ride category. The estimated total fee for your ride may change depending on traffic, time taken during the ride or the actual distance travelled.",
    },
    {
      key: "5",
      title: "Can I smoke, eat or drink in the car?",
      description:
        "Navigo strictly forbids eating, drinking, smoking, or vaping. Kindly avoid placing yourself in a situation where you would be subject to paying the soiling fee worth £150.",
    },
    {
      key: "6",
      title: "Can I carry my pet(s) on the ride?",
      description:
        "Except for service dogs, Navigo does not allow any pets in their vehicles. Some of our drivers may experience allergic reactions due to the presence of furry/feathered pet(s), which might aggravate asthma. Please inform us at the time of booking if you are travelling with a guide dog so that we can provide you with the required support. You may mention it in the note box while ordering a Navigo ride.",
    },
    {
      key: "7",
      title: "How much luggage can I carry on the ride?",
      description:
        "This depends on the size of the vehicle and the number of passengers. More choices for vehicles and carrying luggage can be explored",
    },
  ],

  homeDownloadApp: {
    title: "GET A RIDE IN NO TIME!",
    description:
      "Choose your route, order a ride, meet your driver and get going.",

    playStoreUrl: "/",
    appStoreUrl: "/",
  },
};
export default data;
