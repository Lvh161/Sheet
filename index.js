const express = require("express");
const { google } = require("googleapis");
const app = express();
// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "keys.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

//   // Create client instance for auth
  const client = await auth.getClient();

//   // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1FdApM38WGfv9XCOWrkl8nmjEnMt3HxR80m3_hLMu0Lc";

//   // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });
 // Read rows from spreadsheet
 const getRows = await googleSheets.spreadsheets.values.get({
  auth,
  spreadsheetId,
  range: "MatHang",
  alt:'json',
});// Read rows from spreadsheet
const getLoai = await googleSheets.spreadsheets.values.get({
 auth,
 spreadsheetId,
 range: "LoaiHang",
});
  // // Read rows from spreadsheet
  // const getRows = await googleSheets.spreadsheets.values.get({
  //   auth,
  //   spreadsheetId,
  //   range: "MatHang!A:A",
  // });

  // Write row(s) to spreadsheet
  // await googleSheets.spreadsheets.values.append({
  //   auth,
  //   spreadsheetId,
  //   range: "MatHang!B:K",
  //   valueInputOption: "USER_ENTERED",
  //   alt:'json',
  //   resource: {
  //     values: [[
  //      ,"Ba con sói chất lượng cao","Bị thủng...","Lon",500000,2,510000,6,50,"https://res.cloudinary.com/hufi/image/upload/v1667193087/KhoaLuan/MatHang/similac-eye-q-591802_yrxnne.jpg",	10
  //     ]],
  //   },
  // });
// var objIn4={
//   name: 'LVH',
//   age: 18,
//   address: 'Tay Ninh',
//   'nguoi-Yeu': false,
//   getName: function(){
//       return this.name;//this=ten obj hien tai, thay doi ten obj this giu nguyen
//   }
// }

var jsonAll = [];
  //jsonAll.push('ok');
var jsonF={};
const leng=Object.entries(getRows.data.values).length-1;
const myArray=Object.entries(getRows.data.values)[0][1];
for(a = 1; a <= leng; a++){
  jsonF={};
  var myValue=Object.entries(getRows.data.values)[a][1];
  var i = 0;
  for(var value in myArray){
    jsonF[myArray[value]] = myValue[i]; i++;
  }
  jsonAll.push(jsonF);
}
  // res.send(jsonAll);
  // const resource = {
  //   properties: {
  //     title:'xinchao',
  //   },
  // };
  // try {
  //   const response = (await googleSheets.spreadsheets.create({
  //     resource,
  //     fields: spreadsheetId,
  //   })).data;
  //   // TODO: Change code below to process the `response` object:
  //   console.log(JSON.stringify(response, null, 2));
  // } catch (err) {
  //   console.error(err);
  // }
  // console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);
  res.send(jsonAll);

});
app.listen(1337, (req, res) => console.log("running on 1337"));


/**
 * npm init
 * npm install express ejs googleapis
 * npm install -D nodemon 
 * or(npm install -g nodemon )
 *  "Set-ExecutionPolicy Unrestricted" in powercell admin
 * nodemon index.js
 * 
 * 
 * 
 * JSON Formatter on Chrome
 * https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa/related?hl=vi
 */
