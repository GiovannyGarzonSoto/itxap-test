function generateRandomRUT() {
  const randomNumber = Math.floor(Math.random() * 99999999) + 1
  
  const rutNumber = String(randomNumber).padStart(8, '0')
  
  const factors = [3, 2, 7, 6, 5, 4, 3, 2]
  let sum = 0
  for (let i = 0; i < factors.length; i++) {
    sum += parseInt(rutNumber.charAt(i)) * factors[i]
  }
  const remainder = sum % 11
  const digit = remainder === 0 ? 0 : 11 - remainder
  
  const formattedRUT = rutNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '-' + digit
  
  console.log('RUT:', formattedRUT)
}

generateRandomRUT()