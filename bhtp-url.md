# BHTP Url Parameters

## Things to Know
- Any parameters that do not have a value, should not be added to the integration url as it saves on space and helps mitigate unexpected behavior
- All dates follow [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Dates) standard
- All countries and states follow [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) standard
- All flight information is identified by [IATA codes](https://en.wikipedia.org/wiki/International_Air_Transport_Association)

### **Custom Object Encoding**
There are 3 object types to pass to the url that have custom encoding allowing for url brevity. The encoding is as follows

```
p1=k1:v1;k2:v2
```

Each object parameter is delimited by a semicolon (;) and the key and value of each object parameter is delimited by a colon (:)

## Base Url
Sandbox
```
https://sbx-www.bhtp.com/i
```

Production
```
https://www.bhtp.com/i
```

## Parameters

Example
https://www.bhtp.com/i?utm_source=AA0000&utm_medium=Partner&utm_campaign=TripCaseAd&package=Aircare&dc=US&rs=WI&e=jevenson@bhtp.com&tt=2&ph=a:23;tc:1234&t=a:24;tc:0&f=d:2016-07-01;n:1234;ac:DL;da:PNS;aa:ATL

### **Analytics Parameters**
| Key | Description | Example Data |
|---|---|---|
| utm_source | the id of the agent who is referring the user to the site. Used to track commission.  | &utm_source=AA0000 |
| utm_medium | indicates the source of the request. Always use "Partner" | &utm_medium=Partner |
| utm_campaign | an optional id allowing the integrating system to uniquely identify where there the reference is coming from. | &utm_campaign=CustomAdName |
| package | if a specific product is requested, it can be specified here. | &package=AirCare |

### **Trip Parameters**
| Key | Description | Example Data |
|---|---|---|
| dc | The [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code for the destination country that will be visited. If there is more than one destination country, pass only one. | &dc=US |
| rs | The [ISO 3166-2:US](https://en.wikipedia.org/wiki/ISO_3166-2:US) code for the US state of residence without the US- portion in the beginning (Example: Wisconson = WI) or The postal code of the US address of residence of the policyholder. | &rs=WI or &rs=54481 |
| dd | The date of departure in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Dates) format. | &dd=2016-07-01 |
| rd | The date of return from the trip in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Dates) format. | &rd=2016-07-14 |
| pd | The date the first payment toward the trip was made in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Dates) format. | &pd=2016-06-15 |
| e | the email of the policyholder | &e=someone@bhtp.com |
| tt | An optional field identifying how many travelers, **including the policyholder**, that will be on the policy. | &tt=3 |
| ph | policyholder (primary traveler) object, This uses object encoding. | &ph=a:23;db:1993-01-01;tc:1234 |
| t | an additional traveler. repeat parameter for each traveler; excluding primary. This uses object encoding. | &t=a:23;db:1993-01-01;tc:0 |
| f | a flight. repeat parameter for each flight. This uses object encoding. | &f=d:2016-07-01;n:1234;ac:DL;da:PNS;aa:ATL |

### **Flight Object Parameters**
| Name | Description | Example Data |
|---|---|---|
| d | the date of the flight's departure in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Dates) format. | d:2016-07-01 |
| n | The number of the flight. | n:1234
| ac | The [IATA code](http://www.iata.org/about/members/Pages/airline-list.aspx?All=true) of the airline that is servicing the flight (Example: Delta Air Lines Inc. = DL). | ac:DL |
| da | The [IATA code](https://www.world-airport-codes.com/) of the airport the flight departs from (Example: O'Hare International Airport = ORD). | da:ORD |
| aa | The [IATA code](https://www.world-airport-codes.com/) of the airport the flight arrives at. | aa:ATL |

### **Policyholder & Traveler Object Parameters**
| Param Name | Description | Example Data |
|---|---|---|
| a | The age of the traveler. If the date of birth is specified, this value is ignored. | a:23 |
| db | the date of birth of the traveler in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Dates) format. | db:1993-01-01 |
| tc | The cost of the trip for this traveler in US dollars. | tc:1234 |