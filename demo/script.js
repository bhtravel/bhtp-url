
var obj = new bhtp.Link('AAgent', 'TestPromo', 'ExactCare');
  // Trip
  obj.trip.destinationCountryIsoCode2 = 'GB';
  obj.trip.residenceStateIsoCode2 = 'WI';
  obj.trip.departureDate = '2016-06-24';
  obj.trip.returnDate = '2016-07-10';
  obj.trip.initialPaymentDate = '2016-06-15';
  obj.trip.policyholderEmail = 'sherlock.holmes@bhtp.com';
  obj.trip.totalTravelerCount = 5;
  // flights
  obj.addFlight(new bhtp.Flight('2016-06-24', 1234, 'DL', 'PNS', 'ATL'));
  obj.addFlight(new bhtp.Flight('2016-06-27', 2665, 'AA', 'ATL', 'LAX'));
  obj.policyholder.tripCost = 100;
  obj.policyholder.age = 34;
  // travelers
  var t1 = new bhtp.Traveler();
  t1.tripCost = 100;
  t1.age = 28;
  obj.addTraveler(t1);
  var t2 = new bhtp.Traveler();
  t2.tripCost = 200;
  t2.birthdate = '1986-09-07';
  obj.addTraveler(t2);

  var sut = obj.generateLink();

  document.getElementById('link-location').href = sut;

  console.log(sut);