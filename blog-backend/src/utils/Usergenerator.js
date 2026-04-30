function generateUserId() {
  const timestamp = Date.now().toString(36);  // base36 timestamp
  const random = Math.random().toString(36).substring(2, 8); // random string
  return `user_${timestamp}_${random}`;
}

console.log(generateUserId());  // Example: 'user_lmtzfz_4f2k9e'
module.exports={generateUserId}