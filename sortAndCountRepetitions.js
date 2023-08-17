function sortAndCountRepetitions(dataInput) {
    const dataSorted = dataInput.slice().sort((a, b) => b.localeCompare(a))
    
    const repetitions = new Object()

    for (const text of dataSorted) {
      if (repetitions[text]) {
        repetitions[text]++
      } else {
        repetitions[text] = 1
      }
    }
    
    const result = new Array()
    for (const text in repetitions) {
      result.push({ comuna: text, cantidad: repetitions[text] })
    }
    
    return result
  }
  
  const dataInput = ["Yungay", "Calbuco", "Taltal", "Iquique", "Los Vilos", "Algarrobo", "Iquique", "Yungay", "Calbuco", "Palena", "Yungay"]
  const result = sortAndCountRepetitions(dataInput)
  
  console.log(result)