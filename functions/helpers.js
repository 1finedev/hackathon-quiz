export const validator = (validations) => {
 const errors = [];
 for(let i in validations){
    if(!validations[i].value){
        errors.push(i);
        continue;
    }
    if(validations.min && validations[i].value.trim().length < validations.min){
        errors.push(i);
        continue;
    }
    
    if(validations.max && validations[i].value.trim().length > validations.max){
        errors.push(i);
        continue;
    }
    if(validations.pattern && !validations.pattern.test(validations[i].value)){s
        errors.push(i);
        continue;
    }
 }
 console.log(errors)
 if(errors.length > 0){
    validations[errors[0]].element.focus()
   for(let i of errors) {
      validations[i].element.classList.add('error')
   }
   return false
 }
 return true
}