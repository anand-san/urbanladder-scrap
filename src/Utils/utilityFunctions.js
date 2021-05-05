export const numberWithCommas = number => {
    try{
      if(number){
        number = typeof(number) !== "string" ? number.toString() : number
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }catch(e){
      console.log(e)
    }
  }