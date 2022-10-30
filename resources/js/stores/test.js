let logo = "";
let shopName = "testshopbd";
// let shopName = "test shop bd";
shopName = shopName.split(" ");
// console.log(shopName.length);

if (shopName.length == 1) {
	logo = shopName[0][0].toUpperCase();
} else {
	for (let i = 0; i < 2; i++) {
		logo += shopName[i][0].toUpperCase();
	}
}

console.log(logo);
