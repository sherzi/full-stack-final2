// Try/Catch error handling

document.write('<h1>Hello 2_output</h1>');
document.write('<p>Have a great day!</p>');

const people = [["Joe", "Blow"], ["Copy", "Cat"], ["Ware", "Wolf"]];
console.table(people);

try {
 console.log("ok");
}
catch(err) {
 document.getElementById("msgBox").innerHTML = err.message; 
 console.error(err.message);
}
finally {
// If needed, you can do something here regardless of what happens in try/catch

}


