const mergeBids = (left, right, array) => {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0; 

    while (leftIndex < left.length && rightIndex < right.length){
        if(left[leftIndex][0] > right[rightIndex][0]){
            array[outputIndex++] = left[leftIndex++];
        } else {
            array[outputIndex++] = right[rightIndex++]; 
        }
    }
    for (let i = leftIndex; i < left.length; i++){
        array[outputIndex++] = left[i];
    }
    for (let i = rightIndex; i < right.length; i++){
        array[outputIndex++] = right[i]; 
    } 
    return array; 
}

const mergeAsks = (left, right, array) => {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0; 
    
    while (leftIndex < left.length && rightIndex < right.length){
        if(left[leftIndex][0] < right[rightIndex][0]){
            array[outputIndex++] = left[leftIndex++];
        } else {
            array[outputIndex++] = right[rightIndex++]; 
        }
    }
    for (let i = leftIndex; i < left.length; i++){
        array[outputIndex++] = left[i];
    }
    for (let i = rightIndex; i < right.length; i++){
        array[outputIndex++] = right[i]; 
    } 
    return array; 
}

export const sortBids = array => {
    if (array.length <= 1) 
      return array; 
    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);
    left = sortBids(left);
    right = sortBids(right); 
    return mergeBids(left, right, array); 
  }

export const sortAsks = array => {
    if (array.length <= 1)
        return array; 
    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);
    left = sortAsks(left);
    right = sortAsks(right); 
    return mergeAsks(left, right, array); 
}