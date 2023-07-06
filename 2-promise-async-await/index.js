// CREATED by ujikstark 
// Implementation Promises and Async/Await

const songs = [
  { title: "song title 1", artists: [{ name: "artist name 1" }], duration: 200 },
  { title: "song title 2", artists: [{ name: "artist name 2" }], duration: 300 },
  { title: "song title 3", artists: [{ name: "artist name 3" }], duration: 400 },
];

// return a promise
function getData(isValid) {
  return new Promise((resolve, reject) => {
    if (isValid) {
      console.log('wait 2 seconds');
      setTimeout(() => {
        resolve(songs);
      }, 2000);
    } else {
      reject("error");
    }
  })
}


isValid = true;

// get promise
promiseData = getData(isValid);
// print data
promiseData.then((value) => console.log(value));


isValid = false;

// async await
async function getDataWithAsync(isValid) {
  try {
    //get the resolve data
    tes = await getData(isValid);

    // print data
    console.log(tes);
  } catch (err) {
    console.log(err);
  } 
}

getDataWithAsync(isValid);