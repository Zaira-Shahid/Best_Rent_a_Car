const https = require("https");
const fs = require("fs");

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

(async () => {
  const html = await get("https://best-rent-a-car.vercel.app/");
  const encoded = [...html.matchAll(/\/images\/[^\s"'<>]*%20[^\s"'<>]*/g)].map((m) => m[0]);
  console.log("encoded image urls:", [...new Set(encoded)]);
  console.log("%20 count:", (html.match(/%20/g) || []).length);
  const contexts = [...html.matchAll(/.{40}%20.{60}/g)].slice(0, 20).map((m) => m[0]);
  console.log("--- contexts ---");
  for (const c of contexts) console.log(c.replace(/\n/g, " "));

  // Check if img tags for sportage load correctly in HTML
  const imgs = [...html.matchAll(/<img[^>]+>/g)]
    .map((m) => m[0])
    .filter((t) => /sportage|tucson/i.test(t));
  console.log("--- sportage/tucson imgs ---");
  for (const t of imgs) console.log(t);
})();
