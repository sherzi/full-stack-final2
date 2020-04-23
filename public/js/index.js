$(document).ready( async function() {
  let nameList = ['Estella', 'Shermeen', 'Richard']
    let users = {
      'Estella': {
        'password': 'estella',
        'firstName':'Estella',
        'lastName': 'Yeung',
        'phone': '12345678',
        'email':'estella@georgebrown.ca',
        'ambition': 'Enjoy learning; hope to get involve in Fintech'
      },
      'Shermeen': {
        'password': 'shermeen',
        'firstName':'Shermeen',
        'lastName': 'Kazi',
        'phone': '12345678',
        'email':'shermeen@georgebrown.ca',
        'ambition': 'The expert in the blockchain field'
      },
      'Richard': {
        'password': 'richard',
        'firstName':'Richard',
        'lastName': 'Qin',
        'phone': '12345678',
        'email':'richard@georgebrown.ca',
        'ambition': 'Create a top-notch blockchain application for use by the industry'
      },
    }
  window.addEventListener('load', async () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum)
      window.web3 = new Web3(ethereum)
      console.log('detected!')
      try {
        await ethereum.enable()
      }
      catch(error) {
        console.error('enable web3 error')
      }
      console.log(web3.version.network)
      if (web3.version.network !== '3') {
        $('#msg').text('Please switch to ropsten testnet and refresh page!')
        $('#alertModal').modal();
      }
      //dashboard
      nameList.forEach(async function(name) {
        let addr = $('#' + name + 'Addr').attr('name')
        web3.eth.getBalance(addr, function(error, balance) {
          if (error) {
            console.error('get balance error: ', error)
          }
          balance = web3.fromWei(balance, "ether") 
          $('#' + name + 'Balance').text(balance.toFixed(2))
          $('#' + name + 'Addr').text(addr.slice(0,6) + '...')
          $('#' + name + 'Addr').on('click', function() {
            $('#msg').text('This is full address: ' + $(this).attr('name'))
            $('#alertModal').modal();
          })
        })
      })
    }
    else {
      $('#msg').text('No web3 connection found Please use metamask !')
      $('#alertModal').modal();
    }
  })
  if ($(document).attr('title') === 'Web Alarm') {
    console.log('here!!!')
    let userInfo = JSON.parse(localStorage.getItem('user'))
    if (userInfo && userInfo.firstName) {
      console.log('userInfo: ', userInfo)
      $('#title').text('Welcome ' + userInfo.firstName)
    }
    else {
      console.log('OOps!')
    }
    
  }

  //entry
  $('#dashboard').on('click', function() {
    let status = localStorage.getItem('loggedIn');
    if (status !== undefined && status === 'true') {
      window.location.replace('dashabord');
    }
    else {
      alert('Not signed in yet !')
      window.location.replace('login')
    }
  })


  //login
  $('#login').on('click', function() {
      let user = $('#username').val()
      let password = $('#password').val()
      if (nameList.includes(user)) {
        if (password === users[user].password) {
          localStorage.setItem('loggedIn', true)
          localStorage.setItem('user', JSON.stringify(users[user]))
          window.location.replace('dashboard')
        }
        else {
          alert('password not valid, please try again')
        }
      }
      else {
        alert('username provided not exisit!')
      }
  })

  if ($(document).attr('title') === 'Login Page') {
    if (localStorage.getItem('loggedIn') && localStorage.getItem('loggedIn') === 'true') {
      window.location.replace('dashboard')
    }
  }

  if (localStorage.getItem('loggedIn') === 'true') {
    $('.login-btn').text('LogOut')

    $('.login-btn').attr('href', 'logOut')
  }

  //user
  if ($(document).attr('title') === 'User Profile') {
    let userInfo = JSON.parse(localStorage.getItem('user'))
    $('#name').text(userInfo.firstName  + ' ' + userInfo.lastName)
    $('#phone').text(userInfo.phone)
    $('#email').text(userInfo.email)
    $('#ambition').text(userInfo.ambition)
  }

  //logout
  if ($(document).attr('title') === 'Log Out') {
    localStorage.setItem('loggedIn', false)
    localStorage.setItem('user', {})
    setTimeout(window.location.replace('/'), 30000)
  }
});