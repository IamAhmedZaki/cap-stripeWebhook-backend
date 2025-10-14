const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const nodemailer = require("nodemailer");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);



const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use TLS later
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // must be an App Password
    },
  });
};

// const createEmailTransporter = () => {
//   return nodemailer.createTransport({
//     host: "smtp.simply.com",
//     port: 587,
//     secure: false, // use TLS later
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS, // must be an App Password
//     },
//   });
// };







const workflowStatusChange = async (req, res) => {


  res.status(200).json({ message: 'aight', error: error.message });

}


const factoryOrderEmail = (orderData) => {
  let kokardeValue = '';
  let colorOfCapSection = '';
  let broderiSection = '';
  let betraekSection = '';
  let skyggeSection = '';
  let foerSection = '';
  let ekstraSection = '';
  let tilbehorSection = '';
  let storrelseSection = '';
  const {
    customerDetails,
    selectedOptions,
    totalPrice,
    currency,
    orderNumber,
    orderDate,
    packageName,
    program

  } = orderData;

  const formatLabel = (label) => {
    const labelMap = {
      // General Cap Options
      // 'Farve': 'Color',
      // 'Materiale': 'Material',
      // 'Hagerem': 'Chinstrap',
      // 'Hagerem Materiale': 'Chinstrap Material',
      // 'Broderi farve': 'Embroidery color',
      // 'Knap farve': 'Button color',
      // 'år': 'Year',
      // 'Huebånd': 'Flag ribbon',
      // 'Topkant': 'Top edging',
      // 'Kantbånd': 'Edge band',
      // 'Stjerner': 'Stars',
      // 'Skyggebånd': 'Shadow band',
      // 'Svederem': 'Sweatband',
      // 'Foer': 'Inside color',
      // 'Sløjfe': 'Bow',
      // 'Ekstrabetræk': 'Extra cover',
      // 'Hueæske': 'Cap box',
      // 'Silkepude': 'Silk cushion',
      // 'Lyskugle': 'Light ball',
      // 'Smart Tag': 'Smart Tag',
      // 'Handsker': 'Gloves',
      // 'Skolebroderi farve': 'School embroidery color',
      // 'Broderi': 'Embroidery',
      // 'BETRÆK': 'Cover',
      // 'SKYGGE': 'Brim',
      // 'FOER': 'Inside of the cap',
      // 'EKSTRABETRÆK': 'Extra cover',
      // 'TILBEHØR': 'Accessories',
      // 'STØRRELSE': 'Size',

      // // HHX - KOKARDE Section
      // 'KOKARDE': 'KOKARDE',
      // 'Emblem': 'Emblem',
      // 'Kokarde': 'Kokarde type',
      // 'Roset farve': 'Rosette color',
      // 'Type': 'Type',

      // // HHX - UDDANNELSESBÅND Section
      // 'UDDANNELSESBÅND': 'UDDANNELSESBÅND',
      // 'Broderi foran': 'Front embroidery',
      // 'Broderi farve foran': 'Front embroidery color',
      // 'Hagerem Materiale': 'Chinstrap Material',
      // 'Hagerem Type': 'Chinstrap Type',
      // 'Broderi farve bagpå': 'Back embroidery color',


      // // HHX - BRODERI Section
      // 'Broderifarve': 'Embroidery color',
      // 'Ingen': 'None',
      // 'Navne broderi': 'Name embroidery',
      // 'Skolebroderi': 'School embroidery',

      // // HHX - BETRÆK Section
      // 'BETRÆK Farve': 'Cover color',

      // // HHX - SKYGGE Section
      // 'Skygge': 'Brim',
      // 'Skyggegravering Line 1': 'Brim engraving line 1',
      // 'Skyggegravering Line 2': 'Brim engraving line 2',
      // 'Skyggegravering Line 3': 'Brim engraving line 3',
      // 'Skyggegravering': 'Brim engraving',
      // 'Linje 1': 'Line 1',
      // 'Linje 2': 'Line 2',
      // 'Linje 3': 'Line 3',

      // // HHX - FOER Section
      // 'SatinType': 'Satin type',
      // 'SilkeType': 'Silk type',

      // // HHX - EKSTRABETRÆK Section
      // 'Tilvælg': 'Optional',

      // // HHX - TILBEHØR Section
      // 'Bucketpins': 'Bucket pins',
      // 'Ekstra korkarde': 'Extra korkarde  ',
      // 'Ekstra korkarde Text': 'Extra korkarde text',
      // 'Fløjte': 'Whistle',
      // 'Huekuglepen': 'Cap pen',
      // 'Luksus champagneglas': 'Luxury champagne glass',
      // 'Premium æske': 'Premium box',
      // 'Store kuglepen': 'Large pen',
      // 'Trompet': 'Trumpet',

      // // HHX - STØRRELSE Section
      // 'Millimeter tilpasningssæt': 'Millimeter adjustment set',
      // 'Vælg størrelse': 'Foam to adjust the size'
      KOKARDE: "KOKARDE",
      Emblem: "Emblem",
      Kokarde: "Kokarde",
      "Roset farve": "Rosette color",
      Type: "Type",

      UDDANNELSESBÅND: "Education band",
      "Broderi farve": "Embroidery color",
      "Broderi foran": "Front embroidery",
      Hagerem: "Chin strap",
      "Hagerem Materiale": "Chin strap material",
      Huebånd: "Cap band",
      "Knap farve": "Button color",
      Materiale: "Material",
      år: "Year",

      BRODERI: "Embroidery",
      Broderifarve: "Embroidery color",
      Ingen: "None",
      "Navne broderi": "Name embroidery",
      Skolebroderi: "School embroidery",
      "Skolebroderi farve": "School embroidery color",

      BETRÆK: "Cover",
      Farve: "Color",
      Kantbånd: "Edge band",
      Stjerner: "Stars",
      Topkant: "Top edge",

      SKYGGE: "Brim",
      Materiale: "Material",
      Skyggebånd: "Brim band",
      "Skyggegravering Line 1": "Brim engraving line 1",
      "Skyggegravering Line 2": "Brim engraving line 2",
      "Skyggegravering Line 3": "Brim engraving line 3",
      Type: "Type",

      FOER: "Inside of the cap",
      Farve: "Color",
      Foer: "Inner band",
      Sløjfe: "Bow",
      Svederem: "Sweatband",

      EKSTRABETRÆK: "Extra cover",
      Tilvælg: "Optional",

      TILBEHØR: "Accessories",
      Bucketpins: "Bucket pins",
      "Ekstra korkarde": "Extra Kokarde",
      "Ekstra korkarde Text": "Extra Kokarde text",
      Fløjte: "Whistle",
      Handsker: "Gloves",
      Huekuglepen: "Cap pen",
      Hueæske: "Cap box",
      "Luksus champagneglas": "Luxury champagne glass",
      Lyskugle: "Light ball",
      "Premium æske": "Premium box",
      Silkepude: "Silk pillow",
      "Smart Tag": "Smart tag",
      "Store kuglepen": "Large pen",
      Trompet: "Trumpet",

      STØRRELSE: "Size",
      "Millimeter tilpasningssæt": "Millimeter fitting set",
      "Vælg størrelse": "Choosen size ",

      STX: 'bordaux',
      HTX: 'Navy Blue',
      HHX: ' Royal Blue',
      HF: 'Light Blue',
      EUX: 'Grey',
      EUD: 'Purple',
      Sosuassistent: 'Purple',
      Sosuhjælper: 'Light purple',
      Frisør: 'Light pink',
      Kosmetolog: 'Pink',
      Pædagog: 'Dark purple',
      PAU: 'Orange',
      Ernæringsassisten: 'Yellow',


    }

    return labelMap[label] || label;
  };

  const programColorMap = {
    STX: 'Bordeaux',
    HTX: 'Navy Blue',
    HHX: 'Royal Blue',
    HF: 'Light Blue',
    EUX: 'Grey',
    EUD: 'Purple',
    sosuassistent: 'Purple',
    sosuhjælper: 'Light Purple',
    frisør: 'Light Pink',
    kosmetolog: 'Pink',
    pædagog: 'Dark Purple',
    pau: 'Orange',
    ernæringsassistent: 'Yellow'
  };
  const programColor = programColorMap[program] || program;
  const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      if (value.name) return value.name;
      if (value.value) return value.value;
      return JSON.stringify(value);
    }
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (value === '') return 'Ikke angivet / Not specified';
    return value;
  };

  const formatOptions = (options) => {
    return Object.entries(options)
      .map(([key, value]) => {
        if (!value || value === '' || value === null || value === false) return '';

        if (typeof value === 'object' && value !== null) {
          if (value.name) {
            return `<tr><td style="padding: 4px 8px;">${formatLabel(key)}:</td><td style="font-weight: bold;">${formatValue(value.name)}</td></tr>`;
          }
          return Object.entries(value)
            .map(([subKey, subValue]) => {
              if (subValue && subValue !== '' && subValue !== null && subValue !== false) {
                return `<tr><td style="padding: 4px 8px;">${formatLabel(subKey)}:</td><td style="font-weight: bold;">${formatValue(subValue)}</td></tr>`;
              }
              return '';
            })
            .join('');
        }

        return `<tr><td style="padding: 4px 8px;">${formatLabel(key)}:</td><td style="font-weight: bold;">${formatValue(value)}</td></tr>`;
      })
      .join('');
  };

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Two Tables Side by Side</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      /* text-align: center; */
      margin: 0;
      padding: 50px 0;
          display: flex;
          justify-content: center;
    }

    .table-container {
      display: inline-block; /* allows side-by-side placement */
      /* space between tables */
      vertical-align: top; /* align tops evenly */
    }

    table {
      border-collapse: collapse;
      width: 328px;
      /* border: 1px solid #ccc; */
      margin: 0 auto;
    }

    th {
      font-size: 20px;
      padding: 10px;
      text-align: left;
      /* background-color: #f2f2f2; */
    }

    td {
      padding: 9px;
      font-size: 16px;
      /* border-top: 1px solid #ddd; */
    }

    .subheading {
      font-weight: bold;
      background-color: #ffffff;
       text-align: left;
    }

    .value {
      font-size: 18px;
      /* color: #0074D9; */
      background-color: #ffffff;
       text-align: left;
    }

    .gap{
        height: 23px;
    }
    .infoBlock{
        margin-left: 42px;
        font-weight: bold;
        font-size: 18px;
    }
        .wrapper {
  width: 732px;
  overflow-x: hidden;
  background-color: #e7e7e7b9;
  margin: 0 auto; 
}
  .downgap{
  margin-bottom: 10px;
}
  
  </style>
</head>
<body style="margin:0;  padding:0; font-family:Arial, sans-serif;">

    <div class="wrapper">
    <div class="infoBlock">
    <div  class="downgap" >Kunde ordre oplysninger:</div>
  <div  class="downgap" >Ordren er oprettet: </div>
  <div><div class="downgap">Order nr:${orderNumber}</div> <div  class="downgap">Name of Customer:${customerDetails.firstName} ${customerDetails.lastName}</div> <div class="downgap">
        School:${customerDetails.Skolenavn}</div></div>
  <div class="downgap">Ordre detaljer</div>
  <div style="margin-left: 327px; margin-bottom: 10px; margin-top: 4px;">The package choosed:${packageName}

  </div>
  <div style="margin-left: 327px;">
    Information about the Cap
  </div>
  </div>
  <!-- First row of tables -->
  <div style="text-align:center;">
    <div class="table-container">
      <table>
       
      </table>
    </div>

    <div class="table-container">
      <table>
        <tr><th>The cap</th></tr>
        <tr><td class="subheading">Color of the cap</td></tr>
        <tr><td class="value">${programColor}</td></tr>
        
        <tr class="gap"></tr>

        <tr><td class="subheading">Material</td></tr>
        <tr><td class="value">${selectedOptions.UDDANNELSESBÅND.Materiale}</td></tr>
        <tr class="gap"></tr>

        <tr><td class="subheading">Chinstrap</td></tr>
        <tr><td class="value">${selectedOptions.UDDANNELSESBÅND.Hagerem}</td></tr>
        
       

      </table>
    </div>
  </div>

  <!-- Second row (another set of side-by-side tables) -->
  <div style="text-align:center; margin-top:40px;">
    <div class="table-container">
      <table>
        <!-- Embroidery on frontside -->
        <tr><th>Embroidery on frontside</th></tr>
     
        
        
       <tr><td class="subheading">Tekst maks. 20 tegn</td></tr>
<tr><td class="value">${selectedOptions.UDDANNELSESBÅND["Broderi foran"] === ''
      ? 'Not specified'
      : selectedOptions.UDDANNELSESBÅND["Broderi foran"]
    }</td></tr>

<tr class="gap"></tr>


        <tr><td class="subheading">Embroidery color</td></tr>
        <tr><td class="value">${selectedOptions.UDDANNELSESBÅND["Broderi farve"]}</td></tr>
        <tr class="gap"></tr>
         
        <!-- Embroidery on the backside of the cap -->
        <tr><th> Embroidery on the backside of the cap</th></tr>
       <tr><td class="subheading">Name embroidery (Writing) maks. 26</td></tr>
<tr><td class="value">${selectedOptions.BRODERI["Navne broderi"] === ''
      ? 'Not specified'
      : selectedOptions.BRODERI["Navne broderi"]
    }</td></tr>
<tr class="gap"></tr>

        <tr><td class="subheading">Embroidery color </td></tr>
        <tr><td class="value">${selectedOptions.BRODERI.Broderifarve}</td></tr>
        <tr class="gap"></tr>
        <tr><td class="subheading">School embroidery (Writing) maks. 35</td></tr>
<tr><td class="value">${selectedOptions.BRODERI.Skolebroderi === ''
      ? 'Not specified'
      : selectedOptions.BRODERI.Skolebroderi
    }</td></tr>
<tr class="gap"></tr>

        <tr><td class="subheading">Embroidery color </td></tr>
        <tr><td class="value">${selectedOptions.BRODERI['Skolebroderi farve']}</td></tr>
        <tr class="gap"></tr>
        <tr><td class="subheading">Buttons color</td></tr>
        <tr><td class="value">${selectedOptions.UDDANNELSESBÅND['Knap farve']}</td></tr>
        <tr class="gap"></tr>
        <tr><td class="subheading">Year</td></tr>
        <tr><td class="value">${selectedOptions.UDDANNELSESBÅND.år}</td></tr>
        <tr class="gap"></tr>
        
        <!-- brim -->
        <tr><th>Brim</th></tr>
        <tr><td class="subheading">Type</td></tr>
        <tr><td class="value">${selectedOptions.SKYGGE.Type}</td></tr> 
        <tr class="gap"></tr>
        <tr><td class="subheading">Material </td></tr>
        <tr><td class="value">${selectedOptions.SKYGGE.Materiale}</td></tr>
        <tr class="gap"></tr>
        <tr><td class="subheading">Shadow band</td></tr>
        <tr><td class="value">${selectedOptions.SKYGGE.Skyggebånd}</td></tr>
        <tr class="gap"></tr>
       <tr><td class="subheading">Linje 1</td></tr>
<tr><td class="value">${selectedOptions.SKYGGE["Skyggegravering Line 1"] === ''
      ? 'Not specified'
      : selectedOptions.SKYGGE["Skyggegravering Line 1"]
    }</td></tr>
<tr class="gap"></tr>

<tr><td class="subheading">Linje 3</td></tr>
<tr><td class="value">${selectedOptions.SKYGGE["Skyggegravering Line 3"] === ''
      ? 'Not specified'
      : selectedOptions.SKYGGE["Skyggegravering Line 3"]
    }</td></tr>
<tr class="gap"></tr>

       
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
       
        

        <!-- Extra Cover -->
        <tr><th>Extra Cover</th></tr>
        <tr><td class="subheading">Option</td></tr>
        <tr><td class="value">${selectedOptions.EKSTRABETRÆK.Tilvælg}</td></tr> 
        <tr class="gap"></tr>
        
          ${selectedOptions.EKSTRABETRÆK.Tilvælg === 'Yes'
      ? `
        <tr><td class="subheading">Color</td></tr>
        <tr><td class="value">${selectedOptions.EKSTRABETRÆK.Farve}</td></tr>
        <tr class="gap"></tr>
        <tr><td class="subheading">Top edging</td></tr>
        <tr><td class="value">${selectedOptions.EKSTRABETRÆK.Topkant}</td></tr>
        <tr class="gap"></tr>
        <tr><td class="subheading">Edge ribbon</td></tr>
        <tr><td class="value">${selectedOptions.EKSTRABETRÆK.Kantbånd}</td></tr>
        <tr class="gap"></tr>
        <tr><td class="subheading">Flag ribbon</td></tr>
        <tr><td class="value">${selectedOptions.EKSTRABETRÆK.Flagbånd}</td></tr>
        <tr class="gap"></tr>
        <tr><td class="subheading">Stars (Color matches the emblem)</td></tr>
        <tr><td class="value">${selectedOptions.KOKARDE.Emblem.name}</td></tr>
        <tr class="gap"></tr>
        <tr><td class="subheading">School embroidery</td></tr>
        <tr><td class="value">${selectedOptions.BRODERI.Skolebroderi}</td></tr>
        <tr class="gap"></tr>
        <tr><td class="subheading">Color (color of embroidery)</td></tr>
        <tr><td class="value">${selectedOptions.BRODERI['Skolebroderi farve']}</td></tr>
        <tr class="gap"></tr>
      `
      : ''
    }

        
        
        
        
        <!-- Size -->
        <tr><th>Size</th></tr>
        <tr><td class="subheading">Choosen size (Size)</td></tr>
        <tr><td class="value">${selectedOptions.STØRRELSE["Millimeter tilpasningssæt"]}</td></tr> 
        <tr class="gap"></tr>
        <tr><td class="subheading">Foam to adjust the size</td></tr>
        <tr><td class="value">${selectedOptions.STØRRELSE["Vælg størrelse"]}</td></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        
       

        
      </table>
    </div>

    <div class="table-container">
      <table>
        <!-- Cover -->
        <tr><th>Cover</th></tr>
        <tr><td class="subheading">Color </td></tr>
        <tr><td class="value">${selectedOptions.BETRÆK.Farve}</td></tr>
        
        <tr class="gap"></tr>

        <tr><td class="subheading">Top edgning</td></tr>
        <tr><td class="value">${selectedOptions.BETRÆK.Topkant}</td></tr>
        <tr class="gap"></tr>

        <tr><td class="subheading">Edge band</td></tr>
        <tr><td class="value">${selectedOptions.BETRÆK.Kantbånd}</td></tr>
        <tr class="gap"></tr>
        
        <tr><td class="subheading">Stjerner</td></tr>
        <tr><td class="value">${selectedOptions.BETRÆK.Stjerner}</td></tr>
        <tr class="gap"></tr>
        
        <tr><td class="subheading">Color of star </td></tr>
        <tr><td class="value">${selectedOptions.KOKARDE.Emblem.name}</td></tr>
        <tr class="gap"></tr>
        <tr><td class="subheading">Flag ribbon </td></tr>
        <tr><td class="value">${selectedOptions.BETRÆK.Flagbånd}</td></tr>
        <tr class="gap"></tr>
        
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        <tr class="gap"></tr>
        
        <!-- Inside of the cap -->
        <tr><th>Inside of the cap </th></tr>
        <tr><td class="subheading">Sweatband </td></tr>
        <tr><td class="value">${selectedOptions.FOER.Svederem}</td></tr>
        
        <tr class="gap"></tr>

        <tr><td class="subheading">Color</td></tr>
        <tr><td class="value">${selectedOptions.FOER.Farve}</td></tr>
        <tr class="gap"></tr>

        <tr><td class="subheading">Bow</td></tr>
        <tr><td class="value">${selectedOptions.FOER.Sløjfe}</td></tr>
        <tr class="gap"></tr>
        
       

        <tr><td class="subheading">Linje 2</td></tr>
        <tr><td class="value">${selectedOptions.SKYGGE["Skyggegravering Line 2"] === ''
              ? 'Not specified'
              : selectedOptions.SKYGGE["Skyggegravering Line 2"]
            }</td></tr>
        <tr class="gap"></tr>

        <tr><td class="subheading">Inner band</td></tr>
        <tr><td class="value">${selectedOptions.FOER.Foer}</td></tr>
        <tr class="gap"></tr>
        <tr><td class="subheading">Silk Type</td></tr>
        <tr><td class="value">${selectedOptions.FOER['Silk Type']==''
              ? 'Not specified'
              :selectedOptions.FOER['Silk Type']}</td></tr>
        <tr class="gap"></tr>
        <tr><td class="subheading">Satin Type</td></tr>
        <tr><td class="value">${selectedOptions.FOER['Satin Type']==''
              ? 'Not specified'
              : selectedOptions.FOER['Satin Type']}</td></tr>
        
        
        <tr style='height:26px;'></tr>
        
        <!-- Tilbehør -->
        <tr><th>Tilbehør</th></tr>
        <tr><td class="subheading">Silk cushion</td></tr>
        <tr><td class="value">${selectedOptions.TILBEHØR.Silkepude}</td></tr>
        
        <tr class="gap"></tr>

        <tr><td class="subheading">Small flag</td></tr>
        <tr><td class="value">${selectedOptions.TILBEHØR['Lille Flag Text']=== ''
              ? 'Not specified'
              : selectedOptions.TILBEHØR['Lille Flag Text']}</td></tr>
        <tr class="gap"></tr>
      
    </table>
    </div>
  </div>
  </div>

</body>
</html>

`;


  const text = `
Kunde ordre oplysninger (Customer Order Information)
====================================================

Ordren er oprettet (Order created): ${new Date(orderDate).toLocaleString('da-DK')}
Ordre #${orderNumber} — ${customerDetails.firstName} ${customerDetails.lastName}
Skole (School): ${customerDetails.Skolenavn || 'Ikke angivet / Not specified'}

Ordre detaljer (Order details)
------------------------------
Pakke: ${packageName || 'Hue Pakke'}
Total pris: ${totalPrice} ${currency}

Information om huen (Information about the Cap)
-----------------------------------------------
${Object.entries(selectedOptions)
      .map(([category, options]) => {
        const hasOptions = Object.values(options).some(val =>
          val && val !== '' && val !== null && val !== false &&
          !(typeof val === 'object' && Object.keys(val).length === 0)
        );
        if (!hasOptions) return '';

        const optionsText = Object.entries(options)
          .map(([key, value]) => {
            if (!value || value === '' || value === null || value === false) return '';

            if (typeof value === 'object' && value !== null) {
              if (value.name) {
                return `${formatLabel(key)}: ${formatValue(value.name)}`;
              }
              return Object.entries(value)
                .map(([subKey, subValue]) => `${formatLabel(subKey)}: ${formatValue(subValue)}`)
                .join('\n');
            }
            return `${formatLabel(key)}: ${formatValue(value)}`;
          })
          .join('\n');

        return `${formatLabel(category).toUpperCase()}\n${optionsText}\n`;
      })
      .join('\n')}

NOTE TIL FABRIK / NOTE TO FACTORY
---------------------------------
- Kontroller broderi tekstlængde og farver.
- Check color consistency with emblem.
- Bekræft størrelse, materiale og hagerem-type.
`;

  return {
    subject: `FACTORY ORDER – #${orderNumber} (${customerDetails.firstName} ${customerDetails.lastName})`,
    html,
    text
  };
};



const capOrderEmail = (orderData) => {
  const {
    customerDetails,
    selectedOptions,
    totalPrice,
    currency,
    orderNumber,
    orderDate,
    packageName,
    program
  } = orderData;

  // Enhanced formatOptions to handle different value structures
  const formatOptions = (options) => {
    return Object.entries(options)
      .map(([key, value]) => {
        // Skip if value is empty, null, or false
        if (!value || value === '' || value === null || value === false) {
          return '';
        }

        // Handle nested objects with name/value properties
        if (typeof value === 'object' && value !== null) {
          // If it's an object with name property (like Roset farve)
          if (value.name) {
            return `<tr><td style="padding: 4px 8px; border-bottom: 1px solid #eee;">${formatLabel(key)}:</td><td style="padding: 4px 8px; border-bottom: 1px solid #eee; font-weight: bold;">${formatValue(value.name)}</td></tr>`;
          }
          // If it's an object with multiple properties, format each one
          return Object.entries(value)
            .map(([subKey, subValue]) => {
              if (subValue && subValue !== '' && subValue !== null && subValue !== false) {
                return `<tr><td style="padding: 4px 8px; border-bottom: 1px solid #eee;">${formatLabel(subKey)}:</td><td style="padding: 4px 8px; border-bottom: 1px solid #eee; font-weight: bold;">${formatValue(subValue)}</td></tr>`;
              }
              return '';
            })
            .join('');
        }

        // Handle simple values
        return `<tr><td style="padding: 4px 8px; border-bottom: 1px solid #eee;">${formatLabel(key)}:</td><td style="padding: 4px 8px; border-bottom: 1px solid #eee; font-weight: bold;">${formatValue(value)}</td></tr>`;
      })
      .join('');
  };

  const formatLabel = (label) => {
    const labelMap = {
      'firstName': 'Fornavn',
      'lastName': 'Efternavn',
      'email': 'E-mail',
      'phone': 'Telefon',
      'Skolenavn': 'Skolenavn',
      'address': 'Adresse',
      'city': 'By',
      'postalCode': 'Postnummer',
      'country': 'Land',
      'notes': 'Bemærkninger',
      'deliverToSchool': 'Leveres til skole',
      'KOKARDE': 'KOKARDE',
      'Roset farve': 'Roset farve',
      'Kokarde': 'Kokarde',
      'Emblem': 'Emblem',
      'Type': 'Type',
      'TILBEHØR': 'TILBEHØR',
      'Hueæske': 'Hueæske',
      'Premium æske': 'Premium æske',
      'Huekuglepen': 'Huekuglepen',
      'Silkepude': 'Silkepude',
      'Ekstra korkarde': 'Ekstra korkarde',
      'Ekstra korkarde Text': 'Ekstra korkarde tekst',
      'Handsker': 'Handsker',
      'Stor kuglepen': 'Stor kuglepen',
      'Store kuglepen': 'Store kuglepen',
      'Smart Tag': 'Smart Tag',
      'Lyskugle': 'Lyskugle',
      'Luksus champagneglas': 'Luksus champagneglas',
      'Fløjte': 'Fløjte',
      'Trompet': 'Trompet',
      'Bucketpins': 'Bucketpins',
      'STØRRELSE': 'STØRRELSE',
      'Vælg størrelse': 'Vælg størrelse',
      'Millimeter tilpasningssæt': 'Millimeter tilpasningssæt',
      'UDDANNELSESBÅND': 'UDDANNELSESBÅND',
      'Huebånd': 'Huebånd',
      'Materiale': 'Materiale',
      'Hagerem': 'Hagerem',
      'Hagerem Materiale': 'Hagerem Materiale',
      'Broderi farve': 'Broderi farve',
      'Knap farve': 'Knap farve',
      'år': 'år',
      'BRODERI': 'BRODERI',
      'Broderifarve': 'Broderifarve',
      'Skolebroderi farve': 'Skolebroderi farve',
      'Ingen': 'Ingen',
      'BETRÆK': 'BETRÆK',
      'Farve': 'Farve',
      'Topkant': 'Topkant',
      'Kantbånd': 'Kantbånd',
      'Stjerner': 'Stjerner',
      'SKYGGE': 'SKYGGE',
      'Skyggebånd': 'Skyggebånd',
      'FOER': 'FOER',
      'Svederem': 'Svederem',
      'Sløjfe': 'Sløjfe',
      'Foer': 'Foer',
      'SatinType': 'Satin Type',
      'SilkeType': 'Silke Type',
      'EKSTRABETRÆK': 'EKSTRABETRÆK',
      'Tilvælg': 'Tilvælg'
    };
    return labelMap[label] || label;
  };

  const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      // Prefer showing "name" if it exists
      if (value.name) return value.name;
      if (value.value) return value.value;
      return JSON.stringify(value); // fallback
    }
    if (typeof value === 'boolean') {
      return value ? 'Ja' : 'Nej';
    }
    if (value === '') {
      return 'Ikke angivet';
    }
    if (value === 'No') return 'Nej';
    if (value === 'Yes') return 'Ja';
    if (value === 'Standard') return 'Standard';
    if (value === 'NONE') return 'NONE';
    if (value === 'INGEN') return 'INGEN';
    if (value === false) return 'Nej';
    if (value === true) return 'Ja';
    return value;
  };

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f9fafb; }
    .container { max-width: 700px; margin: 0 auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1); }

    .header img { width: 100%; max-width: 400px; border-radius: 8px; margin-bottom: 10px; }
    .content { padding: 25px; }
    h1, h2, h3 { color: #111827; }
    p { margin: 6px 0; }
    .section { margin: 25px 0; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb; }
    .total { background: #d1fae5; padding: 20px; border-radius: 8px; text-align: center; font-weight: bold; }
    .label { font-weight: bold; color: #111827; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    td { padding: 6px 0; vertical-align: top; }
    .category { background: #f3f4f6; font-weight: bold; padding: 8px; border-radius: 5px; margin-top: 15px; }
    .option-box {
      background: #f9fafb;
      padding: 10px 15px;
      border-radius: 6px;
      margin-bottom: 8px;
    }
    .option-box p {
      margin: 0;
    }
    .option-box .label {
      font-weight: bold;
      display: block;
      margin-bottom: 3px;
    }
    
    /* Two-column layout for billing + shipping */
    .two-column { display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
    .two-column .section { flex: 1; min-width: 300px; }

    /* Category item styling (Roset farve → Royal Blue layout) */
    .option-item { margin-bottom: 10px; }
    .option-item .option-label { font-weight: bold; display: block; color: #111827; }
    .option-item .option-value { margin-left: 0; color: #333; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header" style="background: #fff; color: #111; text-align: center; padding: 0; border-bottom: 1px solid #e5e7eb;">
      <img src="https://elipsestudio.com/studentlife/studentlifeemail.jpg" 
           alt="Studentlife caps" 
           style="width: 100%; max-width: 700px; display: block; margin: 0 auto; border-radius: 0;">

      <div style="background: #f9fafb; padding: 15px 0; border-top: 1px solid #e5e7eb; text-align: center;">
        <span style="font-size: 16px; font-weight: bold; color: #111827; display: inline-block; margin: 0 10px;">
          ✓ Premium kvalitet
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span style="font-size: 16px; font-weight: bold; color: #111827; display: inline-block; margin: 0 10px;">
          ✓ Personligt design
        </span>
      </div>
    </div>

    <div class="content">
      <p>Kære <strong>${customerDetails.firstName} ${customerDetails.lastName}</strong>,</p>
      <p>Tak for din bestilling hos Studentlife.</p>
      <p>Din bestilling med ordrenummer <strong>${orderNumber}</strong> er nu betalt.</p>

      <p><strong>Bemærk:</strong> Husk at tjekke, at alle detaljer er korrekte, herunder leveringstid (3 måneder fra bestilling, medmindre det er ekspres), skolens logo samt skolebroderi.</p>
      <p>Vi håber, at du kommer til at elske din studenterhue.</p>

      <div class="section">
        <h2>Din ordre oplysninger</h2>
        <p><span class="label">Ordren er oprettet:</span> ${new Date(orderDate).toLocaleString('da-DK')}</p>
        <p><span class="label">Ordrenummer:</span> ${orderNumber}</p>
      </div>

      <div class="two-column">
        <div class="section">
          <h2>Betalingsinformation</h2>
          <p><span class="label">Navn</span><br>${customerDetails.firstName} ${customerDetails.lastName}</p>
          <p><span class="label">Adresse</span><br>${customerDetails.address}</p>
          <p><span class="label">Post & By</span><br>${customerDetails.postalCode} ${customerDetails.city}</p>
        </div>

        <div class="section">
          <h2>Leveringsinformation</h2>
          <p><span class="label">Navn</span><br>${customerDetails.firstName} ${customerDetails.lastName}</p>
          <p><span class="label">Adresse</span><br>${customerDetails.address}</p>
          <p><span class="label">Post & By</span><br>${customerDetails.postalCode} ${customerDetails.city}</p>
          ${customerDetails.notes ? `<p><span class="label">Leveringsnote</span><br>${customerDetails.notes}</p>` : ''}
        </div>
      </div>

      <div class="section">
        <h2>Ordre detaljer</h2>
        <p><strong>Package</strong><br>${packageName || 'Hue Pakke'}</p>
        <p><strong>Pris</strong><br>${totalPrice || ''} DKK</p>

        <div class="category">Information om huen</div>
        ${Object.entries(selectedOptions)
      .map(([category, options]) => {
        const hasOptions = Object.values(options).some(
          val => val && val !== null && val !== false
        );
        if (!hasOptions) return '';
        return `
            <div class="category">${formatLabel(category)}</div>
            ${Object.entries(options)
            .map(([key, value]) => {
              if (!value || value === '' || value === null || value === false) return '';
              let displayValue =
                typeof value === 'object' && value.name ? value.name : value;
              return `
                  <div class="option-box">
                    <p class="label">${formatLabel(key)}</p>
                    <p>${displayValue}</p>
                  </div>`;
            })
            .join('')}
          `;
      })
      .join('')}
      </div>

      <div class="total">
        <p>Total: <strong>${totalPrice} ${currency}</strong></p>
        <p>Inklusiv moms</p>
        <p>LEVERING: 0 DKK</p>
        <p>MOMS: 20% af totalbeløbet</p>
      </div>

      <div class="section" style="text-align:center;">
        <p>Tak for din ordre ❤️</p>
        <p>Vi behandler den snarest og kontakter dig, hvis vi har brug for yderligere oplysninger.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;


  // Enhanced text version formatting
  const text = `
PREMIUM KVALITET & PERSONLIGT DESIGN
=====================================

Kære ${customerDetails.firstName} ${customerDetails.lastName},

Tak for din bestilling hos Studentlife.

Din bestilling med ordrenummer: ${orderNumber} er nu betalt.
Husk at tjekke, at alle detaljer er korrekte, herunder leveringstid (3 måneder fra bestilling, medmindre det er ekspres), skolens logo samt skolebroderi.

Vi håber, at du kommer til at elske din studenterhue.


ORDREOPLYSNINGER
-----------------
Ordren er oprettet: ${new Date(orderDate).toLocaleString('da-DK')}
Ordrenummer: ${orderNumber}


BETALINGSINFORMATION
---------------------
Navn: ${customerDetails.firstName} ${customerDetails.lastName}
Adresse: ${customerDetails.address}
Post & By: ${customerDetails.postalCode} ${customerDetails.city}


LEVERINGSINFORMATION
---------------------
Navn: ${customerDetails.firstName} ${customerDetails.lastName}
Adresse: ${customerDetails.address}
Post & By: ${customerDetails.postalCode} ${customerDetails.city}
${customerDetails.notes ? `Leveringsnote: ${customerDetails.notes}` : ''}


ORDRE DETALJER
---------------
${selectedOptions?.pakke?.name ? `Valgt pakke: ${selectedOptions.pakke.name}` : ''}
${selectedOptions?.pakke?.price ? `Pris: ${selectedOptions.pakke.price} DKK` : ''}

Information om huen:
--------------------
${Object.entries(selectedOptions)
      .map(([category, options]) => {
        const hasOptions = Object.values(options).some(val =>
          val && val !== '' && val !== null && val !== false &&
          !(typeof val === 'object' && Object.keys(val).length === 0)
        );
        if (!hasOptions) return '';

        const optionsText = Object.entries(options)
          .map(([key, value]) => {
            if (!value || value === '' || value === null || value === false) return '';

            if (typeof value === 'object' && value !== null) {
              if (value.name) {
                return `${formatLabel(key)}: ${formatValue(value.name)}`;
              }
              return Object.entries(value)
                .map(([subKey, subValue]) => {
                  if (subValue && subValue !== '' && subValue !== null && subValue !== false) {
                    return `${formatLabel(subKey)}: ${formatValue(subValue)}`;
                  }
                  return '';
                })
                .filter(Boolean)
                .join('\n');
            }
            return `${formatLabel(key)}: ${formatValue(value)}`;
          })
          .filter(Boolean)
          .join('\n');

        return `${formatLabel(category).toUpperCase()}\n${optionsText}\n`;
      })
      .filter(Boolean)
      .join('\n')}


TOTAL
------
Total: ${totalPrice} ${currency}
Inklusiv moms
LEVERING: 0 DKK
MOMS: 20% af totalbeløbet


Tak for din ordre ❤️
Vi behandler den snarest og kontakter dig, hvis vi har brug for yderligere oplysninger.
`;


  return {
    subject: `Tak for din bestilling hos Studentlife`,
    html,
    text
  };
};
const capOrderAdminEmail = (orderData) => {
  const {
    customerDetails,
    selectedOptions,
    totalPrice,
    currency,
    orderNumber,
    orderDate,
    packageName,
    program
  } = orderData;

  // Enhanced formatOptions to handle different value structures
  const formatOptions = (options) => {
    return Object.entries(options)
      .map(([key, value]) => {
        // Skip if value is empty, null, or false
        if (!value || value === '' || value === null || value === false) {
          return '';
        }

        // Handle nested objects with name/value properties
        if (typeof value === 'object' && value !== null) {
          // If it's an object with name property (like Roset farve)
          if (value.name) {
            return `<tr><td style="padding: 4px 8px; border-bottom: 1px solid #eee;">${formatLabel(key)}:</td><td style="padding: 4px 8px; border-bottom: 1px solid #eee; font-weight: bold;">${formatValue(value.name)}</td></tr>`;
          }
          // If it's an object with multiple properties, format each one
          return Object.entries(value)
            .map(([subKey, subValue]) => {
              if (subValue && subValue !== '' && subValue !== null && subValue !== false) {
                return `<tr><td style="padding: 4px 8px; border-bottom: 1px solid #eee;">${formatLabel(subKey)}:</td><td style="padding: 4px 8px; border-bottom: 1px solid #eee; font-weight: bold;">${formatValue(subValue)}</td></tr>`;
              }
              return '';
            })
            .join('');
        }

        // Handle simple values
        return `<tr><td style="padding: 4px 8px; border-bottom: 1px solid #eee;">${formatLabel(key)}:</td><td style="padding: 4px 8px; border-bottom: 1px solid #eee; font-weight: bold;">${formatValue(value)}</td></tr>`;
      })
      .join('');
  };

  const formatLabel = (label) => {
    const labelMap = {
      'firstName': 'Fornavn',
      'lastName': 'Efternavn',
      'email': 'E-mail',
      'phone': 'Telefon',
      'Skolenavn': 'Skolenavn',
      'address': 'Adresse',
      'city': 'By',
      'postalCode': 'Postnummer',
      'country': 'Land',
      'notes': 'Bemærkninger',
      'deliverToSchool': 'Leveres til skole',
      'KOKARDE': 'KOKARDE',
      'Roset farve': 'Roset farve',
      'Kokarde': 'Kokarde',
      'Emblem': 'Emblem',
      'Type': 'Type',
      'TILBEHØR': 'TILBEHØR',
      'Hueæske': 'Hueæske',
      'Premium æske': 'Premium æske',
      'Huekuglepen': 'Huekuglepen',
      'Silkepude': 'Silkepude',
      'Ekstra korkarde': 'Ekstra korkarde',
      'Ekstra korkarde Text': 'Ekstra korkarde tekst',
      'Handsker': 'Handsker',
      'Stor kuglepen': 'Stor kuglepen',
      'Store kuglepen': 'Store kuglepen',
      'Smart Tag': 'Smart Tag',
      'Lyskugle': 'Lyskugle',
      'Luksus champagneglas': 'Luksus champagneglas',
      'Fløjte': 'Fløjte',
      'Trompet': 'Trompet',
      'Bucketpins': 'Bucketpins',
      'STØRRELSE': 'STØRRELSE',
      'Vælg størrelse': 'Vælg størrelse',
      'Millimeter tilpasningssæt': 'Millimeter tilpasningssæt',
      'UDDANNELSESBÅND': 'UDDANNELSESBÅND',
      'Huebånd': 'Huebånd',
      'Materiale': 'Materiale',
      'Hagerem': 'Hagerem',
      'Hagerem Materiale': 'Hagerem Materiale',
      'Broderi farve': 'Broderi farve',
      'Knap farve': 'Knap farve',
      'år': 'år',
      'BRODERI': 'BRODERI',
      'Broderifarve': 'Broderifarve',
      'Skolebroderi farve': 'Skolebroderi farve',
      'Ingen': 'Ingen',
      'BETRÆK': 'BETRÆK',
      'Farve': 'Farve',
      'Topkant': 'Topkant',
      'Kantbånd': 'Kantbånd',
      'Stjerner': 'Stjerner',
      'SKYGGE': 'SKYGGE',
      'Skyggebånd': 'Skyggebånd',
      'FOER': 'FOER',
      'Svederem': 'Svederem',
      'Sløjfe': 'Sløjfe',
      'Foer': 'Foer',
      'SatinType': 'Satin Type',
      'SilkeType': 'Silke Type',
      'EKSTRABETRÆK': 'EKSTRABETRÆK',
      'Tilvælg': 'Tilvælg'
    };
    return labelMap[label] || label;
  };

  const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      // Prefer showing "name" if it exists
      if (value.name) return value.name;
      if (value.value) return value.value;
      return JSON.stringify(value); // fallback
    }
    if (typeof value === 'boolean') {
      return value ? 'Ja' : 'Nej';
    }
    if (value === '') {
      return 'Ikke angivet';
    }
    if (value === 'No') return 'Nej';
    if (value === 'Yes') return 'Ja';
    if (value === 'Standard') return 'Standard';
    if (value === 'NONE') return 'NONE';
    if (value === 'INGEN') return 'INGEN';
    if (value === false) return 'Nej';
    if (value === true) return 'Ja';
    return value;
  };

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f9fafb;
    }
    .container {
      max-width: 700px;
      margin: 0 auto;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      background: #fff;
      text-align: left;
      padding: 15px 25px;
      font-weight: bold;
      border-bottom: 1px solid #e5e7eb;
    }
    .section {
      padding: 20px;
      border-bottom: 1px solid #eee;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }
    .info-box {
      flex: 1;
      background: #f9fafb;
      padding: 15px;
      border-radius: 6px;
    }
    .info-box h2 {
      margin-bottom: 10px;
      font-size: 16px;
      color: #111827;
    }
    .info-box p {
      margin: 4px 0;
    }
    .category {
      font-weight: bold;
      background: #f3f4f6;
      padding: 10px;
      border-radius: 6px;
      margin-top: 15px;
      margin-bottom: 10px;
    }
    .option-box {
      background: #f9fafb;
      padding: 10px 15px;
      border-radius: 6px;
      margin-bottom: 8px;
    }
    .option-box p {
      margin: 0;
    }
    .option-box .label {
      font-weight: bold;
      display: block;
      margin-bottom: 3px;
    }
    .total {
      background: #d1fae5;
      padding: 20px;
      border-radius: 8px;
      margin: 20px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">

    <div class="header">Kunde ordre oplysninger</div>

    <div class="section">
      <p><strong>Ordren er oprettet:</strong> ${new Date(orderDate).toLocaleString('da-DK')} (Date and time for order)</p>
      <p><strong>Order #${orderNumber}</strong></p>
    </div>

    <div class="section info-row">
      <div class="info-box">
        <h2>Betalingsinformation</h2>
        <p><strong>Information about the payer</strong></p>
        <p>Name: ${customerDetails.firstName} ${customerDetails.lastName}</p>
        <p>Address: ${customerDetails.address}</p>
        <p>Post and City: ${customerDetails.postalCode} ${customerDetails.city}</p>
      </div>
      <div class="info-box">
        <h2>Leveringsinformation (Delivery information)</h2>
        <p>Name: ${customerDetails.firstName} ${customerDetails.lastName}</p>
        <p>Address: ${customerDetails.address}</p>
        <p>Post and City: ${customerDetails.postalCode} ${customerDetails.city}</p>
        ${customerDetails.notes ? `<p>Levering (Note): ${customerDetails.notes}</p>` : ''}
      </div>
    </div>

    <div class="section">
      <h2>Order Details</h2>
      <p><strong>Package:</strong> ${packageName || 'Hue Pakke'}</p>
      <p><strong>Price:</strong> ${totalPrice} ${currency}</p>

      let kokardeValue = ''; // store Guld here

${Object.entries(selectedOptions)
      .map(([category, options]) => {
        // Capture Guld from KOKARDE and skip rendering
        if (category === 'KOKARDE') {
          if (options.Emblem && options.Emblem.name) {
            kokardeValue = options.Emblem.name; // e.g. Guld
          }
          return ''; // skip showing KOKARDE
        }

        const hasOptions = Object.values(options).some(
          val => val && val !== null && val !== false
        );
        if (!hasOptions) return '';

        // --- BETRÆK Section ---
        if (category === 'BETRÆK') {
          return `
        <div class="category">${formatLabel(category)}</div>
        ${Object.entries(options)
              .map(([key, value]) => {
                // if (!value || value === '' || value === null || value === false) return '';
                let displayValue =
                  typeof value === 'object' && value.name ? value.name : value;
                return `
              <div class="option-box">
                <p class="label">${formatLabel(key)}</p>
                <p>${displayValue}</p>
              </div>`;
              })
              .join('')}
        <div class="option-box">
          <p class="label">Color of star</p>
          <p>${kokardeValue || 'Ikke angivet / Not specified'}</p>
        </div>
      `;
        }

        // --- EKSTRABETRÆK Section ---
        if (category === 'EKSTRABETRÆK') {
          const tilvalg = options.Tilvælg || 'No';
          const showColor = tilvalg.toLowerCase() === 'yes';

          return `
        <div class="category">${formatLabel(category)}</div>
        ${Object.entries(options)
              .map(([key, value]) => {
                if (!value || value === '' || value === null || value === false) return '';
                let displayValue =
                  typeof value === 'object' && value.name ? value.name : value;
                return `
              <div class="option-box">
                <p class="label">${formatLabel(key)}</p>
                <p>${displayValue}</p>
              </div>`;
              })
              .join('')}
        ${showColor
              ? `
            <div class="option-box">
              <p class="label">Color of star</p>
              <p>${kokardeValue || 'Ikke angivet / Not specified'}</p>
            </div>`
              : ''
            }
      `;
        }

        // --- Default Section ---
        return `  
      <div class="category">${formatLabel(category)}</div>
      ${Object.entries(options)
            .map(([key, value]) => {
              if (!value || value === '' || value === null || value === false) return '';
              let displayValue =
                typeof value === 'object' && value.name ? value.name : value;
              return `
            <div class="option-box">
              <p class="label">${formatLabel(key)}</p>
              <p>${displayValue}</p>
            </div>`;
            })
            .join('')}
    `;
      })
      .join('')}

    </div>

    <div class="total">
      <p>Total: ${totalPrice} ${currency}</p>
      <p>Inklusiv moms</p>
      <p>---------------------</p>
      <p>SUM: ${totalPrice} ${currency}</p>
      <p>LEVERING: 0 DKK</p>
      <p>MOMS: 20% of the total price DKK (vat)</p>
    </div>

  </div>
</body>
</html>
`;


  // Enhanced text version formatting
  const text = `
PREMIUM KVALITET & PERSONLIGT DESIGN
=====================================

Kære ${customerDetails.firstName} ${customerDetails.lastName},

Tak for din bestilling hos Studentlife.

Din bestilling med ordrenummer: ${orderNumber} er nu betalt.
Husk at tjekke, at alle detaljer er korrekte, herunder leveringstid (3 måneder fra bestilling, medmindre det er ekspres), skolens logo samt skolebroderi.

Vi håber, at du kommer til at elske din studenterhue.


ORDREOPLYSNINGER
-----------------
Ordren er oprettet: ${new Date(orderDate).toLocaleString('da-DK')}
Ordrenummer: ${orderNumber}


BETALINGSINFORMATION
---------------------
Navn: ${customerDetails.firstName} ${customerDetails.lastName}
Adresse: ${customerDetails.address}
Post & By: ${customerDetails.postalCode} ${customerDetails.city}


LEVERINGSINFORMATION
---------------------
Navn: ${customerDetails.firstName} ${customerDetails.lastName}
Adresse: ${customerDetails.address}
Post & By: ${customerDetails.postalCode} ${customerDetails.city}
${customerDetails.notes ? `Leveringsnote: ${customerDetails.notes}` : ''}


ORDRE DETALJER
---------------
${selectedOptions?.pakke?.name ? `Valgt pakke: ${selectedOptions.pakke.name}` : ''}
${selectedOptions?.pakke?.price ? `Pris: ${selectedOptions.pakke.price} DKK` : ''}

Information om huen:
--------------------
${Object.entries(selectedOptions)
      .map(([category, options]) => {
        const hasOptions = Object.values(options).some(val =>
          val && val !== '' && val !== null && val !== false &&
          !(typeof val === 'object' && Object.keys(val).length === 0)
        );
        if (!hasOptions) return '';

        const optionsText = Object.entries(options)
          .map(([key, value]) => {
            if (!value || value === '' || value === null || value === false) return '';

            if (typeof value === 'object' && value !== null) {
              if (value.name) {
                return `${formatLabel(key)}: ${formatValue(value.name)}`;
              }
              return Object.entries(value)
                .map(([subKey, subValue]) => {
                  if (subValue && subValue !== '' && subValue !== null && subValue !== false) {
                    return `${formatLabel(subKey)}: ${formatValue(subValue)}`;
                  }
                  return '';
                })
                .filter(Boolean)
                .join('\n');
            }
            return `${formatLabel(key)}: ${formatValue(value)}`;
          })
          .filter(Boolean)
          .join('\n');

        return `${formatLabel(category).toUpperCase()}\n${optionsText}\n`;
      })
      .filter(Boolean)
      .join('\n')}


TOTAL
------
Total: ${totalPrice} ${currency}
Inklusiv moms
------
SUM: ${totalPrice} ${currency}
Inklusiv moms
LEVERING: 0 DKK
MOMS: 20% of the total price DKK (vat)



`;


  return {
    subject: `Tak for din bestilling hos Studentlife`,
    html,
    text
  };
};

const sendCapEmail = async (req, res) => {
  try {
    const {
      customerDetails,
      selectedOptions,
      totalPrice,
      currency,
      orderNumber,
      orderDate,
      email,
      packageName,
      program
    } = req.body;

    // Validate required fields
    if (!customerDetails || !selectedOptions || !email) {
      return res.status(400).json({
        message: 'Missing required fields: customerDetails, selectedOptions, and email are required'
      });
    }

    const transporter = createEmailTransporter();
    const emailContent = capOrderEmail({
      customerDetails,
      selectedOptions,
      totalPrice: totalPrice || '299.00',
      currency: currency || 'DKK',
      orderNumber: orderNumber || `CAP-${Date.now()}`,
      orderDate: orderDate || new Date().toISOString(),
      packageName: packageName,
      program: program
    });
    const emailContentAdmin = capOrderAdminEmail({
      customerDetails,
      selectedOptions,
      totalPrice: totalPrice || '299.00',
      currency: currency || 'DKK',
      orderNumber: orderNumber || `CAP-${Date.now()}`,
      orderDate: orderDate || new Date().toISOString(),
      packageName: packageName,
      program: program
    });
    const emailContentFactory = factoryOrderEmail({
      customerDetails,
      selectedOptions,
      totalPrice: totalPrice || '299.00',
      currency: currency || 'DKK',
      orderNumber: orderNumber || `CAP-${Date.now()}`,
      orderDate: orderDate || new Date().toISOString(),
      packageName: packageName,
      program: program
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text
    };

    const mailOptionsAdmin = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: "mahmedzaki670@gmail.com",
      subject: emailContentAdmin.subject,
      html: emailContentAdmin.html,
      text: emailContentAdmin.text
    };

    const mailOptionsFactory = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: "mahmedzaki670@gmail.com",
      subject: emailContentFactory.subject,
      html: emailContentFactory.html,
      text: emailContentFactory.text
    };
    // Send email
    const emailResult = await transporter.sendMail(mailOptions);
    const emailResultAdmin = await transporter.sendMail(mailOptionsAdmin);
    const emailResultFactory = await transporter.sendMail(mailOptionsFactory);

    // Optionally save to database using Prisma
    try {
      const orderData = {
        customerDetails,
        selectedOptions,
        totalPrice: parseFloat(totalPrice) || 299.00,
        currency: currency || 'DKK',
        orderNumber: orderNumber || `CAP-${Date.now()}`,
        orderDate: orderDate ? new Date(orderDate) : new Date(),
        customerEmail: email,
        status: 'PENDING'
      };

      // const result = await prisma.order.create({
      //   data: orderData
      // });

      res.status(200).json({
        message: 'Order created and email sent successfully',
        // orderId: result.id,
        // orderNumber: result.orderNumber,
        emailResult: {
          messageId: emailResult.messageId,
          accepted: emailResult.accepted
        }
      });
    } catch (dbError) {
      console.error('Database Error:', dbError);
      // Still return success for email even if DB fails
      res.status(200).json({
        message: 'Email sent successfully but database save failed',
        emailResult: {
          messageId: emailResult.messageId,
          accepted: emailResult.accepted
        },
        warning: 'Order not saved to database'
      });
    }

  } catch (error) {
    console.error('Send Cap Email Error:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

const stripePayment = async (req, res) => {
  const {
    customerDetails,
    selectedOptions,
    totalPrice,
    currency,
    orderNumber,
    orderDate,
    email,
    packageName,
    program } = req.body;

  try {
    const order = await prisma.order.create({
      data: {
        customerDetails,
        selectedOptions,
        totalPrice: parseFloat(totalPrice),
        currency,
        orderNumber,
        orderDate,
        customerEmail: email,
        status: 'PENDING',
        packageName: packageName,
        program: program
      }
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "dkk",
            product_data: {
              name: `Cap Order : ${order.orderNumber}`,
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      locale: "da",
      success_url: `https://elipsestudio.com/studentlife/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "https://elipsestudio.com/studentlife/cancel",
      metadata: {
        orderId: order.id,   // 👈 only store a small reference here
      },
    });
    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getSessionDetails = async (req, res) => {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items"],
    });

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Get the orderId from metadata
      const orderId = session.metadata.orderId;



      // Send emails
      const order = await prisma.order.findUnique({ where: { id: parseInt(orderId) } });

      await sendCapEmail(
        {
          body: {
            customerDetails: order.customerDetails,
            selectedOptions: order.selectedOptions,
            totalPrice: order.totalPrice,
            currency: order.currency,
            orderNumber: order.orderNumber,
            orderDate: order.orderDate,
            email: order.customerEmail,
            packageName: order.packageName,
            program: order.program
          }
        },
        { status: () => ({ json: () => { } }) }
      );

    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};


module.exports = {
  workflowStatusChange, sendCapEmail, stripePayment, getSessionDetails, stripeWebhook
};
