// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metaCoinArtifact from '../../build/contracts/MetaCoin.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
const MetaCoin = contract(metaCoinArtifact)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
let accounts
let account
let students = new Array()
let id = new Array()
let name = new Array()
let welfare = new Array()
let balance = new Array()
let stuCount
let acCount
let applyCount

const App = {
  start: function () {
    const self = this

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider)

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      accounts = accs
      account = accounts[0]
      self.getStuCount()
      self.getActivity()
      self.getApply()

      document.getElementById('add_bonus').style.display="none";
      document.getElementById('add_welfare').style.display="none";
      document.getElementById('add_activity').style.display="none";
      document.getElementById('attend_activity').style.display="none";
      document.getElementById('stop_activity').style.display="none";
      document.getElementById('change_user').style.display="none";
      document.getElementById('studentNav').style.display="none";
      document.getElementById('apply_bonus').style.display="none";
      document.getElementById('permit_apply').style.display="none";
    })
  },

  setStatus: function (message) {

  },

  addStudent: function () {
    const self = this

    const name = document.getElementById('name').value
    const id = document.getElementById('id').value
    const i=parseInt(stuCount)+1
    const addr = accounts[i]
    console.log(addr)

    this.setStatus('Initiating transaction... (please wait)')

    let meta
    MetaCoin.deployed().then(function (instance) {
      meta = instance
      return meta.addStudent(name, id,addr, { from: account,gas: 3141592 })
    }).then(function () {
      self.setStatus('Transaction complete!')
      var oTr = document.createElement('tr');
      var oTd1 = document.createElement('td');
      oTd1.innerHTML = id;
      var oTd2 = document.createElement('td');
      oTd2.innerHTML = name;
      var oTd3 = document.createElement('td');
      oTd3.innerHTML = addr;
      var oTd4 = document.createElement('td');
      oTd4.innerHTML = "0";
      var oTd5 = document.createElement('td');
      oTd5.innerHTML = "0";
      oTr.appendChild(oTd1);
      oTr.appendChild(oTd2);
      oTr.appendChild(oTd3);
      oTr.appendChild(oTd4);
      oTr.appendChild(oTd5);
      var olistTable = document.getElementById('listTable');
      olistTable.appendChild(oTr)
      students.push(addr)
      stuCount++

    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error sending coin; see log.')
    })
  },

  addActivity: function () {
    const self = this

    const name = document.getElementById('ac_name').value
    const detail = document.getElementById('ac_detail').value
    const bonus = document.getElementById('ac_bonus').value
    const welfare = document.getElementById('ac_welfare').value

    this.setStatus('Initiating transaction... (please wait)')

    let meta
    MetaCoin.deployed().then(function (instance) {
      meta = instance
      return meta.addActivity(name, detail,bonus,welfare, { from: account,gas: 3141592 })
    }).then(function () {
      self.setStatus('Transaction complete!')
      var oTr = document.createElement('tr');
      var oTd1 = document.createElement('td');
      oTd1.innerHTML = acCount;
      var oTd2 = document.createElement('td');
      oTd2.innerHTML = name;
      var oTd3 = document.createElement('td');
      oTd3.innerHTML = detail;
      var oTd4 = document.createElement('td');
      oTd4.innerHTML = bonus;
      var oTd5 = document.createElement('td');
      oTd5.innerHTML = welfare;
      var oTd6 = document.createElement('td');
      oTd6.innerHTML = "进行中";
      oTr.appendChild(oTd1);
      oTr.appendChild(oTd2);
      oTr.appendChild(oTd3);
      oTr.appendChild(oTd4);
      oTr.appendChild(oTd5);
      oTr.appendChild(oTd6);
      var olistTable = document.getElementById('ac_listTable');
      olistTable.appendChild(oTr)
      acCount++
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error sending coin; see log.')
    })
  },

  applyBonus: function () {
    const self = this

    const name = document.getElementById('apply_name').value
    const bonus = document.getElementById('apply_b').value
    const welfare = document.getElementById('apply_welfare').value

    let meta
    MetaCoin.deployed().then(function (instance) {
      meta = instance
      console.log(name);
      console.log(bonus);
      console.log(welfare);
      return meta.apply(name, bonus,welfare,{ from: account,gas: 3141592 })
    }).then(function () {
      self.setStatus('Transaction complete!')
      var oTr = document.createElement('tr');
      var oTd1 = document.createElement('td');
      oTd1.innerHTML = applyCount;
      var oTd7 = document.createElement('td');
      oTd7.innerHTML = document.getElementById('user').innerHTML;
      var oTd2 = document.createElement('td');
      oTd2.innerHTML = name;
      var oTd4 = document.createElement('td');
      oTd4.innerHTML = bonus;
      var oTd5 = document.createElement('td');
      oTd5.innerHTML = welfare;
      var oTd6 = document.createElement('td');
      oTd6.innerHTML = "待审核";
      oTr.appendChild(oTd1);
      oTr.appendChild(oTd7);
      oTr.appendChild(oTd2);
      oTr.appendChild(oTd4);
      oTr.appendChild(oTd5);
      oTr.appendChild(oTd6);
      var olistTable = document.getElementById('apply_listTable');
      olistTable.appendChild(oTr)
      applyCount++;
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error sending coin; see log.')
    })
  },

  refreshBalance: function () {
    const self = this

    let meta
    MetaCoin.deployed().then(function (instance) {
      meta = instance
      return meta.getBalance.call(account, { from: account })
    }).then(function (value) {
      const balanceElement = document.getElementById('balance')
      balanceElement.innerHTML = value.valueOf()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error getting balance; see log.')
    })
  },

  refresh: function () {
    const self = this

    let meta
    MetaCoin.deployed().then(function (instance) {
      meta = instance
      return meta.getWelfare.call(account, { from: account })
    }).then(function (value) {
      const balanceElement = document.getElementById('w')
      balanceElement.innerHTML = value.valueOf()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error getting balance; see log.')
    })
  },

  //更新综测分数
  refreshStudents: function (i) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getBalance.call(i, { from: account })
      }).then(function (value) {
        var oMytable = document.getElementById('mytable');
        oMytable.rows[i+1].cells[3].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })


  },

  //更新公益时
  refreshWelfare: function (i) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getWelfare.call(i, { from: account })
      }).then(function (value) {
        var oMytable = document.getElementById('mytable');
        oMytable.rows[i+1].cells[4].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })


  },

  //添加综测分数
  sendCoin: function () {
    const self = this

    const amount = parseInt(document.getElementById('amount').value)
    const receiver = document.getElementById('receiver').value

    this.setStatus('Initiating transaction... (please wait)')

    let meta
    MetaCoin.deployed().then(function (instance) {
      meta = instance
      return meta.sendCoin(receiver, amount, { from: account })
    }).then(function () {
      self.setStatus('Transaction complete!')
      self.refreshBalance()
      for(var i=0;i<stuCount;i++)
      {
        self.refreshStudents(i)
      }

    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error sending coin; see log.')
    })
  },

  //添加公益时
  sendWelfare: function () {
    const self = this

    const amount = parseInt(document.getElementById('welfare').value)
    const receiver = document.getElementById('welfare_receiver').value

    this.setStatus('Initiating transaction... (please wait)')

    let meta
    MetaCoin.deployed().then(function (instance) {
      meta = instance
      return meta.sendWelfare(receiver, amount, { from: account })
    }).then(function () {
      self.setStatus('Transaction complete!')
      self.refresh()
      for(var i=0;i<stuCount;i++)
      {
        self.refreshWelfare(i)
      }

    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error sending coin; see log.')
    })
  },

  changeUser: function () {
    const self = this

    account = document.getElementById('user_input').value

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getNamebyAddress.call(account, { from: account })
      }).then(function (value) {
        var user = document.getElementById('user');
        user.innerHTML = value.valueOf()
        document.getElementById('studentNav').style.display="block";
        document.getElementById('managerNav').style.display="none";
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })

  },

  getStuCount: function () {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getStuCount.call({ from: account })
      }).then(function (value) {
        stuCount = value.valueOf()
        for(var i=0;i<value.valueOf();i++)
        {
          self.getStudent(i);
          self.getId(i);
          self.getName(i);
          self.getBalance(i);
          self.getWelfare(i);
          var oTd1 = document.createElement('td');
          var oTd2 = document.createElement('td');
          var oTd3 = document.createElement('td');
          var oTd4 = document.createElement('td');
          var oTd5 = document.createElement('td');
          var oTr = document.createElement('tr');
          oTr.appendChild(oTd1);
          oTr.appendChild(oTd2);
          oTr.appendChild(oTd3);
          oTr.appendChild(oTd4);
          oTr.appendChild(oTd5);
          var olistTable = document.getElementById('listTable');
          olistTable.appendChild(oTr);
        }
        console.log("stuCount:"+stuCount);

      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getActivity: function() {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getActivityCount.call({ from: account })
      }).then(function (value) {
        acCount = value.valueOf()
        for(var i=0;i<value.valueOf();i++)
        {
          self.getActivityName(i);
          self.getActivityDetail(i);
          self.getActivityBonus(i);
          self.getActivityWelfare(i);
          self.getActivityDetail(i);
          self.getActivityState(i);
          var oTd1 = document.createElement('td');
          oTd1.innerHTML = i;
          var oTd2 = document.createElement('td');
          var oTd3 = document.createElement('td');
          var oTd4 = document.createElement('td');
          var oTd5 = document.createElement('td');
          var oTd6 = document.createElement('td');
          var oTr = document.createElement('tr');
          oTr.appendChild(oTd1);
          oTr.appendChild(oTd2);
          oTr.appendChild(oTd3);
          oTr.appendChild(oTd4);
          oTr.appendChild(oTd5);
          oTr.appendChild(oTd6);
          var olistTable = document.getElementById('ac_listTable');
          olistTable.appendChild(oTr);
        }
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getApply: function() {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getApplyCount.call({ from: account })
      }).then(function (value) {
        applyCount = value.valueOf()
        for(var i=0;i<value.valueOf();i++)
        {
          self.getApplyName(i);
          self.getApplyer(i);
          self.getApplyBonus(i);
          self.getApplyWelfare(i);
          self.getApplyState(i);
          var oTd1 = document.createElement('td');
          oTd1.innerHTML = i;
          var oTd2 = document.createElement('td');
          var oTd3 = document.createElement('td');
          var oTd4 = document.createElement('td');
          var oTd5 = document.createElement('td');
          var oTd6 = document.createElement('td');
          var oTr = document.createElement('tr');
          oTr.appendChild(oTd1);
          oTr.appendChild(oTd2);
          oTr.appendChild(oTd3);
          oTr.appendChild(oTd4);
          oTr.appendChild(oTd5);
          oTr.appendChild(oTd6);
          var olistTable = document.getElementById('apply_listTable');
          olistTable.appendChild(oTr);
        }
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getStudent: function(i) {
    const self = this

    var re = new Array()
    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getStudent.call(i, { from: account })
      }).then(function (value) {
        students.push(value.valueOf())
        var oMytable = document.getElementById('mytable');
        oMytable.rows[i+1].cells[2].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getId: function(addr) {
    const self = this
    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getId.call(addr, {from: account })
      }).then(function (value) {
        id[addr] = value.valueOf()
        var oMytable = document.getElementById('mytable');
        oMytable.rows[addr+1].cells[0].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getWelfare: function(addr) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getWelfare.call(addr, { from: account })
      }).then(function (value) {
        welfare.push(value.valueOf())
        var oMytable = document.getElementById('mytable');
        oMytable.rows[addr+1].cells[4].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getName: function(addr) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getName.call(addr, { from: account })
      }).then(function (value) {
        name.push(value.valueOf())
        var oMytable = document.getElementById('mytable');
        oMytable.rows[addr+1].cells[1].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getBalance: function(addr) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getBalance.call(addr, { from: account })
      }).then(function (value) {
        balance.push(value.valueOf())
        var oMytable = document.getElementById('mytable');
        oMytable.rows[addr+1].cells[3].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getActivityName: function(n) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getActivityName.call(n, { from: account })
      }).then(function (value) {
        var oMytable = document.getElementById('ac_table');
        oMytable.rows[n+1].cells[1].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getActivityDetail: function(n) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getActivityDetail.call(n, { from: account })
      }).then(function (value) {
        var oMytable = document.getElementById('ac_table');
        oMytable.rows[n+1].cells[2].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getActivityBonus: function(n) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getActivityBonus.call(n, { from: account })
      }).then(function (value) {
        var oMytable = document.getElementById('ac_table');
        oMytable.rows[n+1].cells[3].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getActivityWelfare: function(n) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getActivityWelfare.call(n, { from: account })
      }).then(function (value) {
        var oMytable = document.getElementById('ac_table');
        oMytable.rows[n+1].cells[4].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getActivityState: function(n) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getActivityState.call(n, { from: account })
      }).then(function (value) {
        var oMytable = document.getElementById('ac_table');
        console.log(value.valueOf());
        if(value.valueOf())
        {
          oMytable.rows[n+1].cells[5].innerHTML = "进行中";
        }
        else
        {
          oMytable.rows[n+1].cells[5].innerHTML = "已截止";
        }

      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getApplyName: function(n) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getApplyName.call(n, { from: account })
      }).then(function (value) {
        var oMytable = document.getElementById('apply_table');
        oMytable.rows[n+1].cells[2].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getApplyer: function(n) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getApplyer.call(n, { from: account })
      }).then(function (value) {
        var oMytable = document.getElementById('apply_table');
        oMytable.rows[n+1].cells[1].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getApplyBonus: function(n) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getApplyBonus.call(n, { from: account })
      }).then(function (value) {
        var oMytable = document.getElementById('apply_table');
        oMytable.rows[n+1].cells[3].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getApplyWelfare: function(n) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getApplyWelfare.call(n, { from: account })
      }).then(function (value) {
        var oMytable = document.getElementById('apply_table');
        oMytable.rows[n+1].cells[4].innerHTML = value.valueOf();
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  getApplyState: function(n) {
    const self = this

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.getApplyState.call(n, { from: account })
      }).then(function (value) {
        var oMytable = document.getElementById('apply_table');
        console.log(value.valueOf());
        if(value.valueOf())
        {
          oMytable.rows[n+1].cells[5].innerHTML = "已通过";
        }
        else
        {
          oMytable.rows[n+1].cells[5].innerHTML = "待审核";
        }

      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  attendActivity: function() {
    const self = this

    const n = parseInt(document.getElementById('attend_no').value)

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.attendActivity(n, { from: account })
      }).then(function (value) {
        console.log("参加活动：" + n);
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  stopActivity: function() {
    const self = this

    const n = parseInt(document.getElementById('stop_no').value)

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.stopActivity(n, { from: account,gas: 3141592 })
      }).then(function () {
          console.log("截止活动："+n);
          for(var i=0;i<stuCount;i++)
          {
            self.refreshStudents(i)
            self.refreshWelfare(i)
          }
          self.getActivityState(n)
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  },

  permitApply: function() {
    const self = this

    const n = parseInt(document.getElementById('permit_no').value)

    let meta
      MetaCoin.deployed().then(function (instance) {
        meta = instance
        return meta.permitBonus(n, { from: account,gas: 3141592 })
      }).then(function () {
          console.log("通过审核："+n);
          for(var i=0;i<stuCount;i++)
          {
            self.refreshStudents(i)
            self.refreshWelfare(i)
          }
          self.getApplyState(n)
      }).catch(function (e) {
        console.log(e)
        self.setStatus('Error getting balance; see log.')
      })
  }

}

const Nav = {
  addStudent: function () {
    document.getElementById('add_bonus').style.display="none";
    document.getElementById('add_welfare').style.display="none";
    document.getElementById('add_student').style.display="block";
    document.getElementById('add_activity').style.display="none";
    document.getElementById('attend_activity').style.display="none";
    document.getElementById('stop_activity').style.display="none";
    document.getElementById('change_user').style.display="none";
    document.getElementById('permit_apply').style.display="none";
  },

  addBonus: function () {
    document.getElementById('add_bonus').style.display="block";
    document.getElementById('add_welfare').style.display="none";
    document.getElementById('add_student').style.display="none";
    document.getElementById('add_activity').style.display="none";
    document.getElementById('attend_activity').style.display="none";
    document.getElementById('stop_activity').style.display="none";
    document.getElementById('change_user').style.display="none";
    document.getElementById('permit_apply').style.display="none";
  },

  addWelfare: function () {
    document.getElementById('add_bonus').style.display="none";
    document.getElementById('add_welfare').style.display="block";
    document.getElementById('add_student').style.display="none";
    document.getElementById('add_activity').style.display="none";
    document.getElementById('attend_activity').style.display="none";
    document.getElementById('stop_activity').style.display="none";
    document.getElementById('change_user').style.display="none";
    document.getElementById('permit_apply').style.display="none";
  },

  addActivity: function () {
    document.getElementById('add_bonus').style.display="none";
    document.getElementById('add_welfare').style.display="none";
    document.getElementById('add_student').style.display="none";
    document.getElementById('add_activity').style.display="block";
    document.getElementById('attend_activity').style.display="none";
    document.getElementById('stop_activity').style.display="none";
    document.getElementById('change_user').style.display="none";
    document.getElementById('permit_apply').style.display="none";
  },

  stopActivity: function () {
    document.getElementById('add_bonus').style.display="none";
    document.getElementById('add_welfare').style.display="none";
    document.getElementById('add_student').style.display="none";
    document.getElementById('add_activity').style.display="none";
    document.getElementById('attend_activity').style.display="none";
    document.getElementById('stop_activity').style.display="block";
    document.getElementById('change_user').style.display="none";
    document.getElementById('permit_apply').style.display="none";
  },

  permitApply: function () {
    document.getElementById('add_bonus').style.display="none";
    document.getElementById('add_welfare').style.display="none";
    document.getElementById('add_student').style.display="none";
    document.getElementById('add_activity').style.display="none";
    document.getElementById('attend_activity').style.display="none";
    document.getElementById('stop_activity').style.display="none";
    document.getElementById('change_user').style.display="none";
    document.getElementById('permit_apply').style.display="block";
  },

  changeUser: function () {
    document.getElementById('add_bonus').style.display="none";
    document.getElementById('add_welfare').style.display="none";
    document.getElementById('add_student').style.display="none";
    document.getElementById('add_activity').style.display="none";
    document.getElementById('attend_activity').style.display="none";
    document.getElementById('stop_activity').style.display="none";
    document.getElementById('change_user').style.display="block";
    document.getElementById('apply_bonus').style.display="none";
    document.getElementById('permit_apply').style.display="none";
  },

  attendActivity: function () {
    document.getElementById('attend_activity').style.display="block";
    document.getElementById('change_user').style.display="none";
    document.getElementById('apply_bonus').style.display="none";
  },

  applyBonus: function () {
    document.getElementById('attend_activity').style.display="none";
    document.getElementById('change_user').style.display="none";
    document.getElementById('apply_bonus').style.display="block";
  }
}

window.App = App

window.Nav = Nav

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn(
      'Using web3 detected from external source.' +
      ' If you find that your accounts don\'t appear or you have 0 MetaCoin,' +
      ' ensure you\'ve configured that source properly.' +
      ' If using MetaMask, see the following link.' +
      ' Feel free to delete this warning. :)' +
      ' http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn(
      'No web3 detected. Falling back to http://127.0.0.1:8545.' +
      ' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
      ' Consider switching to Metamask for development.' +
      ' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
  }

  App.start()
})
