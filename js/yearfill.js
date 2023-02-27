
  
  function getNextFourMonths() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const months = [];
  
    for (let i = 0; i < 4; i++) {
      const nextMonth = new Date(year, month + i, 1);
      const lastDay = new Date(year, month + i + 1, 0);
      const days = [];
  
      for (let j = 1; j <= lastDay.getDate(); j++) {
        const date = new Date(year, month + i, j);
        days.push(date);
      }
  
      months.push(days);
    }
  
    return months;
  }

let fourMonths = getNextFourMonths();

for (i = 0; i < fourMonths.length; i++){
    let currentMonth = fourMonths[i];
    console.log(currentMonth)
    let firstday = currentMonth[0].getDay();
    console.log(firstday);
    for (j = 0; j < firstday; j++){
        currentMonth.unshift(' ');
    }
}
console.log(fourMonths)







  