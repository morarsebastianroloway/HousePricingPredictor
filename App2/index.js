const classifier = knnClassifier.create();
let net;

var properties = [
	{price: 35000, floor: 3, rooms: 1, sqm: 30, nhood: 'Tudor'},
	{price: 45000, floor: 4, rooms: 2, sqm: 55, nhood: 'Tudor'},
	{price: 30000, floor: 4, rooms: 1, sqm: 28, nhood: 'Cornisa'},
	{price: 35000, floor: 3, rooms: 1, sqm: 30, nhood: 'Tudor'},
	{price: 59000, floor: 2, rooms: 2, sqm: 55, nhood: 'Centru'},
	{price: 35000, floor: 1, rooms: 1, sqm: 33, nhood: 'Centru'},
	{price: 33000, floor: 3, rooms: 1, sqm: 31, nhood: 'Tudor'},
	{price: 45000, floor: 4, rooms: 2, sqm: 55, nhood: 'Tudor'},
	{price: 35000, floor: 3, rooms: 1, sqm: 30, nhood: 'Cornisa'},
	{price: 35000, floor: 3, rooms: 1, sqm: 30, nhood: 'Tudor'},
	{price: 47000, floor: 4, rooms: 2, sqm: 52, nhood: 'Centru'},
	{price: 35000, floor: 3, rooms: 1, sqm: 30, nhood: 'Tudor'},
	{price: 36000, floor: 0, rooms: 1, sqm: 31, nhood: 'Centru'},
	{price: 35000, floor: 3, rooms: 1, sqm: 30, nhood: 'Centru'},
	{price: 45000, floor: 4, rooms: 2, sqm: 54, nhood: 'Tudor'},
	{price: 32000, floor: 0, rooms: 1, sqm: 30, nhood: 'Cornisa'},
]

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');
  
  var index = 0;
  
  const apartment = properties[index];
  console.log(index);
	  
  document.getElementById('currentAp').innerText = `
	price: ${apartment.price},
	floor: ${apartment.floor},
	rooms: ${apartment.rooms},
	square meters: ${apartment.sqm},
	neighbourhood: ${apartment.nhood},
  `;

  // Reads an image from the webcam and associates it with a specific class
  // index.
  const addExample = classId => {
    // Get the intermediate activation of MobileNet 'conv_preds' and pass that
    // to the KNN classifier.
    //const activation = net.infer(webcamElement, 'conv_preds');
	const apartment = properties[index];

    // Pass the intermediate activation to the classifier.
    classifier.addExample(apartment, classId);
	
	if (classifier.getNumClasses() > 0) {
      // Get the next property
	  //const apartment = net.infer(webcamElement, 'conv_preds');
      const apartment = properties[index];
	  console.log(index);
	  
	  document.getElementById('currentAp').innerText = `
        price: ${apartment.price},
		floor: ${apartment.floor},
		rooms: ${apartment.rooms},
		square meters: ${apartment.sqm},
		neighbourhood: ${apartment.nhood},
		
      `;
      // Get the most likely class and confidences from the classifier module.
      const result = classifier.predictClass(apartment);

      const classes = ['Interesting', 'Not Interesting'];
      document.getElementById('console').innerText = `
        prediction: ${classes[result.classIndex]}\n
        probability: ${result.confidences[result.classIndex]}
      `;
	  
	  index++;
	  if (index>=properties.length){
		  index = 0;
	  }
	}
  }
  
  // When clicking a button, add an example for that class.
  document.getElementById('class-a').addEventListener('click', () => addExample(0));
  document.getElementById('class-b').addEventListener('click', () => addExample(1));
}

app();