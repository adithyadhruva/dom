var currentDate=document.querySelector(".current-date"),
 daystag=document.querySelector(".days"),
 previcon=document.querySelectorAll("#prev"),
 nexticon=document.querySelectorAll("#next")
//new date, current year ,current month 
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
console.log(currYear,currMonth,date)
const months = ["January","February","March","April","May","June","July","August","September","october","November","December"];
const renderCalendar = () => {
    let firstdayofMonth= new Date(currYear,currMonth,1).getDay();
    let lastDateofMonth = new Date(currYear,currMonth + 1,0).getDate();//last date of a month
    let lastDayofMonth= new Date(currYear,currMonth,lastDateofMonth).getDay();
    let lastDateoflastMonth=new Date(currYear,currMonth, 0).getDate();
    
    let li_tag= "";

    for (let i =firstdayofMonth ; i > 0; i--) {
        li_tag +=`<li class="inactive">${lastDateoflastMonth - i + 1}</li>`
        
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let today= i === date.getDate() && currMonth === new Date().getMonth()
                     && currYear === new Date().getFullYear() ? "active" : "";
        li_tag  +=`<li onclick="dateSelected(${i})" class="${today}">${i}</li>`
        
    }
    for (let i = lastDayofMonth; i < 6; i++) {
        li_tag +=`<li class="inactive">${i - lastDayofMonth + 1}</li>`
        
    }
    
    currentDate.innerText=`${months[currMonth]} ${currYear}`;
    daystag.innerHTML =  li_tag;
    }
renderCalendar();

previcon.forEach(icon =>{
   icon.addEventListener("click", () => {
   currMonth =icon.id === "perv" ? currMonth + 1 : currMonth - 1;
   if(currMonth < 0  || currMonth> 11){
    date = new Date(currYear,currMonth);
    currYear =date.getFullYear();
    currMonth=date.getMonth();
   } else{
    date =new Date(); 
   }
   renderCalendar();
   });
});

nexticon.forEach(icon =>{
    icon.addEventListener("click", () => {
    currMonth =icon.id === "next " ? currMonth -1  : currMonth + 1;
    if(currMonth < 0  || currMonth> 11){
        date = new Date(currYear,currMonth);
        currYear =date.getFullYear();
        currMonth=date.getMonth();
       } else{
        date =new Date(); 
       }
    renderCalendar();
    });
 });

function displayDate() {
	// Get the date object
	var today = new Date();

	// Get the year, month, and day values
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	// Get the input element
	var dateField = document.getElementById("date-field");

	// Set the input value to the formatted date string
	dateField.value = year + '/' + month + '/' + day;
}
    


function displayTime() {
    // Get the current time
    var currentTime = new Date();
    
    // Extract the hour, minute, and second from the current time
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    
    // Format the time as a string (add leading zeros to make the time appear as "00:00:00")
    var formattedTime = padZero(hours) + ":" + padZero(minutes) + ":" + padZero(seconds);
    
    // Set the value of the text box to the formatted time
    document.getElementById("timeBox").value = formattedTime;
  }
  
  // Helper function to add leading zeros
  function padZero(num) {
    return (num < 10 ? "0" : "") + num;
  }

  function clearTextbox() {
    document.getElementById("date-field").value = "";
  }
  
    
  function dateSelected(x){
    console.log("dateselected")
    console.log(x)
  }
