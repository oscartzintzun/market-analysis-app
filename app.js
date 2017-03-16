var productImages = ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'watercan', 'wineglass'];


var productArray = [];

function Product(name, path) {
  this.label = name;
  this.path = path;
  this.y = 0;
  // this.timesShown = 0;
  productArray.push(this);
};
// Product.prototype.increment = function() {
//   return timesShown += 1;
// };

for (var i in productImages) {
  var product = new Product(productImages[i], 'img/' + productImages[i] + '.jpg');
}

//JSON retieve data stored in productImages Array
retrieveData();

function randomPictureIndex() {
  return Math.floor(Math.random() * productImages.length);
}

//obj literals for use in functions/methods
var tracker = {
  picOneEl: document.getElementById('picOne'),
  picTwoEl: document.getElementById('picTwo'),
  picThreeEl: document.getElementById('picThree'),
  imageHolderEl: document.getElementById('picHolder'),
  viewResultsEl: document.getElementById('dispResults'),
  results: document.getElementById('showMe'),

  pic1: null,
  pic2: null,
  pic3: null,
  chartData: null,
  totalClicks: 0,
  counter: [],



  //random pics display each time pic is selected
  displayPics: function() {
    this.pic1 = productArray[randomPictureIndex()];
    this.pic2 = productArray[randomPictureIndex()];
    this.pic3 = productArray[randomPictureIndex()];

    while (this.pic1 === this.pic2 || this.pic1 === this.pic3 || this.pic2 === this.pic3) {
      this.displayPics();
    }

    this.picOneEl.src = this.pic1.path;
    this.picTwoEl.src = this.pic2.path;
    this.picThreeEl.src = this.pic3.path;

    this.picOneEl.id = this.pic1.label;
    this.picTwoEl.id = this.pic2.label;
    this.picThreeEl.id = this.pic3.label;

  },

  //stops selcections after 15 clicks and allows results to be viewed
  maxClicks: function() {
    if (tracker.totalClicks > 15) {
      tracker.imageHolderEl.removeEventListener('click', tracker.handleClick);
      console.log('max clicks allowed');
      collectData();
      tracker.viewResults();
      storeData();
      return;
    }
  },

  //Event handler for clicks, votes, and displays random pics

  handleClick: function(event) {
    // tracker.maxClicks();
    if (
      event.target.id === tracker.pic1.label || event.target.id === tracker.pic2.label || event.target.id === tracker.pic3.label
    ) {
      console.log('Click picked!');
      tracker.totalClicks++;
      console.log(tracker.totalClicks);
      tracker.countVotes();
      tracker.displayPics();

    }
    tracker.maxClicks();

  },

  viewResults: function() {
    var ulEl = document.createElement('ul');

    for (var i in productArray) {
      var liEl = document.createElement('li');
      liEl.textContent = productArray[i].label + ': ' + productArray[i].y;
      ulEl.appendChild(liEl);
    }

    this.viewResultsEl.appendChild(ulEl);
  },

  //counts time pics are selected
  countVotes: function() {
    if (event.target.id === tracker.pic1.label) {
      tracker.pic1.y++;
    }
    if (event.target.id === tracker.pic2.label) {
      tracker.pic2.y++;
    }
    if (event.target.id === tracker.pic3.label) {
      tracker.pic3.y++;
    }
    console.log('pic picked was ' + event.target.id);
    tracker.displayPics();
  }
};
// };

function collectData() {
  for (var i = 0; i < productArray.length; i++) {
    tracker.counter.push(productArray[i].y);
  }
};

//move data into array
//set data/turn data into string
function storeData() {
  var stringProduct = JSON.stringify(productArray);
  localStorage.setItem('stringProduct', stringProduct);
  console.log(storeData);
};

//get data from stringify
function retrieveData() {
  var stringProduct = localStorage.getItem('stringProduct');
  var parsedProducts = JSON.parse(stringProduct);
  console.log(parsedProducts);
}

function dynamicColors() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}

tracker.imageHolderEl.addEventListener('click', tracker.handleClick);
// tracker.viewResultsEl.addEventListener('click', chartResults);
tracker.results.addEventListener('click', chartResults);
tracker.displayPics();

function chartResults() {
  drawChart();
};



var data = {
  labels: productImages,
  datasets: [{
    label: 'CHARTS',
    backgroundColor: dynamicColors(),
    borderColor: dynamicColors(),
    borderWidth: 1,
    data: tracker.counter,
  }]
};

function drawChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  myChartData = new Chart(ctx, {
    type: 'bar',
    data: data,
  });
};

window.onload = function () {
  var chart = new CanvasJS.Chart("partners", {
    title:{
      text: "My First Chart in CanvasJS"
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: productArray
      }
    ]
  });
  chart.render();
}
